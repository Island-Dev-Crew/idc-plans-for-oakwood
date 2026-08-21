import asyncio, hashlib, json, statistics
from pathlib import Path
from playwright.async_api import async_playwright

BASE = 'http://127.0.0.1:4177/'
OUT = Path('qa/motion')
OUT.mkdir(parents=True, exist_ok=True)

async def canvas_hash(page):
    data = await page.locator('.constellation canvas').screenshot()
    return hashlib.sha256(data).hexdigest(), len(data)

async def ordinary_pass(browser, label, viewport):
    page = await browser.new_page(viewport=viewport)
    errors=[]
    page.on('console', lambda msg: errors.append(f'{msg.type}:{msg.text}') if msg.type=='error' else None)
    page.on('pageerror', lambda exc: errors.append(f'pageerror:{exc}'))
    response=await page.goto(BASE, wait_until='networkidle')
    constellation=page.locator('.constellation')
    box=await constellation.bounding_box()
    assert box
    canvas=page.locator('.constellation canvas')
    dims=await canvas.evaluate("e=>({w:e.width,h:e.height,cssW:e.clientWidth,cssH:e.clientHeight})")
    frames=await page.evaluate("""() => new Promise(resolve=>{
      const deltas=[];let last=performance.now();
      function f(t){deltas.push(t-last);last=t;if(deltas.length<90)requestAnimationFrame(f);else resolve(deltas.slice(5))}
      requestAnimationFrame(f)
    })""")
    scroll_span=max(1, box['height']-viewport['height'])
    hashes=[]
    for name,ratio in [('start',.03),('mid',.5),('end',.97)]:
        await page.evaluate('(y)=>scrollTo(0,y)', box['y']+scroll_span*ratio)
        await page.wait_for_timeout(700)
        h,size=await canvas_hash(page)
        hashes.append((name,h,size))
        await page.screenshot(path=str(OUT/f'{label}-constellation-{name}.png'))
    visible_reveals=await page.locator('.reveal').evaluate_all("els=>els.every(e=>getComputedStyle(e).opacity==='1')")
    overflow=await page.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth')
    phase_width=await page.locator('.constellation-phases').evaluate("e=>getComputedStyle(e,'::after').width")
    result={
      'http': response.status if response else None,
      'console_errors': errors,
      'overflow': overflow,
      'canvas': dims,
      'canvas_states_unique': len({x[1] for x in hashes}),
      'canvas_png_bytes': [x[2] for x in hashes],
      'reveals_visible_by_default': visible_reveals,
      'phase_progress_width_at_end': phase_width,
      'raf_avg_ms': round(statistics.mean(frames),2),
      'raf_p95_ms': round(sorted(frames)[int(len(frames)*.95)],2),
    }
    await page.close()
    return result

async def reduced_pass(browser):
    page=await browser.new_page(viewport={'width':1280,'height':900}, reduced_motion='reduce')
    errors=[]
    page.on('pageerror',lambda exc:errors.append(str(exc)))
    await page.goto(BASE,wait_until='networkidle')
    data=await page.evaluate("""() => {
      const c=document.querySelector('.constellation');
      const s=document.querySelector('.constellation-sticky');
      const cursor=document.querySelector('.motion-cursor');
      const animated=[...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).animationName!=='none').length;
      return {height:c.getBoundingClientRect().height,viewport:innerHeight,sticky:getComputedStyle(s).position,cursor:getComputedStyle(cursor).display,animated}
    }""")
    h1,_=await canvas_hash(page); await page.wait_for_timeout(400); h2,_=await canvas_hash(page)
    data.update({'canvas_static':h1==h2,'errors':errors})
    await page.screenshot(path=str(OUT/'reduced-motion.png'),full_page=False)
    await page.close()
    return data

async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless=True)
        results={
          'desktop':await ordinary_pass(browser,'desktop',{'width':1440,'height':1000}),
          'mobile':await ordinary_pass(browser,'mobile',{'width':390,'height':844}),
          'reduced_motion':await reduced_pass(browser),
        }
        await browser.close()
    gates={
      'http_ok':all(results[x]['http']==200 for x in ['desktop','mobile']),
      'no_console_errors':all(not results[x]['console_errors'] for x in ['desktop','mobile']),
      'no_overflow':all(not results[x]['overflow'] for x in ['desktop','mobile']),
      'three_visual_states':all(results[x]['canvas_states_unique']==3 for x in ['desktop','mobile']),
      'canvas_sized':all(results[x]['canvas']['cssW']>300 and results[x]['canvas']['cssH']>600 for x in ['desktop','mobile']),
      'content_not_hidden':all(results[x]['reveals_visible_by_default'] for x in ['desktop','mobile']),
      'frame_budget':all(results[x]['raf_avg_ms']<22 and results[x]['raf_p95_ms']<35 for x in ['desktop','mobile']),
      'reduced_motion_static':results['reduced_motion']['canvas_static'] and results['reduced_motion']['animated']==0,
      'reduced_motion_compact':results['reduced_motion']['height']<=results['reduced_motion']['viewport']*1.05 and results['reduced_motion']['sticky']=='relative' and results['reduced_motion']['cursor']=='none',
    }
    payload={'results':results,'gates':gates,'passed':all(gates.values())}
    (OUT/'motion-qa.json').write_text(json.dumps(payload,indent=2))
    print(json.dumps(payload,indent=2))
    if not payload['passed']: raise SystemExit(1)

asyncio.run(main())

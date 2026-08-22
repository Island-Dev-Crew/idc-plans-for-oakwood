import asyncio, json, os, statistics
from pathlib import Path
from playwright.async_api import async_playwright

BASE = os.environ.get('BASE_URL', 'http://127.0.0.1:4188/')
OUT = Path('qa/10x')
OUT.mkdir(parents=True, exist_ok=True)

async def ordinary(browser, name, viewport):
    page = await browser.new_page(viewport=viewport)
    errors, external_fonts = [], []
    page.on('console', lambda msg: errors.append(f'{msg.type}:{msg.text}') if msg.type == 'error' else None)
    page.on('pageerror', lambda exc: errors.append(f'pageerror:{exc}'))
    page.on('request', lambda req: external_fonts.append(req.url) if 'fonts.googleapis.com' in req.url or 'fonts.gstatic.com' in req.url else None)
    response = await page.goto(BASE, wait_until='networkidle')
    text = (await page.locator('body').inner_text()).lower()
    frames = await page.evaluate("""() => new Promise(resolve => {
      const d=[]; let last=performance.now();
      function f(t){d.push(t-last);last=t;if(d.length<90)requestAnimationFrame(f);else resolve(d.slice(5))}
      requestAnimationFrame(f)
    })""")
    await page.screenshot(path=str(OUT/f'{name}-hero-final.png'))

    await page.locator('.hero-actions a[href="#foundation"]').click()
    await page.wait_for_timeout(900)
    section_top = await page.locator('#foundation').evaluate('e=>e.getBoundingClientRect().top')
    skip_top = await page.locator('.skip-link').evaluate('e=>e.getBoundingClientRect().top')
    await page.screenshot(path=str(OUT/f'{name}-foundation-heading-final.png'))

    await page.locator('.foundation-instrument').scroll_into_view_if_needed()
    await page.wait_for_timeout(300)
    await page.screenshot(path=str(OUT/f'{name}-foundation-instrument-final.png'))

    tabs = page.locator('.cluster-tabs button')
    tab_results=[]
    for i in range(await tabs.count()):
        await tabs.nth(i).click()
        tab_results.append({
          'selected': await tabs.nth(i).get_attribute('aria-selected'),
          'title': await page.locator('.cluster-readout h3').inner_text()
        })

    llms = await page.request.get(BASE.rstrip('/') + '/llms.txt')
    llms_text = await llms.text()
    result = {
      'http': response.status if response else None,
      'console_errors': errors,
      'external_font_requests': external_fonts,
      'overflow_px': await page.evaluate('document.documentElement.scrollWidth-document.documentElement.clientWidth'),
      'section_anchor_top': round(section_top, 2),
      'skip_link_top': round(skip_top, 2),
      'all_tabs_select': all(x['selected']=='true' for x in tab_results),
      'tab_titles': [x['title'] for x in tab_results],
      'four_evidence_lanes': all(x in text for x in ['aamu','oakwood','idc × oakwood','the opening']),
      'foundation_scan': all(x in text for x in ['522','0 exact matches','computer science','applied mathematics','information systems','information technology']),
      'evidence_boundaries': all(x in text for x in ['oakwood verified public fact','curriculum inference','proposed target','unverified / needs confirmation']),
      'llms_txt': llms.status==200 and llms_text.startswith('# ') and 'Evidence boundaries' in llms_text,
      'raf_avg_ms': round(statistics.mean(frames),2),
      'raf_p95_ms': round(sorted(frames)[int(len(frames)*.95)],2),
    }
    await page.close()
    return result

async def reduced(browser):
    page = await browser.new_page(viewport={'width':390,'height':844}, reduced_motion='reduce')
    errors=[]
    page.on('pageerror', lambda exc: errors.append(str(exc)))
    await page.goto(BASE, wait_until='networkidle')
    await page.locator('#foundation').scroll_into_view_if_needed()
    await page.wait_for_timeout(300)
    data = await page.evaluate("""() => ({
      animated:[...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).animationName!=='none').length,
      scanner:getComputedStyle(document.querySelector('.bulletin-scan'),'::after').animationName,
      errors:[]
    })""")
    data['errors']=errors
    await page.close()
    return data

async def main():
    async with async_playwright() as p:
      browser = await p.chromium.launch(executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless=True)
      results = {
        'desktop': await ordinary(browser,'desktop',{'width':1440,'height':1000}),
        'mobile': await ordinary(browser,'mobile',{'width':390,'height':844}),
        'reduced_motion': await reduced(browser),
      }
      await browser.close()
    gates = {
      'http_ok': all(results[x]['http']==200 for x in ['desktop','mobile']),
      'runtime_clean': all(not results[x]['console_errors'] for x in ['desktop','mobile']),
      'no_overflow': all(results[x]['overflow_px']==0 for x in ['desktop','mobile']),
      'anchors_clear_fixed_header': all(results[x]['section_anchor_top']>=80 for x in ['desktop','mobile']),
      'skip_link_hidden_without_focus': all(results[x]['skip_link_top']<0 for x in ['desktop','mobile']),
      'foundation_tabs_work': all(results[x]['all_tabs_select'] and len(set(results[x]['tab_titles']))==4 for x in ['desktop','mobile']),
      'evidence_model_complete': all(results[x]['four_evidence_lanes'] and results[x]['foundation_scan'] and results[x]['evidence_boundaries'] for x in ['desktop','mobile']),
      'fonts_self_hosted': all(not results[x]['external_font_requests'] for x in ['desktop','mobile']),
      'machine_provenance': all(results[x]['llms_txt'] for x in ['desktop','mobile']),
      'frame_budget': all(results[x]['raf_avg_ms']<22 and results[x]['raf_p95_ms']<35 for x in ['desktop','mobile']),
      'reduced_motion_static': results['reduced_motion']['animated']==0 and results['reduced_motion']['scanner']=='none' and not results['reduced_motion']['errors'],
    }
    payload={'results':results,'gates':gates,'passed':all(gates.values())}
    (OUT/'qa-10x.json').write_text(json.dumps(payload,indent=2))
    print(json.dumps(payload,indent=2))
    if not payload['passed']: raise SystemExit(1)

asyncio.run(main())

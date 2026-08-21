import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright

BASE='http://127.0.0.1:4177/'
OUT=Path('/Users/IDC2.5/clawd/oakwood-compilation-hub-work/idc-plans-for-oakwood/qa')
OUT.mkdir(exist_ok=True)

async def run():
    results={}
    async with async_playwright() as p:
        browser=await p.chromium.launch(executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless=True)
        for label,viewport in [('desktop',{'width':1440,'height':1000}),('mobile',{'width':390,'height':844})]:
            page=await browser.new_page(viewport=viewport)
            errors=[]
            page.on('console',lambda msg: errors.append(f'console:{msg.type}:{msg.text}') if msg.type=='error' else None)
            page.on('pageerror',lambda exc: errors.append(f'pageerror:{exc}'))
            response=await page.goto(BASE,wait_until='networkidle')
            await page.screenshot(path=str(OUT/f'{label}-hero.png'),full_page=False)
            section_shots=[]
            for sid in ['benchmark','assets','lab','proof','roadmap','evidence']:
                await page.locator(f'#{sid}').scroll_into_view_if_needed()
                await page.wait_for_timeout(180)
                path=OUT/f'{label}-{sid}.png'
                await page.screenshot(path=str(path),full_page=False)
                section_shots.append(str(path))
            images=await page.locator('img').count()
            bad=await page.locator('img').evaluate_all("els => els.filter(e => !e.complete || e.naturalWidth===0).map(e=>e.src)")
            overflow=await page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
            headings=await page.locator('h1,h2,h3').count()
            links=await page.locator('a').count()
            buttons=await page.locator('button').count()
            await page.locator('#lab').scroll_into_view_if_needed()
            await page.locator('.edge-node').click()
            edge_active=await page.locator('.edge-node.active').count()
            await page.locator('.core-node').click()
            lab_active=await page.locator('.core-node.active').count()
            await page.locator('#proof').scroll_into_view_if_needed()
            before=await page.locator('.proof-ring strong').inner_text()
            slider=page.get_by_label('Shipped artifact')
            await slider.fill('5')
            after=await page.locator('.proof-ring strong').inner_text()
            cap=await page.locator('.cap-alert').count()
            results[label]={
                'status':response.status if response else None,'title':await page.title(),'console_errors':errors,
                'images':images,'bad_images':bad,'horizontal_overflow':overflow,'headings':headings,'links':links,'buttons':buttons,
                'lab_edge_interaction_active':edge_active,'lab_interaction_active':lab_active,'proof_score_before':before,'proof_score_after':after,'anti_gaming_cap_visible':cap,
                'screenshots':section_shots
            }
            await page.close()
        await browser.close()
    (OUT/'qa-results.json').write_text(json.dumps(results,indent=2))
    print(json.dumps(results,indent=2))

asyncio.run(run())

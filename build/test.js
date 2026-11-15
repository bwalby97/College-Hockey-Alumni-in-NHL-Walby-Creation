const puppeteer=require('puppeteer-core');
(async()=>{
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-gpu']});
const p=await b.newPage();await p.setViewport({width:1200,height:900});
const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.goto('file:///mnt/user-data/outputs/index.html');
await new Promise(r=>setTimeout(r,1500));
const tabs=['readme','alumni','impact','seasons','players','dev','now','prog','h2h'];
for(const t of tabs){
  await p.evaluate(t=>dash.setParams({tab:t}),t);
  await new Promise(r=>setTimeout(r,1200));
  const info=await p.evaluate(()=>{const vis=[...document.querySelectorAll('[data-draw]')].filter(e=>e.getClientRects().length);const empty=vis.filter(e=>!e.textContent.trim()&&!e.querySelector('svg,table,input,select,details,style,button')).map(e=>e.getAttribute('data-draw'));return {n:vis.length,empty,h1:document.querySelector('.cha-h').textContent,rows:document.querySelectorAll('table tr').length,svgs:document.querySelectorAll('svg').length}});
  console.log(t,JSON.stringify(info));
  await p.screenshot({path:'/tmp/shot_'+t+'.png'});
}
// interactions
await p.evaluate(()=>dash.setParams({tab:'players',pick:'Red Berenson|Michigan'}));
await new Promise(r=>setTimeout(r,1200));
console.log('pcard', await p.evaluate(()=>document.querySelector('[data-draw=pcB]').textContent.slice(0,200)));
await p.evaluate(()=>dash.setParams({tab:'h2h'}));await new Promise(r=>setTimeout(r,800));
console.log('h2h', await p.evaluate(()=>document.querySelector('[data-draw=leadH]').textContent));
await p.evaluate(()=>dash.setParams({tab:'alumni',decade:'1980s|1990s',position:'D'}));await new Promise(r=>setTimeout(r,800));
console.log('lead', await p.evaluate(()=>document.querySelector('[data-draw=leadA]').textContent));
console.log('hash', await p.evaluate(()=>location.hash));
console.log('ERRORS',JSON.stringify(errs));
await b.close();
})();

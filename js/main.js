(() => {
  const $ = selector => document.querySelector(selector);
  const root = $('#experience');
  const safe = (x,y,front) => {
    const house = x > 59 && x < 82 && y > 27 && y < 73;
    const pathHalf = 5 + Math.max(0,32-y) * .72;
    const path = y < 58 && Math.abs(x-50) < pathHalf;
    const route = y < 31 && x > 7 && x < 69;
    const center = front && y > 18 && y < 47 && x > 31 && x < 69;
    return !(house || path || route || center);
  };
  const seeded = (() => { let seed=271828; return () => ((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296); })();
  const clusters={back:[8,18,30,44,88,95],mid:[5,18,83,94],front:[4,16,83,94]};
  function buildFlowers(container, count, layer) {
    const fragment=document.createDocumentFragment(); let made=0, attempts=0;
    while(made<count && attempts++<count*40){
      const front=layer==='front', centers=clusters[layer];
      const center=centers[Math.floor(seeded()*centers.length)];
      const x=Math.max(1,Math.min(99,center+(seeded()-.5)*(front?16:layer==='mid'?19:23)));
      const y=front ? -7+seeded()*27 : layer==='mid' ? 13+seeded()*25 : 37+seeded()*19;
      if(!safe(x,y,front)) continue;
      const flower=document.createElement('i'); flower.className='flower';
      const size=front?25+seeded()*26:layer==='mid'?14+seeded()*14:7+seeded()*9;
      flower.style.cssText=`--left:${x}%;--bottom:${y}%;--size:${size}px;--delay:${seeded()*1.8}s;--lean:${(seeded()-.5)*12}deg`;
      fragment.append(flower); made++;
    }
    container.replaceChildren(fragment);
  }
  function buildParticles(){const f=document.createDocumentFragment();for(let i=0;i<22;i++){const b=document.createElement('i');b.className='particle';b.style.cssText=`--x:${Math.random()*100}%;--s:${3+Math.random()*10}px;--d:${7+Math.random()*10}s;--delay:${-Math.random()*15}s;--drift:${Math.random()*70-35}px`;f.append(b)}$('#particles').append(f)}
  function burst(){const host=$('#magicParticles');host.replaceChildren();for(let i=0;i<30;i++){const p=document.createElement('i');p.className='magic-particle';p.textContent=i%4===0?'❧':i%3?'✦':'♥';const angle=Math.PI*2*i/30,distance=70+Math.random()*115;p.style.cssText=`--x:${Math.cos(angle)*distance}px;--y:${Math.sin(angle)*distance}px;--r:${Math.random()*360}deg;--s:${8+Math.random()*12}px;--c:${i%4===0?'#ffd83f':i%3===0?'#ff9c9c':'#ffe66b'}`;host.append(p)}}
  buildFlowers($('#flowersBack'),72,'back');buildFlowers($('#flowersMid'),56,'mid');buildFlowers($('#flowersFront'),46,'front');buildParticles();
  const animation=new NancyAnimation({root,intro:$('#intro'),start:$('#startButton'),bob:$('#bob'),copy:$('#storyCopy'),letter:$('#letterStage'),letterCard:$('.letter'),final:$('#final'),replay:$('#replayButton'),bouquet:$('#bouquetButton'),prompt:$('#bouquetPrompt'),continue:$('#continueButton'),particles:$('#magicParticles'),burst});
  $('#startButton').addEventListener('click',()=>animation.play()); $('#bouquetButton').addEventListener('click',()=>animation.openLetter()); $('#continueButton').addEventListener('click',()=>animation.continueStory()); $('#replayButton').addEventListener('click',()=>animation.reset());
  let tx=0,ty=0;root.addEventListener('pointermove',e=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches||$('#letterStage').classList.contains('show'))return;tx=(e.clientX/innerWidth-.5)*8;ty=(e.clientY/innerHeight-.5)*5;$('#horizonBack').style.transform=`translate(${tx}px,${ty}px)`;$('#pineapple').style.margin=`${ty*.3}px 0 0 ${tx*.5}px`},{passive:true});
})();

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
  function buildFlowers(container, count, front) {
    const fragment=document.createDocumentFragment(); let made=0, attempts=0;
    while(made<count && attempts++<count*30){
      const x=2+Math.random()*96, y=front ? -3+Math.random()*34 : 25+Math.random()*35;
      if(!safe(x,y,front)) continue;
      const flower=document.createElement('i'); flower.className='flower';
      flower.style.cssText=`--left:${x}%;--bottom:${y}%;--size:${front?17+Math.random()*17:8+Math.random()*11}px;--delay:${Math.random()*1.8}s`;
      fragment.append(flower); made++;
    }
    container.replaceChildren(fragment);
  }
  function buildParticles(){const f=document.createDocumentFragment();for(let i=0;i<22;i++){const b=document.createElement('i');b.className='particle';b.style.cssText=`--x:${Math.random()*100}%;--s:${3+Math.random()*10}px;--d:${7+Math.random()*10}s;--delay:${-Math.random()*15}s;--drift:${Math.random()*70-35}px`;f.append(b)}$('#particles').append(f)}
  function burst(){const host=$('#magicParticles');host.replaceChildren();for(let i=0;i<30;i++){const p=document.createElement('i');p.className='magic-particle';p.textContent=i%4===0?'❧':i%3?'✦':'♥';const angle=Math.PI*2*i/30,distance=70+Math.random()*115;p.style.cssText=`--x:${Math.cos(angle)*distance}px;--y:${Math.sin(angle)*distance}px;--r:${Math.random()*360}deg;--s:${8+Math.random()*12}px;--c:${i%4===0?'#ffd83f':i%3===0?'#ff9c9c':'#ffe66b'}`;host.append(p)}}
  buildFlowers($('#flowersBack'),58,false);buildFlowers($('#flowersFront'),52,true);buildParticles();
  const animation=new NancyAnimation({root,intro:$('#intro'),start:$('#startButton'),bob:$('#bob'),copy:$('#storyCopy'),letter:$('#letterStage'),letterCard:$('.letter'),final:$('#final'),replay:$('#replayButton'),bouquet:$('#bouquetButton'),prompt:$('#bouquetPrompt'),continue:$('#continueButton'),particles:$('#magicParticles'),burst});
  $('#startButton').addEventListener('click',()=>animation.play()); $('#bouquetButton').addEventListener('click',()=>animation.openLetter()); $('#continueButton').addEventListener('click',()=>animation.continueStory()); $('#replayButton').addEventListener('click',()=>animation.reset());
  let tx=0,ty=0;root.addEventListener('pointermove',e=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches||$('#letterStage').classList.contains('show'))return;tx=(e.clientX/innerWidth-.5)*8;ty=(e.clientY/innerHeight-.5)*5;$('#horizonBack').style.transform=`translate(${tx}px,${ty}px)`;$('#pineapple').style.margin=`${ty*.3}px 0 0 ${tx*.5}px`},{passive:true});
})();

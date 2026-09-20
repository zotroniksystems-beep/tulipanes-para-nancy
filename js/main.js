(() => {
  const $ = selector => document.querySelector(selector);
  const root = $('#experience');

  function buildFlowers(container, count, front) {
    const fragment = document.createDocumentFragment();
    for (let i=0;i<count;i++) {
      const flower=document.createElement('i'); flower.className='flower';
      const side=i%2===0 ? (i/(count-1))*37 : 63+(i/(count-1))*37;
      flower.style.cssText=`--left:${side + (Math.random()*7-3.5)}%;--bottom:${front ? Math.random()*22-3 : Math.random()*24+23}%;--size:${front ? 19+Math.random()*18 : 9+Math.random()*10}px;--delay:${Math.random()*1.8}s`;
      fragment.append(flower);
    }
    container.append(fragment);
  }
  function buildParticles() {
    const f=document.createDocumentFragment();
    for(let i=0;i<25;i++){const b=document.createElement('i');b.className='particle';b.style.cssText=`--x:${Math.random()*100}%;--s:${3+Math.random()*10}px;--d:${7+Math.random()*10}s;--delay:${-Math.random()*15}s;--drift:${Math.random()*70-35}px`;f.append(b)}
    $('#particles').append(f);
  }
  buildFlowers($('#flowersBack'),28,false); buildFlowers($('#flowersFront'),30,true); buildParticles();

  const animation = new NancyAnimation({root,intro:$('#intro'),start:$('#startButton'),bob:$('#bob'),copy:$('#storyCopy'),letter:$('#letterStage'),final:$('#final'),replay:$('#replayButton')});
  $('#startButton').addEventListener('click',()=>animation.play(),{passive:true});
  $('#replayButton').addEventListener('click',()=>animation.reset(),{passive:true});

  let tx=0,ty=0;
  root.addEventListener('pointermove',e=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;tx=(e.clientX/innerWidth-.5)*8;ty=(e.clientY/innerHeight-.5)*5;$('#horizonBack').style.transform=`translate(${tx}px,${ty}px)`;$('#pineapple').style.margin=`${ty*.3}px 0 0 ${tx*.5}px`},{passive:true});
})();

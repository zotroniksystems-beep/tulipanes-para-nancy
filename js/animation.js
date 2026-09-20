/* Central, dependency-free animation timeline for a GitHub Pages build. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const speed = reduced ? 0.46 : 1;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms * speed));

  window.NancyAnimation = class {
    constructor(nodes) { this.n = nodes; this.runId = 0; this.waitingForBouquet = false; }
    async caption(text, duration = 1700) {
      const id = this.runId;
      this.n.copy.innerHTML = text; this.n.copy.classList.add('show');
      await wait(duration); if (id !== this.runId) return false;
      this.n.copy.classList.remove('show'); await wait(500); return id === this.runId;
    }
    async play() {
      const id = ++this.runId; this.waitingForBouquet = false;
      this.n.intro.classList.add('is-hidden'); await wait(650);
      this.n.bob.className = 'bob-wrap walking';
      if (!await this.caption('Un pequeño camino...', 1500)) return;
      await wait(450); if (!await this.caption('Para alguien muy especial... <span>♥</span>', 1650)) return;
      await wait(450); if (!await this.caption('Porque las flores amarillas<br>también pueden ser tulipanes <span>♥</span>', 2200)) return;
      await wait(750); if (id !== this.runId) return;
      this.n.bob.className = 'bob-wrap arrived'; await wait(650);
      this.n.bob.animate([{transform:'translateX(-50%) rotate(0)'},{transform:'translateX(-50%) rotate(-3deg)'},{transform:'translateX(-50%) rotate(0)'}],{duration:850,easing:'ease-in-out'});
      await wait(900); this.n.bob.classList.add('delivering');
      if (!await this.caption('Este ramo es para ti... <span>♥</span>', 1900)) return;
      await wait(1300); if (id !== this.runId) return;
      this.n.bob.classList.add('interactive'); this.n.prompt.classList.add('show'); this.n.prompt.setAttribute('aria-hidden','false');
      this.n.bouquet.disabled = false; this.waitingForBouquet = true; this.n.bouquet.focus({preventScroll:true});
    }
    async openLetter() {
      if (!this.waitingForBouquet) return;
      this.waitingForBouquet = false; const id = this.runId; this.n.bouquet.disabled = true;
      this.n.bob.classList.remove('interactive'); this.n.bob.classList.add('bouquet-tapped');
      this.n.prompt.classList.remove('show'); this.n.prompt.setAttribute('aria-hidden','true'); this.n.burst();
      await wait(420); if (id !== this.runId) return;
      this.n.letter.setAttribute('aria-hidden','false'); this.n.letter.classList.add('show');
      await wait(850); if (id === this.runId) this.n.letterCard.focus({preventScroll:true});
    }
    async continueStory() {
      const id = this.runId; this.n.continue.disabled = true;
      this.n.letter.classList.remove('show'); this.n.letter.setAttribute('aria-hidden','true'); await wait(900);
      if (id !== this.runId) return; this.n.root.classList.add('is-sunset');
      this.n.bob.className = 'bob-wrap arrived final-pose'; this.n.bob.removeAttribute('style');
      await wait(1500); if (id !== this.runId) return;
      this.n.final.setAttribute('aria-hidden','false'); this.n.final.classList.add('show'); await wait(1000);
      if (id !== this.runId) return; this.n.final.classList.add('ready'); this.n.replay.focus({preventScroll:true});
    }
    exit() {
      ++this.runId; this.waitingForBouquet = false;
      this.n.bouquet.disabled = true;
      this.n.final.classList.add('is-exiting');
      this.n.final.setAttribute('aria-hidden','true');
      this.n.root.classList.add('has-farewell');
      this.n.farewell.setAttribute('aria-hidden','false');
      requestAnimationFrame(() => this.n.farewell.classList.add('show'));
    }
    reset() {
      ++this.runId; this.waitingForBouquet = false;
      const {root,intro,bob,letter,final,replay,copy,start,prompt,bouquet,continue:next,particles,farewell} = this.n;
      final.classList.remove('show','ready','is-exiting'); final.setAttribute('aria-hidden','true');
      farewell.classList.remove('show'); farewell.setAttribute('aria-hidden','true');
      letter.classList.remove('show'); letter.setAttribute('aria-hidden','true'); next.disabled=false;
      prompt.classList.remove('show'); prompt.setAttribute('aria-hidden','true'); bouquet.disabled=true; particles.replaceChildren();
      copy.classList.remove('show'); copy.textContent=''; bob.className='bob-wrap'; bob.removeAttribute('style'); root.classList.remove('is-sunset','has-farewell');
      this.n.camera.removeAttribute('style'); this.n.pineapple.removeAttribute('style');
      setTimeout(()=>{intro.classList.remove('is-hidden');start.focus({preventScroll:true});},500*speed);
    }
  };
})();

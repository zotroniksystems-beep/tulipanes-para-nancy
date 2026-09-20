/* Central, dependency-free animation timeline for a GitHub Pages build. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const speed = reduced ? 0.46 : 1;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms * speed));

  window.NancyAnimation = class {
    constructor(nodes) { this.n = nodes; this.runId = 0; }
    async caption(text, duration = 1700) {
      const id = this.runId;
      this.n.copy.innerHTML = text;
      this.n.copy.classList.add('show');
      await wait(duration);
      if (id !== this.runId) return false;
      this.n.copy.classList.remove('show');
      await wait(500);
      return id === this.runId;
    }
    async play() {
      const id = ++this.runId;
      this.n.intro.classList.add('is-hidden');
      await wait(750);
      this.n.bob.className = 'bob-wrap walking';
      if (!await this.caption('Un pequeño camino...', 1600)) return;
      await wait(550);
      if (!await this.caption('Para alguien muy especial... <span>♥</span>', 1750)) return;
      await wait(550);
      if (!await this.caption('Porque las flores amarillas<br>también pueden ser tulipanes <span>♥</span>', 2400)) return;
      await wait(1000);
      if (id !== this.runId) return;
      this.n.bob.className = 'bob-wrap arrived';
      await wait(900);
      this.n.bob.animate([{transform:'translateX(-50%) rotate(0)'},{transform:'translateX(-50%) rotate(-3deg)'},{transform:'translateX(-50%) rotate(0)'}],{duration:850,easing:'ease-in-out'});
      await wait(1200);
      this.n.bob.classList.add('delivering');
      if (!await this.caption('Este ramo es para ti... <span>♥</span>', 2100)) return;
      await wait(2400);
      if (id !== this.runId) return;
      this.n.letter.setAttribute('aria-hidden','false');
      this.n.letter.classList.add('show');
      await wait(reduced ? 5200 : 9000);
      if (id !== this.runId) return;
      this.n.letter.classList.remove('show');
      this.n.letter.setAttribute('aria-hidden','true');
      await wait(1200);
      this.n.root.classList.add('is-sunset');
      this.n.bob.className = 'bob-wrap arrived';
      this.n.bob.style.transform = 'translateX(-50%) scale(.62)';
      await wait(2200);
      this.n.final.setAttribute('aria-hidden','false');
      this.n.final.classList.add('show');
      await wait(1800);
      this.n.replay.classList.add('ready');
      this.n.replay.focus({preventScroll:true});
    }
    reset() {
      ++this.runId;
      const {root,intro,bob,letter,final,replay,copy,start} = this.n;
      final.classList.remove('show'); final.setAttribute('aria-hidden','true');
      replay.classList.remove('ready'); letter.classList.remove('show'); letter.setAttribute('aria-hidden','true');
      copy.classList.remove('show'); copy.textContent=''; bob.className='bob-wrap'; bob.removeAttribute('style');
      root.classList.remove('is-sunset');
      setTimeout(()=>{ intro.classList.remove('is-hidden'); start.focus({preventScroll:true}); }, 650 * speed);
    }
  };
})();

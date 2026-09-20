/* Dependency-free scene timeline; every state is reversible without reloading. */
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionScale = reducedMotion ? 0.45 : 1;
  const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds * motionScale));

  window.NancyAnimation = class {
    constructor(nodes) {
      this.n = nodes;
      this.runId = 0;
      this.waitingForBouquet = false;
    }

    async caption(message, duration = 1700) {
      const id = this.runId;
      this.n.copy.innerHTML = message;
      this.n.copy.classList.add('show');
      await wait(duration);
      if (id !== this.runId) return false;
      this.n.copy.classList.remove('show');
      await wait(450);
      return id === this.runId;
    }

    async play() {
      const id = ++this.runId;
      this.waitingForBouquet = false;
      this.n.intro.classList.add('is-hidden');
      await wait(650);
      this.n.bob.className = 'character walking';
      if (!await this.caption('Un pequeño camino...', 1500)) return;
      if (!await this.caption('Con cada paso pienso en ti <span>♥</span>', 1750)) return;
      if (!await this.caption('Porque las flores amarillas<br>también pueden ser tulipanes <span>♥</span>', 2200)) return;
      await wait(700);
      if (id !== this.runId) return;
      this.n.bob.className = 'character arrived';
      await wait(850);
      if (id !== this.runId) return;
      this.n.bob.classList.add('delivering');
      if (!await this.caption('Este ramo es para ti... <span>♥</span>', 1900)) return;
      await wait(900);
      if (id !== this.runId) return;
      this.n.bob.classList.add('interactive');
      this.n.prompt.classList.add('show');
      this.n.prompt.setAttribute('aria-hidden', 'false');
      this.n.bouquet.disabled = false;
      this.waitingForBouquet = true;
      this.n.bouquet.focus({preventScroll: true});
    }

    async openLetter() {
      if (!this.waitingForBouquet) return;
      const id = this.runId;
      this.waitingForBouquet = false;
      this.n.bouquet.disabled = true;
      this.n.bob.classList.remove('interactive');
      this.n.bob.classList.add('bouquet-tapped');
      this.n.prompt.classList.remove('show');
      this.n.prompt.setAttribute('aria-hidden', 'true');
      this.n.burst();
      await wait(480);
      if (id !== this.runId) return;
      this.n.letter.classList.add('show');
      this.n.letter.setAttribute('aria-hidden', 'false');
      await wait(800);
      if (id === this.runId) this.n.letterCard.focus({preventScroll: true});
    }

    async continueStory() {
      const id = this.runId;
      this.n.continue.disabled = true;
      this.n.letter.classList.remove('show');
      this.n.letter.setAttribute('aria-hidden', 'true');
      await wait(900);
      if (id !== this.runId) return;
      this.n.root.classList.add('is-sunset');
      this.n.bob.className = 'character arrived final-pose';
      await wait(1800);
      if (id !== this.runId) return;
      this.n.final.classList.add('show');
      this.n.final.setAttribute('aria-hidden', 'false');
      await wait(700);
      if (id !== this.runId) return;
      this.n.final.classList.add('ready');
      this.n.replay.focus({preventScroll: true});
    }

    exit() {
      ++this.runId;
      this.waitingForBouquet = false;
      this.n.bouquet.disabled = true;
      this.n.final.classList.add('is-exiting');
      this.n.final.setAttribute('aria-hidden', 'true');
      this.n.root.classList.add('has-farewell');
      this.n.farewell.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => this.n.farewell.classList.add('show'));
    }

    reset() {
      ++this.runId;
      this.waitingForBouquet = false;
      const {root,intro,start,bob,copy,letter,final,farewell,prompt,bouquet,continue:next,particles} = this.n;
      final.classList.remove('show', 'ready', 'is-exiting');
      final.setAttribute('aria-hidden', 'true');
      farewell.classList.remove('show');
      farewell.setAttribute('aria-hidden', 'true');
      letter.classList.remove('show');
      letter.setAttribute('aria-hidden', 'true');
      prompt.classList.remove('show');
      prompt.setAttribute('aria-hidden', 'true');
      copy.classList.remove('show');
      copy.textContent = '';
      particles.replaceChildren();
      bouquet.disabled = true;
      next.disabled = false;
      bob.className = 'character';
      root.classList.remove('is-sunset', 'has-farewell');
      setTimeout(() => {
        intro.classList.remove('is-hidden');
        start.focus({preventScroll: true});
      }, 450 * motionScale);
    }
  };
})();

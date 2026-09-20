(() => {
  const $ = selector => document.querySelector(selector);
  const root = $('#experience');
  const bubbles = $('#bubbles');
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 20; i += 1) {
    const bubble = document.createElement('i');
    bubble.className = 'bubble';
    bubble.style.cssText = `--x:${(i * 37) % 97}%;--s:${4 + (i % 6) * 1.6}px;--d:${8 + (i % 7)}s;--delay:${-(i % 11)}s;--drift:${(i % 2 ? 1 : -1) * (12 + i)}px`;
    fragment.append(bubble);
  }
  bubbles.append(fragment);

  const burst = () => {
    const host = $('#magicParticles');
    host.replaceChildren();
    for (let i = 0; i < 28; i += 1) {
      const particle = document.createElement('i');
      const angle = Math.PI * 2 * i / 28;
      const distance = 75 + (i % 7) * 13;
      particle.className = 'spark';
      particle.textContent = i % 4 === 0 ? '♥' : '✦';
      particle.style.cssText = `--x:${Math.cos(angle) * distance}px;--y:${Math.sin(angle) * distance}px;--r:${i * 47}deg;--s:${9 + (i % 5) * 2}px;--c:${i % 4 === 0 ? '#ffaaa2' : '#ffe45c'}`;
      host.append(particle);
    }
  };

  const animation = new NancyAnimation({root,intro:$('#intro'),start:$('#startButton'),bob:$('#bob'),copy:$('#storyCopy'),letter:$('#letterStage'),letterCard:$('.letter'),final:$('#final'),replay:$('#replayButton'),exit:$('#exitButton'),farewell:$('#farewell'),bouquet:$('#bouquetButton'),prompt:$('#bouquetPrompt'),continue:$('#continueButton'),particles:$('#magicParticles'),burst});
  $('#startButton').addEventListener('click', () => animation.play());
  $('#bouquetButton').addEventListener('click', () => animation.openLetter());
  $('#continueButton').addEventListener('click', () => animation.continueStory());
  $('#replayButton').addEventListener('click', () => animation.reset());
  $('#exitButton').addEventListener('click', () => animation.exit());
})();

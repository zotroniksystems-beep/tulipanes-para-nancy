(() => {
  const $ = selector => document.querySelector(selector);
  const root = $('#experience');
  const bubbles = $('#bubbles');
  const foregroundLayout = [
    [2, 1, 48, -8], [10, 6, 40, 5], [18, 0, 55, -4], [28, 12, 37, 8],
    [37, 3, 51, -6], [48, 15, 35, 6], [57, 5, 46, -3], [66, 10, 39, 7],
    [75, 1, 53, -7], [84, 13, 36, 4], [91, 5, 44, -5], [96, 0, 50, 7],
    [6, 18, 34, 3], [14, 22, 31, -5], [23, 17, 38, 6], [33, 25, 29, -7],
    [43, 20, 36, 4], [54, 24, 30, -3], [64, 19, 37, 7], [74, 27, 28, -6],
    [83, 21, 34, 5], [90, 26, 29, -4], [98, 18, 38, 6]
  ];
  document.querySelectorAll('.foreground-field').forEach((garden, gardenIndex) => {
    const flowers = document.createDocumentFragment();
    foregroundLayout.forEach(([x, y, width, rotation], index) => {
      const tulip = document.createElement('i');
      tulip.className = 'garden-tulip';
      const mirroredX = gardenIndex ? 100 - x : x;
      const offset = gardenIndex ? ((index % 3) - 1) * 2 : 0;
      tulip.style.cssText = `--x:${mirroredX}%;--y:${y}%;--w:${width}px;--r:${rotation + offset}deg`;
      flowers.append(tulip);
    });
    garden.append(flowers);
  });

  const svgNamespace = 'http://www.w3.org/2000/svg';
  const populateSvgGarden = (field, amount, layer, offset = 0) => {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < amount; index += 1) {
      const tulip = document.createElementNS(svgNamespace, 'use');
      const side = index % 2;
      const lane = Math.floor(index / 2);
      const x = side ? 885 + ((lane * 47 + offset) % 290) : 8 + ((lane * 53 + offset) % 515);
      const y = layer === 'back' ? 438 + ((index * 17) % 34) : 505 + ((index * 23) % 82);
      const width = layer === 'back' ? 20 + (index % 7) : 40 + (index % 13);
      tulip.setAttribute('href', '#tulip');
      tulip.setAttribute('x', x);
      tulip.setAttribute('y', y);
      tulip.setAttribute('width', width);
      tulip.setAttribute('transform', `rotate(${(index % 9) - 4} ${x + width / 2} ${y + 95})`);
      fragment.append(tulip);
    }
    field.append(fragment);
  };
  const backField = document.querySelector('.field-back');
  const midFields = document.querySelectorAll('.field-mid');
  populateSvgGarden(backField, 48, 'back');
  populateSvgGarden(midFields[0], 16, 'mid', 11);
  populateSvgGarden(midFields[1], 16, 'mid', 29);

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

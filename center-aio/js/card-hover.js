/*======================================================================================
                                  MARK: CARD 3D TRANSFORM
======================================================================================*/
(() => {
  const selector = '.card';
  const maxRotation = 8;
  const lift = 6;
  const cards = document.querySelectorAll(selector);

  if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  cards.forEach((card) => {
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    card.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') return;

      card.style.transition = 'transform 120ms ease-out, box-shadow 120ms ease-out';
      card.style.willChange = 'transform';
    });

    card.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (frame) return;

      frame = requestAnimationFrame(() => {
        const bounds = card.getBoundingClientRect();
        const percentX = (pointerX - bounds.left) / bounds.width;
        const percentY = (pointerY - bounds.top) / bounds.height;
        const rotateY = (percentX - 0.5) * maxRotation * 2;
        const rotateX = (0.5 - percentY) * maxRotation * 2;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${lift}px)`;
        frame = 0;
      });
    });

    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      frame = 0;
      card.style.transition = 'transform 500ms cubic-bezier(.2, .8, .2, 1), box-shadow 500ms ease';
      card.style.transform = '';
      card.style.willChange = '';
    });
  });
})();
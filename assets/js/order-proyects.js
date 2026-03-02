document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.isotope-box');

    imagesLoaded(container, () => {
      const iso = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: 'masonry',
        percentPosition: true,
      });
      iso.arrange({ filter: '*' });

      document.querySelector('.isotope-toolbar').addEventListener('change', (e) => {
        if (e.target.matches('input[name="isotope-filter"]')) {
          let filterValue = e.target.getAttribute('data-type');
          iso.arrange({ filter: filterValue === '*' ? '*' : [`data-type=${filterValue}`] });
        }
      });
    });
  });
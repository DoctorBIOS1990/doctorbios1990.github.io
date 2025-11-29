const scrollUp = document.querySelector('.scrollup');


// Scroll button
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollUp.style.display = 'block'; // Mostrar
    } else {
        scrollUp.style.display = 'none'; // Ocultar
    }
});

scrollUp.addEventListener('click', () =>{
    window.location.href = "#";
});

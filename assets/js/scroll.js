const scrollUp = document.querySelector('.scrollup');

// Scroll button
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollUp.classList.add('show');
        return;
    } 
    scrollUp.classList.remove('show');   
});

scrollUp.addEventListener('click', () =>{
    window.location.href = "#";
});

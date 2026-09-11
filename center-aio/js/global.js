/*======================================================================================
                                  MARK: Spinner
======================================================================================*/
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('is-ready');
  document.body.classList.add('is-ready');

  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    const header = document.querySelector('.header');
    if (loader) {
      header.classList.add('show-display');
      loader.remove();
    };
  }, 250);
});

/*======================================================================================
                                  MARK: Scroll
======================================================================================*/
const scrollUp = document.querySelector('.scrollup');
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        return scrollUp.classList.add('show-scroll');
    } 
    scrollUp.classList.remove('show-scroll');   
});

/*======================================================================================
                                  MARK: SIDEBAR
======================================================================================*/
const sidebar = document.querySelector(".sideBar");
const menuOpen = document.querySelector(".icon-menu-open");
const menuClose = document.querySelector(".icon-menu-close");
const sideBarLinks = document.querySelectorAll(".sideBar a");
var sections = document.querySelectorAll("section");

// Open Menu Mobile
menuOpen.addEventListener("click", function () {
  sidebar.classList.add("active");
});

// Close Menu Mobile
menuClose.addEventListener("click", function () {
  sidebar.classList.remove("active");
});

sideBarLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    sidebar.classList.remove("active");
  });
});

// Close before click out the menu
[sections].forEach(collection => {
  collection.forEach(element => {
    element.addEventListener('click', () => sidebar.classList.remove("active"))
  })
});

// Remove Pipes the Trust Items
function trustBarDivider(){
  const dividers = document.querySelectorAll(".trust-inner .trust-divider");
  const width = window.innerWidth;
  if ( width < 979 ){
    dividers.forEach(function (divider) {
      divider.innerHTML = '';
    });
  }else{
    dividers.forEach(function (divider) {
      divider.innerHTML = '|';
    });
  }
}
 
/*======================================================================================
                                  MARK: OBSERVER
======================================================================================*/
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

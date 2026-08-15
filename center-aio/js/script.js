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

    // Adjust Elements
    trustBarDivider();
    checkWidthClient();
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

/*======================================================================================
                                  MARK: FAQ
======================================================================================*/
const questions = document.querySelectorAll(".questions button");

function activarQuestion(event) {
  const question = event.currentTarget;
  const controls = question.getAttribute("aria-controls");
  const resposta = document.getElementById(controls);

  resposta.classList.toggle("activa");
  const activa = resposta.classList.contains("activa");
  question.setAttribute("aria-expanded", activa);
}

function eventosQuestions(question) {
  question.addEventListener("click", activarQuestion);
}

questions.forEach(eventosQuestions);

/*======================================================================================
                                  MARK: Carrusel [T]  
                                  Testimonios 
======================================================================================*/
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const indicators = document.querySelectorAll('.carousel-indicator');
let currentIndex = 0;

function updateCarousel(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  const amountToMove = - index * slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(${amountToMove}px)`;

  indicators.forEach((ind, i) => {
    if (i === index) {
      ind.classList.add('active');
    } else {
      ind.classList.remove('active');
    }
  });

  currentIndex = index;
}

prevButton.addEventListener('click', () => {
  updateCarousel(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  updateCarousel(currentIndex + 1);
});

indicators.forEach((indicator, i) => {
  indicator.addEventListener('click', () => {
    updateCarousel(i);
  });
});

/*====================================================================================
                                  MARK: Carrusel [S]
                                  Exploracion Screenshots 
======================================================================================*/
const carousel = document.querySelector('.carousel-explora');
const trackExplora = document.querySelector('.carousel-track-explora');
const slidesExplora = Array.from(trackExplora.children);
const prevButtonExplora = document.querySelector('.carousel-button-explora.prevExplora');
const nextButtonExplora = document.querySelector('.carousel-button-explora.nextExplora');
const indicatorsContainer = document.querySelector('.carousel-indicators-explora');
let visibleSlides = 3;
const totalSlides = slidesExplora.length;
let currentIndexExplora = 1;
let dragDistance = 0; // Detectar movimiento real durante drag
let dragMoved = false; // Evitar click después de drag móvil

// Detectar width
checkWidthClient  = () => {
  const width = window.innerWidth;
  visibleSlides = width <= 800 ? 1 : 3;
}

// Crear Indicadores
function createIndicators() {
  indicatorsContainer.innerHTML = '';
  const indicatorsCount = totalSlides - visibleSlides + 1;
  for (let i = 0; i < indicatorsCount; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('carousel-indicator-explora');
    if (i === 0) indicator.classList.add('active');

    indicator.addEventListener('click', () => {
      updateCarouselExplora(i);
    });

    indicatorsContainer.appendChild(indicator);
  }
}

// Actualizar Indicadores
function updateIndicators(index) {
  const indicators = document.querySelectorAll('.carousel-indicator-explora');
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === index);
  });
}

// Actualizar Carrusel
function updateCarouselExplora(index) {
  const maxIndex = totalSlides - visibleSlides;

  // Carrusel cíclico
  if (index < 0) {
    index = maxIndex;
  } else if (index > maxIndex) {
    index = 0;
  }

  const slideWidth = slidesExplora[0].getBoundingClientRect().width + 10;
  const amountToMove = - index * slideWidth;
  trackExplora.style.transform = `translateX(${amountToMove}px)`;

  updateIndicators(index);
  currentIndexExplora = index;
}

// Boton Prev
prevButtonExplora.addEventListener('click', () => {
  checkWidthClient();
  trackExplora.style.transition = 'transform 0.5s ease-in-out';
  updateCarouselExplora(currentIndexExplora - 1);
});
 // Boton Next
nextButtonExplora.addEventListener('click', () => {
  checkWidthClient();
  trackExplora.style.transition = 'transform 0.5s ease-in-out';
  updateCarouselExplora(currentIndexExplora + 1);
});

/*======================================================================================
                                  MARK: DRAG 
                                  CARRUSEL
======================================================================================*/
// Flags

let isDragging = false;

let startX = 0;
let currentTranslate = 0;  // Valor actual de traslación
let prevTranslate = 0;     // Valor previo de traslación antes de drag
let animationID = 0;

// Convertir índice actual a la posición en píxeles de translateX
function indexToTranslate(index) {
  const slideWidth = slidesExplora[0].getBoundingClientRect().width + 10;
  return - index * slideWidth;
}

// Convertir translateX a índice aproximado
function translateToIndex(translate) {
  const slideWidth = slidesExplora[0].getBoundingClientRect().width + 10;
  return Math.round(-translate / slideWidth);
}

function animate() {
  trackExplora.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animate);
}

// Evento mousedown - inicio drag
trackExplora.addEventListener('mousedown', e => {
  isDragging = true;
  dragMoved = false;
  startX = e.pageX;
  dragDistance = 0; // Reiniciar distancia de drag
  prevTranslate = currentTranslate || indexToTranslate(currentIndexExplora);
  trackExplora.style.transition = 'none';
  animationID = requestAnimationFrame(animate);
  // Evitar selección de texto/imagen durante arrastre
  e.preventDefault();
});

// Evento mousemove - durante drag
trackExplora.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const deltaX = e.pageX - startX;
  dragDistance = Math.abs(deltaX); // Registrar distancia del movimiento
  if (dragDistance > 8) {
    dragMoved = true;
  }
  currentTranslate = prevTranslate + deltaX;
});

// Evento mouseup y mouseleave - final de drag
function finishDrag() {
  if (!isDragging) return;
  isDragging = false;
  cancelAnimationFrame(animationID);

  // Limitar currentTranslate para que no se pase de los límites
  const maxTranslate = indexToTranslate(0);
  const minTranslate = indexToTranslate(totalSlides - visibleSlides);

  if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;
  if (currentTranslate < minTranslate) currentTranslate = minTranslate;

  // Calcular índice basado en la posición final al soltar
  let newIndex = translateToIndex(currentTranslate);

  if (Math.abs(currentTranslate - prevTranslate) > 12) {
    dragMoved = true;
  }
  
  // Agregar transición suave después del drag
  trackExplora.style.transition = 'transform 0.5s ease-in-out';
  updateCarouselExplora(newIndex);
}

trackExplora.addEventListener('mouseup', finishDrag);
trackExplora.addEventListener('mouseleave', finishDrag);

// Soporte touch para Mobile
trackExplora.addEventListener('touchstart', e => {
  isDragging = true;
  dragMoved = false;
  startX = e.touches[0].pageX;
  dragDistance = 0; // Reiniciar distancia de drag
  prevTranslate = currentTranslate || indexToTranslate(currentIndexExplora);
  trackExplora.style.transition = 'none';
  animationID = requestAnimationFrame(animate);
});

trackExplora.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const deltaX = e.touches[0].pageX - startX;
  dragDistance = Math.abs(deltaX); // Registrar distancia del movimiento
  if (dragDistance > 8) {
    dragMoved = true;
  }
  currentTranslate = prevTranslate + deltaX;
});

trackExplora.addEventListener('touchend', finishDrag);
trackExplora.addEventListener('touchcancel', finishDrag);

/*======================================================================================
                                  MARK: CONTACT
======================================================================================*/
// Telegram
const submit_telegram = document.querySelector('.submit-telegram');

// Form objects
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

// labels
const name_label = document.getElementById('label_name');
const email_label = document.getElementById('label_email');
const message_label = document.getElementById('label_message');

// Send Message to Telegram
submit_telegram.addEventListener('click', () => {
    // Reset fields
    removeDanger(fullname); removeDanger(name_label);
    removeDanger(email); removeDanger(email_label);
    removeDanger(message); removeDanger(message_label);
    
    // Check write fields
    if (!checkInput(fullname, name_label)) { applyDangerInput(fullname); applyDangerLabel(name_label) };
    if (!checkEmail(email, email_label)) { applyDangerInput(email); applyDangerLabel(email_label) };
    if (!checkInput(message, message_label)) { applyDangerInput(message); applyDangerLabel(message_label) };

    // Sending message
    if (checkInput(fullname, name_label) && checkInput(message, message_label) && checkEmail(email, email_label)){
        let send_message =
        `🤝Hola amigo, te escribo desde el sitio oficial de Center AIO Pro.\n
        👤 Mi nombre es: [  ${fullname.value} ]\n
        📧 Mi correo es: [ ${email.value} ]\n\n` +
        "```" + message.value + "```";
        window.location.href = `tg://resolve?domain=doctorbios&text=${encodeURIComponent(send_message)}`;
    }
});

// Check fields
checkInput = (input, label) => {
    if (input.value === ''){
        label.innerText = 'Campo requerido.';
        return; 
    }
    return true; 
}

// Check email
checkEmail = (email, label) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[^,s@]+.[a-zA-Z]{2,}$/;

    if (email.value.trim() === ''){
        label.innerText = 'Campo requerido.';
        return;
    }
    if (!emailRegex.test(email.value)) {
        label.innerText = 'Correo incorrecto.';
        return;
    } 
    removeDanger(email);
    removeDanger(label);
    return true;
}

// Remove all danger borders
fullname.addEventListener('input', () => {
    name_label.innerText = 'Nombre';
    removeDanger(fullname);
    removeDanger(name_label);
});
email.addEventListener('input', () => {
    email_label.innerText = 'Email';
    removeDanger(email);
    removeDanger(email_label);
});
message.addEventListener('input', () => {
    message_label.innerText = 'Mensaje';
    removeDanger(message);
    removeDanger(message_label);
});

// Reset color
removeDanger = (object) => {
  object.classList.remove('dangerInput');
  object.classList.remove('dangerLabel');
};

// Apply Danger input
applyDangerInput = (input) => input.classList.add('dangerInput');

// Apply Danger laberls
applyDangerLabel = (label) => label.classList.add('dangerLabel');

/*======================================================================================
                                  MARK: MODAL
======================================================================================*/
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

// Función para mostrar la imagen en modal
function showImageModal(imgElement) {
  const src = imgElement.getAttribute('src');
  const alt = imgElement.getAttribute('alt');
  const title = document.getElementById('title');

  if (!src || src === '#') {
    modalImg.alt = "No hay imagen para mostrar";
    modalImg.src = "";
  } else {
    modalImg.src = src;
    modalImg.alt = alt || "Imagen ampliada";
    title.innerHTML = `🤖 <strong>Explicación: </strong>${alt}</p>`;
  }

  modal.classList.remove('hidden');
}

// Evento para cerrar modal con el botón "X"
modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Cerrar modal si se hace clic fuera del contenido
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// Evento doble click a cada imagen para abrir modal
slidesExplora.forEach(slide => {
  const img = slide.querySelector('img');
  slide.addEventListener('click', (event) => {
    if (dragMoved || dragDistance > 8) {
      event.preventDefault();
      event.stopPropagation();
      dragMoved = false;
      dragDistance = 0;
      return;
    }

    showImageModal(img);
    dragMoved = false;
    dragDistance = 0;
  });
});

/*======================================================================================
                                  MARK: RUNNING
======================================================================================*/
createIndicators();
updateCarouselExplora(0);
checkWidthClient();
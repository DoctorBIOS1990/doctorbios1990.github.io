/*======================================================================================
                                  MARK: Documentation
======================================================================================*/
const caps = document.querySelectorAll(".documentation button");

function activarCap(event) {
  const cap = event.currentTarget;
  const controls = cap.getAttribute("aria-controls");
  const resposta = document.getElementById(controls);

  resposta.classList.toggle("activa");
  const activa = resposta.classList.contains("activa");
  cap.setAttribute("aria-expanded", activa);
}

function eventosCaps(cap) {
  cap.addEventListener("click", activarCap);
}

caps.forEach(eventosCaps);
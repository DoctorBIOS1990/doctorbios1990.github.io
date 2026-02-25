//according to loftblog tut
$(".main-menu li:first").addClass("active");

const showSection = (section, isAnimate) => {
  var direction = section.replace(/#/, ""),
    reqSection = $(".section").filter(
      '[data-section="' + direction + '"]'
    ),
    reqSectionPos = reqSection.offset().top - 0;

  if (isAnimate) {
    $("body, html").animate(
      {
        scrollTop: reqSectionPos
      },
      800
    );
  } else {
    $("body, html").scrollTop(reqSectionPos);
  }
};

const checkSection = () => {
  $(".section").each(function() {
    var $this = $(this),
      topEdge = $this.offset().top - 80,
      bottomEdge = topEdge + $this.height(),
      wScroll = $(window).scrollTop();
    if (topEdge < wScroll && bottomEdge > wScroll) {
      var currentId = $this.data("section"),
        reqLink = $("a").filter("[href*=\\#" + currentId + "]");
      reqLink
        .closest("li")
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  });
};

$(".main-menu").on("click", "a", function(e) {
  e.preventDefault();
  showSection($(this).attr("href"), true);
});

$(window).scroll(function() {
  checkSection();
});


// Typewriter
const words = ["Backend Developer.","Web Developer.", "App Developer."];
const text = document.querySelector('.skills-services');

i = 0, j = 0, del = false;

function type(){
    text.textContent = words[i].slice(0, del ? --j : ++j) + ' | ';

    if (!del && j == words[i].length){
        return setTimeout(()=> del = true, 300, type());
    }
    if (del && j == 0){
        del = false, i = (i + 1) % words.length;
    }
    setTimeout(type, 80);
}
type();

// Redirect Social Links
const telegram = document.getElementById('telegram');
const linkedin = document.getElementById('linkedin');
const github = document.getElementById('github');
const mail = document.getElementById('mail');

const links = [
  [telegram, 'https://t.me/doctorbios'],
  [linkedin, 'https://www.linkedin.com/in/jorge-benito-ug%C3%A1s'],
  [github, 'https://github.com/doctorbios1990'],
  [mail, 'mailto:jorgebenitougas@gmail.com'],
];

links.forEach(([element, url]) => {
  if (element) {
    element.addEventListener('click', () => {
      window.open(url, '_blank');
    });
  }
});


// Form objects
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const submit_telegram = document.getElementById('form-submit');

// labels
const name_label = document.getElementById('label_name');
const email_label = document.getElementById('label_email');
const message_label = document.getElementById('label_message');

// Send Message to Telegram
submit_telegram.addEventListener('click', () =>{

    // Reset fields
    let danger = 'border:red 2px solid';
    fullname.removeAttribute('style', danger);
    email.removeAttribute('style', danger);
    message.removeAttribute('style', danger);
    
    // Check write fields
    if (!checkInput(fullname, name_label) ) fullname.setAttribute('style', danger);
    if (!checkEmail(email, email_label) ) email.setAttribute('style', danger);
    if (!checkInput(message, message_label) ) message.setAttribute('style', danger);

    // Sending message
    if (checkInput(fullname, name_label) && checkInput(message, message_label) && checkEmail(email, email_label)){
        let send_message = `😄Hola Jorge, te escribo desde tu portafolio web.\n
        👤 Mi nombre es: [  ${fullname.value} ]\n
        📧 Mi correo es: [ ${email.value} ]\n
        ✉️ Mi message es: [ ${message.value} ]`;
        window.location.href = `tg://resolve?domain=doctorbios&text=${encodeURIComponent(send_message)}`;
    }
});

// Check fields
checkInput = (input, label) => {
    if (input.value === ''){
        label.innerText = 'Se deben completar este campo.';
        return ; 
    }
    label.innerText = '';
    return true; 
}

// Check email
checkEmail = (email, label) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[^,s@]+.[a-zA-Z]{2,}$/;

    if (email.value.trim() === ''){
        label.innerText = 'Se deben completar este campo.';
        return ;
    }

    if (!emailRegex.test(email.value)) {
        label.innerText = 'Su correo no es valido.';
        return ;
    } 
    resetColor(email);
    return true;
}

// Remove all danger borders 
fullname.addEventListener('input', () => {
    name_label.innerText = '';
    resetColor(this);
});
email.addEventListener('input', () => {
    email_label.innerText = '';
    resetColor(this);
});
message.addEventListener('input', () => {
    message_label.innerText = '';
    resetColor(this);
});

// Reset color
resetColor = (object) => {
    object.removeAttribute('style', 'border:red 2px solid');
};


//CV Dropdwon
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownContent = document.getElementById('dropdownContent');

// Mostrar u ocultar el dropdown
dropdownBtn.addEventListener('click', () => {
  dropdownContent.classList.toggle('show');
});

// Cerrar dropdown si se hace clic fuera
window.addEventListener('click', e => {
  if (!e.target.matches('.dropdown-button')) {
    dropdownContent.classList.remove('show');
  }
});
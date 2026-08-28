/*======================================================================================================
                                        According to loftblog tut
======================================================================================================*/
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
 
/*======================================================================================================
                                            MARK: Typewriter
======================================================================================================*/
const words = ["🚀FullStack Developer.", "🎯Product Builder.", "🌐Web Design.", "💻Desktop Developer."];
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

/*======================================================================================================
                                            MARK: Social Links
======================================================================================================*/
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

/*======================================================================================================
                                            MARK: Telegram
======================================================================================================*/
const submit_telegram = document.getElementById('form-submit');

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
        `🤝Hola Jorge, te escribo desde tu portafolio en la web.\n
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
    name_label.innerText = 'Nombre [ * ]';
    removeDanger(fullname);
    removeDanger(name_label);
});
email.addEventListener('input', () => {
    email_label.innerText = 'Email [ * ]';
    removeDanger(email);
    removeDanger(email_label);
});
message.addEventListener('input', () => {
    message_label.innerText = 'Mensaje [ * ]';
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


/*======================================================================================================
                                            MARK: CV Dropdown
======================================================================================================*/
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
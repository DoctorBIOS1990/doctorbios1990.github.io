//according to loftblog tut
$(".main-menu li:first").addClass("active");

var showSection = function showSection(section, isAnimate) {
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

var checkSection = function checkSection() {
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
    text.textContent = words[i].slice(0, del ? --j : ++j);

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
      //window.location.href = url;
      window.open(url, '_blank');
    });
  }
});
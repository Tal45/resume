var txt = `
Hi, my name is Tal Levi!
I am a second-year student pursuing a B.Sc. in Computer Science.
Throughout my academic journey, I have excelled in challenging programming courses,
gaining proficiency in programming languages and navigating Linux operating systems.
I am deeply motivated and enthusiastic about exploring and mastering new technologies
in the pursuit of expanding my skill set and embracing new challenges.`;
var speed = 45;
var i = 0;
var typingTimeout;


function typeWriter() {
  if (i < txt.length) {
    if (txt.charAt(i) === '\n') {
      document.getElementById("home_tw").innerHTML += "<br>";
    } else {
      document.getElementById("home_tw").innerHTML += txt.charAt(i);
    }
    i++;
    typingTimeout = setTimeout(typeWriter, speed); 
  } 
}

function restartTypewriter() {
  clearTimeout(typingTimeout);
  i = 0; 
  document.getElementById("home_tw").innerHTML = "";
  typeWriter(); 
}

window.addEventListener('load', () => {
  typeWriter();
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const headerHeight = document.getElementById('header').offsetHeight;
  const sectionTop = section.offsetTop - headerHeight; 
  window.scrollTo({
      top: sectionTop,
      behavior: 'smooth', 
  });
}

// Update button event listeners
document.getElementById('home_btn').addEventListener('click', () => {
  restartTypewriter();
  scrollToSection('home_page_main');
});

document.getElementById('about_btn').addEventListener('click', () => {
  scrollToSection('about_page_main');
});

document.getElementById('project_btn').addEventListener('click', () => {
  scrollToSection('projects_page_main');
});

document.getElementById('contact_btn').addEventListener('click', () => {
  scrollToSection('contact_page_main');
});



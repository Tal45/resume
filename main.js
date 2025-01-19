function typeWriter() {
  const home_tw = document.getElementById("home_tw");
  const txt = home_tw.getAttribute("data-text");
  const cursor = document.getElementById("cursor");
  const speed_max = 70;
  const speed_min = 40;
  let i = 0;

  function type() {
    if (i < txt.length) {
      if (txt.charAt(i) === '\n') {
        home_tw.innerHTML = home_tw.innerHTML.replace('<span id="cursor">|</span>', '') + "<br><span id='cursor'>|</span>";
      } else {
        home_tw.innerHTML = home_tw.innerHTML.replace('<span id="cursor">|</span>', '') + txt.charAt(i) + "<span id='cursor'>|</span>";
      }

      i++;
      let random_speed = Math.floor(Math.random() * (speed_max - speed_min)) + speed_min;
      if (txt.charAt(i - 1) === '.') {
        random_speed += 10;
      }
      setTimeout(type, random_speed);
    } else {
      cursor.style.animation = "blink 0.7s step-end infinite";
    }
  }
  type();
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const header_height = document.getElementById('header').offsetHeight;
  const section_top = section.offsetTop - header_height; 
  window.scrollTo({
    top: section_top,
    behavior: 'smooth', 
  });
}

function toggleMenu() {
  const navList = document.getElementById('nav-list');
  navList.classList.toggle('show');
}

window.addEventListener('load', () => {
  typeWriter();

  document.getElementById('menu-toggle').addEventListener('click', toggleMenu);

  document.getElementById('home_btn').addEventListener('click', () => {
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
});
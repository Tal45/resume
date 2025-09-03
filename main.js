document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle function
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || defaultTheme;
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.setAttribute("aria-label", newTheme === "dark" ? "Switch to light mode" : "Switch to dark mode");

}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("theme-toggle")
  if (!themeToggle) return

  if (theme === "dark") {
    themeToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `
  } else {
    themeToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `
  }
}

// Initialize theme from localStorage or system preference
function initializeTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", initial);
  updateThemeIcon(initial);
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.setAttribute("aria-label", initial === "dark" ? "Switch to light mode" : "Switch to dark mode");
}


function typeWriter() {
  const home_tw = document.getElementById("home_tw")
  const txt = home_tw.getAttribute("data-text")
  const speed_max = 70
  const speed_min = 40
  let i = 0

  // Create a separate container for the text without the cursor
  const textContainer = document.createElement("span")
  textContainer.className = "text-content"

  // Set up the initial HTML with empty text content and the cursor
  home_tw.innerHTML = ""
  home_tw.appendChild(textContainer)

  // Create the cursor element
  const cursor = document.createElement("span")
  cursor.id = "cursor"
  home_tw.appendChild(cursor)

  function type() {
    if (i < txt.length) {
      if (txt.charAt(i) === "\n") {
        textContainer.innerHTML += "<br>"
      } else {
        textContainer.innerHTML += txt.charAt(i)
      }

      i++
      let random_speed = Math.floor(Math.random() * (speed_max - speed_min)) + speed_min
      if (txt.charAt(i - 1) === ".") {
        random_speed += 200 // Longer pause after periods
      }
      setTimeout(type, random_speed)
    } else {
      // Typing is complete, ensure cursor keeps blinking
      cursor.style.animation = "blink 0.7s step-end infinite"
    }
  }
  type()
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  const header_height = document.getElementById("header").offsetHeight
  const section_top = section.offsetTop - header_height
  window.scrollTo({
    top: section_top,
    behavior: "smooth",
  })
}

function toggleMenu() {
  const navList = document.getElementById("nav-list")
  navList.classList.toggle("show")
}

// Add active class to navigation based on scroll position
function updateActiveNavigation() {
  const sections = document.querySelectorAll(".section")
  const navButtons = {
    home_page_main: document.getElementById("home_btn"),
    about_page_main: document.getElementById("about_btn"),
    projects_page_main: document.getElementById("project_btn"),
    contact_page_main: document.getElementById("contact_btn"),
  }

  const scrollPosition = window.scrollY + window.innerHeight / 3

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionBottom = sectionTop + section.offsetHeight
    const sectionId = section.id

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      // Remove active class from all buttons
      Object.values(navButtons).forEach((button) => {
        if (button) button.classList.remove("active")
      })

      // Add active class to current section's button
      if (navButtons[sectionId]) {
        navButtons[sectionId].classList.add("active")
      }
    }
  })
}

// Add smooth scrolling for all anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      if (targetId) {
        scrollToSection(targetId)
      }
    })
  })
}

// Initialize on window load
window.addEventListener("load", () => {
  typeWriter()

  document.getElementById("menu-toggle").addEventListener("click", toggleMenu)

  document.getElementById("home_btn").addEventListener("click", () => {
    scrollToSection("home_page_main")
  })

  document.getElementById("about_btn").addEventListener("click", () => {
    scrollToSection("about_page_main")
  })

  document.getElementById("project_btn").addEventListener("click", () => {
    scrollToSection("projects_page_main")
  })

  document.getElementById("contact_btn").addEventListener("click", () => {
    scrollToSection("contact_page_main")
  })

  // Initialize theme
  initializeTheme()

  // Add event listener to theme toggle button
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  // Close mobile menu when a link is clicked
  document.querySelectorAll("#nav-list button, #nav-list a").forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        toggleMenu()
      }
    })
  })

  // Setup scroll event for active navigation
  window.addEventListener("scroll", updateActiveNavigation)
  updateActiveNavigation() // Initial call

  // Setup smooth scrolling
  setupSmoothScrolling()
})

// Add resize event listener to handle menu visibility
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    const navList = document.getElementById("nav-list")
    if (navList.classList.contains("show")) {
      navList.classList.remove("show")
    }
  }
})

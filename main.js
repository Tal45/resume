var txt = `
Hi, my name is Tal Levi!
I am a second-year student pursuing a B.Sc. in Computer Science.
Throughout my academic journey, I have excelled in challenging programming courses,
gaining proficiency in programming languages and navigating Linux operating systems.
I am deeply motivated and enthusiastic about exploring and mastering new technologies
in the pursuit of expanding my skill set and embracing new challenges.`;

var speed = 45;
var i; // Declare `i` globally
var typingTimeout; // Store the timeout reference
var isTyping = false; // Flag to control the typing effect

function typeWriter() {
  if (!isTyping) return; // Stop typing if the flag is false
  if (i < txt.length) {
    if (txt.charAt(i) === '\n') {
      document.getElementById("home_p").innerHTML += "<br>";
    } else {
      document.getElementById("home_p").innerHTML += txt.charAt(i);
    }
    i++;
    typingTimeout = setTimeout(typeWriter, speed);
  } else {
    isTyping = false; // Typing completed
  }
}

function loadContent(page) {
  const content = document.getElementById("content");
  const page_directory = `pages/${page}.html`;

  isTyping = false;
  clearTimeout(typingTimeout);

  switch (page) {
    case "home":
      content.innerHTML = "<p id=\"home_p\"></p>";
      i = 0; 
      isTyping = true; 
      typeWriter();
      break;

    case "about":
      content.innerHTML = `
      <h2>Education:</h2>
          <p>
              <b>B.Sc. in Computer Science | The Open University | 2022 - Present</b>
          </p>
          <p>
              <b>Practical Engineer in Electronic and Computer Engineering | Kinneret Academic College | 2015 - 2017<br></b>
              GPA: 91
          </p>
          <hr>
          <h2>Experience:</h2>
          <p>
              <b>Project Management Intern | Israel Electric Corporation | November 2024 - Present</b>
              <ul>
              <li>Assist in planning, coordinating, and monitoring computer and cybersecurity projects to ensure timely delivery and adherence to project goals.</li>
              <li>Collaborate with cross-functional teams to streamline workflows and maintain project documentation.</li>
              <li>Utilize project management tools to track progress, identify bottlenecks, and support successful project execution.</li>
              </ul>
          </p>

          <p>
              <b>PCB Quality Programmer | B.Y. Medimor LTD | October 2020 - November 2024</b>
              <ul>
              <li>Proficient in SMT manufacturing processes, executing regular departmental quality tests and ensuring compliance with manufacturing standards and customer requirements.</li>
              <li>Creation of automated PCB test programs for AOI / SPI / X-Ray machines for quality assurance.</li>
              </ul>
          </p>
          <hr>
          <h2>Skills:</h2>
          <p>
          <b>Programming Languages:</b> Python, C, Java, Assembly.<br>
          <b>Database Management:</b> MySQL.<br>
          <b>Technologies and Frameworks:</b> Git, GitHub, Linux, NumPy.<br>
          <b>Methods:</b> OOP, Debugging, SOLID Principles, Design Patterns.

          <hr>
          <h2>Military Service:</h2>
          <p>
          Served as a Team Leader and UAV Technician in 166 Squardon, Israeli Air Force | 2017 - 2020
          </p>
          <hr>
          <p id="rec_n_cert"><b>** Recommendations and Certifications will be presented upon request **</b></p>
          </p>
      `;
      break;

    case "projects":
      content.innerHTML = `
          <h2>My Projects:</h2>
          <ul>
              <li><a href="">My Portfolio Website</a></li>
              <li><a href="https://github.com/Tal45/Assembler-C-Project">Two Pass Assembler - C Project</a></li>
          </ul>
      `;
      break;

    case "contact":
      content.innerHTML = `
          <h2>Contact Me</h2>
          <p>You can reach me via email at: <a href="mailto:tal4456@gmail.com">tal4456@gmail.com</a></p>
          <p>Or connect with me on LinkedIn: <a href="https://linkedin.com/in/tal-levi" target="_blank">LinkedIn Profile</a></p>
          <form id="contact-form" method="POST" action="sendmail.php">
  <div class="form-row form-error" style="display:none;"></div>
  <div class="form-row">
    <label for="contact-form-name">Name:</label>
    <input id="contact-form-name" class="form-input" type="text" name="name" required>
  </div>
  <div class="form-row">
    <label for="contact-form-email">Email:</label>
    <input id="contact-form-email" class="form-input" type="email" name="email" required>
  </div>
  <div class="form-row">
    <label for="contact-form-phone">Phone:</label>
    <input id="contact-form-phone" class="form-input" type="tel" name="phone">
  </div>
  <div class="form-row">
    <label for="contact-form-message">Message:</label>
    <textarea id="contact-form-message" class="form-input" name="message" required></textarea>
  </div>
  <button type="submit">Submit</button>
</form>
      `;
      break;

    default:
      content.innerHTML = `<p>Welcome to my online resume. Click the buttons above to learn more!</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadContent("home");
});


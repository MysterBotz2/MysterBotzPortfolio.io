/* main.js */

// Portfolio Data
const portfolioData = {
  name: "Mark Erald P. Boton",
  title: "Web Developer",
  about: "Passionate developer with experience in building web applications.",
  projects: [
    {
      name: "Project One",
      description: "A brief description of project one.",
      link: "#"
    },
    {
      name: "Project Two",
      description: "A brief description of project two.",
      link: "#"
    }
  ],
  contact: {
    email: "your.email@example.com",
    linkedin: "https://linkedin.com/in/yourprofile"
  }
};

// Helper to create elements
function createElement(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const key in attrs) {
    if (key === "class") el.className = attrs[key];
    else if (key === "href") el.setAttribute("href", attrs[key]);
    else el[key] = attrs[key];
  }
  children.forEach(child => {
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else if (child) el.appendChild(child);
  });
  return el;
}

// Render Portfolio
function renderPortfolio(data) {
  const container = createElement("div", { class: "portfolio-container" },
    createElement("header", {},
      createElement("h1", {}, data.name),
      createElement("h2", {}, data.title)
    ),
    createElement("section", { class: "about" },
      createElement("h3", {}, "About Me"),
      createElement("p", {}, data.about)
    ),
    createElement("section", { class: "projects" },
      createElement("h3", {}, "Projects"),
      ...data.projects.map(project =>
        createElement("div", { class: "project" },
          createElement("h4", {}, project.name),
          createElement("p", {}, project.description),
          createElement("a", { href: project.link, target: "_blank" }, "View Project")
        )
      )
    ),
    createElement("section", { class: "contact" },
      createElement("h3", {}, "Contact"),
      createElement("ul", {},
        createElement("li", {}, `Email: `, createElement("a", { href: `mailto:${data.contact.email}` }, data.contact.email)),
        createElement("li", {}, `LinkedIn: `, createElement("a", { href: data.contact.linkedin, target: "_blank" }, data.contact.linkedin))
      )
    )
  );
  document.body.appendChild(container);
}

// Basic Styles
const style = document.createElement("style");
style.textContent = `
  body { font-family: Arial, sans-serif; margin: 0; background: #f9f9f9; }
  .portfolio-container { max-width: 700px; margin: 40px auto; background: #fff; padding: 32px; border-radius: 8px; box-shadow: 0 2px 8px #0001; }
  header { text-align: center; }
  h1 { margin-bottom: 0; }
  h2 { margin-top: 8px; color: #666; font-weight: 400; }
  section { margin-top: 32px; }
  .project { margin-bottom: 20px; }
  .project h4 { margin: 0 0 4px 0; }
  .contact ul { list-style: none; padding: 0; }
  .contact li { margin-bottom: 8px; }
  a { color: #007acc; text-decoration: none; }
  a:hover { text-decoration: underline; }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener("DOMContentLoaded", () => renderPortfolio(portfolioData));
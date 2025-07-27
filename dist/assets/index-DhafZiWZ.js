(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function c(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=c(e);fetch(e.href,n)}})();const l={name:"Mark Erald P. Boton",title:"Web Developer",about:"Passionate developer with experience in building web applications.",projects:[{name:"Project One",description:"A brief description of project one.",link:"#"},{name:"Project Two",description:"A brief description of project two.",link:"#"}],contact:{email:"your.email@example.com",linkedin:"https://linkedin.com/in/yourprofile"}};function t(o,r={},...c){const i=document.createElement(o);for(const e in r)e==="class"?i.className=r[e]:e==="href"?i.setAttribute("href",r[e]):i[e]=r[e];return c.forEach(e=>{typeof e=="string"?i.appendChild(document.createTextNode(e)):e&&i.appendChild(e)}),i}function d(o){const r=t("div",{class:"portfolio-container"},t("header",{},t("h1",{},o.name),t("h2",{},o.title)),t("section",{class:"about"},t("h3",{},"About Me"),t("p",{},o.about)),t("section",{class:"projects"},t("h3",{},"Projects"),...o.projects.map(c=>t("div",{class:"project"},t("h4",{},c.name),t("p",{},c.description),t("a",{href:c.link,target:"_blank"},"View Project")))),t("section",{class:"contact"},t("h3",{},"Contact"),t("ul",{},t("li",{},"Email: ",t("a",{href:`mailto:${o.contact.email}`},o.contact.email)),t("li",{},"LinkedIn: ",t("a",{href:o.contact.linkedin,target:"_blank"},o.contact.linkedin)))));document.body.appendChild(r)}const s=document.createElement("style");s.textContent=`
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
`;document.head.appendChild(s);document.addEventListener("DOMContentLoaded",()=>d(l));

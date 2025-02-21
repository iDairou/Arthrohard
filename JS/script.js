import { API } from './API.js';
import setActiveNavItem from './activeSection.js';
const burgerIcon = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".overlay");



burgerIcon.addEventListener("click", () => {
	burgerIcon.classList.toggle("active");
	navMenu.classList.toggle("active");
	overlay.classList.toggle("active");

	const isExpanded = burgerIcon.getAttribute("aria-expanded") === "true";
	burgerIcon.setAttribute("aria-expanded", !isExpanded);
	burgerIcon.setAttribute(
		"aria-label",
		isExpanded ? "Otwórz menu" : "Zamknij menu"
	);
	console.log(navMenu);
	navMenu.setAttribute("aria-expanded", !isExpanded);
});


setActiveNavItem();


const api = new API();
api.loadData(); 


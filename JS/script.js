import { API } from './API.js';
import setActiveNavItem from './activeSection.js';
const burgerIcon = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu-mobile");
const overlay = document.querySelector(".overlay");
const navMenuItem = document.querySelectorAll(".nav-item");
const isExpanded = burgerIcon.getAttribute("aria-expanded") === "true";


// BURGER ICON HANDLER
burgerIcon.addEventListener("click", () => {
	burgerIcon.classList.toggle("active");
	navMenu.classList.toggle("active");
	overlay.classList.toggle("active");

	burgerIcon.setAttribute("aria-expanded", !isExpanded);
	burgerIcon.setAttribute(
		"aria-label",
		isExpanded ? "Otwórz menu" : "Zamknij menu"
	);
	navMenu.setAttribute("aria-expanded", !isExpanded);

	console.log(navMenuItem);
});

//MENU ITEM HANDLER
navMenuItem.forEach((item) => {
	item.addEventListener("click", () => {
		if (!isExpanded) {
			burgerIcon.classList.toggle("active");
			navMenu.classList.toggle("active");
			overlay.classList.toggle("active");
		}
	});
});
setActiveNavItem();
const api = new API();
api.loadData(); 


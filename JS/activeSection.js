const setActiveNavItem = () => {
	const sections = document.querySelectorAll("section");
	const navItems = document.querySelectorAll(".nav-menu ul li a");

	window.addEventListener("scroll", () => {
		let current = "";
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			if (scrollY >= sectionTop - 60) {
				current = section.getAttribute("id");
			}
		});

		navItems.forEach((item) => {
			item.classList.remove("active");
			if (item.getAttribute("href").slice(1) === current) {
				item.classList.add("active");
			}
		});
	});
};

export default setActiveNavItem
const setActiveNavItem = () => {
	const sections = document.querySelectorAll("section");
	const navItems = document.querySelectorAll(".nav-menu ul li a");

	window.addEventListener("scroll", () => {
		let current = "";

		sections.forEach((section) => {
			const sectionId = section.getAttribute("id");

			// IGNORUJEMY określone sekcje
			if (
				sectionId !== "how-works" &&
				sectionId !== "ingredients-mobile-section"
			) {
				const sectionTop = section.offsetTop;

				if (scrollY >= sectionTop - 0) {
					current = sectionId;
				}
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

export default setActiveNavItem;

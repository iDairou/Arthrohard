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
				console.log("Section:", sectionId, "Top:", sectionTop); // Debugging
				if (scrollY >= sectionTop - 0) {
					current = sectionId;
					console.log("Current section set to:", current); // Debugging
				}
			} else {
				console.log("Ignoring section:", sectionId); // Debugging
			}
		});

		navItems.forEach((item) => {
			item.classList.remove("active");
			if (item.getAttribute("href").slice(1) === current) {
				console.log("Adding active class to:", item.href); // Debugging
				item.classList.add("active");
			}
		});
	});
};

export default setActiveNavItem;
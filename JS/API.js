class API {
	constructor() {
		this.baseUrl = "https://brandstestowy.smallhost.pl/api/random";
		this.productsList = document.querySelector(".products-list");
		this.productCountSelect = document.getElementById("product-count");
		this.productCountSelect.addEventListener("change", () =>
			this.resetAndLoadData()
		);
		this.productsList.addEventListener(
			"click",
			this.handleProductClick.bind(this)
		);
		this.modalWrap = document.querySelector(".modal-wrap");
		this.modalContent = document.getElementById("modal-content");
		this.closeModalButton = document.getElementById("close-modal");
		this.closeModalButton.addEventListener("click", () => this.hideModal());
		this.modalWrap.addEventListener("click", (e) => {
			if (e.target === this.modalWrap) this.hideModal();
		});
		this.pageNumber = 1;
		this.isLoading = false;
		this.totalLoadedItems = 0;
		this.initScrollListener();
	}

	resetAndLoadData() {
		this.pageNumber = 1;
		this.totalLoadedItems = 0;
		this.productsList.innerHTML = "";
		this.loadData();
	}

	loadData() {
		if (this.isLoading) return;
		const maxItems = parseInt(this.productCountSelect.value);
		if (this.totalLoadedItems >= maxItems) return;

		this.isLoading = true;
		const itemsToLoad = Math.min(5, maxItems - this.totalLoadedItems);
		const options = { method: "GET" };
		console.log(itemsToLoad);
		return this._fetch(
			options,
			`?pageNumber=${this.pageNumber}&pageSize=${itemsToLoad}`
		).then(() => {
			this.isLoading = false;
			this.pageNumber++;
		});
	}

	_fetch(options, additionalPath = "") {
		const url = this.baseUrl + additionalPath;
		return fetch(url, options)
			.then((resp) => {
				if (resp.ok) return resp.json();
				return Promise.reject(resp);
			})
			.then((data) => {
				this.displayData(data);
				return data;
			})
			.catch((error) => {
				console.error("Błąd podczas pobierania danych:", error);
				this.isLoading = false;
			});
	}

	displayData(data) {
		const maxItems = parseInt(this.productCountSelect.value);
		data.data.forEach((item) => {
			if (this.totalLoadedItems < maxItems) {
				const productItem = document.createElement("div");
				productItem.className = "product-list-item";
				productItem.innerHTML = `<p>ID: ${item.id}</p>`;
				this.productsList.appendChild(productItem);
				this.totalLoadedItems++;
			}
		});
	}

	handleProductClick(event) {
		const clickedItem = event.target.closest(".product-list-item");
		if (clickedItem) {
			const id = clickedItem.querySelector("p").textContent.split(": ")[1];
			this.showModal(id);
		}
	}

	showModal(id) {
		if (this.modalContent) {
			this.modalContent.innerHTML = `
                <h2>ID: ${id}</h2>
                <p><strong>Nazwa:</strong></p>
                <p><strong>Wartość:</strong></p>
            `;
			this.modalWrap.classList.add("active");
		} else {
			console.error("Modal content element not found");
		}
	}

	hideModal() {
		this.modalWrap.classList.remove("active");
	}

	resetAndLoadData() {
		this.pageNumber = 1;
		this.totalLoadedItems = 0;
		this.productsList.innerHTML = "";
		this.loadData();
		this.initScrollListener();
	}

	initScrollListener = () => {
		window.addEventListener("scroll", () => {
			if (this.isBottomVisible()) {
				this.loadData();
			} else if (
				this.totalLoadedItems < parseInt(this.productCountSelect.value)
			) {
				// Jeśli są jeszcze produkty do załadowania, wywołaj loadData
				this.loadData();
			}
		});
	};

	initScrollListener() {
		window.addEventListener("scroll", () => {
			if (this.isBottomVisible()) {
				this.loadData();
			}
		});
	}

	isBottomVisible() {
		const rect = this.productsList.getBoundingClientRect();
		return (
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) &&
			!this.isLoading &&
			this.totalLoadedItems < parseInt(this.productCountSelect.value)
		);
	}
}

export { API };
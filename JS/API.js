class API {
    constructor() {
        this.baseUrl = "https://brandstestowy.smallhost.pl/api/random";
        this.productsList = document.querySelector('.products-list');
        this.productListItem = document.querySelector('.product-list-item')
        this.productCountSelect = document.getElementById('product-count');
        this.productCountSelect.addEventListener('change', () => this.loadData());
        this.productsList.addEventListener('click', this.handleProductClick.bind(this));
        this.modalWrap = document.querySelector('.modal-wrap');
        this.modalContent = document.getElementById('modal-content');
        this.closeModalButton = document.getElementById('close-modal');
        this.closeModalButton.addEventListener('click', () => this.hideModal());
        this.modalWrap.addEventListener('click', (e) => {
            if (e.target === this.modalWrap) this.hideModal();
        });
    }
    loadData(pageNumber = 1) {
        const pageSize = this.productCountSelect.value;
        const options = {
            method: "GET",
        };
        return this._fetch(options, `?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
    _fetch(options, additionalPath = "") {
        const url = this.baseUrl + additionalPath;
        return fetch(url, options)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                return Promise.reject(resp);
            })
            .then((data) => {
                this.displayData(data);
                return data;
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania danych:', error);
            });
    }

    displayData(data) {
        this.productsList.innerHTML = '';
        data.data.forEach(item => {
            const productItem = document.createElement('div');
            productItem.className = 'product-list-item';
            productItem.innerHTML = `
                <p>ID: ${item.id}</p>
                <p>Text: ${item.text}</p>
            `;
            this.productsList.appendChild(productItem);
        });
    }
    handleProductClick(event) {
        const clickedItem = event.target.closest('.product-list-item');
        if (clickedItem) {
            console.log(clickedItem.innerHTML);
        }
    }
    handleProductClick(event) {
        const clickedItem = event.target.closest('.product-list-item');
        if (clickedItem) {
            const id = clickedItem.querySelector('p:first-child').textContent.split(': ')[1];
            const text = clickedItem.querySelector('p:last-child').textContent.split(': ')[1];
            this.showModal(id, text);
        }
    }
    showModal(id, text) {
        if (this.modalContent) {
            this.modalContent.innerHTML = `
                <p><strong>ID:</strong> ${id}</p>
                <p><strong>Text:</strong> ${text}</p>
            `;
            this.modalWrap.classList.add('active');
        } else {
            console.error('Modal content element not found');
        }
    }

    hideModal() {
        this.modalWrap.classList.remove('active');
    }
}
export  {API}
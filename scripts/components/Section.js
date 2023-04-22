export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    addItem(element) {
        this._container.prepend(element);
    }
    renderItems() {
        console.log(this._items);
        this._items.forEach(item => {
            this.renderer(item);
        })
    }
}
class Actor {
  constructor(_element, _x = 0, _y = 0) {
    this.element = _element;
    this.position = { x: _x, y: _y };

    this.element.classList.add("actor");
    this.updatePositionCSS();
  }

  updatePositionCSS() {
    this.element.style.bottom = this.position.x * 100 + "px";
    this.element.style.left = this.position.y * 100 + "px";
  }
}

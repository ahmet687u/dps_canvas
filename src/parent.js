import Square from "./square";
import Circle from "./circle";
import Text from "./text";
import Line from "./line";
import { equalization } from "./utils/canvas";
import { customClick } from "./utils/events";

export default class Base {
  static ctx;
  static isMoving;

  /**
   * @private
   */
  #status;
  #movedItem;

  /**
   *
   * @param {{root: HTMLCanvasElement}} object
   */
  constructor({ root, width, height }) {
    this.root = root;

    this.#status = null;
    this.#movedItem = null;
    this.lastX = null;
    this.lastY = null;

    Base.ctx = this.root?.getContext("2d");
    Base.isMoving = false;

    //--- set canvas style
    this.root.width = width || 700;
    this.root.height = height || 400;
    this.color;

    //--- Root element events
    this.root.addEventListener("mousedown", ({ clientX, clientY }) => {
      const coordinateX = clientX - this.root.getBoundingClientRect().left;
      const coordinateY = clientY - this.root.getBoundingClientRect().top;

      const result =
        Square.down(coordinateX, coordinateY) ||
        Circle.down(coordinateX, coordinateY);

      if (!Base.isMoving) return;

      this.#movedItem = result.currents;
      this.lastX = result.lx;
      this.lastY = result.ly;
    });

    this.root.addEventListener("mousemove", ({ clientX, clientY }) => {
      if (!this.#movedItem) return;

      const coordinateX = clientX - this.root.getBoundingClientRect().left;
      const coordinateY = clientY - this.root.getBoundingClientRect().top;

      this.root.style.cursor = "auto";
      if (!Base.isMoving) return;
      this.root.style.cursor = "move";

      for (const iterator of this.#movedItem) {
        iterator.x += coordinateX - this.lastX;
        iterator.y += coordinateY - this.lastY;
      }

      this.lastX = coordinateX;
      this.lastY = coordinateY;
      this.drawAll();

      const eq = equalization(
        this.#movedItem[0],
        Square.square,
        this.root.width,
        this.root.height
      );
      
      eq.length > 0 && Line.draw({ ...eq[0], dash: true });
    });

    this.root.addEventListener("mouseup", () => (Base.isMoving = false));
    this.root.addEventListener("mouseleave", () => (Base.isMoving = false));

    //--- Trigger custom event
    this.root.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      const coordinateX = e.clientX - this.root.getBoundingClientRect().left;
      const coordinateY = e.clientY - this.root.getBoundingClientRect().top;

      const current = [
        Square.currents(coordinateX, coordinateY),
        Circle.currents(coordinateX, coordinateY)
      ].find(c => c.every(c => c) && c)

      current && this.root.dispatchEvent(customClick(current));
    });
  }

  /**
   * @param {String} color
   */
  set canvasBackground(color) {
    this.color = color;
    Square.draw({
      x: 0,
      y: 0,
      width: this.root.width,
      height: this.root.height,
      color,
    });
  }

  /**
   * @param {boolean} value
   */
  set status(value) {
    this.#status = ["square", "circle"].includes(value) && value;
  }

  get case() {
    return this.#status;
  }

  get coordinate() {
    return {
      squares: Square.square,
      circles: Circle.circle
    };
  }

  undo(val) {
    if (!val || !this.#status) return;

    const value = val || this.#status;

    if (value === "square") {
      Square.pop()
    } else if (value === "circle") {
      Circle.pop()
    }

    this.drawAll();
  }

  drawAll() {
    Base.ctx.clearRect(0, 0, this.root.width, this.root.height);

    //--- Draw Canvas
    this.canvasBackground = this.color;

    //--- Draw squares
    Square.square.forEach((sq) => Square.draw(sq));

    //--- Draw circles
    Circle.circle.forEach((c) => Circle.draw(c));

    //--- Draw Texts
    Text.text.forEach((c) => Text.draw(c));
  }
}

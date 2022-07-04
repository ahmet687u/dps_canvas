import Base from "./parent";

export default class Text {
  static #texts = []

  static draw({ x, y, name, color }) {
    Base.ctx.beginPath();

    Base.ctx.fillStyle = color || "#fff";
    Base.ctx.font = "15px Arial";
    Base.ctx.textAlign = "center"
    Base.ctx.textBaseline = "middle";
    Base.ctx.fillText(name, x, y);

    Base.ctx.closePath()
  }

  static get text() {
    return Text.#texts
  }

  static add(params) {
    Text.#texts.push(params)
  }

  static deleteTextByName(id) {
    Text.#texts = Text.#texts.filter(c => c.uid !== id)
  }
}
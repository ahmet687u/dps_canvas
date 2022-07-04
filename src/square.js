import utils from "./utils/canvas";
import Base from "./parent";
import Text from "./text";
import { uniqueId } from "./utils/helper";

export default class Square {
  /**
   * @private
   */
  static #squares = [];

  static draw({ x, y, width, height, color }) {
    Base.ctx.beginPath();

    Base.ctx.fillStyle = color;
    Base.ctx.fillRect(x, y, width, height ? height : width);
    Base.ctx.fill();

    Base.ctx.closePath();
  }

  static get square() {
    return Square.#squares;
  }

  static currents(x, y) {
    const currentSquare = Square.#squares.find(item => utils.squareCollision(x, y, {
      width: item.width,
      height: item.height,
      x: item.x,
      y: item.y,
    }));
    const currentText = Text.text.find((c) => c.uid === currentSquare?.uid);
    
    return [currentSquare, currentText]
  }

  static pop() {
    const deletedItem = this.#squares.pop()
    const currentText = Text.text.find(c => c.uid === deletedItem?.uid)

    currentText && Text.deleteTextById(currentText.uid)
  }

  static down(x, y) {
    const [ci, ct] = Square.currents(x, y)

    if (!ci) return;

    Base.isMoving = true;

    return {
      currents: [ci, ct],
      lx: x,
      ly: y,
    };
  }

  add(settings) {
    const { name, x, y, ...rest } = settings;
    const uid = uniqueId()

    Square.#squares.push({ ...rest, x, y, uid });
    Text.add({ uid, name, x: x + rest.width / 2, y: y + (rest.height || rest.width) / 2 });
  }
}

import Base from "./parent";
import Text from "./text";
import { circleCollision } from "./utils/canvas";
import { uniqueId } from "./utils/helper";

export default class Circle {
  /**
   * @private
   */
  static #circles = [];

  constructor() {
    this.type = "circle"
  }

  static draw({ x, y, radius, color, line }) {
    Base.ctx.beginPath();

    Base.ctx.fillStyle = color;
    Base.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    Base.ctx.fill();

    Base.ctx.closePath();
  }

  static get circle() {
    return Circle.#circles;
  }

  static currents(x, y) {
    const currentCircle = Circle.#circles.find((item) =>
      circleCollision(x, y, 0, item.x, item.y, item.radius)
    )
    const currentText = Text.text.find(c => c.uid === currentCircle?.uid);

    return [currentCircle, currentText]
  }

  static down(x, y) {
    const [cı, ct] = Circle.currents(x, y)

    if (!cı) return

    Base.isMoving = true

    return {
      currents: [cı, ct],
      lx: x,
      ly: y
    }
  }

  static pop() {
    const deletedItem = this.#circles.pop()
    const currentText = Text.text.find(c => c.uid === deletedItem?.nuidauidme);

    currentText && Text.deleteTextByName(currentText.uid)
  }

  add(params) {
    const { name, id, x, y, ...rest } = params
    const uid = uniqueId()

    Circle.#circles.push({ ...rest, x, y, name, uid, type: this.type });
    Text.add({ name, x, y, uid });
  }
}

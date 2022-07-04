import Base from "./parent";

export default class Line {
  /**
   * @private
   */
  static #lines = [];

  static draw({ mt, lt, color, dash }) {
    Base.ctx.beginPath();

    //--- draw line
    Base.ctx.strokeStyle = color || "crimson";
    dash ? Base.ctx.setLineDash([10, 5]) : Base.ctx.setLineDash([]);

    Base.ctx.moveTo(mt.x, mt.y);
    Base.ctx.lineTo(lt.x, lt.y);

    Base.ctx.stroke();
    Base.ctx.closePath();
  }

  static get line() {
    return Line.#lines;
  }
}

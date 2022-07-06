declare module "dps_canvas";

interface SquareSettings {
  width: number;
  height?: number;
  color: string;
  x: number;
  y: number;
  name: string;
}

interface CircleSettings {
  radius: number;
  color: string;
  x: number;
  y: number;
  name: string;
}

declare namespace dps {
  declare class Base {
    constructor(root: HTMLCanvasElement, width?: number, height?: number);

    canvasBackground: string;
    status: string;
    case: string;
    coordinate: { squares: SquareSettings[]; circles: CircleSettings[] };

    undo(val: string): void;
    drawAll(): void;
  }

  declare class Square {
    add(settings: SquareSettings): void;
  }

  declare class Circle {
    add(params: CircleSettings): void;
  }
}

export default dps;

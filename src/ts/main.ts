const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
const CELL_WIDTH = 20;

class PixelEditor {
  // private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  // private paint: boolean;

  // private clickX: number[] = [];
  // private clickY: number[] = [];
  // private clickDrag: boolean[] = [];

  constructor() {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas.getContext) {
      console.error("The canvas element does not exist")
      return;
    }    
    let context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "pink";
    context.lineWidth = 0.5;

    // this._canvas = canvas;
    this._context = context;

    this.drawGrid(this._context);
  }

  // private createUserEvents() {
  //   let canvas = this.canvas;

  //   canvas.addEventListener("mouse")
  // }

  private drawGrid(ctx: CanvasRenderingContext2D) {
    for (let i=1; i<CANVAS_WIDTH/CELL_WIDTH; i++) {
      ctx.beginPath();
      ctx.moveTo(CELL_WIDTH*i, 0);
      ctx.lineTo(CELL_WIDTH*i, CANVAS_HEIGHT);
      ctx.stroke();
      
      ctx.moveTo(0, CELL_WIDTH*i);
      ctx.lineTo(CANVAS_WIDTH, CELL_WIDTH*i);
      ctx.stroke();
    }
  }

  // private drawTriangle(ctx: CanvasRenderingContext2D) {
  //   ctx.beginPath();
  //   ctx.moveTo(75, 50);
  //   ctx.lineTo(100, 75);
  //   ctx.lineTo(100, 25);
  //   ctx.fill();
  // }

  // private redraw() {
  //   this._context.fillStyle = 'rgb(200, 0, 0)';
  //   this._context.fillRect(10, 10, 50, 50);
  // }
}

document.addEventListener("DOMContentLoaded", () => new PixelEditor());
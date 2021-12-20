const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;
const CELL_WIDTH = 20;

class PixelEditor {
  private _selectedColor: string = "black";

  constructor() {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas.getContext) {
      console.error("The canvas element does not exist");
      return;
    }
    let context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "pink";
    context.lineWidth = 0.5;

    this.bindEventHandlers(canvas, context);
    this.drawGrid(context);
  }

  private drawGrid(ctx: CanvasRenderingContext2D) {
    for (let i = 1; i < CANVAS_WIDTH / CELL_WIDTH; i++) {
      ctx.beginPath();
      ctx.moveTo(CELL_WIDTH * i, 0);
      ctx.lineTo(CELL_WIDTH * i, CANVAS_HEIGHT);
      ctx.stroke();

      ctx.moveTo(0, CELL_WIDTH * i);
      ctx.lineTo(CANVAS_WIDTH, CELL_WIDTH * i);
      ctx.stroke();
    }
  }

  private bindEventHandlers(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    canvas.addEventListener("mousedown", (e) => {
      const [x, y] = this.getCursorPosition(canvas, e);
      const cell: number[] = this.getCell(x, y);
      this.fillCell(context, cell);
    });
    document.getElementById("color-picker").addEventListener("input", (e: InputEvent) => this.updateSelectedColor(e, this));
  }

  private fillCell(context: CanvasRenderingContext2D, cell: number[]) {
    const [i, j] = cell;
    console.log(this._selectedColor);
    context.fillStyle = this._selectedColor;
    context.fillRect(i*CELL_WIDTH, j*CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
  }

  private getCell(x: number, y: number): number[] {
    return [x, y].map((num) => num / CELL_WIDTH).map(Math.floor);
  }

  private getCursorPosition(
    canvas: HTMLCanvasElement,
    event: MouseEvent
  ): number[] {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
  }

  private updateSelectedColor(event: InputEvent, editor:  PixelEditor): void {
    const target = event.target as HTMLInputElement;
    editor._selectedColor = target.value;
  }
}

document.addEventListener("DOMContentLoaded", () => new PixelEditor());

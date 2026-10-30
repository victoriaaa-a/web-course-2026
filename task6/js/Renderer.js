import { CANVAS_SIZE, CELL_SIZE, GRID_COUNT, COLORS, DIR } from './constants.js';

export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d'); 
    }

    clear() {
        const ctx = this.ctx;
        ctx.fillStyle = COLORS.background; 
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); 
    }

    drawGrid() {
        const ctx = this.ctx;
        ctx.strokeStyle = COLORS.grid; 
        ctx.lineWidth = 0.5;           

        for (let i = 0; i <= GRID_COUNT; i++) {
            const pos = i * CELL_SIZE; 

            ctx.beginPath();          
            ctx.moveTo(pos, 0);       
            ctx.lineTo(pos, CANVAS_SIZE); 
            ctx.stroke();             

            ctx.beginPath();          
            ctx.moveTo(0, pos);       
            ctx.lineTo(CANVAS_SIZE, pos); 
            ctx.stroke();             
        }
    }

    drawApple(apple) {
        const ctx = this.ctx;
        const cx = apple.x * CELL_SIZE + CELL_SIZE / 2;
        const cy = apple.y * CELL_SIZE + CELL_SIZE / 2;
        const radius = CELL_SIZE / 2 - 2; 

        ctx.fillStyle = COLORS.apple;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2); 
        ctx.fill();
    }

    drawSnake(snake) {
        const ctx = this.ctx;

        for (let i = snake.segments.length - 1; i >= 0; i--) {
            const seg = snake.segments[i];
            const x = seg.x * CELL_SIZE; 
            const y = seg.y * CELL_SIZE;

            if (i === 0) {
                ctx.fillStyle = COLORS.snakeHead;
            } else {
                ctx.fillStyle = COLORS.snakeBody;
            }

            this._drawSegment(x, y);
        }
    }

    _drawSegment(x, y) {
        const ctx = this.ctx;
        const padding = 1; 
        const size = CELL_SIZE - padding * 2; 

        ctx.fillRect(x + padding, y + padding, size, size);
    }

    render(snake, apple) {
        this.clear();            
        this.drawGrid();         
        this.drawApple(apple);   
        this.drawSnake(snake);   
    }
}
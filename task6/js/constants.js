export const CANVAS_SIZE = 500;
export const CELL_SIZE = 25;
export const GRID_COUNT = CANVAS_SIZE / CELL_SIZE;
export const MOVE_INTERVAL = 200;

export const COLORS = {
    background: '#F0F8FF',
    grid:       'rgba(93, 173, 226, 0.08)',

    snakeHead:  '#5B9BD5',
    snakeBody:  '#85C1E9',

    apple:      '#ff6eb6',
};

export const DIR = {
    UP:    { x:  0, y: -1 },
    DOWN:  { x:  0, y:  1 },
    LEFT:  { x: -1, y:  0 },
    RIGHT: { x:  1, y:  0 },
};

export const OPPOSITE_DIR = Object.freeze({
    [DIR.UP.x + ',' + DIR.UP.y]:       DIR.DOWN,
    [DIR.DOWN.x + ',' + DIR.DOWN.y]:   DIR.UP,
    [DIR.LEFT.x + ',' + DIR.LEFT.y]:   DIR.RIGHT,
    [DIR.RIGHT.x + ',' + DIR.RIGHT.y]: DIR.LEFT,
});
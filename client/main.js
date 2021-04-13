const HEIGHT = 600
const WIDTH = 600

const MAP_SIZE = 5000

var zoom = 1

var cell
var cells = []

function setup() {
    createCanvas(HEIGHT, WIDTH)
    cell = new Cell(0, 0, 32, "player")
    createFood(8000)
}

function createFood(amout = 1) {
    for (let i = 0; i < amout; i++) {
        var food
        while (true) {
            food = new Cell(random(-MAP_SIZE, MAP_SIZE), random(-MAP_SIZE, MAP_SIZE), random(8, 10), "food")
            var foodIsGood = true
            cells.map(c => { if (c.eat(food)) { foodIsGood = false } })
            if (foodIsGood) { break }
        }
        cells.push(food)
    }
}

function draw() {
    background(00)

    translate(WIDTH / 2, HEIGHT / 2)
    zoom = lerp(zoom, 64 / cell.radius, 0.1)
    scale(zoom)
    translate(-cell.pos.x, -cell.pos.y)

    cell.show()
    cell.update()

    cells.map((c, i) => {
        if (
            Math.abs(c.pos.x - cell.pos.x) < WIDTH / (2 * zoom) + c.radius + 1 &&
            Math.abs(c.pos.y - cell.pos.y) < HEIGHT / (2 * zoom) + c.radius + 1
        ) { c.show() }

        if (cell.eat(c)) {
            cells.splice(i, 1)
            if (c.type == "food") { createFood() }
        }
    })
}
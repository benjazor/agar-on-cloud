class Cell {
    constructor(x, y, radius, type) {
        this.pos = createVector(x, y)
        this.radius = radius
        this.velocity = createVector(0, 0)
        this.type = type
    }

    show() {
        fill(255)
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2)
    }

    update() {
        var velocity = createVector(mouseX - WIDTH / 2, mouseY - HEIGHT / 2)
        velocity.setMag(3)
        this.velocity.lerp(velocity, 0.1)
        this.pos.add(this.velocity)
    }

    eat(other) {
        let distance = Math.sqrt((other.pos.x - this.pos.x) ** 2 + (other.pos.y - this.pos.y) ** 2)
        if (distance < this.radius + other.radius) {
            this.radius = Math.sqrt((Math.PI * this.radius ** 2 + other.radius ** 2 * Math.PI) / Math.PI)
            return true
        }
        else { return false }
    }
}
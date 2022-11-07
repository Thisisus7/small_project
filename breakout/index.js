const grid = document.querySelector('.grid')  // return the 1st element that matched the selector
const score_display = document.querySelector('#score')
const block_width = 100
const block_height = 20
const ball_diameter = 20
const board_width = 890
const board_height = 450
let x_direction = -5
let y_direction = 5

let time_id
let score = 0

const user_start = [398, 10] 
let current_position = user_start

const ball_start = [437, 30]
let ball_current_position = ball_start

// create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottom_left = [xAxis, yAxis]
        this.bottom_right = [xAxis + block_width,  yAxis]
        this.top_left = [xAxis, yAxis + block_height]
        this.top_right = [xAxis + block_width, yAxis + block_height]
    }
}

// all blocks
const blocks = [
    new Block(10, 420),
    new Block(120, 420),
    new Block(230, 420),
    new Block(340, 420),
    new Block(450, 420),
    new Block(560, 420),
    new Block(670, 420),
    new Block(780, 420),

    new Block(10, 390),
    new Block(120, 390),
    new Block(230, 390),
    new Block(340, 390),
    new Block(450, 390),
    new Block(560, 390),
    new Block(670, 390),
    new Block(780, 390),

    new Block(120, 360),
    new Block(230, 360),
    new Block(340, 360),
    new Block(450, 360),
    new Block(560, 360),
    new Block(670, 360),

    new Block(120, 330),
    new Block(230, 330),
    new Block(340, 330),
    new Block(450, 330),
    new Block(560, 330),
    new Block(670, 330),

    new Block(230, 300),
    new Block(340, 300),
    new Block(450, 300),
    new Block(560, 300),

    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(560, 270),
]

// draw all blocks
function add_block() {
    for (let i=0; i<blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottom_left[0] + 'px'
        block.style.bottom = blocks[i].bottom_left[1] + 'px'
        grid.appendChild(block)
        // console.log(blocks[i].bottomLeft)
    }
}
add_block();    

// add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
draw_user()

// add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
draw_ball()

// draw user
function draw_user() {
    user.style.left = current_position[0] + 'px'
    user.style.bottom = current_position[1] + 'px'
}

// draw ball 
function draw_ball() {
    ball.style.left = ball_current_position[0] + 'px'
    ball.style.bottom = ball_current_position[1] + 'px'
}

// move user
function move_user(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (current_position[0] > 10) {
                current_position[0] -= 20
                console.log(current_position[0] > 0)
                draw_user()
            }
            break
        case 'ArrowRight':
            if (current_position[0] < board_width-block_width) {
                current_position[0] += 20
                console.log(current_position[0])
                draw_user()
            }
            break
    }
}
// a function will be called whenever the event is delivered to the target
document.addEventListener('keydown', move_user)  // (event_type, listener)


// move ball
function move_ball() {
    ball_current_position[0] += x_direction
    ball_current_position[1] += y_direction
    draw_ball()
    check_collision()
}
// repeatedly calls a function or executes a code
time_id = setInterval(move_ball, 30)  // (func, delay(ms))

// check for collision
function check_collision() {
    // check for block collision
    for (let i=0; i<blocks.length; i++) {
        if ((ball_current_position[0] > blocks[i].bottom_left[0] && 
            ball_current_position[0] < blocks[i].bottom_right[0]) &&
            (ball_current_position[1] + ball_diameter > blocks[i].bottom_left[1] &&
            ball_current_position[1] < blocks[i].top_left[1])) {
            const all_blocks = Array.from(document.querySelectorAll('.block'))
            all_blocks[i].classList.remove('block')
            blocks.splice(i, 1)
            change_direction()
            score ++
            score_display.innerHTML = score
            // check for win
            if (blocks.length == 0) {
                score_display.innerHTML = 'Win !'
                clearInterval(time_id)
                document.removeEventListener('keydown', move_user)
            }
        } 
    }
    // check fow wall collision
    if (ball_current_position[0] >= (board_width - ball_diameter) || 
        ball_current_position[1] >= (board_height - ball_diameter) ||
        ball_current_position[0] <= 0) {
        change_direction()
    }
    // check for user collision
    if ((ball_current_position[0] >= current_position[0] && 
        ball_current_position[0] <= current_position[0] + block_width) &&
        (ball_current_position[1] >= current_position[1] &&
        ball_current_position[1] <= current_position[1] + block_height)) {
            change_direction()
        }
    // check for game over
    if (ball_current_position[1] <= 0) {
        clearInterval(time_id)
        score_display.innerHTML = 'Sorry'
        document.removeEventListener('keydown', move_user)
    }
}
function change_direction() {
    if (x_direction === 5 && y_direction === 5) {
        if (ball_current_position[0] >= board_width) {
            x_direction = -5
            return
        }
        else {
            y_direction = -5
            return
        }
    }
    if (x_direction === 5 && y_direction === -5) {
        if (ball_current_position[0] >= board_width) {
            x_direction = -5
            return
        }
        else {
            y_direction = 5
            return
        }
    } 
    if (x_direction === -5 && y_direction === -5) {
        if (ball_current_position[0] <= 0) {
            x_direction = 5
            return
        }
        else {
            y_direction = 5
            return
        }
    } 
    if (x_direction === -5 && y_direction === 5) {
        if (ball_current_position[0] <= 0) {
            x_direction = 5
            return
        }
        else {
            y_direction = -5
            return
        }
    } 
}

// Canvas and context
let c = document.querySelector(`#pong`)
let ctx = c.getContext(`2d`)

// Timer to make the game run at 60fps
let timer = setInterval(main, 1000/60)

// Global friction variable
let fy = .97

// // Player 1 (p1) setup
// let p1 = new Box();
// p1.w = 20
// p1.h = 150
// p1.x = 0 + p1.w/2

// // Player 2 (p2) setup
// let p2 = new Box();
// p2.w = 20
// p2.h = 150
// p2.x = c.width - p2.w/2
// p2.color = `orange`

// Ball setup
let ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -2
ball.vy = -2
ball.color = `black`


// Assign players paddles

let players = [];
let pads = [];

pads[0] = new Box();
pads[0].w = 20;
pads[0].h = 150;
pads[0].x = 0 + pads[0].w/2

pads[1] = new Box();
pads[1].w = 20;
pads[1].h = 150;
pads[1].x = c.width - pads[1].w/2
pads[1].color = `orange`

players[0] = new Player();
players[0].pad = pads[0]

players[1] = new Player();
players[1].pad = pads[1]


console.log(players)
console.log(pads)


// scoreboard display
let scoreboard_divs = document.querySelectorAll('#score div')



function main()
{
    // Erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    // p1 accelerates when key is pressed 
    if(keys[`w`])
    {
       players[0].pad.vy += -players[0].pad.force
    }

    if(keys[`s`])
    {
        players[0].pad.vy += players[0].pad.force
    }

    if (keys[`ArrowUp`]) {
        players[1].pad.vy += -players[1].pad.force
    }
    
    if (keys[`ArrowDown`]) {
        players[1].pad.vy += players[1].pad.force
    }

    // Applies friction
    players[0].pad.vy *= fy
    players[1].pad.vy *= fy
    // Player movement
    players[0].pad.move();
    players[1].pad.move();

    // Ball movement
    ball.move()

    // players[0].pad collision
    if (players[0].pad.y < 0+players[0].pad.h/2)
    {
        players[0].pad.y = 0+players[0].pad.h/2
    }
    if (players[0].pad.y > c.height-players[0].pad.h/2)
    {
        players[0].pad.y = c.height-players[0].pad.h/2
    }

    // players[1].pad collision
    if (players[1].pad.y < 0+players[1].pad.h/2)
    {
        players[1].pad.y = 0+players[1].pad.h/2
    }
    if (players[1].pad.y > c.height-players[1].pad.h/2)
    {
        players[1].pad.y = c.height-players[1].pad.h/2
    }

    // Ball collision 
    if ((ball.x < 0) || (ball.x > c.width)) // LEFT OR RIGHT WALL
    {
        let scorer
        if (ball.x < 0) { // it hit the left wall
            scorer = players[1]
        }
        else if (ball.x > c.width) { // it hit the right wall
            scorer = players[0]
        }
        else { // fairly certain this should never happen but, just in case.
            console.log("If you are seeing this, something went wrong.")
        }

        scorer.score += 1
        console.log(`SCORE:  ${players[0].score} | ${players[1].score}`)

        // send ball to center
        ball.x = c.width/2
        ball.y = c.height/2      
    }
    if (ball.y < 0) // TOP WALL
    {
        ball.y = 0
        ball.vy = -ball.vy
    }
    if (ball.y > c.height) // BOTTOM WALL
    {
        ball.y = c.height
        ball.vy = -ball.vy 
    }

    // players[0].pad with ball collision
    if (ball.collide(players[0].pad))
    {
        ball.x = players[0].pad.x + players[0].pad.w/2 + ball.w/2
        ball.vx = -ball.vx;
    }

    // players[1].pad with ball collision
    if (ball.collide(players[1].pad))
    {
        ball.x = players[1].pad.x - players[1].pad.w/2 - ball.w/2
        ball.vx = -ball.vx;
    }

    // Draw the objects
    players[0].pad.draw()
    players[1].pad.draw()
    ball.draw()

    // update scoreboard
    for (let i = 0; i < scoreboard_divs.length; i++) {
        scoreboard_divs[i].innerHTML = players[i].score
    }

}

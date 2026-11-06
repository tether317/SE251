/*--------
    Make the Options Button 
    . on click
    . show or hide the `.sides` div
---------*/
const section_options = document.getElementById("options")
const header_options = section_options.querySelector("h2")
header_options.addEventListener("click", function() {
    const div_sides = section_options.querySelector(".sides")
    div_sides.classList.toggle("hidden")
})


/*---------
    Program the two fill inputs to do the following:
    . Display the correct colors on the inputs and outputs and paddles    
    . using an `input` event
        . Change the player's fill property to the value of the input
        . Change the pad's fill property  to the player's fill property
        . Show the fill's hex code in the output div 

-----------*/
let fill_inputs = []
let fill_displays = []
let stroke_inputs = []
let stroke_displays = []
let up_inputs = []
let down_inputs = []
let straight_inputs = []

let ball_fill_input = document.getElementById("ballfill")
let ball_fill_display = document.getElementById("balldisplay")

for (let div_op of section_options.getElementsByClassName("op playerOp")) {
    fill_inputs.push(div_op.getElementsByClassName("fill")[0])              // [0] because what i want is inside another object
    fill_displays.push(div_op.getElementsByClassName("filldisplay")[0])
    stroke_inputs.push(div_op.getElementsByClassName("stroke")[0])
    stroke_displays.push(div_op.getElementsByClassName("strokedisplay")[0])
    up_inputs.push(div_op.getElementsByClassName("u")[0])
    down_inputs.push(div_op.getElementsByClassName("d")[0])
    straight_inputs.push(div_op.getElementsByClassName("s")[0])
}


// make options tab match the initial settings
for (let i in fill_inputs) {
    fill_inputs[i].value = pad[i].fill
    fill_displays[i].innerHTML = pad[i].fill
    stroke_inputs[i].value = pad[i].stroke
    stroke_displays[i].innerHTML = pad[i].stroke
    ball_fill_input.value = ball.fill
    ball_fill_display.innerHTML = ball.fill
}
for (let i in up_inputs) { // this will break if code is changed such that the arrays are not of equal length
    up_inputs[i].value = player[i].keys.u
    down_inputs[i].value = player[i].keys.d
    straight_inputs[i].value = player[i].keys.s
}


// New custom feature implementation
// ball color UI
ball_fill_input.addEventListener("input", function(e) {
    ball.fill = e.target.value
    ball_fill_display.innerHTML = ball.fill
})



// ITERATE PLAYERS STUFF
for (let i in player) {
    // fill UI
    fill_inputs[i].addEventListener("input", function() {
        pad[i].fill = fill_inputs[i].value
        fill_displays[i].innerHTML = pad[i].fill
    })

    // stroke UI
    stroke_inputs[i].addEventListener("input", function() {
        pad[i].stroke = stroke_inputs[i].value
        stroke_displays[i].innerHTML = pad[i].stroke
    })

    // keybind UI

    let binds = [
        // each of these is a pair of (the UI element for changing a direction's input, and u/d/s are the keys for direction)
        {input_element: up_inputs[i], key: `u`},
        {input_element: down_inputs[i], key: `d`},
        {input_element: straight_inputs[i], key: `s`},
    ]

    for (let bind of binds) {
        bind.input_element.addEventListener("keydown", function(e) {
            bind.input_element.value = e.key
            player[i].keys[bind.key] = e.key
            // console.log(`player ${i}`)
            // console.log(player[i].keys)
        })
    }
}

// PAUSE ON TEXT INPUTS
// concatenates all the arrays
let all_inputs = [...up_inputs, ...down_inputs, ...straight_inputs]

for (let i in all_inputs) {
    all_inputs[i].addEventListener("focus", function() {
        currentState = "pause"
    })
}
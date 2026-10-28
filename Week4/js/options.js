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
let up_inputs = []
let down_inputs = []
let straight_inputs = []
for (let div_op of section_options.getElementsByClassName("op")) {
    fill_inputs.push(div_op.getElementsByClassName("fill")[0])              // [0] because what i want is inside another object
    fill_displays.push(div_op.getElementsByClassName("filldisplay")[0])
    up_inputs.push(div_op.getElementsByClassName("u")[0])
    down_inputs.push(div_op.getElementsByClassName("d")[0])
    straight_inputs.push(div_op.getElementsByClassName("s")[0])
}

// make options tab match the initial settings
for (let i in fill_inputs) {
    fill_inputs[i].value = pad[i].fill
    fill_displays[i].innerHTML = pad[i].fill
}

// makes fill UI actually change game settings
for (let i in fill_inputs) {
    fill_inputs[i].addEventListener("input", function() {
        pad[i].fill = fill_inputs[i].value
        fill_displays[i].innerHTML = pad[i].fill
    })
}



/*---------
    Program the six key inputs to do the following:
    . Display the correct key names for each player   
    . using a `keydown` event
        .Display the correct key name in the input
        .Change the player's key to the value of the input
        .Show the player's key in the output div 
-----------*/


// this will break if code is changed such that the arrays are not of equal length
for (let i in up_inputs) {
    up_inputs[i].value = player[i].keys.u
    down_inputs[i].value = player[i].keys.d
    straight_inputs[i].value = player[i].keys.s
}

// how would i do this with a for loop
for (let i in up_inputs) {
    up_inputs[i].addEventListener("keydown", function(e) {
        up_inputs[i].value = e.key
        player[i].keys.u = e.key
    })
}

for (let i in down_inputs) {
    down_inputs[i].addEventListener("keydown", function(e) {
        down_inputs[i].value = e.key
        player[i].keys.d = e.key
    })
}

for (let i in straight_inputs) {
    straight_inputs[i].addEventListener("keydown", function(e) {
        straight_inputs[i].value = e.key
        player[i].keys.s = e.key
    })
}

// concatenates all the arrays
let all_inputs = [...up_inputs, ...down_inputs, ...straight_inputs]

for (let i in all_inputs) {
    all_inputs[i].addEventListener("focus", function() {
        currentState = "pause"
    })
}
// Load existing posts, if any
if (localStorage.getItem(`posts`)) {
    
    // Get posts from browser local storage into array
    let posts = JSON.parse(localStorage.getItem(`posts`))

    posts.forEach(function(value) {
        document.getElementById(`output`).innerHTML += value;
    })
    
}

function addPost() {
    let arr = Array.from(document.querySelectorAll(`.post`)).map(function(value) {
        return value.outerHTML
    })

    localStorage.setItem(`posts`, JSON.stringify(arr))
}

// Add button
document.getElementById(`add`).addEventListener(`click`, function(e) {
    let post = document.createElement(`div`)
    post.setAttribute(`class`, `post`)  

    let checkbox = document.createElement(`input`)
    checkbox.setAttribute(`type`, `checkbox`)
    checkbox.classList.add(`selectionCheckbox`, `hidden`)

    let p = document.createElement(`p`)
    p.textContent = document.getElementsByTagName(`textarea`)[0].value

    let time = document.createElement(`time`)
    time.textContent = new Date().toLocaleTimeString()

    post.append(checkbox, time, p)
    document.getElementById(`output`).append(post)
    addPost()
})

// Delete button (toggles visibility of everything needed for bulk delete mode)
document.getElementById(`delete`).addEventListener(`click`, function(e) {
    document.getElementById(`all`).classList.toggle(`hidden`)
    document.getElementById(`confirm`).classList.toggle(`hidden`)
    let checkboxes = Array.from(document.getElementsByClassName(`selectionCheckbox`))
    checkboxes.forEach(function(checkbox) {
        checkbox.classList.toggle(`hidden`)
    })
})

// Select all button
// Select all if not all are selected; if all are selected, deselect all
document.getElementById(`all`).addEventListener(`click`, function(e) {
    let checkboxes = Array.from(document.getElementsByClassName(`selectionCheckbox`))
    
    // valueToSet -- The value to change all of the checkboxes to (checked/unchecked)
    // Evaluates to false (unchecked) if all the checkboxes are already selected, otherwise evaluates to true (checked)
    let valueToSet = !checkboxes.every(function(checkbox) {
        return checkbox.checked == true
    })
    
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = valueToSet
    })
})

// Confirm button
document.getElementById(`confirm`).addEventListener(`click`, function(e) {
    
    // Get every selected checkbox
    let checkboxes = Array.from(document.getElementsByClassName(`selectionCheckbox`))
    let checkedCheckboxes = checkboxes.filter(function(checkbox) {
        return checkbox.checked
    })

    // Delete checked posts from the page
    checkedCheckboxes.forEach(function(checkbox) {
        checkbox.parentElement.remove()
    })

    // Save remaining posts to local storage
    addPost()

    // Exit bulk delete mode
    document.getElementById(`delete`).click()
})
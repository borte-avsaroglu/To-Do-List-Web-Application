//Validation Part

const username = "admin"
const password = "admin"

const userinput = document.getElementById("usrname")
const passwordinput = document.getElementById("psswrd")
const form = document.querySelector("form")

form.addEventListener("submit", function(e) {
    if (userinput.value === username && passwordinput.value === password) {
        window.location.href = "Pages/index.html"
        e.preventDefault()
    } else {
        alert("Username or Password incorrect!")
    }
})
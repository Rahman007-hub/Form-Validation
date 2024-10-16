const form = document.querySelector("#form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")
const captcha = document.getElementById("captcha")

// add a submit event listener on the form and prevent the default behavior
// event propagation
form.addEventListener("submit", (event) => {
    event.preventDefault()
    checkInput()
})
 
function setError(input, message) {
    const formControl = input.parentElement
    const small = formControl.querySelector("small")
    formControl.className = "form-control error"
    small.innerText = message;
}
function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}

function checkInput() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const captchaValue = captcha.value.trim();
    
    // validate the username (empty field min length is 5 )

    if (usernameValue === "") {
        // username is required
        setError(username, "Username is required")
    } else if (usernameValue.length < 5) {
        // minimum username length is 5
        setError(username, "Minimum username length is 5")
    } else {
        // success
        setSuccess(username)
    }
    // validate eamil(email value must not be empty, email must include @)
    if (emailValue === "") {
        setError(email, "email required")
    } else if (!emailValue.includes("@")) {
        setError(email, "email is not valid")
    } else {
        setSuccess(email)
    }
    // password must not be empty and min password length is 7
    if (passwordValue === "") {
        setError(password, "password required")
    } else if (passwordValue.length < 7) {
        setError(password, "Minimum password length is 7")
    } else {
        setSuccess(password)
    }
    if (password2Value === "") {
        setError(password2, "password cannot be empty")
    } else if (password2Value !== passwordValue) {
        setError(password2,"password must match")
    }
    else {
        setSuccess(password2)
    }
    if (captchaValue === "") {
        setError(captcha,"captcha cannot be empty")
    } else {
        setSuccess(captcha)
    }
}
// select that button using the class show-btn
const button = document.querySelector(".show-btn")
button.addEventListener("click", (event) => {
    event.preventDefault();
    const inputType = password.getAttribute("type")
    if (inputType === "password") {
        password.setAttribute("type", "text")
        button.value = "Hide"
    } else {
        password.setAttribute("type","password")
        button.value ="Show"
    }
});

captcha.addEventListener("input", (event) => {
    const img = document.querySelector("img");
    const text = event.target.value
    const blurValue = 20 - text.length
    img.style.filter = `blur(${blurValue}px)`;
    if (blurValue <= 0) {
        setSuccess(captcha)
    } else {
        setError(captcha,"Text is not long enough")
    }
})

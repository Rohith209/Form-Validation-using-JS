var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm-password");
var submit = document.getElementById("submit");
var form = document.querySelector("#myForm");
var small = document.getElementsByTagName("small");

function validateForm() {
    let isUNValid = validateUserName();
    let isEmailValid = validateEmail();
    let isPwdValid = validatePassword();
    let isCheckPwdValid = checkPasswords(password, confirmPassword);
    let isFormValidated = isUNValid && isEmailValid && isPwdValid && isCheckPwdValid;
    if (isFormValidated) {
        alert('Form Submitted Successfully!');
    }
    else {
        alert('Please fill in all the fields correctly');
    }
}

// Validating User Name (Min Length, Max Length and Not Null or undefined)

function validateUserName() {
    let isValid = false;
    if (!isRequired(username)) {
        isValid = false;
        showerror(username, "User Name cannot be Empty");
        return;
    }
    if (username.value.length < 2 || username.value.length >= 8) {
        isValid = false;
        showerror(username, "Username should be between 2 and 8 Characters");
    } else {
        isValid = true;
        showSuccess(username);
        console.log(username.value);
    }
    return isValid;
}

// Validating Email
// Regex Pattern : [a-zA-Z0-9_%&]+@[a-zA-Z]\.[a-zA-Z.]
// rohithsai209@gmail.com //120017027@sastra.ac.in -- Both works

function validateEmail() {
    let isValid = false;
    if (!isRequired(email)) {
        isValid = false;
        showerror(email, "Please fill out Email Value");
    } else if (!emailValid(email)) {
        isValid = false;
        showerror(email, "Invalid Email");
    } else {
        isValid = true;
        showSuccess(email);
        console.log(email.value);
    }
    return isValid;
}

// Validating Password

function validatePassword() {
    let isValid = false;
    if (!isRequired(password)) {
        showerror(password, 'Password cant be Empty');
    }
    else if (!isPasswordValid(password)) {
        showerror(password, `Password requirements did not match. 
        Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)`);
    }
    else {
        isValid = true;
        showSuccess(password);
        console.log(password.value);
    }
    return isValid;
}

function checkPasswords(password, confirmPassword) {
    let isValid = false;
    var passwordVal = password.value;
    var retypePasswordVal = confirmPassword.value;
    if (passwordVal === retypePasswordVal) {
        isValid = true;
        showSuccess(confirmPassword);
    }
    else {
        showerror(confirmPassword, 'Passwords didnot match');
    }
    return isValid;
}

// For checking By Default Input value should not be Empty
const isRequired = (inputValue) => {
    return inputValue.value === "" ? false : true;
};

const emailValid = (emailValue) => {
    var emailFormat = new RegExp(
        /^[a-zA-Z0-9._%+-]+@+[a-zA-Z0-9]+\.[a-zA-z\.]/gm
    );
    return emailFormat.test(emailValue.value);
};

const isPasswordValid = (pwd) => {
    var pwdValue = pwd.value;
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(pwdValue);
}


const showerror = (input, message) => {
    var formFieldElem = input.parentElement;
    formFieldElem.classList.remove("success");
    formFieldElem.classList.add("error");

    let small = formFieldElem.querySelector("small");
    small.innerText = message;
};


const showSuccess = (input) => {
    var formFieldElem = input.parentElement;
    formFieldElem.classList.add("success");
    formFieldElem.classList.remove("error");

    let small = formFieldElem.querySelector("small");
    small.innerText = "";
};

// console.log("Outside " + formdata.value);
submit.addEventListener("click", (e) => {
    e.preventDefault();
    validateForm();
    return;
});

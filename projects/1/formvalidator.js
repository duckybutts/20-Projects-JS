let form = document.querySelector(".form");
let username = document.querySelector(".username");
let email = document.querySelector(".email");
let password1 = document.querySelector(".password1");
let password2 = document.querySelector(".password2");

//Show input error message
function showError(input, message) {
  let formControl = input.parentElement; //this will get the parent element, which is form control
  formControl.className = "form-control error"; //overriding the classes
  let small = formControl.querySelector("small");
  small.textContent = message;
}
//Show success
function showSuccess(input) {
  let formControl = input.parentElement;
  formControl.className = "form-control success";
}

//Regular Expression for email
function isValidEmail(input) {
  let regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (regex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Please enter a valid email");
  }
  return regex.test(String(email).toLowerCase());
  //run the test method will take in whatever we are passing in to make sure it matches
}

//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() == "") {
      //trim removes white space.
      showError(
        input,
        `${
          input.className.charAt(0).toUpperCase() + input.className.slice(1)
        } is required`
      );
    } else {
      showSuccess(input);
    }
  });
  //high order array method.
}

//Check input length
function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${
        input.className.charAt(0).toUpperCase() + input.className.slice(1)
      } must be between ${min} and ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//Ensure passwords match
function checkPasswordsMatch(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Passwords do not match.");
  }
}

//Event Listeners
form.addEventListener("submit", function (event) {
  event.preventDefault(); //this prevents the submit button from submitting

  checkRequired([username, email, password1, password2]);
  //In order to prevent repetition, we put all the input fields into an array and iterate through the array in the checkRequired function
  checkLength(username, 3, 15);
  checkLength(password1, 8, 15);
  checkLength(password2, 8, 15);
  isValidEmail(email);
  checkPasswordsMatch(password1, password2);
});

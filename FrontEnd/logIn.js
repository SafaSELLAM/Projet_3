const userEmail = "sophie.bluel@test.tld"; 
const userPassword = "S0phie";

 const form = document.querySelector("form");
 const emailInput = document.querySelector("input[name='email']");
 const passwordInput = document.querySelector("input[name='password']");
 const errorMsg =  document.querySelector("#error_msg");


 const chargeUtile = JSON.stringify(emailInput , passwordInput);

 form.addEventListener("submit", function (event) {
    event.preventDefault();
  
    // Get the values from the input fields
    const enteredEmail = emailInput.value;
    const enteredPassword = passwordInput.value;
  
    // Validate the input
    if (enteredEmail === userEmail && enteredPassword === userPassword) {
      // Generate the token
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";
  
      // Store the token in local storage
      localStorage.setItem("token", token);
  
      // Redirect to the protected page
      window.location.href = "index.html";
    } else {
      // Show an error message if the input is invalid
      errorMsg.textContent="Erreur dans l'identifiant ou le mot de passe";
    }
  });
  
  
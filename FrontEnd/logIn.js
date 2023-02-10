const form = document.querySelector("form");
const emailInput = document.querySelector("input[name='email']");
const passwordInput = document.querySelector("input[name='password']");
const errorMsg = document.querySelector("#error_msg");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const chargeUtile = {
    email: emailInput.value,
    password: passwordInput.value
  };
  const authentication = "http://localhost:5678/api/users/login";
  
  const response = await fetch(authentication, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(chargeUtile)
  });

  if (response.ok) {
    const data = await response.json();
    const token = data.token;

    localStorage.setItem("token", token);
    localStorage.setItem("userIsLogin", true);

    window.location.href = "index.html";
  } else {
    errorMsg.textContent = "Erreur dans l'identifiant ou le mot de passe";
    emailInput.value = "";
    passwordInput.value=""; 
    localStorage.setItem("token", "");
    localStorage.setItem("userIsLogin", false);
  }
});

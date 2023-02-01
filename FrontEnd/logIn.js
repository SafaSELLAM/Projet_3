const form = document.querySelector("#LogIn_form");
 const email = document.querySelector("#email_login").value;
 const password = document.querySelector("#password_login").value;
 const errorMsg =  document.querySelector("#error_msg");
 const userLogin = {
    email:"sophie.bluel@test.tld",
    password : "S0phie",
    token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4",
 };
 const chargeUtile = JSON.stringify(email , password);

 form.addEventListener("submit",function(event){
    event.preventDefault();
    if (email === "" || password ===""){
        email="";
        password="";
        errorMsg.textContent="tous les champs doivent être remplis";
        setTimeout(() => {
            errorMsg.textContent="";
        }, 2000);
    } else if (
        email !== userLogin.email ||
        password!== userLogin.password
    ){
        email="";
        password="";
        errorMsg.textContent="Erreur dans l'identifiant ou le mot de passe";
        setTimeout(() => {
            errorMsg.textContent="";
        }, 2000);
    }else {
        Login();
    }
 });



 function Login(){
    fetch("http://localhost:5678/api/users/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer " + token,
        },
        body:chargeUtile,
    }).then(response => response.json()).then(data => {
        if(data.token){
            localStorage.setItem("token",data.token);
            window.location.replace('index.html');
        }
    })
 }

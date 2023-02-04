const userIsLogin = JSON.parse(localStorage.getItem("userIsLogin"));
console.log(userIsLogin)
const logout_btn = document.getElementById("logoutBtn");
const login_btn = document.getElementById("loginBtn");
const listUpdateElements = ['updateHeader', 'updateImg', 'updateInfo', 'updateProject']
const header_info = document.getElementById("header_info");

if(userIsLogin){
    const token = localStorage.getItem("token");
    logout_btn.style.display = "block";
    login_btn.style.display = "none";
    header_info.style.display="none";
    listUpdateElements.forEach(element => {
        console.log(element)
        const updateEL = document.getElementById(element);
        console.log(updateEL)
        updateEL.classList.remove("hidden")
    });
}else{
    localStorage.setItem("userIsLogin",false)
    localStorage.setItem("token","")
}

logout_btn.addEventListener("click", function(){
    logout_btn.style.display= "none";
    login_btn.style.display="block";
    header_info.style.display="block";
    listUpdateElements.forEach(element => {
        const updateEL = document.getElementById(element);
        updateEL.classList.add("hidden");
    });
    localStorage.setItem("userIsLogin",false)
    localStorage.setItem("token","")
})
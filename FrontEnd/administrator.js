
//Elements page administrateur
const userIsLogin = JSON.parse(localStorage.getItem("userIsLogin"));
console.log(userIsLogin)
const logout_btn = document.getElementById("logoutBtn");
const login_btn = document.getElementById("loginBtn");
const listUpdateElements = ['updateHeader', 'updateImg', 'updateInfo', 'updateProject']
const header_info = document.getElementById("header_info");

if(userIsLogin){
    logout_btn.style.display = "block";
    login_btn.style.display = "none";
    header_info.style.display= "none";
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
  
//ajout boîte modale
let modal = null;
//const galleryModal = document.getElementsByClassName("gallery_modal")[0];
const openModal = function(e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
 
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js_modal_close").addEventListener("click", closeModal);
  modal.querySelector(".js_modal_stop").addEventListener("click", stopPropagation);
};
  //fermer la modale 
  const closeModal= function(e){
    e.preventDefault()
  
    modal.style.display="none";
    modal.setAttribute('aria-hidden','true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click',closeModal)
    modal.querySelector('.js_modal_close').removeEventListener('click',closeModal)
    modal.querySelector('.js_modal_stop').removeEventListener('click',stopPropagation)
    modal=null
    
}
const stopPropagation = function (e){
    e.stopPropagation()
}
document.querySelectorAll('.js_modal_stop').forEach(a=>{
    a.addEventListener('click', stopPropagation)
});
document.querySelectorAll('.js_modal_close').forEach(a=>{
    a.addEventListener('click', closeModal)
});
document.querySelectorAll('.js_modal').forEach(a=>{
    a.addEventListener('click',openModal)
});
  // Ouvrir la deuxième modale
  
    document.getElementById("openModal2").addEventListener("click", function() {
    document.querySelector(".modal_wrapper").style.display="none";
    document.getElementById("modal2").style.display=null;
  });
//retour première modale
  const backToModal1 = document.querySelector(".js_back_modal");
    backToModal1.addEventListener("click", function () {
    document.getElementById("modal2").style.display="none";
    document.querySelector(".modal_wrapper").style.display=null;
  });

//selecteur categories
const reponse3 = await fetch ('http://localhost:5678/api/categories');
const categories = await reponse3.json()
categories.unshift({ name: "Sélectionnez une option", id: "" });

categories.forEach(function(cat) {
	if (cat.id === ""){

    document.querySelector('#categories').innerHTML += `<option data-cat="${cat.id}" selected = "true" disabled="disabled">${cat.name}</option>`
  }	else{
    document.querySelector('#categories').innerHTML += `<option data-cat="${cat.id}">${cat.name}</option>`
  }
})

 


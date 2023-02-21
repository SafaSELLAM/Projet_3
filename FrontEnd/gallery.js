const token = localStorage.getItem('token') ? localStorage.getItem('token') : false
const userIsLogin = localStorage.getItem('userIsLogin') ? localStorage.getItem('userIsLogin') : false

const reponse = await fetch ('http://localhost:5678/api/works');
const works = await reponse.json();

//récupération travaux 
function get_gallery_data(works){
  works.forEach(card=>{
    build_main_gallery(card);
    if(token && userIsLogin){
      build_modal_gallery(card);
    }
  }); 
}
get_gallery_data(works); 

 function build_main_gallery(card){

const gallery = document.querySelector(".gallery");
const galleryElement = document.createElement("figure");
galleryElement.dataset.id= card.id;
const imageElement = document.createElement("img");
imageElement.src = card.imageUrl;
imageElement.crossOrigin="anonymous"
const captionElement = document.createElement("figcaption");
captionElement.innerText = card.title; 

gallery.appendChild(galleryElement);
galleryElement.appendChild(imageElement);
galleryElement.appendChild(captionElement);
}

function build_modal_gallery(card){
  const galleryModal = document.getElementById('gallery_modal');
  let figureModal = document.createElement('figure');
  figureModal.classList.add('works_modal');
  figureModal.dataset.id=card.id;
  let imageModal = document.createElement('img');
  imageModal.classList.add('img_modal');

  let worksElements = document.createElement('div')
  worksElements.classList.add('action_Works_add')
  worksElements.innerHTML= `<button class="action-item hover-action-item"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
  <button class="action-item js_trash" data-id=${card.id}><i class="fa-regular fa-trash-can"></i></button> `

  let figacapModal = document.createElement('figcaption');
  imageModal.src=card.imageUrl;
  imageModal.setAttribute("crossorigin","anonymous");
  imageModal.alt = card.title;
  figacapModal.innerHTML=`éditer`;
  galleryModal.appendChild(figureModal);
  figureModal.appendChild(imageModal);
  figureModal.appendChild(worksElements);
  figureModal.appendChild(figacapModal);
}


//ajout barre de filtres
 
const reponse2 = await fetch ('http://localhost:5678/api/categories');
const category = await reponse2.json();

function genererCategory(category){

    const barreFiltre = document.querySelector(".filtres");
    const FiltreAll = document.createElement("button");
    FiltreAll.innerText="Tous";
    FiltreAll.classList.add("btn_filter");
    FiltreAll.dataset.id="";
    barreFiltre.appendChild(FiltreAll);

    category.forEach(element=>{

        const FiltreElement = document.createElement("button");
        FiltreElement.innerText= element.name;
        FiltreElement.classList.add("btn_filter");
        FiltreElement.dataset.id= element.id;
        barreFiltre.appendChild(FiltreElement)
    });
    
    }
genererCategory(category);

//ajout filtres

const boutonFiltre = document.querySelectorAll(".btn_filter");
boutonFiltre.forEach(bouton=>bouton.addEventListener("click",event=>{
   const catId= event.target.dataset.id;
   if(catId === ""){
    document.querySelector(".gallery").innerHTML="";
    works.forEach(card=>{
      build_main_gallery(card);

    });
     
   }else{
    const workFilter= works.filter (function (work){
        return work.categoryId == catId;
    });   
    document.querySelector(".gallery").innerHTML="";
    workFilter.forEach(card=>{
      build_main_gallery(card);
    });
   
   }
}))

//Suppression travaux nouvelle fonction

function init_delete_event(pictureElement){
  pictureElement.addEventListener('click',(e)=>{
    e.preventDefault();
    const pictureId = e.currentTarget.dataset.id;

    const pictureElement = document.querySelectorAll(`figure[data-id="${pictureId}"]`);
    if (confirm('Etes-vous sûr de vouloir supprimer cette image?')) {
            pictureElement.forEach(element=>{
              element.remove();
      
            })
            deletePicture(pictureId);
          }
  });
}

function add_delete_event_on_btn(){
  const deleteElement = document.querySelectorAll('.js_trash');
  deleteElement.forEach((pictureElement) => {
    init_delete_event(pictureElement);
});
}
add_delete_event_on_btn();

function deletePicture(pictureId) {
  fetch(`http://localhost:5678/api/works/${pictureId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  })
    .then((response) => {
      if (response.ok) {
        console.log('Image supprimée du serveur.');

        // Supprimer l'élément du DOM
        const pictureElement = document.querySelectorAll(`figure[data-id="${pictureId}"]`);
        pictureElement.forEach(element=>{
          element.remove();
        })

      } else {
        throw new Error('Echec de la suppression');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}


//ajout images
const addPhoto = document.querySelector('#modal2');
const form_add_photo = document.querySelector('.add_photo_form');
const labelAddImg = document.getElementById("label_add_img");
labelAddImg.addEventListener("click", function() {
  document.getElementById("input_add_img").click();
});
addPhoto.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData();
  const image = document.querySelector('input[type="file"]').files[0];
  const title = document.getElementById('titre').value;
  const category = document.getElementById('categories').selectedOptions[0].dataset.cat;

  //condition image + catégories présentes
  const fileInput = document.getElementById("input_add_img");
  if (fileInput.files.length === 0) {
    e.preventDefault();
    alert("Veuillez sélectionner une image.");
  }
  if (!category) {
    alert('Veuillez sélectionner une catégorie.');
    return;
  }
  // condition taille image
  if (image.size > 4 * 1024 * 1024) {
    alert("Le fichier sélectionné est trop volumineux. Veuillez en sélectionner un inférieur à 4Mo.");
    return;
  }
 
  // Convert the image to a Base64-encoded string
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onloadend = function() {


    // Append the image data to the FormData object
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', category);

    fetch('http://localhost:5678/api/works/', {
      method: 'POST',
      headers: {'Authorization':`Bearer ${token}`},
      body: formData,
    })
     .then(function(res) {
        if (res.ok) {
          console.log('image ajoutée avec succès')
          return res.json();
        }
      })
      .then(function(card){
        if(token && userIsLogin){
          build_main_gallery(card);
          build_modal_gallery(card);
          const pictureElement= document.querySelector('button[data-id="'+card.id+'"]')
          init_delete_event(pictureElement);
        }
        
        document.querySelector('.img_preview').innerHTML='';
        form_add_photo.reset();
        document.querySelector(".label-container").style.display="block";
        document.getElementById("modal2").style.display="none";
        document.querySelector(".modal_wrapper").style.display=null;
      })
      .catch(function(error){
        console.error('Error',error);
      });
  };
});

//Ajout du preview de l'image ajoutée
// Ajouter un écouteur d'événement "change" à l'élément input de type "file" 
const inputAddImg = document.getElementById('input_add_img');
inputAddImg.addEventListener('change', function() {

// cacher les éléments présent dans la balise label 
document.querySelector(".label-container").style.display="none";

// ajout couleur de fond bouton valider 
document.querySelector('.add_pic').style.background = '#1D6154';

  const imgPreview = document.querySelector('.img_preview');
  imgPreview.style.display="flex"
  const file = this.files[0];
  const reader = new FileReader();

  // Réinitialiser la div "img_preview"
  imgPreview.innerHTML = '';
  
  reader.onloadend = function() {
    // Créer un élément "img" et définir sa source en tant que l'image chargée ainsi que la div qui la contiendra
    const imgPreviewContainer = document.createElement('div');
    imgPreviewContainer.classList.add("imgPreviewContainer")
    const img = document.createElement('img');
    img.classList.add("imgPreviewStyle")
    img.src = reader.result;

    // Ajouter l'élément "img" à la div "img_preview"
    imgPreview.appendChild(imgPreviewContainer);
    imgPreviewContainer.appendChild(img);
  }

  if (file) {
    reader.readAsDataURL(file);
  }
});
    

const token = localStorage.getItem('token') ? localStorage.getItem('token') : false
const userIsLogin = localStorage.getItem('userIsLogin') ? localStorage.getItem('userIsLogin') : false

const reponse = await fetch ('http://localhost:5678/api/works');
const works = await reponse.json();

//récupération travaux 
 function genererWorks(works){
 works.forEach(card=>{

const gallery = document.querySelector(".gallery");
const galleryElement = document.createElement("figure");
const imageElement = document.createElement("img");
imageElement.src = card.imageUrl;
imageElement.crossOrigin="anonymous"
const captionElement = document.createElement("figcaption");
captionElement.innerText = card.title; 

gallery.appendChild(galleryElement);
galleryElement.appendChild(imageElement);
galleryElement.appendChild(captionElement);

if (token && userIsLogin){
    const galleryModal = document.getElementById('gallery_modal');
    let figureModal = document.createElement('figure');
    figureModal.classList.add('works_modal');
    figureModal.dataset.id=card.id;
    console.log(figureModal);
    let imageModal = document.createElement('img');
    imageModal.classList.add('img_modal');

    let worksElements = document.createElement('div')
    worksElements.classList.add('action_Works_add')
    worksElements.innerHTML= `<button class="action-item hover-action-item"><i class="fa-solid fa-arrows-up-down-left-right"></i></button>
    <button class="action-item js_trash" id=${figureModal.id}><i class="fa-regular fa-trash-can"></i></button> `

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

});
}
genererWorks(works);
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
   const catId= event.target;
   if(catId === ""){
    document.querySelector(".gallery").innerHTML="";
    genererWorks(works);
   }else{
    const workFilter= works.filter (function (work){
        return work.categoryId == catId;
    });   
    document.querySelector(".gallery").innerHTML="";
    genererWorks(workFilter);
   }
}))
// suppressions travaux

const deleteElement = document.querySelectorAll('.js_trash');
deleteElement.forEach( pictureElement => {
  pictureElement.addEventListener('click', e => {
    e.preventDefault();
    console.log(e);
    const pictureId = e.currentTarget.dataset.id;
    deletePicture(pictureId);
    console.log(pictureId)
  });
});

function deletePicture( pictureId ) {
  fetch(`http://localhost:5678/api/works/${pictureId }`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  })
    .then(response => {
      if (response.ok) {
        // remove the picture from the DOM
        document.getElementById(pictureId).remove();
      } else {
        throw new Error('Failed to delete picture');
      }
    })
   
}

//ajout images

/*const addPhoto = document.querySelector('#modal2');
addPhoto.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData();
	const image = document.querySelector('input[type="file"]').files[0];
	const title = document.querySelector('input[name="titre"]').textContent;
	const category = document.querySelector('select[name="categories"]').categoryId;

  
	if (image.size > 4 * 1024 * 1024) {
		alert("Le fichier sélectionner est trop volumineux. Veuillez en sélectionner un inférieur à 4Mo.");
		return;
	}
	
	formData.append('imageUrl', image);
	formData.append('title', title);
	formData.append('categoryId', category);
	
	fetch('http://localhost:5678/api/works/',{
		method: 'POST',
		headers: {'Content-Type': 'multipart/form-data', 'Accept': 'application/json', 'Authorization': 'Bearer ${token}'},
		body: JSON.stringify(formData),
	})
	.then(function(res) 
	{
		if (res.ok) 
		{
		return res.json();
		}
	})
})

*/

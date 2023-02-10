

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
})
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
   const catId= event.target.dataset.id;
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

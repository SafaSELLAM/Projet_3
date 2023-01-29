const reponse = await fetch ('http://localhost:5678/api/works');
const works = await reponse.json();

 
for (let i = 0; i < works.length; i++){

const card = works[i];
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

}
   
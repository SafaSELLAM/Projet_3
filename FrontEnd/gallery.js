

const reponse = await fetch ('http://localhost:5678/api/works');
const works = await reponse.json();

 function genererWorks(works){
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
}
genererWorks(works);

const boutonFiltrerAll = document.querySelector(".btn_All-filtre");

boutonFiltrerAll.addEventListener("click",function(){
    const workFilter= works.filter (function (work){
        return work.categoryId == 1, 2 , 3;
    });
    console.log(workFilter)
    document.querySelector(".gallery").innerHTML="";
    genererWorks(workFilter);

});
const boutonFiltrerObj = document.querySelector(".btn_obj-filtre");

boutonFiltrerObj.addEventListener("click",function(){
    const workFilter= works.filter (function (work){
        return work.categoryId == 1;
    });
    console.log(workFilter)
    document.querySelector(".gallery").innerHTML="";
    genererWorks(workFilter);
});
const boutonFiltrerApt = document.querySelector(".btn_Apt-filtre");

boutonFiltrerApt.addEventListener("click",function(){
    const workFilter= works.filter (function (work){
        return work.categoryId == 2;
    });
    console.log(workFilter)
    document.querySelector(".gallery").innerHTML="";
    genererWorks(workFilter);
});
const boutonFiltrerHotel = document.querySelector(".btn_Hotel-filtre");

boutonFiltrerHotel.addEventListener("click",function(){
    const workFilter= works.filter (function (work){
        return work.categoryId == 3;
    });
    console.log(workFilter)
    document.querySelector(".gallery").innerHTML="";
    genererWorks(workFilter);
});


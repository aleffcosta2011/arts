// Lista de imagens com título, legenda e técnica
const imagens = [
  { src: "desenho1.jpg", title:"Aurora", caption:"Aquarela sobre papel, 2023", technique:"Aquarela" },
  { src: "desenho2.jpg", title:"Noite Urbana", caption:"Tinta acrílica, 2022", technique:"Acrílica" },
  { src: "desenho3.jpg", title:"Floral", caption:"Digital, 2024", technique:"Digital" },
  { src: "desenho4.jpg", title:"Retrato", caption:"Grafite sobre papel, 2023", technique:"Grafite" },
  { src: "desenho5.jpg", title:"Mar", caption:"Aquarela, 2023", technique:"Aquarela" }
];

// Elementos
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.getElementById("lightbox-close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const heroImage = document.getElementById("hero-image");
const heroTitle = document.getElementById("hero-title");
const heroTechnique = document.getElementById("hero-technique");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentIndex = 0;

// Função: atualizar hero com a primeira imagem
function updateHero(index){
  const data = imagens[index];
  heroImage.src = `./images/${data.src}`;
  heroTitle.textContent = data.title;
  heroTechnique.textContent = data.caption;
}
updateHero(0);

// Monta a galeria
function buildGallery(filter="all"){
  gallery.innerHTML="";
  imagens.forEach((imgData,index)=>{
    if(filter!=="all" && imgData.technique!==filter) return;
    const img = document.createElement("img");
    img.src = `./images/${imgData.src}`;
    img.alt = imgData.title;
    gallery.appendChild(img);

    img.addEventListener("click",()=>openLightbox(index));
  });
}
buildGallery();

// Filtragem
filterBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    filterBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    buildGallery(btn.dataset.filter);
  });
});

// Lightbox
function openLightbox(index){
  currentIndex=index;
  const data=imagens[currentIndex];
  lightboxImg.src=`./images/${data.src}`;
  lightboxImg.alt=data.title;
  lightboxCaption.textContent=`${data.title} — ${data.caption}`;
  lightbox.style.display="flex";
}
function closeLightbox(){lightbox.style.display="none";}
function prevImage(){currentIndex=(currentIndex-1+imagens.length)%imagens.length; openLightbox(currentIndex);}
function nextImage(){currentIndex=(currentIndex+1)%imagens.length; openLightbox(currentIndex);}

closeBtn.addEventListener("click",closeLightbox);
prevBtn.addEventListener("click",(e)=>{e.stopPropagation(); prevImage();});
nextBtn.addEventListener("click",(e)=>{e.stopPropagation(); nextImage();});
lightbox.addEventListener("click",(e)=>{if(e.target===lightbox) closeLightbox();});
document.addEventListener("keydown",(e)=>{
  if(lightbox.style.display==="flex"){
    if(e.key==="ArrowLeft") prevImage();
    if(e.key==="ArrowRight") nextImage();
    if(e.key==="Escape") closeLightbox();
  }
});

// Typing Animation
const words = ["Full Stack Developer", "Web Developer", "MCA Student"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
// Auto Image Slider (Changes every 10 seconds)

const images = [
    "images/photo1.png",
    "images/photo2.png",
    "images/photo3.png",
    "images/photo4.png"
];

let imgIndex = 0;
const profileImage = document.getElementById("profileImage");

setInterval(() => {
    imgIndex++;
    if (imgIndex >= images.length) {
        imgIndex = 0;
    }

    profileImage.style.opacity = 0;

    setTimeout(() => {
        profileImage.src = images[imgIndex];
        profileImage.style.opacity = 1;
    }, 500);

}, 10000); // 10000ms = 10 seconds

function typeEffect(){
    currentWord = words[i];

    if(!isDeleting){
        document.querySelector(".typing").textContent =
        currentWord.substring(0, j++);
        if(j > currentWord.length){
            isDeleting = true;
            setTimeout(typeEffect,1000);
            return;
        }
    }else{
        document.querySelector(".typing").textContent =
        currentWord.substring(0, j--);
        if(j === 0){
            isDeleting = false;
            i = (i+1) % words.length;
        }
    }
    setTimeout(typeEffect,100);
}
typeEffect();


// Active Navbar Highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll",()=>{
    let current = "";

    sections.forEach(section=>{
        const sectionTop = section.offsetTop - 100;
        if(pageYOffset >= sectionTop){
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link=>{
        link.classList.remove("active");
        if(link.getAttribute("href") === "#"+current){
            link.classList.add("active");
        }
    });
});
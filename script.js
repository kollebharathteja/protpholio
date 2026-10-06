// ===============================
// Typing Animation
// ===============================
const words = ["Full Stack Developer", "Web Developer", "MCA Student"];
const typingEl = document.querySelector(".typing");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingEl) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {
        charIndex++;
        typingEl.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1000);
            return;
        }
    } else {
        charIndex--;
        typingEl.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}
typeEffect();


// ===============================
// Auto Image Slider (every 10 seconds)
// ===============================
const allImages = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"
];

const profileImage = document.querySelector(".profile-img");

// Check one image: resolves true if it loads, false if not
function canLoad(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => {
            console.warn("Slider image NOT found:", src);
            resolve(false);
        };
        img.src = src;
    });
}

async function startSlider() {
    if (!profileImage) {
        console.warn("Slider: no element with class 'profile-img' found.");
        return;
    }

    // Keep only the images that actually load
    const results = await Promise.all(allImages.map(canLoad));
    const images = allImages.filter((_, i) => results[i]);

    console.log("Slider images that loaded:", images);

    if (images.length < 2) {
        console.warn("Slider needs at least 2 working images.");
        return;
    }

    let index = 0;
    profileImage.src = images[0];

    setInterval(() => {
        index = (index + 1) % images.length;

        profileImage.style.transition = "opacity 0.5s ease-in-out";
        profileImage.style.opacity = 0;

        setTimeout(() => {
            profileImage.src = images[index];
            profileImage.style.opacity = 1;
        }, 500);
    }, 10000);
}
startSlider();


// ===============================
// Active Navbar Highlight
// ===============================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
    let current = "home";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        current = "contact";
    }

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

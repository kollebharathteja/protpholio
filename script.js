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
            setTimeout(typeEffect, 1000); // pause after full word
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
// Auto Image Slider (every 10  s  econds)
// ===============================
const images = [
    "images/photo1.png",
    "images/photo2.png",
    "images/photo3.png",
    "images/photo4.png"
];

let imgIndex = 0;

// Your <img> has class="profile-img" (no id), so select by class
const profileImage = document.querySelector(".profile-img");

if (profileImage) {
    setInterval(() => {
        const nextIndex = (imgIndex + 1) % images.length;
        const nextSrc = images[nextIndex];

        // Preload first, so a missing image never shows as broken
        const preload = new Image();
        preload.onload = () => {
            profileImage.style.transition = "opacity 0.5s ease-in-out";
            profileImage.style.opacity = 0;

            setTimeout(() => {
                profileImage.src = nextSrc;
                profileImage.style.opacity = 1;
                imgIndex = nextIndex;
            }, 500);
        };
        preload.onerror = () => {
            console.warn("Slider image not found:", nextSrc);
            imgIndex = nextIndex; // skip this one next time
        };
        preload.src = nextSrc;
    }, 10000);
}


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

    // At the very bottom of the page, highlight the last section (Contact)
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

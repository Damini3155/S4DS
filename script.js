// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission for membership
document.getElementById('membership-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your application! We will contact you soon.');
    this.reset();
});

// Gallery Modal and Lightbox functionality
const galleries = [
    [
        "images/event1/1.jpg", "images/event1/2.jpg", "images/event1/3.jpg",
        "images/event1/4.jpg", "images/event1/5.jpg", "images/event1/6.jpg",
        "images/event1/7.jpg", "images/event1/8.jpg", "images/event1/9.jpg",
        "images/event1/10.jpg", "images/event1/11.jpg", "images/event1/12.jpg"
    ],
    [
        "images/event2/1.jpeg", "images/event2/2.jpg", "images/event2/3.jpg",
        "images/event2/4.jpg", "images/event2/5.jpg", "images/event2/6.jpg",
        "images/event2/7.jpg", "images/event2/8.jpg", "images/event2/9.jpg",
        "images/event2/10.jpg", "images/event2/11.jpg", "images/event2/12.jpg",
        "images/event2/13.jpg", "images/event2/14.jpg", "images/event2/15.jpg"
    ],
    [
        "images/event3/1.jpg", "images/event3/2.jpg", "images/event3/3.jpg",
        "images/event3/4.jpg", "images/event3/5.jpg", "images/event3/6.jpg",
        "images/event3/7.jpg", "images/event3/8.jpg", "images/event3/9.jpg",
        "images/event3/10.jpg", "images/event3/11.jpg", "images/event3/12.jpg"
    ],
    [
        "images/event4/1.jpg", "images/event4/2.jpg", "images/event4/3.jpg",
        "images/event4/4.jpg", "images/event4/5.jpg", "images/event4/6.jpg",
        "images/event4/7.jpg", "images/event4/8.jpg", "images/event4/9.jpg"
    ]
];

const titles = ["VORTEXA Hackathon - Gallery", "Tech-Navinya - Gallery", "QUIZBATE (Coding & Debate) - Gallery", "CG Mini Project Presentation - Gallery"];
let currentGallery = [];
let currentIndex = 0;

function showGallery(index) {
    currentGallery = galleries[index];
    document.getElementById("modalTitle").innerText = titles[index];
    const container = document.getElementById("galleryContainer");
    container.innerHTML = "";
    currentGallery.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.className = "gallery-img";
        img.onclick = () => openImage(i);
        container.appendChild(img);
    });
    document.getElementById("eventsModal").style.display = "flex";
}

function closeGalleryModal() {
    document.getElementById("eventsModal").style.display = "none";
}

function openImage(index) {
    currentIndex = index;
    document.getElementById("lightbox-img").src = currentGallery[currentIndex];
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function nextImage(e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentGallery.length;
    document.getElementById("lightbox-img").src = currentGallery[currentIndex];
}

function prevImage(e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    document.getElementById("lightbox-img").src = currentGallery[currentIndex];
}

// Event listeners for gallery controls
document.getElementById("backBtn").addEventListener("click", closeGalleryModal);
document.getElementById("prevBtn").addEventListener("click", prevImage);
document.getElementById("nextBtn").addEventListener("click", nextImage);
document.querySelector(".close-lightbox").addEventListener("click", closeLightbox);

// Close lightbox on click outside image
document.getElementById("lightbox").addEventListener("click", function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
    const lightboxVisible = document.getElementById("lightbox").style.display === "flex";
    const modalVisible = document.getElementById("eventsModal").style.display === "flex";

    if (lightboxVisible) {
        if (e.key === "ArrowRight") nextImage(e);
        if (e.key === "ArrowLeft") prevImage(e);
        if (e.key === "Escape") closeLightbox();
    }

    if (modalVisible && e.key === "Escape") {
        closeGalleryModal();
    }
});

// Functionality for creators section hover effects
document.querySelectorAll('.creator-card').forEach(card => {
    card.addEventListener('mouseover', function() {
        if (this.querySelector('.creator-name').textContent === 'Damini Karankal') {
            this.style.boxShadow = '0 0 30px rgba(0,174,255,0.5)';
        } else if (this.querySelector('.creator-name').textContent === 'Sai Jadhav') {
            this.style.boxShadow = '0 0 30px rgba(255,20,147,0.5)';
        }
        this.style.transform = 'translateY(-6px)';
    });

    card.addEventListener('mouseout', function() {
        this.style.boxShadow = '0 0 15px rgba(0, 174, 255, 0.25)';
        this.style.transform = 'translateY(0)';
    });
});

// Animation on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.section-title, .event-card, .team-card, .creator-card, .about-section, .faculty-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.section-title, .event-card, .team-card, .creator-card, .about-section, .faculty-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
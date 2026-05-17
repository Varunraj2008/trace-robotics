/* ===========================
   HAMBURGER MENU
   =========================== */

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ===========================
   CAROUSEL / SLIDER
   =========================== */

const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselElement = document.querySelector('.carousel');

let currentSlide = 0;
let startX = 0;
let endX = 0;
const swipeThreshold = 50;

// Function to show slide
function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (n >= slides.length) {
        currentSlide = 0;
    }
    if (n < 0) {
        currentSlide = slides.length - 1;
    }
    
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    slides[currentSlide].classList.add('active');
}

// Show first slide on load
showSlide(currentSlide);

// Next slide
function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Event listeners for carousel buttons
nextSlideBtn.addEventListener('click', nextSlide);
prevSlideBtn.addEventListener('click', prevSlide);

// Swipe support for touch devices
if (carouselElement) {
    carouselElement.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    carouselElement.addEventListener('touchmove', (event) => {
        endX = event.touches[0].clientX;
    });

    carouselElement.addEventListener('touchend', () => {
        const deltaX = endX - startX;
        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        startX = 0;
        endX = 0;
    });
}

// Auto-advance carousel every 5 seconds
setInterval(nextSlide, 5000);

/* ===========================
   SMOOTH SCROLL BEHAVIOR
   =========================== */

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just the hash
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 70; // Account for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ===========================
   CONTACT FORM HANDLING
   =========================== */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-submit');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        
        // Send email via FormSubmit AJAX API
        fetch("https://formsubmit.co/ajax/info.tracerobotics@gmail.com", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            alert('Oops! There was a problem sending your message. Please try again.');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

/* ===========================
   INTERSECTION OBSERVER FOR ANIMATIONS
   =========================== */

// Observe elements for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.solution-card, .product-card, .support-card, .info-card, .vision-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ===========================
   NAVBAR SHADOW ON SCROLL
   =========================== */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

/* ===========================
   ADD INTERACTIVE HOVER EFFECTS
   =========================== */

// Add subtle hover effects to buttons
document.querySelectorAll('.btn-primary, .btn-get-touch, .btn-submit').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

/* ===========================
   UTILITY: Lazy Load Images (when you add real images)
   =========================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    // Observe all lazy-load images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===========================
   CONTACT INFO LINK FORMATTING
   =========================== */

// Make contact info items clickable
const footerContactItems = document.querySelectorAll('.footer-contact-item');
footerContactItems.forEach(item => {
    // Remove any existing link wrapper if present
    const text = item.textContent.trim();
    
    if (text.includes('+91')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            window.location.href = `tel:${text.replace(/\D/g, '')}`;
        });
    } else if (text.includes('@')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            window.location.href = `mailto:${text}`;
        });
    }
});

/* ===========================
   ACTIVE NAV LINK INDICATOR
   =========================== */

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
            item.style.opacity = '1';
        }
    });
});

/* ===========================
   FORM VALIDATION
   =========================== */

const contactInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

contactInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 4px 16px rgba(11, 94, 255, 0.2)';
    });
    
    input.addEventListener('blur', function() {
        this.style.boxShadow = getComputedStyle(document.body).getPropertyValue('--box-shadow') || '0 4px 12px rgba(0, 0, 0, 0.08)';
    });
});

/* ===========================
   INITIALIZE PAGE
   =========================== */

// Log initialization
console.log('Trace Robotics Website - Loaded Successfully');

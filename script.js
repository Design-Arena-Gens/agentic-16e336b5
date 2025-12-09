// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            product: this.querySelector('select').value,
            message: this.querySelector('textarea').value
        };

        // Show success message
        alert(`Thank you ${formData.name}! We've received your quote request for the ${formData.product}. Our team will contact you shortly at ${formData.email}.`);

        // Reset form
        this.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards, product cards, and testimonials
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('header');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Product selection buttons
document.querySelectorAll('.product-card .btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;

        // Scroll to contact form
        const contactSection = document.querySelector('#contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // Pre-select the product in the form
        setTimeout(() => {
            const selectElement = document.querySelector('.contact-form select');
            const options = selectElement.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].text.includes(productName.split(' ')[1])) {
                    selectElement.selectedIndex = i;
                    break;
                }
            }
        }, 500);
    });
});
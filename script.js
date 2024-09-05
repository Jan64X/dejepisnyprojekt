document.addEventListener('DOMContentLoaded', (event) => {
    // Animace pro obrázky
    const images = document.querySelectorAll('img.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    });

    images.forEach(img => {
        observer.observe(img);
    });

    // Animace pro timeline události
    const events = document.querySelectorAll('.event');
    events.forEach((event, index) => {
        event.style.animation = `slideIn 0.5s ease-out ${index * 0.1}s forwards`;
    });

    // Scroll efekt pro navigaci
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
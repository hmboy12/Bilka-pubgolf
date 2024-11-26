// Toggle the slide menu
function toggleMenu() {
    const menu = document.getElementById('slide-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('visible');
}

// Navigate to a different page with a sliding effect
function navigateToWithSlide(page) {
    const main = document.querySelector('main');
    main.style.transition = 'transform 0.3s ease-in-out';
    main.style.transform = 'translateX(-100%)';

    setTimeout(() => {
        window.location.href = page;
    }, 300); // Wait for the slide animation to finish
}

// Open the Google Maps link in a new tab
function openMap() {
    window.open(
        'https://www.google.com/maps/place/Peter+Gift/@56.1486753,10.2006329,640m/data=!3m2!1e3!4b1!4m6!3m5!1s0x464c3f8c2cf4a713:0xbb28da5ccfedd97e!8m2!3d56.1486723!4d10.2032078!16s%2Fg%2F1tjmc7zf?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D',
        '_blank'
    );
}

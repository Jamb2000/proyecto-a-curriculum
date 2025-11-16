const welcomeText = document.getElementById('welcome-text');
const hero = document.getElementById('hero');
const about = document.getElementById('about');
const businessCard = document.getElementById('business-card');
const leftEye = document.getElementById('eye-left');
const rightEye = document.getElementById('eye-right');
const scrollDown = document.getElementById('scroll-down');

const textToType = 'Bienvenidos a mi portafolio personal';
let i = 0;

function typeWriter() {
    if (i < textToType.length) {
        welcomeText.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // Adjust typing speed here
    } else {
        // Typing finished, show scroll down indicator
        setTimeout(() => {
            scrollDown.style.opacity = 1;
        }, 500); // Wait half a second after typing finishes
    }
}

// Start typing animation when the page loads
window.addEventListener('load', () => {
    welcomeText.innerHTML = ''; // Clear existing text
    typeWriter();
});


// Eyes follow mouse
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const leftEyeRect = leftEye.getBoundingClientRect();
    const rightEyeRect = rightEye.getBoundingClientRect();

    const leftEyeX = leftEyeRect.left + leftEyeRect.width / 2;
    const leftEyeY = leftEyeRect.top + leftEyeRect.height / 2;

    const rightEyeX = rightEyeRect.left + rightEyeRect.width / 2;
    const rightEyeY = rightEyeRect.top + rightEyeRect.height / 2;

    const deltaXLeft = mouseX - leftEyeX;
    const deltaYLeft = mouseY - leftEyeY;

    const deltaXRight = mouseX - rightEyeX;
    const deltaYRight = mouseY - rightEyeY;

    const angleLeft = Math.atan2(deltaYLeft, deltaXLeft);
    const angleRight = Math.atan2(deltaYRight, deltaXRight);

    const maxPupilOffset = 5;

    const pupilOffsetXLeft = Math.cos(angleLeft) * maxPupilOffset;
    const pupilOffsetYLeft = Math.sin(angleLeft) * maxPupilOffset;

    const pupilOffsetXRight = Math.cos(angleRight) * maxPupilOffset;
    const pupilOffsetYRight = Math.sin(angleRight) * maxPupilOffset;

    leftEye.style.transform = `translate(${pupilOffsetXLeft}px, ${pupilOffsetYLeft}px)`;
    rightEye.style.transform = `translate(${pupilOffsetXRight}px, ${pupilOffsetYRight}px)`;
});

// Scroll interaction
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollPosition > heroHeight / 2) {
        hero.style.backgroundColor = '#f0f0f0';
    } else {
        hero.style.backgroundColor = '#000';
    }
});

// Business card interaction
let isDragging = false;
let isResizing = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

businessCard.addEventListener('mousedown', (e) => {
    if (e.target === businessCard) {
        isDragging = true;
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
});

businessCard.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, businessCard);
    }
});

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}
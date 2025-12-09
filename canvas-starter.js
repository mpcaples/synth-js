const canvas = document.getElementById('synth-canvas');
const ctx = canvas.getContext('2d');

let dot = { x: 100, y: 100, radius: 10, color: 'royalblue' };

let isDragging = false; // start off state of dot as not dragging 
let dragOffsetX, dragOffsetY;

// Function to draw the dot
function drawDot() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = dot.color;
    ctx.fill();
    ctx.closePath();
}

// Check if mouse is over the dot
function isMouseOverDot(mouseX, mouseY) {
    const distance = Math.sqrt(Math.pow(mouseX - dot.x, 2) + Math.pow(mouseY - dot.y, 2));
    return distance < dot.radius;
}

// Mouse Down event handler
canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    if (isMouseOverDot(mouseX, mouseY)) {
        isDragging = true;
        dragOffsetX = mouseX - dot.x;
        dragOffsetY = mouseY - dot.y;
    }
});

// Mouse Move event handler
canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;

        dot.x = mouseX - dragOffsetX;
        dot.y = mouseY - dragOffsetY;
        drawDot(); // Redraw the dot at its new position
    }
});

// Mouse Up event handler
canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

// Initial draw of the dot
drawDot();
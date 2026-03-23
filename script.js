// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        navLinks.forEach(l => l.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active-page'));
        
        link.classList.add('active');
        
        const pageId = link.getAttribute('data-page') + 'Page';
        document.getElementById(pageId).classList.add('active-page');
    });
});

// Fireworks Effect
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particles = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createFirework(x, y) {
    const colors = ['#ffd700', '#ffaa33', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
    for (let i = 0; i < 60; i++) {
        const angle = random(0, Math.PI * 2);
        const speed = random(2, 8);
        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: random(3, 6),
            gravity: 0.2
        });
    }
}

function updateFireworks() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        particles[i].vy += particles[i].gravity;
        particles[i].alpha -= 0.02;
        particles[i].size -= 0.05;
        
        if (particles[i].alpha <= 0 || particles[i].size <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function drawFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(animate);
}

function animate() {
    updateFireworks();
    drawFireworks();
}
animate();

// Trigger fireworks on button click
const greetingBtn = document.getElementById('greetingBtn');
if (greetingBtn) {
    greetingBtn.addEventListener('click', () => {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createFirework(
                    random(100, canvas.width - 100),
                    random(100, canvas.height - 100)
                );
            }, i * 100);
        }
    });
}

// Auto fireworks on load
window.addEventListener('load', () => {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createFirework(
                random(100, canvas.width - 100),
                random(100, canvas.height - 100)
            );
        }, i * 300);
    }
});

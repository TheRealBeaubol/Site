const canvas = document.getElementById("background");

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

var x,y;

canvas.width = WIDTH;
canvas.height = HEIGHT;

canvas.addEventListener('mousemove',(evt) => {
    var rect = canvas.getBoundingClientRect();
    x = evt.clientX - rect.left;
    y = evt.clientY - rect.top;
});

canvas.addEventListener('mouseleave',(evt) => {
    x = undefined;
    y = undefined;
});

const ctx = canvas.getContext('2d');
const particles = [];

function randomDecimal(min,max) {
    return Math.random() * (max - min) + min;
}

function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createParticles() {
    for (let i=0; i<60;i++) {
        let particle = {
            radius:randomDecimal(1,5),
            x: randomIntFromInterval(0,WIDTH),
            y: randomIntFromInterval(0,HEIGHT),
            speed:randomDecimal(1,2)
        };
        particles.push(particle);
    }
}

function drawParticles(particle) {
    ctx.beginPath();
    let {x,y,radius} = particle;
    ctx.fillStyle= '#34FEE8';
    ctx.shadowBlur=10;
    ctx.shadowColor="#34FEE8";
    ctx.arc(x,y,radius,0, 2 * Math.PI);
    ctx.fill();

}

function newParticle() {
    return {
            radius:randomDecimal(1,5),
            x: randomIntFromInterval(0,WIDTH),
            y: 0,
            speed:randomDecimal(1,2)
        }
}

function animateParticles(particle) {
    if (particle.y > HEIGHT) {
        return newParticle();
    } else {
        particle.y += particle.speed;   
        return false;
    }
    
}

function getDif(particle) {
    return Math.sqrt(Math.pow(particle.x - x,2)+Math.pow(particle.y - y,2));
}

function drawLines(particle) {         
    if(getDif(particle) < 180) {
        ctx.beginPath();    
        ctx.strokeStyle= '#34FEE8';
        ctx.shadowBlur=10;
        ctx.shadowColor="#34FEE8";
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }  
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length;i++) {
        let newP = animateParticles(particles[i]);
        if(newP !== false){
            particles[i] = newP;
        }
        drawParticles(particles[i]); 
        if (x !== undefined && y !== undefined) {
            drawLines(particles[i]);
        } 
    }
    window.requestAnimationFrame(render);
}

createParticles();
window.requestAnimationFrame(render);
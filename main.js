
const fps = 60;
const period = 2; // time it takes for snowdrops to fall from the top of the screen
const wind = 50; // left negative, pixels per secons

const canvas = document.getElementById('canvas');

const width = window.innerWidth;
const height = window.innerHeight;

console.log(`Starting with width ${width} and height ${height}`)

canvas.width = width;
canvas.height = height;

const context = canvas.getContext('2d');

const snowDrops = [];

function genSnowDrop() {
    const size = parseInt(Math.random() * 3 + 4); // radius of snow drop
    const x = parseInt(Math.random() * width); // x-position of center of snowdrop
    const y = parseInt(Math.random() * height); // y-position of center of snowdrop
    return {
        size,
        x,
        y
    };
}

function genE() {
    const x = parseInt(Math.random() * width);
    return {
        x,
        y: 0
    };
}

function drawE(e) {
    context.beginPath();
    //context.arc(e.x, e.y, 50, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fillRect(e.x - 25, e.y - 25, 50, 50);
    context.stroke();
    context.beginPath();
    context.fillStyle = 'white';
    context.font = '35px Arial';
    context.fillText('B', e.x - 18, e.y + 18);
    context.stroke();
}

function regenSnowDrop() {
    const snowDrop = genSnowDrop();
    console.log('Regenerating snow drop:');
    console.log(snowDrop);
    snowDrop.y = 0;
    return snowDrop;
}

function drawSnowDrop(snowDrop) {
    console.log('Drawing snow drop');
    context.beginPath();
    context.arc(snowDrop.x, snowDrop.y, snowDrop.size, 0, 2 * Math.PI, false);
    context.fillStyle = '#00B9FF';
    context.strokeStyle = '#009C9FF';
    context.lineWidth = 2;
    context.fill();
    context.stroke();
}

function drawMark(x, y) {
    context.beginPath();
    const image = document.getElementById('MarkE');
    context.drawImage(image, x, y, 174, 100);
    context.stroke();
}

function drawWelcomeText() {
    context.beginPath();
    context.fillStyle = '#00FF5F';
    context.font = '50px Arial';
    context.fillText('Yo Christmas is pretty lit', width/2 - 300, height/2 - 50);
    context.stroke();
}

function drawHouseMain() {
    context.beginPath();
    context.fillStyle = 'white';
    context.fillRect(width/2 - 250, height - 250, 500, 250);
    context.stroke();
}

function drawHouseRoof() {
    context.beginPath();
    context.fillStyle = 'white';
    context.moveTo(width/2 - 250, height - 250);
    context.lineTo(width/2, height - 300);
    context.lineTo(width/2 + 250, height - 250);
    context.fill();
    context.stroke();
}

function drawHouseChimney() {
    context.beginPath();
    context.fillStyle = 'red';
    context.fillRect(width/2 - 200, height - 325, 50, 100);
    context.stroke();
}

function start() {
    for (let i = 0; i < 50; i++) {
        const snowDrop = genSnowDrop();
        snowDrops.push(snowDrop);
        drawSnowDrop(snowDrop);
    }
    console.log(snowDrops);
    const Es = [];
    let markDrawn = false;
    let markX = 0;
    let markY = 0;
    setTimeout(() => {
        console.log('Drawing Mark');
        markDrawn = true;
        drawMark(Math.random() * width, 0);
        markX = Math.random() * width;
        markY = 0;
    }, Math.random() * 5000 + 2000);
    setInterval(() => {
        context.clearRect(0, 0, width, height); // clear screen for redrawing
        drawWelcomeText();
        drawHouseMain();
        drawHouseRoof();
        drawHouseChimney();
        if (markDrawn) {
            markY += 1;
            drawMark(markX, markY);
        }
        for (let i = 0; i < snowDrops.length; i++) {
            console.log(i);
            const snowDrop = snowDrops[i];
            snowDrop.y += height / (period * fps) / snowDrop.size;
            snowDrop.x += wind / (snowDrop.size * fps);
            if (snowDrop.y - snowDrop.size / 2 > height) {
                console.log('Fell');
                snowDrops.splice(i, 1);
                snowDrops.push(regenSnowDrop());
                console.log('Regenerated snow drop');
                i--;
            }
            drawSnowDrop(snowDrop);
        }
        if (Math.random() > 0.992) {
            const E = genE();
            Es.push(E);
        }
        for (let i = 0; i < Es.length; i++) {
            Es[i].y += 2;
            Es[i].x += Math.random() * 10 - 5;
            drawE(Es[i]);
        }
    }, 1000 / fps);
}

start();

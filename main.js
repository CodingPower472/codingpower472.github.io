
const fps = 60; // frames per second of animation
const period = 2; // time it takes for snowdrops to fall from the top of the screen
const wind = 50; // left negative, pixels per secons

const canvas = document.getElementById('canvas'); // canvas element

const width = window.innerWidth; // width of website
const height = window.innerHeight; // height of website

//console.log(`Starting with width ${width} and height ${height}`)

canvas.width = width; // set canvas width to website width
canvas.height = height; // set canvas height to website height

const context = canvas.getContext('2d'); // get context of canvas element to draw on

let snowDrops = []; // list of snow drops
let snowAccum = 0;

// generate snow drop and return size, horizontal position, and vertical position
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

// generate B emoji and return horizontal and vertical position
function genB() {
    const x = parseInt(Math.random() * width); // horizontal position of B
    return {
        x,
        y: 0
    };
}

// draw B emoji with given properties
function drawB(b) {
    context.beginPath();
    context.fillStyle = 'red';
    context.fillRect(b.x - 25, b.y - 25, 50, 50);
    context.stroke();
    context.beginPath();
    context.fillStyle = 'white';
    context.font = '35px Arial';
    context.fillText('B', b.x - 18, b.y + 18);
    context.stroke();
}

// regenerate snow drop after it falls off the screen, and return new snow drop
function regenSnowDrop() {
    const snowDrop = genSnowDrop();
    snowDrop.y = 0;
    return snowDrop;
}

// draw snow drop with given properties
function drawSnowDrop(snowDrop) {
    //console.log('Drawing snow drop');
    context.beginPath();
    context.arc(snowDrop.x, snowDrop.y, snowDrop.size, 0, 2 * Math.PI, false);
    context.fillStyle = '#00B9FF';
    context.strokeStyle = '#009C9FF';
    context.lineWidth = 2;
    context.fill();
    context.stroke();
}

// draw Markiplier E meme with given x and y coordinates
function drawMark(x, y) {
    context.beginPath();
    const image = document.getElementById('MarkE');
    context.drawImage(image, x, y, 174, 100);
    context.stroke();
}

// draw welcome text (Yo Christmas is pretty lit)
function drawWelcomeText() {
    context.beginPath();
    context.fillStyle = '#00FF5F';
    context.font = '50px Arial';
    context.fillText('Yo Christmas is pretty lit', width/2 - 300, height/2 - 50);
    context.stroke();
}

// draw snow accumulation
function drawSnowAccum() {
    context.beginPath();
    context.fillStyle = '#00F2FF';
    context.fillRect(0, height - snowAccum, width, snowAccum);
    context.stroke();
}

// draw main house
function drawHouseMain() {
    context.beginPath();
    context.fillStyle = 'white';
    context.fillRect(width/2 - 250, height - 250, 500, 250);
    context.stroke();
}

// draw house roof
function drawHouseRoof() {
    context.beginPath();
    context.fillStyle = '#D3D3D3';
    context.moveTo(width/2 - 250, height - 250);
    context.lineTo(width/2, height - 300);
    context.lineTo(width/2 + 250, height - 250);
    context.fill();
    context.stroke();
}

// draw house chimney
function drawHouseChimney() {
    context.beginPath();
    context.fillStyle = 'red';
    context.fillRect(width/2 - 200, height - 325, 50, 100);
    context.stroke();
}

// start program
function start() {
    // draw 50 snow drops and add them to the list of snow drops
    for (let i = 0; i < 50; i++) {
        const snowDrop = genSnowDrop();
        snowDrops.push(snowDrop);
        drawSnowDrop(snowDrop);
    }
    //console.log(snowDrops);
    let Bs = [];
    let markDrawn = false;
    let markX = 0;
    let markY = 0;
    // pick random delay and generate Markiplier E meme
    setTimeout(() => {
        //console.log('Drawing Mark');
        markDrawn = true;
        drawMark(Math.random() * width, 0);
        markX = Math.random() * width;
        markY = 0;
    }, Math.random() * 5000 + 2000);
    // repeat frames quickly at given fps
    setInterval(() => {
        context.clearRect(0, 0, width, height); // clear screen for redrawing
        drawWelcomeText();
        drawHouseMain();
        drawHouseRoof();
        drawHouseChimney();
        drawSnowAccum();
        // if Markiplier already drawn, update position
        if (markDrawn) {
            markY += 1;
            drawMark(markX, markY);
        }
        // for each snow drop
        for (let i = 0; i < snowDrops.length; i++) {
            ////console.log(i);
            const snowDrop = snowDrops[i];
            snowDrop.y += height / (period * fps) / snowDrop.size;
            snowDrop.x += wind / (snowDrop.size * fps);
            // if snow drop fell off the screen, regenerate the snow drop
            if (snowDrop.y - snowDrop.size / 2 > height) {
                //console.log('Fell');
                snowAccum += snowDrop.size / width * 10;
                //console.log('Snow accum: ' + snowAccum);
                snowDrops.splice(i, 1);
                snowDrops.push(regenSnowDrop());
                //console.log('Regenerated snow drop');
                i--;
            }
            // update screen position of snow drop
            drawSnowDrop(snowDrop);
        }
        // In 0.8% of all frames, generate a new B emoji
        if (Math.random() > 0.992) {
            const B = genB();
            Bs.push(B);
        }
        // for each B emoji, update position
        for (let i = 0; i < Bs.length; i++) {
            Bs[i].y += 2;
            Bs[i].x += Math.random() * 10 - 5;
            drawB(Bs[i]);
        }
    }, 1000 / fps);
}

// start program
start();

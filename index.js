//get the correct elements on the page
const logo = document.querySelector('#logo');
const nice = document.querySelector('#nice');

//Movement variables
let speed = 2;
let dirX = 1;
let dirY = -1;

//Time out variables for to prevent too many checks/glitches
let win = false;
let xTimeout = false;
let yTimeout = false;

function setup() {
    //hide congratulations message at start
    nice.style.display = 'none';
    //Start image in center of screen
    logo.style.left = window.innerWidth * 0.5 + 'px';
    logo.style.top = window.innerHeight * 0.5 + 'px';
}

function update() {
    const posX = logo.offsetLeft;
    const posY = logo.offsetTop;

    //If they did some crazy resizing, let's get that logo back on screen ASAP
    if (posX + logo.offsetWidth / 2 > window.innerWidth) {
        dirX = -1;
    } else if (posY + logo.offsetHeight / 2 > window.innerHeight) {
        dirY = -1;
    } else if (posY - logo.offsetHeight / 2 < 0) {
        dirY = 1;
    } else if (posX - logo.offsetWidth / 2 < 0) {
        dirX = 1;
    }

    //Check if the logo has hit a wall
    if (!xTimeout && oobX(posX)) {
        xTimeout = true;
        setTimeout(() => {
            xTimeout = false;
        }, 250);
        //flip x movement direction
        dirX *= -1;
        //change to random hue
        logo.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
    } else if (!yTimeout && oobY(posY)) {
        yTimeout = true;
        setTimeout(() => {
            yTimeout = false;
        }, 250);
        //flip y movement direction
        dirY *= -1;
        //change to random hue
        logo.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
    }

    //check if we have hit the corner (let's goooooo)
    if (!win && corner(0.01)) {
        win = true;
        nice.style.display = '';
        setTimeout(() => {
            nice.style.display = 'none';
            win = false;
        }, 1500);
    }

    //update logo location
    logo.style.left = posX + speed * dirX + 'px';
    logo.style.top = posY + speed * dirY + 'px';
}

function oobX(pos) {
    return (
        pos + logo.offsetWidth / 2 > window.innerWidth ||
        pos - logo.offsetWidth / 2 < 0
    );
}

function oobY(pos) {
    return (
        pos + logo.offsetHeight / 2 > window.innerHeight ||
        pos - logo.offsetHeight / 2 < 0
    );
}

//check if we are in a win state (with correction factor for leniency)
function corner(correction) {
    const oL = logo.offsetLeft;
    const oT = logo.offsetTop;
    const oW = logo.offsetWidth;
    const oH = logo.offsetHeight;
    const wW = window.innerWidth;
    const wH = window.innerHeight;

    //corner checks
    if (
        (oL < oW * (0.5 + correction) && oT < oH * (0.5 + correction)) || //TL
        (oL < oW * (0.5 + correction) && oT > wH - oH * (0.5 + correction)) || //BL
        (oL > wW - oW * (0.5 + correction) && oT < oH * (0.5 + correction)) || //TR
        (oL > wW - oW * (0.5 + correction) && oT > wH - oH * (0.5 + correction)) //BR
    ) {
        return true;
    }

    return false;
}

//run the stuff
setup();
setInterval(update, 1000 / 60);

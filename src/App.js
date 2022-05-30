//Canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Define the Variables
let score;
let scoreText;
let dino;
let gravity;
let enemies = [];
let gameSpeed;
let keys = {};

// Event Listeners
document.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});

//Classes (Dino, Enemy, Scoring)
class Dinosaur {
    constructor(x, y, w, h, c) {
        this.x = x; // Position X
        this.y = y; // Position Y
        this.w = w; // Width
        this.h = h; // Height
        this.c = c; // Color

        this.dy = 0; // fall speed
        this.jumpForce = 15;
        this.Dinoheight = h;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Animate() {
        // Jump
        if (keys['Space'] || keys['KeyW']) {
            this.Jump();
        } else {
            this.jumpTimer = 0;
        }
        //Squats
        if (keys['ShiftLeft'] || keys['KeyS']) {
            this.h = this.Dinoheight / 2;
        } else {
            this.h = this.Dinoheight;
        }

        // Gravity (Keep adding gravity to fallspeed until reach bottom)
        this.y += this.dy;
        if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }

        this.Draw();
    }

    Jump() { //Hold to jump higher, up to 15 frames
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpForce;
        }
    }

    Draw() { //Draw the Dinosaur
        let dinobody = document.getElementById("dinob");
        ctx.drawImage(dinobody, this.x, this.y);
    }
}

class Enemy {
    constructor(x, y, w, h, c) {
        this.x = x; // Position X
        this.y = y; // Position Y
        this.w = w; // Width
        this.h = h; // Height
        this.c = c; // Color

        this.dx = -gameSpeed;
    }

    Update() {
        this.x += this.dx;
        this.Draw();
        this.dx = -gameSpeed;
    }

    Draw() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    }
}

class Text {
    constructor(t, x, y, a, c, s) {
        this.t = t; // Text
        this.x = x; // Position X
        this.y = y; // Position Y
        this.a = a; // Text Alignment
        this.c = c; // Text Color
        this.s = s; // Font
    }

    Draw() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.font = this.s + "px sans-serif";
        ctx.textAlign = this.a;
        ctx.fillText(this.t, this.x, this.y);
        ctx.closePath();
    }
}

// Game Functions
function SpawnObstacle() {
    let size = Math.round(Math.random() * 70); //Random sized cactus
    let type = Math.round(Math.random()); //Random spawn cactus or ptero
    let obstacle = new Enemy(canvas.width + size, canvas.height - size, size, size, 'blue');

    if (type == 1) { // ptero enemy
        obstacle.y -= dino.Dinoheight - 10;
    }
    enemies.push(obstacle);
}

function Start() {
    canvas.width = window.innerWidth; //Game follows window size
    canvas.height = window.innerHeight;

    gameSpeed = 3;
    gravity = 1;

    score = 0;


    dino = new Dinosaur(88, 94, 88, 94, 'red');

    scoreText = new Text("Score: " + score, 50, 50, "left", "black", "30");


    requestAnimationFrame(Update);
}

let initialSpawnTimer = 200; // Initially spawn at 200 miliseconds
let spawnTimer = initialSpawnTimer;
function Update() {
    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height); //required to move not clone object


    spawnTimer--; //Timer reduces by 1
    if (spawnTimer <= 0) {
        SpawnObstacle();
        spawnTimer = initialSpawnTimer - gameSpeed * 8;
        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    // Spawn Enemies
    for (let i = 0; i < enemies.length; i++) {
        let o = enemies[i];

        if (o.x + o.w < 0) {
            enemies.splice(i, 1);
        }

        if (
            dino.x < o.x + o.w &&
            dino.x + dino.w > o.x &&
            dino.y < o.y + o.h &&
            dino.y + dino.h > o.y
        ) {
            enemies = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            window.alert("You Lose!");
        }

        o.Update();
    }

    dino.Animate();

    score++;
    scoreText.t = "Score: " + score;
    scoreText.Draw();

    gameSpeed += 0.003;
}

export default Start;

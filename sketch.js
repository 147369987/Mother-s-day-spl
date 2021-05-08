var PLAY = 1;
var end = 0;
var gamestate = 1;
var gameOver;
var sword, swordImage;
var fruit, fruitGroup, fruit1, fruit2, fruit3, fruit4;
var enemyGroup, enemy1, enemy2;
var score;

function preload(){
//Loading all images
  swordImage=loadImage("knife.png");
  fruit1 =loadImage("fruit1.png");
  fruit2 =loadImage("fruit2.png");
  fruit3 =loadImage("fruit3.png");
  fruit4 =loadImage("fruit4.png");
  enemy1 =loadImage("alien1.png");
  enemy2 = loadImage("alien2.png");
  gameOver = loadImage("amma.jpg");
  
  gameOverSound = loadSound("mom.m4a");
  slashingSound = loadSound("knifeSwoosh.mp3");
}

function setup(){
//Creating canvas
  createCanvas(600, 600);
//Creating Sword
  sword = createSprite(150, 300, 10, 10);
  sword.addImage("sword", swordImage);
  sword.addImage("gameOver", gameOver);
  sword.scale=0.5;
//Creating the enemy and fruit group
  EnemyGroup = createGroup();
  FruitGroup = createGroup();
//Creating the score
  score = 0;
}

function draw(){

  background("LightBlue");

  
  
 
 
  if (gamestate === PLAY){
    sword.y=World.mouseY;
    sword.x = World.mouseX; 
    fill("black");
  text("Score :"+score, 300, 40);
    if (sword.isTouching(FruitGroup)){
      FruitGroup.destroyEach();
      score = score+5;
      slashingSound.play();
    }
      
    if(sword.isTouching(EnemyGroup)){
      gamestate = end;
      gameOverSound.play();
    } 
    createFruitGroup();
    createEnemyGroup();
  }
  
  

//Gamestate end
  if (gamestate === end){
    FruitGroup.setVelocityXEach(0);
    EnemyGroup.setVelocityXEach(0);
    FruitGroup.setLifetimeEach(-1);
    EnemyGroup.setLifetimeEach(-1);
    sword.changeImage("gameOver");
    sword.x=300;
    sword.y=300;
    sword.scale=0.2;
    EnemyGroup.destroyEach();
    textSize(26);
  fill("black");
  text("Happy Mother's day Amma ", 150, 560);
  }
 
//Displaying sprites
  drawSprites();
}

//The fruit group
function createFruitGroup(){
  
  if (frameCount % 60 === 0){
    var fruit = createSprite(600,random(1,600),100,40);
    var side = Math.round(random(1,2));
    if (side===1){
    fruit.x=0;
    fruit.velocityX=(10+score/4);
    }
    else {
    fruit.x=600;
    fruit.velocityX=-(10+score/4);
    }
    
    fruit.scale = 0.2;
    var rand = Math.round(random(1,4));
    
    switch(rand) {
      case 1: fruit.addImage(fruit1);
      break;
      case 2: fruit.addImage(fruit2);
      break;
      case 3: fruit.addImage(fruit3);
      break;
      case 4: fruit.addImage(fruit4);
      break;
      default: break;
    }
    
    FruitGroup.add(fruit);
  }
}

//The enemy group
function createEnemyGroup(){
  
  if (frameCount % 150 === 0){
    var enemy = createSprite(600,random(1,600),100,40);
    var side = Math.round(random(1,2));
    if (side===1){
    enemy.x=0;
    enemy.velocityX=(12+score/10);
    }
    else {
    enemy.x=600;
    enemy.velocityX=-(7+score/10);
    }
    
    var rand = Math.round(random(1,2));
    
    switch(rand) {
      case 1: enemy.addImage(enemy1);
      break;
      case 2: enemy.addImage(enemy2);
      break;       
      default: break;
    }
    
    EnemyGroup.add(enemy);
  }
}


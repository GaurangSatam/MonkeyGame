// to declare variables
var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var FoodGroup,obstacleGroup;
var ground,invisble;
var survivaltime;
var PLAY=1;
var END=0;
var gameState=1;


function preload(){
  
 monkey_running =                    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",  "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 }


function setup() {
 
  createCanvas(500,500);
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey = createSprite(70,374,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(250,410,1000,10);
  ground.x = ground.width / 2;

  invisible = createSprite(250,410,1000,10)
  invisible.x = ground.width / 2;
}


function draw() {
 background("lightgreen");
  if (gameState === PLAY){
    
    if(ground.x < 0){
    ground.x = ground.width/2;
    }
    if(invisible.x < 0){
    invisible.x = invisible.width/2; 
 }
    invisible.velocityX = -5;
    
    if (keyDown("space")){
      monkey.velocityY=-20;
 }
    score = Math.round(frameCount / 3);
    survivalTime = Math.ceil(frameCount / frameRate());
    ground.velocityX = - (5 + 2 * score/100);
    
    if (monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
   
   Food();
   Obstacle();
  
   if (monkey.isTouching(obstacleGroup)){
     gameState = END;
   }
    
  else if (gameState === END){
    ground.velocityX = 0;
    invisible.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
 }
    monkey.velocityY = monkey.velocityY + 1.3;
    monkey.collide(invisible);
    
    stroke("black");
    textSize(20);
    fill("red");
    text("score :"+ score,400,50);
    
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival Time : "+ survivalTime,100,50);
    
  
  
 drawSprites();
 }
  

function Food(){
  var banana = createSprite(500,10,10,20);
  banana.addImage("banana",bananaImage);
  banana.velocityX = -(5 + 2 * score / 100)
  banana.y=Math.round(random(120,200));
  banana.scale = 0.075;
  FoodGroup.add(banana);
  FoodGroup.setLifetimeEach(100);
  banana.setCollider("rectangle",0,0,400,400);
    
}

function Obstacle(){
  var obstacle = createSprite(500,365,23,32);
  obstacle.velocityX=-(5 + 2 * score / 100);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale=0.2;
  obstacleGroup.add(obstacle);
  obstacleGroup.setLifetimeEach(100);
  obstacle.setCollider("circle",0,0,200)
  
  
}
}




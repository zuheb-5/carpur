var playercar,playercarimg;

var road, roadimg;

var car;

var score;

var logo;

var cargroup;

var GAMESTATE = 1;
var PLAY = 1;
var END = 0;
var PAUSESTATE = 2;

var over;

var cursor1;

var resetimg;

var gameover;

var pausereset;

var pause;

var pauseimg;

var startgame

function preload(){
  
 roadimg = loadAnimation("carracingimage.jpg");
  
 carimg = loadImage("car.png");
  
 MONSTERTRUCK = loadImage("MONSTERTRUCK.png");

  audio = loadSound("melodyloops-adrenaline.mp3")
  
  logoimg = loadImage("logoforgame.png")
  
 pic = loadImage("police.png");
  
 taxi1 = loadImage("taxi.png");
  
 fire = loadImage("firewicket.png");
  
resetimg = loadImage("gamereset.png");
  
  pauseimg = loadImage("pauseimg.png")

  build = loadImage("Picture1.png")
  
  resetpauseimg = loadImage("resetbutton.png");
  
  stateimg = loadImage("startracing.jpg");
  
  startimg = loadImage("start.png");
  
  purple1 = loadImage("purplecar.png");
  
  mycursor = loadImage("myawesomecursor.png")
  
  gameover = loadImage("gameover.png")

  
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
    
  
  road = createSprite(width/2,200,10,10);
  road.addAnimation("roadimg",roadimg);
  road.scale = 2
  
  road1 = createSprite(width/2,600,10,10);
  road1.addAnimation("roadimg",roadimg);
  road1.scale = 1.350
  
  
 
  score = 0;
  

  
    road2 = createSprite(width/2,400,10,10);
  road2.addAnimation("roadimg",roadimg);
  road2.scale = 1.350;
  
  
  
   startgame = createSprite(width/2,300,10,10);
   startgame.addImage(stateimg)
  startgame.scale = 3
  startgame.visible = false;
  
      start = createSprite(width/2,height-300,40,20);
      start.addImage(startimg)
      start.scale = 0.150;
  
  over = createSprite(width/2-10,height/2-70,20,20);
  over.visible = false;
  over.addImage(resetimg);
  over.scale = 0.15
  
  logo = createSprite(width/2,height-600,20,20);
  logo.addImage(logoimg)
  logo.scale = 2;
  
  car = createSprite(800,320,10,10);
  car.addImage(carimg);
  car.scale = 0.150;
  
  cursor1 = createSprite(0,0, 20, 20);
  cursor1.addImage(mycursor);
  cursor1.scale = 0.1
 
  pause = createSprite(110,30, 20, 20);
  pause.addImage(pauseimg);
  pause.scale = 0.1;

  cargroup = new Group();
  
  
  GAMESTATE = 3;
  PAUSESTATE = 0;
  PLAY = 1
  END = 0;
  STARTSTATE = 3;


over.depth = car.depth + 1;
over.depth = cargroup.depth;
over.depth = over.depth + 1;

cursor1.depth = pause.depth + 1;
cursor1.depth = pause.depth;
cursor1.depth = cursor1.depth + 1;
 

}

function draw(){
  background("lightgreen");
  
  //score = score + Math.round(getFrameRate()/60);


   cursor1.x = mouseX;
   cursor1.y = mouseY;

   drawSprites();
if(GAMESTATE === PLAY) {
   car.visible = true;
   pause.visible = true;
    car.x = mouseX;
   image(build,displayWidth/4-340,0,80)
   image(build,displayWidth+375,0,80)
        road1.velocityY = 10;
      road2.velocityY = 10;
      road.velocityY =  10;

    if (mousePressedOver(pause)) {
    cargroup.setVelocityYEach(0);
    audio.pause();
    car.velocityX  = 0;
    road1.velocityY = 0;
    road2.velocityY = 0;
    road.velocityY =  0;
    road.y = 200;
    road1.y = 600
    road2.y= 400
    pause.addImage(resetpauseimg)
  }
  
      spawnTRUCK();
      spawncar();
      taxi();
      fire1();
      purple();
  
  if(car.isTouching(cargroup)) {
      road1.velocityY = 0;
      road2.velocityY = 0;
      road.velocityY =  0;
      cargroup.setVelocityYEach(0);
      GAMESTATE = END;
      cargroup.setLifetimeEach(-1)
}
  

  

        if(cargroup.x < width/5.6) {
          cargroup.destroyEach()
        }
  
     if (road.y > 400)  {
    road.y = 0;
  }
  
  if(cargroup.isTouching(cargroup)) {
      cargroup.destroyEach();
  }
    
    if (road1.y > 400)  {
    road1.y = 0
  }
  
      if (road2.y > 200)  {
    road2.y = -100
  }

 } else if(GAMESTATE === END) {
       // PP = createSprite(200,200,50,50)
       over.visible = true;
       pause.visible = false;
       audio.pause();
       image(build,displayWidth/4-340,0,80)
       image(build,displayWidth+375,0,80)
       image(gameover,displayWidth/2+50,displayHeight/2)
       if(mousePressedOver(over)) {
           reset();

       }
   } else if (GAMESTATE === STARTSTATE) {
      startgame.visible = true;
      car.visible = false;
      pause.visible = false;
      

      if (mousePressedOver(start)) {
            reset();
          start.visible = false;
          startgame.visible = false;
          audio.play();
          logo.visible = false;
      }
      
   }

  


 // text("Score: "+ score, 500,50);

  
}

function spawnTRUCK() {
  
  if (frameCount % 200 === 0) {
    var car = createSprite(400,0,40,10);
    car.x = Math.round(random(width/2,width/5));
    car.addImage(MONSTERTRUCK);
    car.scale = 0.8;
    car.velocityY = Math.round(random(10,20))
    
     //assign lifetime to the variable
    car.lifetime = 200;
    
       // car.debug= true;
    car.setCollider("rectangle",10,0,100,180)
    
    
    
    cargroup.add(car);
  }
  
}

function spawncar() {
  
  if (frameCount % 280 === 0) {
    var car = createSprite(400,0,40,10);
    car.x = Math.round(random(width/1.5,width/5.5));
    car.addImage(pic);
    car.scale = 0.350
    car.velocityY = Math.round(random(8,20))
    
     //assign lifetime to the variable
    car.lifetime = 200;
    
       // car.debug= true;
    car.setCollider("rectangle",10,0,130,400)
    
    //add each cloud to the group
    cargroup.add(car);
  }
  
}

function taxi() {
  
  
    
  if (frameCount % 120 === 0) {
    var car = createSprite(width/2,-30,40,10);
    car.x = Math.round(random(width/1.5,width/4));
    car.addImage(taxi1);
    car.scale = 0.4;
    car.velocityY = 14;
    
     //assign lifetime to the variable
    car.lifetime = 200;
   // car.debug= true;
    car.setCollider("rectangle",10,0,100,400)
    
    
    
    cargroup.add(car);
  }
  }

function fire1() {
  if (frameCount % 300 === 0) {
    var car = createSprite(width/2,height-50,40,10);
    car.x = Math.round(random(width/2,width/3.4));
  
    car.addImage(fire);
    car.scale = 1
    car.velocityY = Math.round(random(-10,-20))
    
     //assign lifetime to the variable
    car.lifetime = 200;
    car.setCollider("rectangle",199,0,-60,230);
  
    cargroup.add(car);
   // car.debug = true;

      }
  }

function purple() {
  if (frameCount % 150 === 0) {
    var car = createSprite(width/2,-20,40,10);
    car.x = Math.round(random(width/2,width/4));
  
    car.addImage(purple1);
    car.scale = 0.375
    car.velocityY = Math.round(random(15,20))
    
     //assign lifetime to the variable
    car.lifetime = 200;
    car.setCollider("rectangle",0,0,-140,389);
  
    cargroup.add(car);
  // car.debug = true;

      }
  }

function reset() {
  GAMESTATE = PLAY;
  
  
  car.x = width/2;
  car.y = height-200;
 // cargroup.setVelocityYEach(Math.round(random(5,20)));

  road1.velocityY = 10
    road.velocityY = 10
  road2.velocityY = 10;
  over.visible = false;
  cargroup.destroyEach();
  

}




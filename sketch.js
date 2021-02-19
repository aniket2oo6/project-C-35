var balloon;
var database,position,db;

function preload(){
  balloonImg = loadImage("balloonimg.png");
  backgroundImg = loadImage("bg.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,800);
  balloon = createSprite(250,650,40,40);
  balloon.addImage(balloonImg);
  balloon.scale = 0.5;
  db = database.ref("balloon/position");
  db.on("value",readPosition);
}
function draw() {
  background(backgroundImg);  
  if(position !== undefined){
    if(keyDown(UP_ARROW)){
     writePosition(0,-1);
    }else if(keyDown(DOWN_ARROW)){
     writePosition(0,+1);
    }else if(keyDown(LEFT_ARROW)){
     writePosition(-1,0);
    }else if(keyDown(RIGHT_ARROW)){
     writePosition(1,0);
    }
    drawSprites();
  }
 
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function writePosition(x,y){
  database.ref("balloon/position").set({
    x:position.x + x,
    y:position.y + y
  })
}
//Create variables here
var dog, dogImg, happyDog, foodS, foodStock;

var database;

function preload()
{
  dogImg = loadImage("../images/dogImg.png");
  happyDog = loadImage("../images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  dog = createSprite(280, 300);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() { 
  background(46, 139, 87); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  fill("yellow");
  textSize(20);
  text("Food Remaining: " + foodS, 172,200);

  textSize(20);
  text("Note: Press UP ARROW key to feed Buddy milk!", 40, 20);

}

//function to write values in database
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  });
}

//function to read values from database
function readStock(data){
  foodS = data.val();
}
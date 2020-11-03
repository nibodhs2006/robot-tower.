var robot,robot_image,spikes_image,door_image,glitch,glitch_image,
    spooky_sound

var PLAY= 1

var END= 0

var gamestate=PLAY

var spikesGroup,doorGroup,invisibleGroup

function preload (){

  robot_image=loadImage("robot.png")
  spikes_image=loadImage("spikes.png")
  glitch_image=loadImage("glitch.png")
  door_image = loadImage("door.png")
  
  spooky_sound=loadSound("spooky.wav")
}
function setup (){
  createCanvas(500,600)
  
  glitch=createSprite(250,300,30,40)
  glitch.addImage(glitch_image)
  glitch.scale=0.7
  glitch.velocityY=1
  
  
  
  robot=createSprite(250,300,20,10)
  robot.addImage(robot_image)
  robot.scale=0.3
  
  spikesGroup= new Group()
  doorGroup= new Group()
  invisibleGroup=new Group()
}
function draw () {
  if(gamestate===PLAY){
     if(glitch.y>400){
       glitch.y=300 
     }
    
  if(keyDown("space"))
    robot.velocityY=-10
    
    robot.velocityY=robot.velocityY+0.5
    
   if(keyDown("right")) 
    robot.x=robot.x+6
    
    if(keyDown("left"))
     robot.x=robot.x-6 
      
    if(spikesGroup.isTouching(robot)){
      robot.velocityY=0
      
    }
    
    if(invisibleGroup.isTouching(robot)||robot.y>600){
      robot.destroy()
      gamestate=END
      
    }
      
    
    
      spawndoors()
   drawSprites()  
  }
 if(gamestate===END){
   background('red')
   textSize(30)
   stroke(60)
   fill('cyan')
   text("GAMEOVER",150,280)
 }
  
  
 
}

function spawndoors(){
  if(frameCount%250===0){
    var door = createSprite(200, -50);
    door.velocityY=1
    door.addImage(door_image)
    door.lifetime = 600
    
    var spikes = createSprite(200,10);
    spikes.velocityY=1
    spikes.addImage(spikes_image) 
    spikes.lifetime = 600
    spikes.scale=0.1
    
    var invisibleBlock = createSprite(200,15,spikes.width,2);
    invisibleBlock.visible=false 
     invisibleBlock.velocityY=1
    invisibleBlock.lifetime=600
    
    door.x = Math.round(random(100,350))
    spikes.x=door.x
    invisibleBlock.x=door.x
    
    doorGroup.add(door)
    spikesGroup.add(spikes)
    invisibleGroup.add(invisibleBlock)
    
    robot.depth = door.depth; 
    robot.depth +=1;
  }
}



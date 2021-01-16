class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1Image);
    car2 = createSprite(300,200);
    car2.addImage(car2Image);
    car3 = createSprite(500,200);
    car3.addImage(car3Image);
    car4 = createSprite(700,200);
    car4.addImage(car4Image);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    background("green");

    image(trackImage, 0,- displayHeight*4, displayWidth, displayHeight*5);

    Player.getPlayerInfo();
    player.getRank()
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 190;
      var y;
      var x2;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distanceY;
        x2 = allPlayers[plr].distanceX;
        cars[index-1].x = x2;
        cars[index-1].y = y;
        

        if (index === player.index){
          fill("red");
          ellipse(x, y, 60, 60);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }

        fill("white")
        textSize(15);
        textFont("georgia");
        textAlign(CENTER);
        text(allPlayers[plr].name, x, y+70);
        
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(player.index !== null){
      if(keyIsDown(UP_ARROW) ) {
        player.distanceY +=10
        player.update();
      }
      if(keyIsDown(LEFT_ARROW)) {
        player.distanceX -=10
        player.update();
      }
      if(keyIsDown(RIGHT_ARROW)) {
        player.distanceX +=10
        player.update();
      }
    }

    if(player.distanceY >= 4280) {
      gameState=2;
      rank++;
      player.updateRank(rank)
      
    }

    drawSprites();
  }

  end(){

    console.log(player.name + ", your rank is "+rank+ "!!!");
    
  }
}

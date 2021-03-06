class Game {
  constructor(){}

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
    car1.addImage('player1',p1);
    car2 = createSprite(200,200);
    car2.addImage('player2',p2);
    car3 = createSprite(300,200);
    car3.addImage('player3',p3);
    car4 = createSprite(400,200);
    car4.addImage('player4',p4);
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0;
      var x = 200;
      var y;
      background('#C68767');
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
      for(var plr in allPlayers){
        index = index +1;
        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(index === player.index){
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
        else{
          fill("blue");
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>3850){
      gameState = 2;
    }
    drawSprites();
  }
  
  end(){
    game.update(2);
  }
}

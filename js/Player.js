class Player {
  constructor(){
    this.index = null;
    this.distanceY = 0;
    this.name = null;
    this.distanceX = 0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distanceY:this.distanceY,
      distanceX:this.distanceX
    });
  }

  getRank() {
    var rankRef = database.ref("Rank");
      rankRef.on("value", (data)=> {
        rank = data.val();
      })
  }

  updateRank(r) {
    database.ref("/").update({
      Rank:r
    })
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}

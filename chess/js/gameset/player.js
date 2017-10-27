define("gameset/Player", function () {
  function Player(config) {
    this.name = config.name || "";
    this.side = config.side;
    this.nickName = config.nickName || "";
  }

  function SelfPlayer() {
    Player.apply(this, arguments);
  }
  SelfPlayer.prototype = Object.create(Player.prototype);

  function Opponent() {
    Player.apply(this, arguments);
  }
  Opponent.prototype = Object.create(Player.prototype);

  return {
    SelfPlayer: SelfPlayer,
    Opponent: Opponent
  };
});
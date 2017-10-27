define(["gameset/ChessMan", "gameset/gameobject", "gameset/chessboard", "gameset/utility", "gameset/Player", "db/chessdata"], function (ChessMan, gameobject, chessboard, utility, Player, chessdata) {
  function initChessMan(metaData, side) {
    var chess,
      i,
      stage = gameobject.getStage(),
      layer = gameobject.getLayer(),
      chessList = gameobject.getChessList(),
      chessFactory = new ChessMan.ChessmanFactory();

    for (i = 0; i < metaData.length; i++) {
      chess = chessFactory.createChessMan(metaData[i].name, {id: metaData[i].id,
        side: side,
        isSelf: metaData[i].isSelf === 1 ? true : false,
        chessColor: side,
        chessName: metaData[i].name,
        chineseName: utility.getChessChineseName(metaData[i].name, side),
        pointX: metaData[i].pointX,
        pointY: metaData[i].pointY,
        vindex: metaData[i].vindex,
        hindex: metaData[i].hindex
        });

      chess.drawChess();
      chess.group.setDraggable(false);
      layer.add(chess.group);
      chessList.push(chess);
    }
    stage.add(layer);
  }

  function removeOpponent() {
    var i = 0,
      chessList = gameobject.getChessList(),
      layer = gameobject.getLayer();

    while (i < chessList.length && chessList.length > 0) {
      if (!chessList[i].isSelf) {
        chessList[i].group.remove();
        chessList.splice(i, 1);
        continue;
      }
      i++;
    }

    layer.draw();
    gameobject.setOpponentPlayer(null);
  }

  function resetGame() {
    var i = 0,
      chessList = gameobject.getChessList(),
      layer = gameobject.getLayer();

    for (i = 0; i < chessList.length; i++) {
      chessList[i].group.remove();
    }
    chessList.length = 0;
    layer.draw();
  }

  function setSelfPlayer(player) {
    var self = new Player.SelfPlayer(player);
    gameobject.setSelfPlayer(self);
  }

  function setOpponent(player) {
    var opponent = new Player.Opponent(player);
    gameobject.setOpponentPlayer(opponent);
  }

  function initChessBoard() {
    chessboard.drawChessBoard(gameobject.getStage(), gameobject.getLayer());
  }

  function initSelfChess() {
    var side = gameobject.getSelfPlayer().side;
    initChessMan(chessdata.getSelfData(), side);
  }

  function initOpponentChess() {
    var side = gameobject.getOpponentPlayer().side;
    initChessMan(chessdata.getOpponentData(), side);
  }

  function isOpponentChessInited() {
    var i,
      inited,
      chessList,
      side;

    inited = false;
    chessList = gameobject.getChessList();
    side = gameobject.getOpponentPlayer().side;
    for (i = 0; i < chessList.length; i++) {
      if (chessList[i].side === side) {
        inited = true;
        break;
      }
    }
    return inited;
  }

  function clearChessList() {
    gameobject.clearChessList();
  }

  function moveChess(step) {
    var i,
      chess,
      layer = gameobject.getLayer(),
      chessList = gameobject.getChessList();

    for (i = 0; i < chessList.length; i++) {
      if (chessList[i].id === step.id) {
        chess = chessList[i];
        break;
      }
    }

    chess.group.setPosition(step.x, step.y);
    chess.updateChessStatus(step.x, step.y);
    layer.draw();
  }

  return {
    initChessBoard: initChessBoard,
    initSelfChess: initSelfChess,
    initOpponentChess: initOpponentChess,
    isOpponentChessInited: isOpponentChessInited,
    removeOpponent: removeOpponent,
    setSelfPlayer: setSelfPlayer,
    setOpponent: setOpponent,
    clearChessList: clearChessList,
    resetGame: resetGame,
    moveChess: moveChess
  };
});
require(["domReady", "jquery", "gameset/chessservice", "gameset/chessmanservice", "socketstub"], function (domReady, $, chessservice, chessmanservice, stub) {
  domReady(function () {
    var self,
      opponent,
      playerInfo = {roomId: sessionStorage.roomId,
                   userId: sessionStorage.userId,
                   userName: sessionStorage.userName};

    stub.joinGame(playerInfo);
    stub.getSocket().on("updateJoinGameStatus", function (result) {
      onJoinGameCompleted(result);
    });

    stub.getSocket().on("updatePlayer", function (result) {
      onUpdatePlayerCompleted(result);
    });

    stub.getSocket().on("updateStartGameStatus", function (result) {
      onUpdateStartGameStatusCompleted(result);
    });

    stub.getSocket().on("notifyStartGameStatus", function (result) {
      onNotifyStartGameStatusCompleted(result);
    });

    stub.getSocket().on("updateExitGameStatus", function (result) {
      onUpdateExitGameStatusCompleted(result);
    });

    stub.getSocket().on("notifyStep", function (result) {
      onUpdateStepCompleted(result);
    });

    $("#btnStart").click(function () {
      this.disabled = true;
      chessservice.initSelfChess();
      stub.startGame(playerInfo);
    });

    $("#btnExit").click(function () {
      stub.exitGame(playerInfo);
    });

    $("#btnOver").click(function () {      
      $("#layerPopup").hide();
      $("#overlay").hide();
      chessservice.resetGame();
      $("#btnStart").attr("disabled", false);
    });
 
    $(window).bind("beforeunload", function() {
      if (sessionStorage.roomId !== "null") {
        stub.exitGame(playerInfo);
      }
    });

    chessmanservice.addSuccessCallback(handleSuccess);

    function handleSuccess() {
      stub.endGame(playerInfo);
      popupLayer("您赢得了比赛!");
    }

    function popupLayer(message) {
      var popup,        
        left,
        top,
        win,
        overlay;

      win = $(window);
      popup = $("#layerPopup");
      $("#popupText").text(message);
      left = win.scrollLeft() + (win.width() - popup.width()) / 2;
      top = win.scrollTop() + (win.height() - popup.height()) / 2;
      popup.css({"left": left, "top": top, "z-index": 100});
      popup.show();

      overlay = $("#overlay");
      overlay.css({"z-index": 99, "opacity": 0.5, "visibility": "visible"});
      overlay.show();
    }

    function setPlayers(result) {
      if (!!result.PlayerA && result.PlayerA.Id === playerInfo.userId) {
        self = result.PlayerA;
        opponent = result.PlayerB;
      } else if (!!result.PlayerB && result.PlayerB.Id === playerInfo.userId) {
        self = result.PlayerB;
        opponent = result.PlayerA;
      }
    }

    function onUpdateStartGameStatusCompleted(result) {
      if (result.Start) {
        if (self.Side === "red") {
          chessmanservice.setChessesDraggable(true);
          chessmanservice.attachLayerClickEvent();
        }
        if (!chessservice.isOpponentChessInited()) {
          chessservice.initOpponentChess();
        }        
      }
    }

    function onNotifyStartGameStatusCompleted(result) {
      chessservice.initOpponentChess();
      if (result.Start) {
        if (self.Side === "red") {
          chessmanservice.setChessesDraggable(true);
          chessmanservice.attachLayerClickEvent();
        }
      }
    }

    function onUpdateExitGameStatusCompleted(result) {
      if (result.status === "Fail") {
        alert("不能在游戏进行时退出!");
      } else if (result.status === "Success") {
        chessservice.clearChessList();
        sessionStorage.roomId = null;
        window.location = "lobby.htm";
      }
    }

    function onUpdatePlayerCompleted(result) {
      setPlayers(result);
      if (opponent !== undefined && opponent !== null) {
        chessservice.setOpponent({name: opponent.Id, side: opponent.Side, nickName: opponent.Name});
        $("#opponentName").text(opponent.Name);
      } else {
        chessservice.removeOpponent();
        $("#opponentName").text("");
      }
    }

    function onJoinGameCompleted(result) {
      if (result.Message === "Fail") {
        window.location = "lobby.htm";
      } else if (result.Message === "Success") {
        setPlayers(result);
        chessservice.initChessBoard();
        if (!!self) {
          chessservice.setSelfPlayer({name: self.Id, side: self.Side, nickName: self.Name});
          $("#selfName").text(self.Name);
        }
        if (!!opponent) {
          chessservice.setOpponent({name: opponent.Id, side: opponent.Side, nickName: opponent.Name});
          $("#opponentName").text(opponent.Name);
          if (opponent.Started) {
            chessservice.initOpponentChess();
          }
        }
      }
    }

    function onUpdateStepCompleted(result) {
      chessservice.moveChess(result);
      chessmanservice.setChessesDraggable(true);
      chessmanservice.attachLayerClickEvent();
      if (result.isWin) {
        stub.endGame(playerInfo);
        popupLayer("您输掉了比赛!");
      }
    }
  });
});
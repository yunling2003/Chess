define(["gameset/gameobject", "socketstub"], function (gameobject, stub) {
  var successCallbacks = [];

  function addSuccessCallback(callback) {
    successCallbacks.push(callback);
  }

  function onSuccess() {
    var i;
    for (i = 0; i < successCallbacks.length; i++) {
      if (successCallbacks[i] && typeof (successCallbacks[i]) === "function") {
        successCallbacks[i]();
      }
    }
  }

  function clearAllChessFocus() {
    var i,
      j,
      chessList = gameobject.getChessList();

    for (i = 0; i < chessList.length; i++) {
      if (chessList[i].isFocus) {
        chessList[i].isFocus = false;
        clearInterval(chessList[i].focusObj);
        chessList[i].focusObj = null;

        for (j in chessList[i].group.children) {
          if (typeof chessList[i].group.children[j] === "object" && chessList[i].group.children[j].nodeType === "Shape") {
            chessList[i].group.children[j].setOpacity(1);
          }
        }
        break;
      }
    }
  }

  function setChessesDraggable(draggable) {
    var i,
      chessList = gameobject.getChessList();

    for (i = 0; i < chessList.length; i++) {
      if (chessList[i].isSelf) {
        chessList[i].group.setDraggable(draggable);
      }
    }
  }

  function getFocusedChess() {
    var i,
      chess,
      chessList = gameobject.getChessList();

    for (i = 0; i < chessList.length; i++) {
      if (chessList[i].isFocus) {
        chess = chessList[i];
        break;
      }
    }
    return chess;
  }

  function findChessByPosition(x, y) {
    var i,
      chess,
      chessList = gameobject.getChessList();

    for (i = 0; i < chessList.length; i++) {
      if (chessList[i].pointX === x && chessList[i].pointY === y && chessList[i].status === "alive") {
        chess = chessList[i];
        break;
      }
    }
    return chess;
  }

  function findChessByName(name, side) {
    var i,
      chess,
      chessList = gameobject.getChessList();

    for (i = 0; i < chessList.length; i++) {
      if (chessList[i].chessName === name && chessList[i].side === side && chessList[i].status === "alive") {
        chess = chessList[i];
        break;
      }
    }
    return chess;
  }

  function updateChessStatus(chess) {
    var i,
      isWin,
      chessList = gameobject.getChessList();

    isWin = false;
    for (i = 0; i < chessList.length; i++) {
      if (chessList[i].id === chess.id) {
        chessList[i].pointX = chess.pointX;
        chessList[i].pointY = chess.pointY;
        chessList[i].hindex = chess.hindex;
        chessList[i].vindex = chess.vindex;
      }
      if (chessList[i].pointX === chess.pointX && chessList[i].pointY === chess.pointY && chessList[i].side !== chess.side) {
        chessList[i].status = "killed";
        chessList[i].group.remove();
        if (chessList[i].chessName === "general") {
          isWin = true;
        }
      }
    }
    return isWin;
  }

  function getXCount(fromX, fromY, toX, toY, chess) {
    var i,
      xCount = 0,
      yCount = 0,
      chessList = gameobject.getChessList();

    for (i = 0; i < chessList.length; i++) {
      if (chess.id !== chessList[i].id && chessList[i].status === "alive") {
        if (fromY === chessList[i].pointY && Math.min(fromX, toX) < chessList[i].pointX && chessList[i].pointX < Math.max(fromX, toX)) {
          xCount++;
        }
        if (fromX === chessList[i].pointX && Math.min(fromY, toY) < chessList[i].pointY && chessList[i].pointY < Math.max(fromY, toY)) {
          yCount++;
        }
      }
    }

    return {
      xn: xCount,
      yn: yCount
    };
  }

  function attachLayerClickEvent() {
    var layer = gameobject.getLayer();
    layer.on("click", function (evt) {
      var x,
        y,
        pos,
        isNewStep,
        focusChess,
        isWin;

      isWin = false;
      pos = this.parent.getMousePosition();
      x = Math.round((pos.x - 80) / 80) * 80 + 80;
      y = Math.round((pos.y - 90) / 80) * 80 + 90;

      focusChess = getFocusedChess();
      if (focusChess !== undefined) {
        if (focusChess.canMove(x, y)) {
          if (x !== focusChess.pointX || y !== focusChess.pointY) {
            isNewStep = true;
          }
          focusChess.group.setPosition(x, y);
          isWin = focusChess.updateChessStatus(x, y);
          if (isNewStep) {
            setNextStep({id: focusChess.id, chessName: focusChess.ChineseName, x: focusChess.pointX, y: focusChess.pointY, vindex: focusChess.vindex, hindex: focusChess.hindex, side: focusChess.side, isWin: isWin});
          }
        }
      }
    });
  }

  function deAttachLayerClickEvent() {
    var layer = gameobject.getLayer();
    layer.off("click");
  }

  function setNextStep(stepInfo) {
    var self = gameobject.getSelfPlayer();
    stepInfo.roomId = sessionStorage.roomId;
    stepInfo.userId = self.name;
    setChessesDraggable(false);
    deAttachLayerClickEvent();
    stub.playStep(stepInfo);
    if (stepInfo.isWin) {
      onSuccess();
    }
  }

  return {
    clearAllChessFocus: clearAllChessFocus,
    setChessesDraggable: setChessesDraggable,
    getFocusedChess: getFocusedChess,
    findChessByPosition: findChessByPosition,
    findChessByName: findChessByName,
    updateChessStatus: updateChessStatus,
    getXCount: getXCount,
    attachLayerClickEvent: attachLayerClickEvent,
    deAttachLayerClickEvent: deAttachLayerClickEvent,
    setNextStep: setNextStep,
    addSuccessCallback: addSuccessCallback
  };
});
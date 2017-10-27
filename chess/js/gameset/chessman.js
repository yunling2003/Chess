define("gameset/ChessMan", ["gameset/chessmanservice", "gameset/gameobject", "gameset/utility"], function (chessmanservice, gameobject, utility) {
  function ChessMan(config) {
    this.id = config.id || 0;
    this.isSelf = config.isSelf || false;
    this.side = config.side || "";
    this.chessColor = config.chessColor || "";
    this.chessName = config.chessName || "";
    this.chineseName = config.chineseName || "";
    this.pointX = config.pointX || 0;
    this.pointY = config.pointY || 0;
    this.radius = config.radius || 30;
    this.vindex = config.vindex || 0;
    this.hindex = config.hindex || 0;
    this.group = null;
    this.status = "alive";
    this.isFocus = false;
    this.isDragging = false; //parameter add as workaround of defect 357.
    this.focusObj = null;
  }

  ChessMan.prototype = {
    drawChess: function () {
      var circle,
        text;

      circle = new Kinetic.Circle({
        name: "circle",
        radius: this.radius,
        fill: "#DBC49A",
        stroke: "orange",
        strokeWidth: 1
      });

      text = new Kinetic.Text({
        x: -20,
        y: -20,
        text: this.chineseName,
        fill: this.chessColor,
        fontSize: 40,
        fontFamily: "楷体",
        stroke: this.chessColor,
        strokeWidth: 1,
        align: "center",
        verticalAlign: "middle",
        padding: 1
      });

      this.group = new Kinetic.Group({
        x: this.pointX,
        y: this.pointY,
        owner: this,
        draggable: true
      });

      this.group.on("mouseover", function () {
        if (!this.getAttrs().owner.isSelf) {
          return;
        }

        this.get(".circle")[0].setStrokeWidth(3);
        this.get(".circle")[0].setStroke("#4096EE");
        gameobject.getLayer().draw();
        document.body.style.cursor = "pointer";
      });

      this.group.on("mouseout", function () {
        if (!this.getAttrs().owner.isSelf) {
          return;
        }

        this.get(".circle")[0].setStrokeWidth(1);
        this.get(".circle")[0].setStroke("orange");
        gameobject.getLayer().draw();
        document.body.style.cursor = "default";
      });

      this.group.on("click", function (evt) {
        var i,
          owner = this.getAttrs().owner;

        if (owner.isDragging || !owner.isSelf || (!owner.group.attrs.draggable && !owner.isFocus)) {
          return;
        }

        evt.cancelBubble = true;

        if (owner.isFocus) {
          owner.isFocus = false;
          clearInterval(owner.focusObj);
          owner.focusObj = null;

          for (i in this.children) {
            if (typeof this.children[i] === "object" && this.children[i].nodeType === "Shape") {
              this.children[i].setOpacity(1);
            }
          }

          chessmanservice.setChessesDraggable(true);
          gameobject.getLayer().draw();
          utility.playAudio("select");
          return;
        }

        chessmanservice.clearAllChessFocus();
        this.setDraggable(false);
        owner.isFocus = true;
        owner.focusObj = setInterval(owner.setFocus, 500, this);
        utility.playAudio("select");
      });

      this.group.on("dragstart", function (evt) {
        var focusChess,
          owner = this.getAttrs().owner;

        owner.isDragging = true;
        focusChess = chessmanservice.getFocusedChess();
        if (focusChess !== undefined && focusChess.id !== owner.id) {
          this.setDraggable(false);
        } else {
          this.setDraggable(true);
        }
      });

      this.group.on("dragend", function (evt) {
        var x,
          y,
          isNewStep,
          existChess,
          owner,
          isWin;

        x = Math.round((this.getX() - 80) / 80) * 80 + 80;
        y = Math.round((this.getY() - 90) / 80) * 80 + 90;
        owner = this.getAttrs().owner;
        owner.isDragging = false;

        existChess = chessmanservice.findChessByPosition(x, y);
        if (existChess !== undefined && existChess.id !== owner.id && existChess.side === owner.side) {
          this.setPosition(owner.pointX, owner.pointY);
        } else if (x > 720 || x < 80 || y > 810 || y < 90) {
          this.setPosition(owner.pointX, owner.pointY);
        } else {
          if (owner.canMove(x, y)) {
            if (x !== owner.pointX || y !== owner.pointY) {
              isNewStep = true;
            }
            this.setPosition(x, y);
            isWin = owner.updateChessStatus(x, y);
            if (isNewStep) {
              chessmanservice.setNextStep({id: owner.id, chessName: owner.ChineseName, x: owner.pointX, y: owner.pointY, vindex: owner.vindex, hindex: owner.hindex, side: owner.side, isWin: isWin});              
            }
          } else {
            this.setPosition(owner.pointX, owner.pointY);
          }
        }

        evt.cancelBubble = true;
        gameobject.getLayer().draw();
        utility.playAudio("go");
      });

      this.group.add(circle).add(text);
    },

    canMove: function (x, y) {
      return true;
    },

    setFocus: function (group) {
      var i;
      for (i in group.children) {
        if (typeof group.children[i] === "object" && group.children[i].nodeType === "Shape") {
          if (group.children[i].getOpacity() === 1) {
            group.children[i].setOpacity(0);
          } else {
            group.children[i].setOpacity(1);
          }
        }
      }

      gameobject.getLayer().draw();
    },

    updateChessStatus: function (x, y) {
      this.pointX = x;
      this.pointY = y;
      this.hindex = x / 80;
      this.vindex = (y - 90) / 80 + 1;

      return chessmanservice.updateChessStatus(this);
    }
  };

  function Chariot() {
    ChessMan.apply(this, arguments);
  }
  Chariot.prototype = Object.create(ChessMan.prototype);
  Chariot.prototype.canMove = function (x, y) {
    var xCount;

    xCount = chessmanservice.getXCount(this.pointX, this.pointY, x, y, this);
    if ((this.pointX === x && xCount.yn === 0) || (this.pointY === y && xCount.xn === 0)) {
      return true;
    }
    return false;
  };

  function Horse() {
    ChessMan.apply(this, arguments);
  }
  Horse.prototype = Object.create(ChessMan.prototype);
  Horse.prototype.canMove = function (x, y) {
    var barrierChess;

    if (Math.abs(y - this.pointY) === 160 && Math.abs(x - this.pointX) === 80) {
      barrierChess = chessmanservice.findChessByPosition(this.pointX, (y + this.pointY) / 2);
      if (barrierChess === undefined) {
        return true;
      }
    } else if (Math.abs(y - this.pointY) === 80 && Math.abs(x - this.pointX) === 160) {
      barrierChess = chessmanservice.findChessByPosition((x + this.pointX) / 2, this.pointY);
      if (barrierChess === undefined) {
        return true;
      }
    }
    return false;
  };

  function Elephant() {
    ChessMan.apply(this, arguments);
  }
  Elephant.prototype = Object.create(ChessMan.prototype);
  Elephant.prototype.canMove = function (x, y) {
    var barrierChess;

    if (Math.abs(y - this.pointY) === 160 && Math.abs(x - this.pointX) === 160) {
      barrierChess = chessmanservice.findChessByPosition((x + this.pointX) / 2, (y + this.pointY) / 2);
      if (barrierChess === undefined) {
        if (this.isSelf && y >= 490) {
          return true;
        }
      }
    }
    return false;
  };

  function Knight() {
    ChessMan.apply(this, arguments);
  }
  Knight.prototype = Object.create(ChessMan.prototype);
  Knight.prototype.canMove = function (x, y) {
    if (Math.abs(y - this.pointY) === 80 && Math.abs(x - this.pointX) === 80) {
      if (x >= 320 && x <= 480 && y >= 650 && y <= 810) {
        return true;
      }
    }
    return false;
  };

  function General() {
    ChessMan.apply(this, arguments);
  }
  General.prototype = Object.create(ChessMan.prototype);
  General.prototype.canMove = function (x, y) {
    var chess,
      xCount;

    if (Math.abs(y - this.pointY) + Math.abs(x - this.pointX) !== 80) {
      return false;
    }

    chess = chessmanservice.findChessByName("general", this.side === "red" ? "black" : "red");
    xCount = chessmanservice.getXCount(x, y, chess.pointX, chess.pointY, this);

    if (x === chess.pointX && xCount.yn === 0) {
      return false;
    }
    if (this.isSelf) {
      if (x >= 320 && x <= 480 && y >= 650 && y <= 810) {
        return true;
      }
    }
    return false;
  };

  function Cannon() {
    ChessMan.apply(this, arguments);
  }
  Cannon.prototype = Object.create(ChessMan.prototype);
  Cannon.prototype.canMove = function (x, y) {
    var xCount,
      chess;

    xCount = chessmanservice.getXCount(this.pointX, this.pointY, x, y, this);
    chess = chessmanservice.findChessByPosition(x, y);

    if ((x === this.pointX && ((xCount.yn === 0 && chess === undefined) || (xCount.yn === 1 && chess !== undefined))) ||
        (y === this.pointY && ((xCount.xn === 0 && chess === undefined) || (xCount.xn === 1 && chess !== undefined)))) {
      return true;
    }
    return false;
  };

  function Soldier() {
    ChessMan.apply(this, arguments);
  }
  Soldier.prototype = Object.create(ChessMan.prototype);
  Soldier.prototype.canMove = function (x, y) {
    if (Math.abs(y - this.pointY) + Math.abs(x - this.pointX) !== 80) {
      return false;
    }
    if (this.isSelf) {
      if ((x === this.pointX && y < this.pointY) || (y === this.pointY && this.pointY <= 410)) {
        return true;
      }
    }
    return false;
  };

  function ChessmanFactory() {}
  ChessmanFactory.prototype.createChessMan = function (chessType) {
    var chess,
      config = Array.prototype.slice.call(arguments, 1)[0];

    switch (chessType) {
    case "chariot":
      chess = new Chariot(config);
      break;
    case "horse":
      chess = new Horse(config);
      break;
    case "elephant":
      chess = new Elephant(config);
      break;
    case "knight":
      chess = new Knight(config);
      break;
    case "general":
      chess = new General(config);
      break;
    case "cannon":
      chess = new Cannon(config);
      break;
    case "soldier":
      chess = new Soldier(config);
      break;
    default:
      chess = new ChessMan(config);
      break;
    }

    return chess;
  };

  return {
    ChessmanFactory: ChessmanFactory
  };
});

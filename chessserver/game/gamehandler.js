var io,
  socketio = require("socket.io");

var rooms = [{Name: "room1", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room2", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room3", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room4", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room5", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room6", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room7", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room8", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room9", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room10", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room11", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room12", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room13", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room14", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room15", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room16", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room17", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room18", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room19", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room20", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room21", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room22", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room23", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room24", ConnectCount: 0, PlayerA: null, PlayerB: null},
            {Name: "room25", ConnectCount: 0, PlayerA: null, PlayerB: null}];

function setRoomPlayer(player, result) {
  var side,
    index = player.roomId - 1;

  if (rooms[index].PlayerA === null) {
    if (rooms[index].PlayerB === null) {
      side = "red";
    } else if (rooms[index].PlayerB.Side === "red") {
      side = "black";
    } else {
      side = "red";
    }
    result.PlayerA = rooms[index].PlayerA = {Id: player.userId, Name: player.userName, Side: side, Started: false};
    result.PlayerB = rooms[index].PlayerB;
  } else if (rooms[index].PlayerB === null) {
    if (rooms[index].PlayerA.Side === "red") {
      side = "black";
    } else {
      side = "red";
    }
    result.PlayerB = rooms[index].PlayerB = {Id: player.userId, Name: player.userName, Side: side, Started: false};
    result.PlayerA = rooms[index].PlayerA;
  }
  rooms[index].ConnectCount = io.sockets.clients(player.roomId).length;
}

function exitRoom(player, result) {
  var index = player.roomId - 1;
  if (rooms[index].PlayerA !== null && rooms[index].PlayerB !== null) {
    if (rooms[index].PlayerA.Started && rooms[index].PlayerB.Started) {
      result.status = "Fail";
      return;
    }
  }

  if (rooms[index].PlayerA !== null && rooms[index].PlayerA.Id === player.userId) {
    rooms[index].PlayerA = null;
  }

  if (rooms[index].PlayerB !== null && rooms[index].PlayerB.Id === player.userId) {
    rooms[index].PlayerB = null;
  }

  result.status = "Success";
  result.PlayerA = rooms[index].PlayerA;
  result.PlayerB = rooms[index].PlayerB;
}

function setPlayerStatus(player, isStart) {
  var index = player.roomId - 1;
  if (rooms[index].PlayerA !== null && rooms[index].PlayerA.Id === player.userId) {
    rooms[index].PlayerA.Started = isStart;
  } else if (rooms[index].PlayerB !== null && rooms[index].PlayerB.Id === player.userId) {
    rooms[index].PlayerB.Started = isStart;
  }
}

function canGameStartNow(roomId) {
  var index = roomId - 1;

  if (rooms[index].PlayerA === null || rooms[index].PlayerB === null) {
    return false;
  }
  if (rooms[index].PlayerA.Started && rooms[index].PlayerB.Started) {
    return true;
  }
  return false;
}

function convertStepCoordinate(step) {
  step.id = 33 - step.id;
  step.x = 800 - step.x;
  step.y = 900 - step.y;
  step.hindex = 10 - step.hindex;
  step.vindex = 11 - step.vindex;
}

function start() {
  io = socketio.listen(8882);

  io.sockets.on("connection", function (socket) {
    console.log("Websocket connect ok...");

    socket.on("getAllRoomStatus", function () {
      socket.emit("updateAllRoomStatus", rooms);
    });

    socket.on("checkRoomCapacity", function (roomId) {
      var result;
      result = {room: roomId, capacity: rooms[roomId - 1].ConnectCount};
      socket.emit("getRoomCapacity", result);
    });

    socket.on("joinGame", function (playerInfo) {
      var player,
        result = {};

      if (playerInfo !== undefined && playerInfo !== null) {
        player = JSON.parse(playerInfo);
        socket.userId = player.userId;
        socket.userName = player.userName;
        socket.roomId = player.roomId;
        if (io.sockets.clients(socket.roomId).length === 2) {
          result.Message = "Fail";
        } else {
          socket.join(socket.roomId);
          setRoomPlayer(player, result);
          result.Message = "Success";
        }
        socket.emit("updateJoinGameStatus", result);
        socket.broadcast.to(socket.roomId).emit("updatePlayer", result);
        socket.broadcast.emit("updateAllRoomStatus", rooms);
      }
    });

    socket.on("startGame", function (playerInfo) {
      var player,
        result = {};

      if (playerInfo !== undefined && playerInfo !== null) {
        player = JSON.parse(playerInfo);
        setPlayerStatus(player, true);
        result.Start = false;
        if (canGameStartNow(player.roomId)) {
          result.Start = true;
        }
        socket.emit("updateStartGameStatus", result);
        socket.broadcast.to(player.roomId).emit("notifyStartGameStatus", result);
      }
    });

    socket.on("endGame", function (playerInfo) {
      var player;

      if (playerInfo !== undefined && playerInfo !== null) {
        player = JSON.parse(playerInfo);
        setPlayerStatus(player, false);
      }
    });

    socket.on("exitGame", function (playerInfo) {
      var player,
        result = {};

      if (playerInfo !== undefined && playerInfo !== null) {
        player = JSON.parse(playerInfo);
        exitRoom(player, result);

        if (result.status === "Success") {
          socket.leave(player.roomId);
          rooms[player.roomId - 1].ConnectCount = io.sockets.clients(player.roomId).length;
          socket.broadcast.to(player.roomId).emit("updatePlayer", result);
          socket.broadcast.emit("updateAllRoomStatus", rooms);
        }
        socket.emit("updateExitGameStatus", result);
      }
    });

    socket.on("playStep", function (stepInfo) {
      var step;
      if (stepInfo !== undefined && stepInfo !== null) {
        step = JSON.parse(stepInfo);
        convertStepCoordinate(step);
        socket.broadcast.to(step.roomId).emit("notifyStep", step);
      }
    });
  });
}

exports.start = start;



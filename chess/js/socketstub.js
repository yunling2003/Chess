define(["socketio"], function (stub) {
  var socket = io.connect("http://localhost:8882");

  function getSocket() {
    return socket;
  }

  function checkRoomCapacity(roomId) {
    socket.emit("checkRoomCapacity", roomId);
  }

  function joinGame(playerInfo) {
    socket.emit("joinGame", JSON.stringify(playerInfo));
  }

  function getAllRoomStatus() {
    socket.emit("getAllRoomStatus");
  }

  function startGame(playerInfo) {
    socket.emit("startGame", JSON.stringify(playerInfo));
  }

  function endGame(playerInfo) {
    socket.emit("endGame", JSON.stringify(playerInfo));
  }

  function exitGame(playerInfo) {
    socket.emit("exitGame", JSON.stringify(playerInfo));
  }

  function playStep(stepInfo) {
    socket.emit("playStep", JSON.stringify(stepInfo));
  }

  return {
    getSocket: getSocket,
    checkRoomCapacity: checkRoomCapacity,
    joinGame: joinGame,
    startGame: startGame,
    endGame: endGame,
    exitGame: exitGame,
    getAllRoomStatus: getAllRoomStatus,
    playStep: playStep
  };
});

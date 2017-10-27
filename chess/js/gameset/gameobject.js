define(["js/lib/kinetic-v4.5.2.js"], function (Kinetic) {
  var stage,
    layer,
    selfPlayer,
    opponentPlayer,
    chessList = [];

  function getStage() {
    if (stage === null || stage === undefined) {
      stage = new Kinetic.Stage({
        container: document.getElementById("container"),
        width: 800,
        height: 900
      });
    }
    return stage;
  }

  function getLayer() {
    if (layer === undefined || layer === null) {
      layer = new Kinetic.Layer();
    }
    return layer;
  }

  function getChessList() {
    return chessList;
  }

  function clearChessList() {
    chessList.length = 0;
  }

  function getSelfPlayer() {
    return selfPlayer;
  }

  function setSelfPlayer(self) {
    selfPlayer = self;
  }

  function getOpponentPlayer() {
    return opponentPlayer;
  }

  function setOpponentPlayer(opponent) {
    opponentPlayer = opponent;
  }

  return {
    getStage: getStage,
    getLayer: getLayer,
    getChessList: getChessList,
    clearChessList: clearChessList,
    getSelfPlayer: getSelfPlayer,
    setSelfPlayer: setSelfPlayer,
    getOpponentPlayer: getOpponentPlayer,
    setOpponentPlayer: setOpponentPlayer
  };
});

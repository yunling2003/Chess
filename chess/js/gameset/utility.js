define(function () {
  function playAudio(soundType) {
    document.getElementById("chess1Audio").src = "sound/".concat(soundType, ".wav");
    document.getElementById("chess1Audio").play();
  }

  function getChessChineseName(name, side) {
    switch (name) {
    case "chariot":
      return side === "red" ? "俥" : "車";
    case "horse":
      return side === "red" ? "馬" : "马";
    case "elephant":
      return side === "red" ? "相" : "象";
    case "knight":
      return side === "red" ? "仕" : "士";
    case "general":
      return side === "red" ? "帅" : "将";
    case "cannon":
      return side === "red" ? "炮" : "砲";
    case "soldier":
      return side === "red" ? "兵" : "卒";
    default:
      return "";
    }
  }

  return {
    playAudio: playAudio,
    getChessChineseName: getChessChineseName
  };
});

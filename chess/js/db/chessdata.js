define(function () {
  var selfData = [{id: 1, name: "chariot", pointX: 80, pointY: 810, vindex: 1, hindex: 1, isSelf: 1},
                 {id: 2, name: "chariot", pointX: 720, pointY: 810, vindex: 1, hindex: 9, isSelf: 1},
                 {id: 3, name: "horse", pointX: 160, pointY: 810, vindex: 1, hindex: 2, isSelf: 1},
                 {id: 4, name: "horse", pointX: 640, pointY: 810, vindex: 1, hindex: 8, isSelf: 1},
                 {id: 5, name: "elephant", pointX: 240, pointY: 810, vindex: 1, hindex: 3, isSelf: 1},
                 {id: 6, name: "elephant", pointX: 560, pointY: 810, vindex: 1, hindex: 7, isSelf: 1},
                 {id: 7, name: "knight", pointX: 320, pointY: 810, vindex: 1, hindex: 4, isSelf: 1},
                 {id: 8, name: "knight", pointX: 480, pointY: 810, vindex: 1, hindex: 6, isSelf: 1},
                 {id: 9, name: "general", pointX: 400, pointY: 810, vindex: 1, hindex: 5, isSelf: 1},
                 {id: 10, name: "soldier", pointX: 80, pointY: 570, vindex: 4, hindex: 1, isSelf: 1},
                 {id: 11, name: "soldier", pointX: 240, pointY: 570, vindex: 4, hindex: 3, isSelf: 1},
                 {id: 12, name: "soldier", pointX: 400, pointY: 570, vindex: 4, hindex: 5, isSelf: 1},
                 {id: 13, name: "soldier", pointX: 560, pointY: 570, vindex: 4, hindex: 7, isSelf: 1},
                 {id: 14, name: "soldier", pointX: 720, pointY: 570, vindex: 4, hindex: 9, isSelf: 1},
                 {id: 15, name: "cannon", pointX: 160, pointY: 650, vindex: 3, hindex: 2, isSelf: 1},
                 {id: 16, name: "cannon", pointX: 640, pointY: 650, vindex: 3, hindex: 8, isSelf: 1}];

  var opponentData = [{id: 31, name: "chariot", pointX: 80, pointY: 90, vindex: 10, hindex: 1, isSelf: 0},
                 {id: 32, name: "chariot", pointX: 720, pointY: 90, vindex: 10, hindex: 9, isSelf: 0},
                 {id: 29, name: "horse", pointX: 160, pointY: 90, vindex: 10, hindex: 2, isSelf: 0},
                 {id: 30, name: "horse", pointX: 640, pointY: 90, vindex: 10, hindex: 8, isSelf: 0},
                 {id: 27, name: "elephant", pointX: 240, pointY: 90, vindex: 10, hindex: 3, isSelf: 0},
                 {id: 28, name: "elephant", pointX: 560, pointY: 90, vindex: 10, hindex: 7, isSelf: 0},
                 {id: 25, name: "knight", pointX: 320, pointY: 90, vindex: 10, hindex: 4, isSelf: 0},
                 {id: 26, name: "knight", pointX: 480, pointY: 90, vindex: 10, hindex: 6, isSelf: 0},
                 {id: 24, name: "general", pointX: 400, pointY: 90, vindex: 10, hindex: 5, isSelf: 0},
                 {id: 17, name: "cannon", pointX: 160, pointY: 250, vindex: 8, hindex: 2, isSelf: 0},
                 {id: 18, name: "cannon", pointX: 640, pointY: 250, vindex: 8, hindex: 8, isSelf: 0},
                 {id: 19, name: "soldier", pointX: 80, pointY: 330, vindex: 7, hindex: 1, isSelf: 0},
                 {id: 20, name: "soldier", pointX: 240, pointY: 330, vindex: 7, hindex: 3, isSelf: 0},
                 {id: 21, name: "soldier", pointX: 400, pointY: 330, vindex: 7, hindex: 5, isSelf: 0},
                 {id: 22, name: "soldier", pointX: 560, pointY: 330, vindex: 7, hindex: 7, isSelf: 0},
                 {id: 23, name: "soldier", pointX: 720, pointY: 330, vindex: 7, hindex: 9, isSelf: 0}];

  var boardLine = [{id: 1, type: "rect", x: 0, y: 0, width: 800, height: 900, stroke: "black", strokeWidth: 1},
            {id: 2, type: "rect", x: 80, y: 90, width: 640, height: 720, stroke: "black", strokeWidth: 1},
            {id: 3, type: "line", fromX: 80, fromY: 170, toX: 720, toY: 170, stroke: "black", strokeWidth: 1}, //horizontal lines
            {id: 4, type: "line", fromX: 80, fromY: 250, toX: 720, toY: 250, stroke: "black", strokeWidth: 1},
            {id: 5, type: "line", fromX: 80, fromY: 330, toX: 720, toY: 330, stroke: "black", strokeWidth: 1},
            {id: 6, type: "line", fromX: 80, fromY: 410, toX: 720, toY: 410, stroke: "black", strokeWidth: 1},
            {id: 7, type: "line", fromX: 80, fromY: 490, toX: 720, toY: 490, stroke: "black", strokeWidth: 1},
            {id: 8, type: "line", fromX: 80, fromY: 570, toX: 720, toY: 570, stroke: "black", strokeWidth: 1},
            {id: 9, type: "line", fromX: 80, fromY: 650, toX: 720, toY: 650, stroke: "black", strokeWidth: 1},
            {id: 10, type: "line", fromX: 80, fromY: 730, toX: 720, toY: 730, stroke: "black", strokeWidth: 1},
            {id: 11, type: "line", fromX: 160, fromY: 90, toX: 160, toY: 410, stroke: "black", strokeWidth: 1}, //vertical lines
            {id: 12, type: "line", fromX: 240, fromY: 90, toX: 240, toY: 410, stroke: "black", strokeWidth: 1},
            {id: 13, type: "line", fromX: 320, fromY: 90, toX: 320, toY: 410, stroke: "black", strokeWidth: 1},
            {id: 14, type: "line", fromX: 400, fromY: 90, toX: 400, toY: 410, stroke: "black", strokeWidth: 1},
            {id: 15, type: "line", fromX: 480, fromY: 90, toX: 480, toY: 410, stroke: "black", strokeWidth: 1},
            {id: 16, type: "line", fromX: 560, fromY: 90, toX: 560, toY: 410, stroke: "black", strokeWidth: 1},
            {id: 17, type: "line", fromX: 640, fromY: 90, toX: 640, toY: 410, stroke: "black", strokeWidth: 1},
            {id: 18, type: "line", fromX: 160, fromY: 490, toX: 160, toY: 810, stroke: "black", strokeWidth: 1},
            {id: 19, type: "line", fromX: 240, fromY: 490, toX: 240, toY: 810, stroke: "black", strokeWidth: 1},
            {id: 20, type: "line", fromX: 320, fromY: 490, toX: 320, toY: 810, stroke: "black", strokeWidth: 1},
            {id: 21, type: "line", fromX: 400, fromY: 490, toX: 400, toY: 810, stroke: "black", strokeWidth: 1},
            {id: 22, type: "line", fromX: 480, fromY: 490, toX: 480, toY: 810, stroke: "black", strokeWidth: 1},
            {id: 23, type: "line", fromX: 560, fromY: 490, toX: 560, toY: 810, stroke: "black", strokeWidth: 1},
            {id: 24, type: "line", fromX: 640, fromY: 490, toX: 640, toY: 810, stroke: "black", strokeWidth: 1},
            {id: 25, type: "line", fromX: 320, fromY: 90, toX: 480, toY: 250, stroke: "black", strokeWidth: 1},
            {id: 26, type: "line", fromX: 320, fromY: 250, toX: 480, toY: 90, stroke: "black", strokeWidth: 1},
            {id: 27, type: "line", fromX: 320, fromY: 810, toX: 480, toY: 650, stroke: "black", strokeWidth: 1},
            {id: 28, type: "line", fromX: 320, fromY: 650, toX: 480, toY: 810, stroke: "black", strokeWidth: 1},
            {id: 29, type: "line", fromX: 227, fromY: 325, toX: 235, toY: 325, stroke: "black", strokeWidth: 1},
            {id: 30, type: "line", fromX: 235, fromY: 325, toX: 235, toY: 317, stroke: "black", strokeWidth: 1},
            {id: 31, type: "line", fromX: 253, fromY: 325, toX: 245, toY: 325, stroke: "black", strokeWidth: 1},
            {id: 32, type: "line", fromX: 245, fromY: 325, toX: 245, toY: 317, stroke: "black", strokeWidth: 1},
            {id: 33, type: "line", fromX: 227, fromY: 335, toX: 235, toY: 335, stroke: "black", strokeWidth: 1},
            {id: 34, type: "line", fromX: 235, fromY: 335, toX: 235, toY: 343, stroke: "black", strokeWidth: 1},
            {id: 35, type: "line", fromX: 253, fromY: 335, toX: 245, toY: 335, stroke: "black", strokeWidth: 1},
            {id: 36, type: "line", fromX: 245, fromY: 335, toX: 245, toY: 343, stroke: "black", strokeWidth: 1}, //{240,330}
            {id: 37, type: "line", fromX: 387, fromY: 325, toX: 395, toY: 325, stroke: "black", strokeWidth: 1},
            {id: 38, type: "line", fromX: 395, fromY: 325, toX: 395, toY: 317, stroke: "black", strokeWidth: 1},
            {id: 39, type: "line", fromX: 413, fromY: 325, toX: 405, toY: 325, stroke: "black", strokeWidth: 1},
            {id: 40, type: "line", fromX: 405, fromY: 325, toX: 405, toY: 317, stroke: "black", strokeWidth: 1},
            {id: 41, type: "line", fromX: 387, fromY: 335, toX: 395, toY: 335, stroke: "black", strokeWidth: 1},
            {id: 42, type: "line", fromX: 395, fromY: 335, toX: 395, toY: 343, stroke: "black", strokeWidth: 1},
            {id: 43, type: "line", fromX: 413, fromY: 335, toX: 405, toY: 335, stroke: "black", strokeWidth: 1},
            {id: 44, type: "line", fromX: 405, fromY: 335, toX: 405, toY: 343, stroke: "black", strokeWidth: 1}, //{400,330}
            {id: 45, type: "line", fromX: 547, fromY: 325, toX: 555, toY: 325, stroke: "black", strokeWidth: 1},
            {id: 46, type: "line", fromX: 555, fromY: 325, toX: 555, toY: 317, stroke: "black", strokeWidth: 1},
            {id: 47, type: "line", fromX: 573, fromY: 325, toX: 565, toY: 325, stroke: "black", strokeWidth: 1},
            {id: 48, type: "line", fromX: 565, fromY: 325, toX: 565, toY: 317, stroke: "black", strokeWidth: 1},
            {id: 49, type: "line", fromX: 547, fromY: 335, toX: 555, toY: 335, stroke: "black", strokeWidth: 1},
            {id: 50, type: "line", fromX: 555, fromY: 335, toX: 555, toY: 343, stroke: "black", strokeWidth: 1},
            {id: 51, type: "line", fromX: 573, fromY: 335, toX: 565, toY: 335, stroke: "black", strokeWidth: 1},
            {id: 52, type: "line", fromX: 565, fromY: 335, toX: 565, toY: 343, stroke: "black", strokeWidth: 1}, //{560,330}
            {id: 53, type: "line", fromX: 147, fromY: 245, toX: 155, toY: 245, stroke: "black", strokeWidth: 1},
            {id: 54, type: "line", fromX: 155, fromY: 245, toX: 155, toY: 237, stroke: "black", strokeWidth: 1},
            {id: 55, type: "line", fromX: 173, fromY: 245, toX: 165, toY: 245, stroke: "black", strokeWidth: 1},
            {id: 56, type: "line", fromX: 165, fromY: 245, toX: 165, toY: 237, stroke: "black", strokeWidth: 1},
            {id: 57, type: "line", fromX: 147, fromY: 255, toX: 155, toY: 255, stroke: "black", strokeWidth: 1},
            {id: 58, type: "line", fromX: 155, fromY: 255, toX: 155, toY: 263, stroke: "black", strokeWidth: 1},
            {id: 59, type: "line", fromX: 173, fromY: 255, toX: 165, toY: 255, stroke: "black", strokeWidth: 1},
            {id: 60, type: "line", fromX: 165, fromY: 255, toX: 165, toY: 263, stroke: "black", strokeWidth: 1}, //{160,250}
            {id: 61, type: "line", fromX: 627, fromY: 245, toX: 635, toY: 245, stroke: "black", strokeWidth: 1},
            {id: 62, type: "line", fromX: 635, fromY: 245, toX: 635, toY: 237, stroke: "black", strokeWidth: 1},
            {id: 63, type: "line", fromX: 653, fromY: 245, toX: 645, toY: 245, stroke: "black", strokeWidth: 1},
            {id: 64, type: "line", fromX: 645, fromY: 245, toX: 645, toY: 237, stroke: "black", strokeWidth: 1},
            {id: 65, type: "line", fromX: 627, fromY: 255, toX: 635, toY: 255, stroke: "black", strokeWidth: 1},
            {id: 66, type: "line", fromX: 635, fromY: 255, toX: 635, toY: 263, stroke: "black", strokeWidth: 1},
            {id: 67, type: "line", fromX: 653, fromY: 255, toX: 645, toY: 255, stroke: "black", strokeWidth: 1},
            {id: 68, type: "line", fromX: 645, fromY: 255, toX: 645, toY: 263, stroke: "black", strokeWidth: 1}, //{640,250}
            {id: 69, type: "line", fromX: 227, fromY: 565, toX: 235, toY: 565, stroke: "black", strokeWidth: 1},
            {id: 70, type: "line", fromX: 235, fromY: 565, toX: 235, toY: 557, stroke: "black", strokeWidth: 1},
            {id: 71, type: "line", fromX: 253, fromY: 565, toX: 245, toY: 565, stroke: "black", strokeWidth: 1},
            {id: 72, type: "line", fromX: 245, fromY: 565, toX: 245, toY: 557, stroke: "black", strokeWidth: 1},
            {id: 73, type: "line", fromX: 227, fromY: 575, toX: 235, toY: 575, stroke: "black", strokeWidth: 1},
            {id: 74, type: "line", fromX: 235, fromY: 575, toX: 235, toY: 583, stroke: "black", strokeWidth: 1},
            {id: 75, type: "line", fromX: 253, fromY: 575, toX: 245, toY: 575, stroke: "black", strokeWidth: 1},
            {id: 76, type: "line", fromX: 245, fromY: 575, toX: 245, toY: 583, stroke: "black", strokeWidth: 1}, //{240,570}
            {id: 77, type: "line", fromX: 387, fromY: 565, toX: 395, toY: 565, stroke: "black", strokeWidth: 1},
            {id: 78, type: "line", fromX: 395, fromY: 565, toX: 395, toY: 557, stroke: "black", strokeWidth: 1},
            {id: 79, type: "line", fromX: 413, fromY: 565, toX: 405, toY: 565, stroke: "black", strokeWidth: 1},
            {id: 80, type: "line", fromX: 405, fromY: 565, toX: 405, toY: 557, stroke: "black", strokeWidth: 1},
            {id: 81, type: "line", fromX: 387, fromY: 575, toX: 395, toY: 575, stroke: "black", strokeWidth: 1},
            {id: 82, type: "line", fromX: 395, fromY: 575, toX: 395, toY: 583, stroke: "black", strokeWidth: 1},
            {id: 83, type: "line", fromX: 413, fromY: 575, toX: 405, toY: 575, stroke: "black", strokeWidth: 1},
            {id: 84, type: "line", fromX: 405, fromY: 575, toX: 405, toY: 583, stroke: "black", strokeWidth: 1}, //{400,570}
            {id: 85, type: "line", fromX: 547, fromY: 565, toX: 555, toY: 565, stroke: "black", strokeWidth: 1},
            {id: 86, type: "line", fromX: 555, fromY: 565, toX: 555, toY: 557, stroke: "black", strokeWidth: 1},
            {id: 87, type: "line", fromX: 573, fromY: 565, toX: 565, toY: 565, stroke: "black", strokeWidth: 1},
            {id: 88, type: "line", fromX: 565, fromY: 565, toX: 565, toY: 557, stroke: "black", strokeWidth: 1},
            {id: 89, type: "line", fromX: 547, fromY: 575, toX: 555, toY: 575, stroke: "black", strokeWidth: 1},
            {id: 90, type: "line", fromX: 555, fromY: 575, toX: 555, toY: 583, stroke: "black", strokeWidth: 1},
            {id: 91, type: "line", fromX: 573, fromY: 575, toX: 565, toY: 575, stroke: "black", strokeWidth: 1},
            {id: 92, type: "line", fromX: 565, fromY: 575, toX: 565, toY: 583, stroke: "black", strokeWidth: 1}, //{560,570}
            {id: 93, type: "line", fromX: 147, fromY: 645, toX: 155, toY: 645, stroke: "black", strokeWidth: 1},
            {id: 94, type: "line", fromX: 155, fromY: 645, toX: 155, toY: 637, stroke: "black", strokeWidth: 1},
            {id: 95, type: "line", fromX: 173, fromY: 645, toX: 165, toY: 645, stroke: "black", strokeWidth: 1},
            {id: 96, type: "line", fromX: 165, fromY: 645, toX: 165, toY: 637, stroke: "black", strokeWidth: 1},
            {id: 97, type: "line", fromX: 147, fromY: 655, toX: 155, toY: 655, stroke: "black", strokeWidth: 1},
            {id: 98, type: "line", fromX: 155, fromY: 655, toX: 155, toY: 663, stroke: "black", strokeWidth: 1},
            {id: 99, type: "line", fromX: 173, fromY: 655, toX: 165, toY: 655, stroke: "black", strokeWidth: 1},
            {id: 100, type: "line", fromX: 165, fromY: 655, toX: 165, toY: 663, stroke: "black", strokeWidth: 1}, //{160,650}
            {id: 101, type: "line", fromX: 627, fromY: 645, toX: 635, toY: 645, stroke: "black", strokeWidth: 1},
            {id: 102, type: "line", fromX: 635, fromY: 645, toX: 635, toY: 637, stroke: "black", strokeWidth: 1},
            {id: 103, type: "line", fromX: 653, fromY: 645, toX: 645, toY: 645, stroke: "black", strokeWidth: 1},
            {id: 104, type: "line", fromX: 645, fromY: 645, toX: 645, toY: 637, stroke: "black", strokeWidth: 1},
            {id: 105, type: "line", fromX: 627, fromY: 655, toX: 635, toY: 655, stroke: "black", strokeWidth: 1},
            {id: 106, type: "line", fromX: 635, fromY: 655, toX: 635, toY: 663, stroke: "black", strokeWidth: 1},
            {id: 107, type: "line", fromX: 653, fromY: 655, toX: 645, toY: 655, stroke: "black", strokeWidth: 1},
            {id: 108, type: "line", fromX: 645, fromY: 655, toX: 645, toY: 663, stroke: "black", strokeWidth: 1}, //{640,650}
            {id: 109, type: "line", fromX: 93, fromY: 325, toX: 85, toY: 325, stroke: "black", strokeWidth: 1},
            {id: 110, type: "line", fromX: 85, fromY: 325, toX: 85, toY: 317, stroke: "black", strokeWidth: 1},
            {id: 111, type: "line", fromX: 93, fromY: 335, toX: 85, toY: 335, stroke: "black", strokeWidth: 1},
            {id: 112, type: "line", fromX: 85, fromY: 335, toX: 85, toY: 343, stroke: "black", strokeWidth: 1}, //{80,330}
            {id: 113, type: "line", fromX: 93, fromY: 565, toX: 85, toY: 565, stroke: "black", strokeWidth: 1},
            {id: 114, type: "line", fromX: 85, fromY: 565, toX: 85, toY: 557, stroke: "black", strokeWidth: 1},
            {id: 115, type: "line", fromX: 93, fromY: 575, toX: 85, toY: 575, stroke: "black", strokeWidth: 1},
            {id: 116, type: "line", fromX: 85, fromY: 575, toX: 85, toY: 583, stroke: "black", strokeWidth: 1}, //{80,570}
            {id: 117, type: "line", fromX: 707, fromY: 325, toX: 715, toY: 325, stroke: "black", strokeWidth: 1},
            {id: 118, type: "line", fromX: 715, fromY: 325, toX: 715, toY: 317, stroke: "black", strokeWidth: 1},
            {id: 119, type: "line", fromX: 707, fromY: 335, toX: 715, toY: 335, stroke: "black", strokeWidth: 1},
            {id: 120, type: "line", fromX: 715, fromY: 335, toX: 715, toY: 343, stroke: "black", strokeWidth: 1}, //{720,330}
            {id: 121, type: "line", fromX: 707, fromY: 565, toX: 715, toY: 565, stroke: "black", strokeWidth: 1},
            {id: 122, type: "line", fromX: 715, fromY: 565, toX: 715, toY: 557, stroke: "black", strokeWidth: 1},
            {id: 123, type: "line", fromX: 707, fromY: 575, toX: 715, toY: 575, stroke: "black", strokeWidth: 1},
            {id: 124, type: "line", fromX: 715, fromY: 575, toX: 715, toY: 583, stroke: "black", strokeWidth: 1}, //{720,570}
            {id: 125, type: "text", x: 160, y: 430, text: "楚河", fill: "black", fontSize: 40, fontFamily: "楷体", stroke: "black", strokeWidth: 2, align: "center", verticalAlign: "middle"},
            {id: 126, type: "text", x: 560, y: 430, text: "汉界", fill: "black", fontSize: 40, fontFamily: "楷体", stroke: "black", strokeWidth: 2, align: "center", verticalAlign: "middle"}];

  function getSelfData() {
    return selfData;
  }

  function getOpponentData() {
    return opponentData;
  }

  function getBoardLines() {
    return boardLine;
  }

  return {
    getSelfData: getSelfData,
    getOpponentData: getOpponentData,
    getBoardLines: getBoardLines
  };
});

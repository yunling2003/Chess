define(["db/chessdata", "js/lib/kinetic-v4.5.2.js"], function (chessdata, Kinetic) {
  function drawChessBoard(stage, layer) {
    var rect,
      line,
      i,
      text,
      boardLines = chessdata.getBoardLines();

    for (i = 0; i < boardLines.length; i++) {
      if (boardLines[i].type === "rect") {
        rect = new Kinetic.Rect({
          x: boardLines[i].x,
          y: boardLines[i].y,
          width: boardLines[i].width,
          height: boardLines[i].height,
          stroke: boardLines[i].stroke,
          strokeWidth: boardLines[i].outRectStrokeWidth
        });
        layer.add(rect);
      }

      if (boardLines[i].type === "line") {
        line = new Kinetic.Line({
          points: [boardLines[i].fromX, boardLines[i].fromY, boardLines[i].toX, boardLines[i].toY],
          stroke: boardLines[i].stroke,
          strokeWidth: boardLines[i].strokeWidth
        });
        layer.add(line);
      }

      if (boardLines[i].type === "text") {
        text = new Kinetic.Text({
          x: boardLines[i].x,
          y: boardLines[i].y,
          text: boardLines[i].text,
          fill: boardLines[i].fill,
          fontSize: boardLines[i].fontSize,
          fontFamily: boardLines[i].fontFamily,
          stroke: boardLines[i].stroke,
          strokeWidth: boardLines[i].strokeWidth,
          align: boardLines[i].align,
          verticalAlign: boardLines[i].verticalAlign
        });
        layer.add(text);
      }
    }
    layer.draw();
    stage.add(layer);
  }

  return {
    drawChessBoard: drawChessBoard
  };
});
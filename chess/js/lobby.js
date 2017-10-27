require(["jquery", "socketstub"], function ($, stub) {
  $("#userId").html(sessionStorage.userName);
  stub.getAllRoomStatus();
  $("#logout").click(function () {
    sessionStorage.userName = null;
    sessionStorage.userId = null;
  });
  $("[id^=room]").click(function () {
    var room = $(this),
      id = room[0].attributes["name"].value;

    stub.checkRoomCapacity(id);
  });

  stub.getSocket().on("updateAllRoomStatus", function (rooms) {
    onGetAllRoomStatusCompleted(rooms);
  });

  stub.getSocket().on("getRoomCapacity", function (result) {
    if (result.capacity >= 2) {
      alert("不能加入游戏,房间已满或无法连接到服务器");
    } else {
      sessionStorage.roomId = result.room;
      window.location = "room.htm";
    }
  });

  function onGetAllRoomStatusCompleted(rooms) {
    var i,
      name,
      connectionCount;

    for (i in rooms) {
      if (rooms.hasOwnProperty(i)) {
        name = rooms[i].Name;
        connectionCount = rooms[i].ConnectCount;
        if (connectionCount === 1) {
          $("#" + name + " >img").attr("src", "image\\table1.png");
        } else if (connectionCount === 2) {
          $("#" + name + " >img").attr("src", "image\\table2.png");
        } else if (connectionCount === 0) {
          $("#" + name + " >img").attr("src", "image\\tablen.png");
        }
      }
    }
  }
});
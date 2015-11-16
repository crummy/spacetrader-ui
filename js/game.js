var server="http://localhost:4567";
var id;

$.getJSON(server + "/games")
  .done(displayGames);
  
function displayState(data) {
  console.log("state: " + data.state);
  if (data.state == "InSystem") {
    displayInSystem(data);
  }
}

function displayGames(data) {
  var currentGamesTemplate = $.templates("#currentGamesTemplate");
  $("#currentGames").append(currentGamesTemplate.render({games: data, total: Object.keys(data).length}));
}

function newGame(event) {
  // TODO: verify input
  var form = $("#newGame");
  $.post(server + "/games/new?" + form.serialize())
    .done(loadGame);
  return false;
}

function loadGame(gameId) {
  id = gameId;
  $("#welcome").hide();
  $("#game").show();
  console.log("loading game " + id);
  $.getJSON(server + "/game/" + id + "/state")
    .done(displayState);
}

function notYetImplemented() {
  addAlert("Feature not yet implemented", "danger");
}

function addAlert(message, level) {
  if (level == undefined) level == "warning";
  $("<div>")
    .addClass("alert")
    .addClass("alert-" + level)
    .html('<a href="#" class="close" data-dismiss="alert">&times;</a><strong>' + level + '</strong> ' + message)
    .appendTo("#alerts");
}

function action(name, data) {
  var parameters = JSON.stringify({parameters: data});
  $.post(server + "/game/" + id + "/action/" + name, parameters)
    .done(displayState)
    .fail(addAlert);
}


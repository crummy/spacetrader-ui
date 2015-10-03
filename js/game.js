var server="http://localhost:4567";
var d;

$.getJSON(server)
  .done(displayState);
  
function displayState(data) {
  console.log(data);
  if (data.state == "InSystem") {
    displayInSystem(data);
  }
}
  
function displayInSystem(data) {  
  $("#stateTitle").text("In System: " + data.system.name);
  
  var systemInfoTemplate = $.templates("#systemInfoTemplate");
  $("#systemInfo").append(systemInfoTemplate.render(data.system));

  var shipyardTemplate = $.templates("#shipyardTemplate");
  $("#shipyard").append(shipyardTemplate.render(data));
  
  var buyShipTemplate = $.templates("#buyShipTemplate");
  $("#buyShip").append(buyShipTemplate.render(data));
  
  var buyCargoTemplate = $.templates("#buyCargoTemplate");
  $("#buyCargo").append(buyCargoTemplate.render(data));
}
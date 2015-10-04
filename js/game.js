var server="http://localhost:4567";
var d;

$.getJSON(server)
  .done(displayState);
  
$.getJSON(server + "/galaxy")
  .done(displayGalaxy);
  
function displayState(data) {
  console.log(data);
  if (data.state == "InSystem") {
    displayInSystem(data);
  }
}

function displayGalaxy(data) {
  var width = 800;
  var height = 600;
  var draw = SVG("galaxy").size(width, height);
  for (var i in data.solarSystems) {
    var system = data.solarSystems[i];
    draw.circle(10)
      .attr({cx: stretch(system.x, data.width, width), cy: stretch(system.y, data.height, height)})
      .fill(system.visited ? "yellow" : "blue");
  }
}

function stretch(value, upper, newUpper) {
  return value/upper * newUpper;
}
  
function displayInSystem(data) {  
  $("#stateTitle").text("In System: " + data.system.name);
  
  var actionsTemplate = $.templates("#actionsTemplate");
  $("#actions").append(actionsTemplate.render(data));
  
  var systemInfoTemplate = $.templates("#systemInfoTemplate");
  $("#systemInfo").append(systemInfoTemplate.render(data.system));

  var shipyardTemplate = $.templates("#shipyardTemplate");
  $("#shipyard").append(shipyardTemplate.render(data));
  
  var buyShipTemplate = $.templates("#buyShipTemplate");
  $("#buyShip").append(buyShipTemplate.render(data));
  
  var buyCargoTemplate = $.templates("#buyCargoTemplate");
  $("#buyCargo").append(buyCargoTemplate.render(data));
  
  var sellCargoTemplate = $.templates("#sellCargoTemplate");
  $("#sellCargo").append(sellCargoTemplate.render(data));
  
  var buyEquipmentTemplate = $.templates("#buyEquipmentTemplate");
  $("#buyEquipment").append(buyEquipmentTemplate.render(data.equipmentForSale));
}
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
    var circle = draw.circle(10)
      .id(system.name)
      .attr({cx: stretch(system.x, data.width, width), cy: stretch(system.y, data.height, height)})
      .fill(system.visited ? "yellow" : "blue")
      .click(function() { systemDetails(this) });
    if (system.hasWormhole) {
      draw.circle(10)
        .id(system.name + "_wormhole")
        .attr({cx: circle.cx() + 10, cy: circle.cy()})
        .fill("red")
        .data("destination", system.wormholeDestination)
        .click(function() { drawWormhole(this) });
    }
  }
  
  function systemDetails(system) {
    var name = system.id();
    draw.text(name)
      .attr({x: system.cx(), y: system.cy() + 10})
      .font({size: 18})
      .fill("black");
    console.log(system.cx(), system.cy());
  }
  
  function drawWormhole(wormhole) {
    var d = SVG.get(wormhole.data("destination"));
    draw.line(wormhole.cx(), wormhole.cy(), d.cx(), d.cy()).stroke("black");
    console.log(wormhole.cx(), wormhole.cy(), d.cx(), d.cy());
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
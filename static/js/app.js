
buttonwidth = 100;
buttonheight = 40;


//This function appends a button at the provided div id in the html
function appendButton(id) {
  //Important to use "let" here to avoid overlap for button functionality
  let buttonState = "on"

  //svg canvas for the button
  buttoncanvas = d3.select(id).append("svg").attr("width", buttonwidth).attr("height", buttonheight).attr("display","inline");

  //This is the rectangle which is visible while off
  //Bottom-most layer that becomes visible as other rectangles move off of it
  buttoncanvas.append("rect").attr("x",3).attr("y",3).attr("width",buttonwidth-6).attr("height",buttonheight-6).attr("style","fill:#999999");

  //Text on off-layer
  let buttonOffText = buttoncanvas.append("text").attr("dx", 7*buttonwidth/4).attr("dy",buttonheight/2).attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("textLength", "30px")
            .attr("lengthAdjust", "spacingAndGlyphs").text("OFF")
            .attr("style","fill:black; font-size:20px; font-family: Trebuchet, Arial, sans-serif;")

  //Rectangle visible while on
  //Covers up off-layer rectangle and text
  let buttonInnerRect = buttoncanvas.append("rect").attr("x",3).attr("y",3).attr("width",buttonwidth-6).attr("height",buttonheight-6).attr("style","fill:#119911");

  //Text on on-layer
  let buttonOnText = buttoncanvas.append("text").attr("dx", buttonwidth/4).attr("dy",buttonheight/2).attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("textLength", "24px")
            .attr("lengthAdjust", "spacingAndGlyphs").text("ON")
            .attr("style","fill:white; font-size:20px; font-family: Trebuchet, Arial, sans-serif;")

  //Thick border same color as background to cover up moving pieces
  //Transparent interior so we can still see on and off-layers in center
  buttoncanvas.append("rect").attr("x",0).attr("y",0).attr("rx",15).attr("ry",15).attr("width",buttonwidth).attr("height",buttonheight)
    .attr("style","fill-opacity:0;stroke:#333333;stroke-width:9")

  //Now that the moving pieces are defined, create button object to use for functions and to return at end
  let button = {"innerRect":buttonInnerRect, "onText":buttonOnText, "offText":buttonOffText, "state":buttonState}

  //Top-most layer
  //Visible border
  //Attaches click-event to this topmost layer
  buttoncanvas.append("rect").attr("x",3).attr("y",3).attr("rx",20).attr("ry",20).attr("width",buttonwidth-6).attr("height",buttonheight-6)
    .attr("style","fill-opacity:0;stroke:#666666;stroke-width:3").on("click", function() {toggleButton(button)})

  return button
}

//Changes button from On to Off or vice versa by moving movable pieces and updates state to reflect changes
function toggleButton(b) {
  if (b.state == "on"){
    b.onText.transition().duration(1000).attr("dx",-3*buttonwidth/4);
    b.innerRect.transition().duration(1000).attr("width", 0);
    b.offText.transition().duration(1000).attr("dx",3*buttonwidth/4);
    b.state = "off";
  }
  else{
    b.onText.transition().duration(1000).attr("dx",buttonwidth/4);
    b.innerRect.transition().duration(1000).attr("width", buttonwidth);
    b.offText.transition().duration(1000).attr("dx",7*buttonwidth/4);
    b.state = "on";
  }
}

hurricaneButton = appendButton("#HurricaneButton")
earthquakeButton = appendButton("#EarthquakeButton")
tornadoButton = appendButton("#TornadoButton")
wildfireButton = appendButton("#WildfireButton")
floodButton = appendButton("#FloodButton")


//Create Date Slider
$( "#slider-range" ).slider({
  range: true,
  min: 1970,
  max: 2018,
  step: 1,
  values: [1990, 2000],
  slide: function( event, ui ) {
    $( "#amount" ).val( ui.values[0].toString() + " - " + ui.values[1].toString())
  },
  change: function( event, ui ) {
    console.log("The slider has been moved to something new");
  }
});
$( "#amount" ).val($( "#slider-range" ).slider( "values", 0) + " - " + ($( "#slider-range" ).slider( "values", 1)))

//Random Color Generator For Testing Purposes
function chooseColor(){
  // return "#808080".tostring(16);
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function updatemap(hurricaneState,earthQuakeState,tornadoState,wildfireState, floodState, startDate,endDate, mapType){
  query= "/"+ mapType +"/";
  
  if (hurricaneState == "on"){
    query = query + "1"
  }
  else {
    query = query + "0"
  }
  if (earthQuakeState == "on"){
    query = query + "1"
  }
  else {
    query = query + "0"
  }
  if (tornadoState == "on"){
    query = query + "1"
  }
  else {
    query = query + "0"
  }
  if (wildfireState == "on"){
    query = query + "1"
  }
  else {
    query = query + "0"
  }
  if (floodState == "on"){
    query = query + "1"
  }
  else {
    query = query + "0"
  }

  query = query + startDate +endDate

};


//Load Base map
var myMap = L.map("map-id", {
  center: [40, -96],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var maptype = "county";

$.getJSON("../static/js/countiesgeojson.json", function(json) {
  console.log(json)
  countyLayer = new L.geoJSON(json,{
    style: function(feature){
      return {
      color: "#EE3333",
      weight: 1,
      fillColor: chooseColor(),
      fillOpacity: 0.5
    }}
  });
  countyLayer.addTo(myMap);
});

$.getJSON("../static/js/statesgeojson.json", function(json) {
  console.log(json)
  stateLayer = new L.geoJSON(json,{
    style: function(feature){
      return {
      color: "#EE3333",
      weight: 1,
      fillColor: chooseColor(),
      fillOpacity: 0.5
    }}
  });
  //statesLayer.addTo(myMap)
});



//Testbutton is used for debug purposes, checking how switches and sliders are read and testing how to update map.
testbutton = d3.select("#button").append("button").attr("type","button").text("BUTTON").on("click", function() { console.log(`The current state of HurricaneButton is ${hurricaneButton.state} and the current state of EarthquakeButton is ${earthquakeButton.state}`);
console.log(`The current values on the slider are ${$("#slider-range" ).slider("values",0)} and ${$("#slider-range").slider("values",1)}`);
if (maptype == "state"){
myMap.removeLayer(stateLayer);
maptype = "county";
countyLayer.eachLayer(function(i){ i.setStyle({
color: "#EE3333",
weight: 1,
fillColor: chooseColor(),
fillOpacity: 0.5
})})
countyLayer.addTo(myMap)
}
else{
  myMap.removeLayer(countyLayer);
    maptype = "state";
  stateLayer.eachLayer(function(i){ i.setStyle({
  color: "#EE3333",
  weight: 1,
  fillColor: chooseColor(),
  fillOpacity: 0.5
  })})
  stateLayer.addTo(myMap);
}
});

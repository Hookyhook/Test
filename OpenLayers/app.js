//Define global vars
var map;
var markerFeature;
var markerVectorLayer;
var markerStyle = new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: new ol.style.Fill({ color: "grey" }),
    stroke: new ol.style.Stroke({ color: "black", width: 2 }),
    points: 4,
    radius: 8,
    angle: Math.PI / 4,
  }),
});
SetUpMap();

function SetUpMap() {
  //Uses the stamen library to set up a new Map Layout source
  var stamenLayer = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: "toner",
    }),
  });

  //The map is created with the source the origin view with zomm is set all controls and interactions are removed
    map = new ol.Map({
      target: "map",
      layers: [stamenLayer],
      view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 1,
      }),
      controls: [],
      interactions: [],
    });
}

// code for adding marker when an address is typed in



function searchAddress() {
  var address = document.getElementById("address").value;
  var url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
    address;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length > 0) {
        var lon = data[0].lon;
        var lat = data[0].lat;
        var coord = ol.proj.fromLonLat([lon, lat]);
        setMarker(coord);
      } else {
        console.log("No results found");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}




//Starts a navigation to the set marker
function startNavigation() {
  if (markerFeature) {
    var markerCoordinates = markerFeature.getGeometry().getCoordinates();
    var lonlat = ol.proj.toLonLat(markerCoordinates);
    console.log(lonlat);
    var lon = lonlat[0];
    var lat = lonlat[1];
    var url = "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lon;
    window.location.href = url;
  }
}

//Sets the marker at coordinated with the predefined design removes other layers
function setMarker(coord) {
  if (markerVectorLayer) {
    map.removeLayer(markerVectorLayer);
  }
  markerFeature = new ol.Feature({
    geometry: new ol.geom.Point(coord),
  });
  markerFeature.setStyle(markerStyle);
  var vectorSource = new ol.source.Vector({
    features: [markerFeature],
  });
  markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
  });
  map.addLayer(markerVectorLayer);
  map.getView().animate({ center: coord, zoom: 16 });
}


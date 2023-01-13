// create Stamen layer
var stamenLayer = new ol.layer.Tile({
  source: new ol.source.Stamen({
    layer: "toner",
  }),
});

// create a map
  var map = new ol.Map({
    target: "map",
    layers: [stamenLayer],
    view: new ol.View({
      center: ol.proj.fromLonLat([0, 0]),
      zoom: 1,
    }),
    controls: [],
    interactions: [
    ],
  });


// code for adding marker when an address is typed in

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
      } else {
        console.log("No results found");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}




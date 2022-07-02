console.log("mappy time")

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.5, -122.5], 10);

  // Add GeoJSON data.
  let sanFranAirport =
  {"type":"FeatureCollection","features":[{
      "type":"Feature",
      "properties":{
          "id":"3469",
          "name":"San Francisco International Airport",
          "city":"San Francisco",
          "country":"United States",
          "faa":"SFO",
          "icao":"KSFO",
          "alt":"13",
          "tz-offset":"-8",
          "dst":"A",
          "tz":"America/Los_Angeles"},
          "geometry":{
              "type":"Point",
              "coordinates":[-122.375,37.61899948120117]}}
  ]};

// Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup();
   }
}).addTo(map);

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
  L.circleMarker(city.location, {
    radius: city.population/100000,
    color: '#FFA500',
    weight: 4
  }). 
   bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>").
   addTo(map);
 });

  // We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});


// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


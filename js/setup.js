//set basemap
var map = L.map('map',{
          center:[40.743395, -73.993251],
          zoom: 11
        });

titleLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
           maxZoom: 18,
           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(map);

//load the original dataset
var gardenraw = "",
    gardendata;

$.ajax(gardenraw).done(function(data){
  var parsedData = JSON.parse(data);
  gardendata = gardenraw;
});

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
var gardenraw ='https://gist.githubusercontent.com/Ziqinwang/1d74b9a1bf1325b2435bf1ec70e3e6ca/raw/4bc038f58bc68349f8cce013fc2ea826398d7bee/m_12_point.json',
    gardendata = [];

$(document).ready(function() {
  $.ajax(gardenraw).done(function(data){
    var parsedData = JSON.parse(data);
    _.each(parsedData.features,function(a){
      gardendata.push([a.geometry.coordinates[0],a.geometry.coordinates[1]]);
    });
    L.geoJSON(parsedData,  {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions(latlng));
      }
    }).addTo(map);
  });
});


console.log(gardendata);


//pointA = gardendata[0];
//console.log(pointA);
// pointB = gardendata.features[0].geometry.coordinates[1];
// var pointArray = [];
// _.each(gardendata.features, function(layer){
//   pointArray.append((layer.geometry.coordinates[0],layer.geometry.coordinates[1]));
// });



//console.log(test);
var latlng = [];

var geojsonMarkerOptions = function(e){
  {
    radius: 3,
    fillColor: "#ff7800",
    stroke:false,
    fillOpacity: judge
  }
};

//draw the point in polygon thanks to MIT

function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

//test dataset
var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
var a = inside([ 1.5, 1.5 ], polygon); // true


points = [
  [-73.98433685302736,40.76091081214379],
  [-74.00493621826173,40.75310895587201],
  [-73.98365020751955,40.7429651739036]
];

//testPoint = [-71.05804,42.33288];

//var b = inside(testPoint, points); // true
//console.log(b);

var test = inside(latlng, points);
var judge = function(){
  if (test===true){return 0.6;}
  else if(test===false){return 1;}
};

// Global Variables

var myShape ;

// Initialize Leaflet Draw




var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: true,
    circle: false,
    marker: false,
    rectangle: false,
  }
});

map.addControl(drawControl);




// var resetMap = function(){
//
//    //console.log(layer);
//     if (myRectangles[0] !== null ) {
//      map.removeLayer(myRectangles[0]);
//     }
//
// };
var myRectangles=[];

//draw the item
map.on('draw:created', function (e) {
    _.each(myRectangles, function(layer){
      map.removeLayer(layer);
    });
    var type = e.layerType; // The type of shape
    //console.log(type);-rectangle
    var layer = e.layer; // The Leaflet layer for the shape
    //console.log(layer);
    var id = L.stamp(layer); // The unique Leaflet ID for the layer
    //layer.addTo(map);
    myRectangles.push(layer);
    _.last(myRectangles).addTo(map);
    console.log(layer._latlngs);

    geometry = {};
    geometry.rings = [];
    var tempArray = [];
    geometry.spatialReference = {'wkid': 4326};

    for (var i=0; i < e.layer._latlngs[0].length; i++) {
        var lat = e.layer._latlngs[0][i].lat;
        var lng = e.layer._latlngs[0][i].lng;
        tempArray.push([lng, lat]);

     }

     //tempArray.push([e.layer._latlngs[0][0].lng, e.layer._latlngs[0][0].lat]);
     //geometry.rings.push(tempArray);
     var poly = JSON.stringify(tempArray);



     var b = inside(testPoint, poly); // true


     console.log(tempArray);
     console.log(poly);
     //var queryGeometry = JSON.stringify(geometry);

    // fetchCrimes(JSON.stringify(geometry));
    // console.log(tempArray);
    // console.log(queryGeometry);





  });

// Creating the map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
  });
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
// Use this link to get the GeoJSON data.
let link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";
// Our style object

  
function chooseColor(borough) {
    if (borough === "Brooklyn") return "yellow";
    else if (borough === "Bronx") return "blue";
    else if (borough == "Manhattan") return "cyan";
    else if (borough == "Queens") return "pink";
    else if (borough == "Staten Island") return "purple";
    else return "black";

}

d3.json(link).then(
    function(data) {
        L.geoJson(data, {
            style: function(feature) {
                return {
                    color: "white",
                    fillColor: chooseColor(feature.properties.borough),
                    fillOpacity: 0.5,
                    weight: 1.5  
                };
            },
            onEachFeature: function(feature, layer) {
                layer.on({
                    mouseover: function(event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                    },
                    mouseout: function(event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.5
                        });
                    },
                    click: function(event) {
                        myMap.fitBounds(event.target.getBounds());
                    },
                });
                layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
            }
        }).addTo(myMap)
    }
);
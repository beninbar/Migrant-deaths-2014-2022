let map, tileLayer;
map = L.map("migrantdeaths");

// Use "voyager" map (bluer water, sharper lines)
/*tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>', 
  subdomains: 'abcd', 
  maxZoom: 20
}).addTo(map);*/


// Dark background from jawg.io
/*tileLayer = L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	subdomains: 'abcd',
  accessToken: 'rzvDM4buOUYWYEWhWG0sASl0M2b3TZGfMHq8P6Po36jfNyYxr49FJn06XBgL5jmX'
}).addTo(map);*/


tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);


map.setView([39, -19], 3);
map.zoomControl.setPosition("topright");

// Define the features array, and array for the map marker objects to later call on upon click of nav bars.
let migrantfeatures = [];
d3.json("Missing_Migrants_processed.geojson").then(data => {
  // Iterate over the .features property of the GeoJSON object to
  // create an array of objects (features), with every object’s
  // properties as noted.
  migrantfeatures = data.features.map(function(feature){
    // This return returns an object.
    return {
      Incident: feature.properties["Incident ID"],
      Year: feature.properties["Incident year"],
      dead: feature.properties["Number of Dead"],
      missing: feature.properties["Minimum Estimated Number of Missing"],
      dead_and_missing: feature.properties["Total Number of Dead and Missing"],
      females: feature.properties["Number of Females"],
      males: feature.properties["Number of Males"],
      children: feature.properties["Number of Children"],
      cause_of_death: feature.properties["Cause of Death"],
      location: feature.properties["Location of death"],
      description: feature.properties["Article title"],
      source: feature.properties["Information Source"],
      source_url: feature.properties["URL"],
      // Create an L.latLng object out of the GeoJSON coordinates.
      // Remember that in GeoJSON, the coordinates are reversed
      // (longitude, then latitude).
      latLng: L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
    };
  });

  // Iterate over the object to create red circle markers with popups showing each event_ID
  let popup;
  migrantfeatures.forEach(function(x){
    // Create popup
    popup = "Incident ID: " + x.Incident + "<br>Year: " + x.Year + "<br>Dead: " + x.dead + "<br>Missing: " + x.missing + "<br>Dead AND missing: " + x.dead_and_missing + "<br>Location: " + x.location + "<br>Description: " + x.description + "<br>Source: " + x.source + "<br>URL: " + "<a href='" + x.source_url + "' target='_blank' rel='noopener noreferrer'>Link</a>";
    
    // Create circlemarkers for each year with separate classes so as to delay transitions
    if (x.Year === 2014) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, color: 'red', fillOpacity: 1, className: 'circle-transition14'}).bindPopup(popup).addTo(map);
    }
    else if (x.Year === 2015) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, color: 'red', fillOpacity: 1, className: 'circle-transition15'}).bindPopup(popup).addTo(map);
    }
    else if (x.Year === 2016) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, color: 'red', fillOpacity: 1, className: 'circle-transition16'}).bindPopup(popup).addTo(map);
    }
    else if (x.Year === 2017) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, color: 'red', fillOpacity: 1, className: 'circle-transition17'}).bindPopup(popup).addTo(map);
    }
    else if (x.Year === 2018) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, color: 'red', fillOpacity: 1, className: 'circle-transition18'}).bindPopup(popup).addTo(map);
    }
    else if (x.Year === 2019) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, color: 'red', fillOpacity: 1, className: 'circle-transition19'}).bindPopup(popup).addTo(map);
    }
    else if (x.Year === 2020) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, color: 'red', fillOpacity: 1, className: 'circle-transition20'}).bindPopup(popup).addTo(map);
    }
    else if (x.Year === 2021) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, color: 'red', fillOpacity: 1, className: 'circle-transition21'}).bindPopup(popup).addTo(map);
    }
    else if (x.Year === 2022) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, color: 'red', fillOpacity: 1, className: 'circle-transition22'}).bindPopup(popup).addTo(map);
    }
    
    // Open popups on mouseover/hover
    marker.on('mouseover', function(){
      this.openPopup();
    });

  });
});

// Define and assign a Markdown-it renderer, and open the introductory "description" markdown file beneath the map
let md = window.markdownit({html: true}).use(window.markdownitFootnote);
// Load the Markdown file for the main content next to the map, with jQuery.
$.ajax({
  url: "description.md",
  success: function(markdown){
    // Convert the Markdown to HTML.
    let html1;
    html1 = md.render(markdown);
    // Print the HTML to #mapdescription using jQuery.
    $("#mapdescription").html(html1);
  }
});

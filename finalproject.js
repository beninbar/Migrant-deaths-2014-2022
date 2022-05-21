let map, tileLayer;
map = L.map("migrantdeaths", {zoomDelta: 0.25, zoomSnap: 0.25});

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

// Set initial view and zoom control box
map.setView([39, -19], 2.25);
map.zoomControl.setPosition("topright");

// Restrict bounds to one "global frame" by dragging or by zooming out too far.
let bounds = L.latLngBounds([85, -170], [-75, 175]);
map.setMaxBounds(bounds);
map.setMinZoom(2.25);


// Define the features array, and array for the map marker objects to later call on for map features/popup/charts.
let migrantfeatures = [];
d3.json("Missing_Migrants_processed.geojson").then(data => {

  /* Iterate over the .features property of the GeoJSON object to create an array of objects (features),
  returning every object’s properties as noted.*/
  migrantfeatures = data.features.map(function(feature){
    // This return returns an object.
    return {
      Incident: feature.properties["Incident ID"],
      date_orig: feature.properties["Incident Date"],
      date: new Date(feature.properties["Incident Date"]),  // Note 15 dates were manually input here to run d3.line chart data.
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
      region: feature.properties["Region of Origin"],
      // Create an L.latLng object out of the GeoJSON coordinates.
      // Remember that in GeoJSON, the coordinates are reversed (longitude, then latitude).
      latLng: L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
    };
  });

  // Check returned data
  console.log(migrantfeatures)

  // Sort migrantfeatures by date for d3.lineGenerator later
  function sortbyDateAscending(a, b) {
    return a.date - b.date;
  }
  migrantfeatures = migrantfeatures.sort(sortbyDateAscending)


  // Define popup, layers outside of forEach function below to access them later for buttons
  let popup;
  let alldata = L.layerGroup();
  data2014 = L.layerGroup().addTo(alldata)
  data2015 = L.layerGroup().addTo(alldata)
  data2016 = L.layerGroup().addTo(alldata)
  data2017 = L.layerGroup().addTo(alldata)
  data2018 = L.layerGroup().addTo(alldata)
  data2019 = L.layerGroup().addTo(alldata)
  data2020 = L.layerGroup().addTo(alldata)
  data2021 = L.layerGroup().addTo(alldata)
  data2022 = L.layerGroup().addTo(alldata)
  
  // Iterate over the object to create circle markers with popups showing each event_ID
  migrantfeatures.forEach(function(x){
    // Create popup
    popup = "Year: " + x.Year + "<br>Dead: " + x.dead + "<br>Missing: " + x.missing + "<br>Dead AND missing: " + x.dead_and_missing + "<br>Location: " + x.location + "<br>Description: " + x.description + "<br>Source: " + x.source + "<br>URL: " + "<a href='" + x.source_url + "' target='_blank' rel='noopener noreferrer'>Link</a>";
    
    // Create circlemarkers for each year with separate classes so as to delay transitions
    if (x.Year === 2014) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, fillOpacity: 1, className: 'circle-transition14'}).bindPopup(popup).addTo(data2014);
    }
    else if (x.Year === 2015) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, fillOpacity: 1, className: 'circle-transition15'}).bindPopup(popup).addTo(data2015);
    }
    else if (x.Year === 2016) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, fillOpacity: 1, className: 'circle-transition16'}).bindPopup(popup).addTo(data2016);
    }
    else if (x.Year === 2017) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, fillOpacity: 1, className: 'circle-transition17'}).bindPopup(popup).addTo(data2017);
    }
    else if (x.Year === 2018) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, fillOpacity: 1, className: 'circle-transition18'}).bindPopup(popup).addTo(data2018);
    }
    else if (x.Year === 2019) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, fillOpacity: 1, className: 'circle-transition19'}).bindPopup(popup).addTo(data2019);
    }
    else if (x.Year === 2020) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, fillOpacity: 1, className: 'circle-transition20'}).bindPopup(popup).addTo(data2020);
    }
    else if (x.Year === 2021) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, fillOpacity: 1, className: 'circle-transition21'}).bindPopup(popup).addTo(data2021);
    }
    else if (x.Year === 2022) {
      marker = L.circleMarker(x.latLng, {title: 'Dead: ' + x.dead, radius: 1, fillOpacity: 1, className: 'circle-transition22'}).bindPopup(popup).addTo(data2022);
    }

    // Add the feature group of all points to the map
    map.addLayer(alldata);

    // Open popups on mouseover/hover
    marker.on('mouseover', function(){
      this.openPopup();
    });

  });
  
  
  // Change className of layergroups in order to have specific control on map AFTER transition in (otherwise circle-transitions continue for each click)
  for (layer in data2014._layers){
    data2014.getLayer(layer)['options']['className'] = 'leaflet-interactive';
  }
  for (layer in data2015._layers){
    data2015.getLayer(layer)['options']['className'] = 'leaflet-interactive';
  }
  for (layer in data2016._layers){
    data2016.getLayer(layer)['options']['className'] = 'leaflet-interactive';
  }
  for (layer in data2017._layers){
    data2017.getLayer(layer)['options']['className'] = 'leaflet-interactive';
  }
  for (layer in data2018._layers){
    data2018.getLayer(layer)['options']['className'] = 'leaflet-interactive';
  }
  for (layer in data2019._layers){
    data2019.getLayer(layer)['options']['className'] = 'leaflet-interactive';
  }
  for (layer in data2020._layers){
    data2020.getLayer(layer)['options']['className'] = 'leaflet-interactive';
  }
  for (layer in data2021._layers){
    data2021.getLayer(layer)['options']['className'] = 'leaflet-interactive';
  }
  for (layer in data2022._layers){
    data2022.getLayer(layer)['options']['className'] = 'leaflet-interactive';
  }

  
  // Function responses to for clickable buttons for each year. Start with 2014.
  $("#yearodex2014").click(function () {
    map.removeLayer(data2014);
    map.removeLayer(data2015);
    map.removeLayer(data2016);
    map.removeLayer(data2017);
    map.removeLayer(data2018);
    map.removeLayer(data2019);
    map.removeLayer(data2020);
    map.removeLayer(data2021);
    map.removeLayer(data2022);
    map.addLayer(data2014);
  });
  // 2015
  $("#yearodex2015").click(function () {
    map.removeLayer(data2014);
    map.removeLayer(data2015);
    map.removeLayer(data2016);
    map.removeLayer(data2017);
    map.removeLayer(data2018);
    map.removeLayer(data2019);
    map.removeLayer(data2020);
    map.removeLayer(data2021);
    map.removeLayer(data2022);
    map.addLayer(data2015);
  });
  // 2016
  $("#yearodex2016").click(function () {
    map.removeLayer(data2014);
    map.removeLayer(data2015);
    map.removeLayer(data2016);
    map.removeLayer(data2017);
    map.removeLayer(data2018);
    map.removeLayer(data2019);
    map.removeLayer(data2020);
    map.removeLayer(data2021);
    map.removeLayer(data2022);
    map.addLayer(data2016);
  });
  // 2017
  $("#yearodex2017").click(function () {
    map.removeLayer(data2014);
    map.removeLayer(data2015);
    map.removeLayer(data2016);
    map.removeLayer(data2017);
    map.removeLayer(data2018);
    map.removeLayer(data2019);
    map.removeLayer(data2020);
    map.removeLayer(data2021);
    map.removeLayer(data2022);
    map.addLayer(data2017);
  });
  // 2018
  $("#yearodex2018").click(function () {
    map.removeLayer(data2014);
    map.removeLayer(data2015);
    map.removeLayer(data2016);
    map.removeLayer(data2017);
    map.removeLayer(data2018);
    map.removeLayer(data2019);
    map.removeLayer(data2020);
    map.removeLayer(data2021);
    map.removeLayer(data2022);
    map.addLayer(data2018);
  });
  // 2019
  $("#yearodex2019").click(function () {
    map.removeLayer(data2014);
    map.removeLayer(data2015);
    map.removeLayer(data2016);
    map.removeLayer(data2017);
    map.removeLayer(data2018);
    map.removeLayer(data2019);
    map.removeLayer(data2020);
    map.removeLayer(data2021);
    map.removeLayer(data2022);
    map.addLayer(data2019);
  });
  // 2020
  $("#yearodex2020").click(function () {
    map.removeLayer(data2014);
    map.removeLayer(data2015);
    map.removeLayer(data2016);
    map.removeLayer(data2017);
    map.removeLayer(data2018);
    map.removeLayer(data2019);
    map.removeLayer(data2020);
    map.removeLayer(data2021);
    map.removeLayer(data2022);
    map.addLayer(data2020);
  });
  // 2021
  $("#yearodex2021").click(function () {
    map.removeLayer(data2014);
    map.removeLayer(data2015);
    map.removeLayer(data2016);
    map.removeLayer(data2017);
    map.removeLayer(data2018);
    map.removeLayer(data2019);
    map.removeLayer(data2020);
    map.removeLayer(data2021);
    map.removeLayer(data2022);
    map.addLayer(data2021);
  });
  // 2022
  $("#yearodex2022").click(function () {
    map.removeLayer(data2014);
    map.removeLayer(data2015);
    map.removeLayer(data2016);
    map.removeLayer(data2017);
    map.removeLayer(data2018);
    map.removeLayer(data2019);
    map.removeLayer(data2020);
    map.removeLayer(data2021);
    map.removeLayer(data2022);
    map.addLayer(data2022);
  });
  // All
  $("#allyears").click(function () {
    map.addLayer(data2014);
    map.addLayer(data2015);
    map.addLayer(data2016);
    map.addLayer(data2017);
    map.addLayer(data2018);
    map.addLayer(data2019);
    map.addLayer(data2020);
    map.addLayer(data2021);
    map.addLayer(data2022);
  });

  // Globally scoped variables for chart
  const height = 700,
        width = 1200,
        margin = {top: 50, bottom: 50, left: 50, right: 50},
        hovercolor = "red";
  let xScale, yScale, xAxis, yAxis, xAxisGroup, yAxisGroup, tooltip;
  
  // Scales for chart
  xScale = d3.scaleTime()
    .domain(d3.extent(migrantfeatures, d => d.date)).nice()
    .range([margin.left, width-margin.right])

  yScale = d3.scaleLinear()
    .domain([0, d3.max(migrantfeatures, d => d.dead_and_missing)])
    .range([height-margin.bottom, margin.top])

  // Build and call axes for chart
  xAxis = d3.axisBottom(xScale)
  yAxis = d3.axisLeft(yScale)

  // Create svg for chart
  svg = d3.select("#linechart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "relative")
  
  // Tooltip
  tooltip = d3.select("#linechart")
    .append("div")
    .attr("class", "tooltip")
    .style("z-index", "1")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("padding", "8px")
    .text("tooltip")

  // Append axes to svg
  xAxisGroup = svg.append("g")
    .attr("transform", `translate(0, ${height-margin.bottom})`)
    .call(xAxis)
    .attr("color", "white")
    .append("text")
    .attr("fill", "white")
    .attr("transform", `translate(${width*.5}, 40)`)
    .text("Date")
    .style("font-size", 20)

  yAxisGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis)
    .attr("color", "white")
    .append("text")
    .attr("fill", "white")
    .attr("transform", `translate(-35, ${height*.5-margin.top-margin.bottom})rotate(-90)`)
    .text("Number dead or missing")
    .style("font-size", 20)
  
  svg.selectAll("rect")
    .data(migrantfeatures)
    .join("rect")
    .attr("width", 3)
    .attr("height", d => height-margin.bottom - yScale(d.dead_and_missing))
    .attr("x", d => xScale(d.date))
    .attr("y", d => yScale(d.dead_and_missing))
    .attr("fill", "darkblue")
      .on("mouseover", function(d, i) {
        tooltip.html(`<div>Date: ${i.date_orig}</div><div>Number of victims: ${i.dead_and_missing}</div><div>Number of children: ${i.children}</div><div>Location: ${i.location}</div>`)
          .style("visibility", "visible").style("opacity", 0.75)
        d3.select(this).transition().attr("fill", "red");
      })
      .on("mousemove", function(d) {
        let xPos = d3.select(this).attr("x")
        let tipPosX = +xPos + 20
        let yPos = d3.select(this).attr("y")
        let tipPosY = +yPos
        d3.select(".tooltip")
          .style("left", tipPosX + "px")
          .style("top", tipPosY + "px")
        //tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageY + 10 + "px");
      })
      .on("mouseout", function(event, d) {
        tooltip.html(``).style("visibility", "hidden")
        d3.select(this).transition().attr("fill", "darkblue");
      })
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

// Linechart markdown
$.ajax({
  url: "chartingdeaths.md",
  success: function(markdown){
    // Convert the Markdown to HTML.
    let html1;
    html1 = md.render(markdown);
    // Print the HTML to #mapdescription using jQuery.
    $("#linechartdescription").html(html1);
  }
});
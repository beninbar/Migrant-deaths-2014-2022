## Where are they? Migrant deaths
This project aims to bring attention to deaths occurring during or as a result of global migration. While migratory deaths have garnered some press coverage during momentary crises, there has been minimal visualization or long-term focus on this human toll. Here, various visual methods are combined with interactivity to view the scale of the issue geographically by mapping and charting it. The ultimate goal is to implore the viewer to question geopolitical constructs that facilitate this suffering.

Originally inspired by an assignment to utilize Leaflet, I was immediately drawn to the highly reported but poorly understood migrant crisis, starting in Europe in 2014. Although a Google search today might provide maps, statistics, or other visual guides, this has been a recent phenomenon. Despite this, media attention to the various ongoing global migratory crisis "hotspots" remains transitory, contributing to a fragmented perspective. Indeed, digestible and centralized migrant death data, at least in Europe, was [not available until 2013](http://www.themigrantsfiles.com/), with the [UN International Organization for Migration](https://www.iom.int/iom-history) only initiating a public database in 2014.

## Project links
1. [Page](https://beninbar.github.io/Migrant-deaths-2014-2022/finalproject.html)
2. [Github](https://github.com/beninbar/Migrant-deaths-2014-2022)

## Data source
[The Missing Migrants Project](https://missingmigrants.iom.int/downloads)

## Process
The main goal was to immerse the viewer into the graphical experience. The page by itself utilizes a clean, soft dynamic that attempts to mimic the behaviors characteristic of the open ocean: the waveform of graphics entering the page, the horizon-esque dark blue-ish color schemes, the eyes drawn to single points of data or text in a vast space.

The first iteration wireframe provided a structure that was later simplified:
![Wireframe](https://user-images.githubusercontent.com/61599562/169631024-2e544c71-7b9b-45eb-b39d-25439a4f0c5b.jpg)

For color palettes, I [found compelling images](https://unsplash.com/s/photos/migrant) that spoke to the theme, and [generated](https://palettegenerator.com/) associated color palettes:

![Screenshot 2022-05-20 223902](https://user-images.githubusercontent.com/61599562/169631132-18d28a8d-61ff-4495-b125-99517a6c3098.jpg)
----------------------------------------------------------------------------------------------------------------------------------------
![Screenshot 2022-05-20 224657](https://user-images.githubusercontent.com/61599562/169631433-aeb6787b-0483-45c9-b77b-0e6b6128b5d8.jpg)
![Screenshot 2022-05-20 224808](https://user-images.githubusercontent.com/61599562/169631439-3997466e-fbab-4395-827b-d64085070731.jpg)
![Screenshot 2022-05-20 224134](https://user-images.githubusercontent.com/61599562/169631213-78c04455-09ce-44ba-855f-4d495208b9a7.jpg)


Google provided an elegant, minimalist font: [Raleway](https://fonts.google.com/specimen/Raleway)

Creating the desired experience on the webpage itself required extensive use of CSS Keyframe animations (in addition to fiddling with Leaflet classes):
https://user-images.githubusercontent.com/61599562/169632944-d89ece39-b4ef-46e5-b89b-f7202501bdbe.mp4

In order to achieve the desired lat/long formats required by Leaflet, I processed the raw data geolocation points using a Python dataframe and regular expression patterns to eliminate the presumed GIS or other geosoftware text.

## Future directions
Ultimately, this project feels foundational. Much of what excites me are possibilities with respect to expanding on the interactive graphics found below the map on the page. There are several dimensions within the dataset that warrant further exploration i.e. analysing events by demography, by cause of death, by region or country of origin, or by further scrutinizing the source material for each report. There are also many null values within the set that could be cleaned or potentially evaluated for weaknesses in recordkeeping.

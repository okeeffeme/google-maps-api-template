document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBgl4T1XT-KkZTbTOeSeBvV1HrdCZg-99A&callback=initMap&language=' + lang;
		document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});

var map;
var infoWindow;

function initMap()
{
	console.log("InitMap Runs");
	//sets map options
	map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
		mapTypeControl: false,
		streetViewControl: false
  });

//fetches markers.json and then runs plot on info
  fetch('markers.json')
    .then(function(response){return response.json()})
    .then(plotMarkers);
}

var markers;
var bounds;
var tooltip;

function plotMarkers(m)
{
  markers = []; //creates markers array
  bounds = new google.maps.LatLngBounds(); //keeps track of map bounds
	var infoWindow = new google.maps.InfoWindow({
		content: "placeholder"
	});


  m.forEach(function (marker) {
		//creates marker properties

		var current =  new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(marker.lat, marker.lng),
			icon: 'marker-01.png',
			title: marker.title,
			contentString: marker.content,
		});

		//pushes marker to array
		markers.push(
			current
    );

		google.maps.event.addListener(current, 'click', function () {
			// adding content from the marker
			infoWindow.close();
			infoWindow.setContent(this.contentString);
			infoWindow.open(map, this);
		});

    bounds.extend(current.position);

  });

  map.fitBounds(bounds); //recenter map around markers

}

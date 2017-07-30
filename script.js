document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCEY8Pl39BVsEg5LJvg_G4f3P1lbtplCnk&callback=initMap&language=' + lang;
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
    center: {lat: 59.913837, lng: 10.738762},
    zoom: 15,
		mapTypeControl: false,
		streetViewControl: false,
		styles: [{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"},{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}]
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
		var windowText =
			marker.sculptor != null ?
			marker.title + " by " + marker.sculptor : marker.title;

		var current =  new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(marker.lat, marker.lng),
			icon: 'marker-01.png',
			title: marker.title,
			contentString: windowText
		});

		//pushes marker to array
		markers.push(
			current
    );

		google.maps.event.addListener(current, 'click', function () {
			// adding content from the marker
			infoWindow.setContent(this.contentString);
			infoWindow.open(map, this);
		});

    bounds.extend(current.position);

  });

  //map.fitBounds(bounds); //recenter map around markers
	// var listener = google.maps.event.addListener(map, "idle", function() {
	//   if (map.getZoom() < 15) map.setZoom(15);
	//   google.maps.event.removeListener(listener);
	// });


}

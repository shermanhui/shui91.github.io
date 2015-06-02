var HTMLspacer = '<div class="spacer"></div>';

// Personal Profile Section //
var HTMLprofileHeader = '<header class="section-header profile-header-info text-center"><h2 class="section-title"><span>Personal Profile</span></h2><div class="spacer"></div><p class="section-subtitle">Developing the web developer</p></header>';
var HTMLprofilePic = '<div class="col-md-3"><div class="profile"><img class="img-responsive" src="https://placeimg.com/555/333/tech" alt="Game Image"/></div></div>';
var HTMLprofilePara = '<div class="col-md-9 profile-para"></div>';
var HTMLprofileInfo = '<p>%data%</p>';

// Education Section //
var HTMLschoolHeader = '<header class="section-header education-header-info text-center"><header class="section-header"><h2 class="section-title"><span>Education</span></h2><div class="spacer"></div><p class="section-subtitle">Where I\'ve learned</p></header></header>';
var HTMLschoolName = '<div class="col-md-12"><article class="education education-item text-center"><header><h3>%data%</h3>';
var HTMLschoolDegree = '<p>%data%, ';
var HTMLschoolMajor = ' %data%,';
var HTMLschoolDates = ' %data%,';
var HTMLschoolLocation = ' %data%</p></header>';
var HTMLschoolDescription = '<p>%data%</p></article></div>';

var HTMLonlineStart = '<div class="row online-education-row"></div>';
var HTMLonlineHeader = '<header class="section-header education-header-info text-center"><header class="section-header"><h2 class="section-title online-title"><span>Online Ed</span></h2><div class="spacer"></div><p class="section-subtitle">In the pursuit of knowledge</p></header></header>';
var HTMLonlineTitle = '<div class="col-md-4 text-center"><article class="online-ed"><header><h3>%data%</h3>';
var HTMLonlineSchool = '<p>%data%, ';
var HTMLonlineDates = '%data%, ';
var HTMLonlineURL = ' <a href=%data%>Certification</a></p></article></div>';

// Skills Section //
var HTMLskillsHeader = '<header class="section-header skills-header-info text-center"><header class="section-header"><h2 class="section-title"><span>Skills</span></h2><div class="spacer"></div><p class="section-subtitle">Technical proficiencies</p></header></header>';
var HTMLskillsItem = '<div class="col-md-2 text-center"><div class="chart" data-percent="50" data-scale-color="#ffb400"><p>%data%</p></div></div>';

// Work Section //
var HTMLworkHeader = '<header class="section-header work-header-info text-center"><header class="section-header"><h2 class="section-title"><span>Experience</span></h2><div class="spacer"></div><p class="section-subtitle">Where I\'ve worked</p></header></header>';
var HTMLworkEmployer = '<div class="col-md-4"><article class="experience work-item"><header><h3>%data%</h3>';
var HTMLworkTitle = '<p>%data%';
var HTMLworkLocation = '%data%';
var HTMLworkDates = ', %data%</p></header>';
var HTMLworkDescription = '<p>%data%</p></article></div>';

// Projects Section //
var HTMLprojectHeader = '<header class="section-header work-header-info text-center"><header class="section-header"><h2 class="section-title"><span>Portfolio</span></h2><div class="spacer"></div><p class="section-subtitle">Compilation of projects</p></header></header>';
var HTMLprojectTitle = '<div class="col-md-4 text-center"><article class="projects project-item"><div class=thumbnail><div class="caption"><h3>%data%</h3>';
var HTMLprojectDates = '<p>%data%';
var HTMLprojectDescription = ', %data%</p></div>';
var HTMLprojectImage = '<img class="img-responsive center-block" src="%data%"></article></div>';

// GOOGLE MAPS VAR //
var HTMLmapHeader = '<header class="section-header text-center"><h2 class="section-title"><span>Where I\'ve Lived and Worked</span><div class="spacer map-spacer"></div></h2></header>';
var googleMap = '<div id="map"></div>';
var infoWindow = new google.maps.InfoWindow();

// CONTACT ME //
var HTMLcontactHeader = '<header class="section-header text-center"><h2 class="section-title"><span>Let\'s Get In Touch</span></h2><div class="spacer"></div><p class="section-subtitle">Contact Info</p></header>';


/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x, y) {
  clickLocations.push(
  {
    x: x,
    y: y
  }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
    var x = loc.pageX;
    var y = loc.pageY;

    logClicks(x, y);
});

// PIE CHART JS //
$(function() {
  $('.chart').easyPieChart({
      barColor: '#3498db',
      size: '150',
      easing: 'easeOutBounce'
  });
});

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  // This next line makes `map` a new Google Map JavaScript Object and attaches it to
  // <div id="map">, which is appended as part of an exercise late in the course.
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.location);

    // iterates through school locations and appends each location to
    // the locations array
    //for (var school in education.schools) {
    //  locations.push(education.schools[school].location);
    //}

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
    }

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      animation: google.maps.Animation.DROP,
      title: name
    });

    google.maps.event.addListener(marker, 'click', toggleBounce);

    // Added a Bounce animation when users click the marker
    function toggleBounce() {
      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      } 
      else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    var styles = [
      {
        stylers: [
          { "saturation" : -100},
          { "visibility" : "on"}
        ]
      }
    ];

    map.setOptions({styles: styles});

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    //var infoWindow = new google.maps.InfoWindow({
    //  content: name
    //});

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
      infoWindow.setContent(name);
      infoWindow.open(map, marker);
    });


    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
    for (var place in locations) {

      // the search request object
      var request = {
        query: locations[place]
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

//Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

//Vanilla JS way to listen for resizing of the window
//and adjust map bounds
window.addEventListener('resize', function(e) {
//Make sure the map bounds get updated on page resize
 map.fitBounds(mapBounds);
});


// UNUSED CODE FROM ASSIGNMENT //
//var internationalizeButton = ;
/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
// $(document).ready(function() {
//   $('button').click(function() {
//     var iName = inName() || function(){};
//     $('#name').html(iName);  
//   });
// });

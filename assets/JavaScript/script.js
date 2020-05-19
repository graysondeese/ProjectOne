// Object for neighborhoods
var neighborhoods = [
  {
    title: "Barclay Downs",
    coords: { lat: 35.161352, lng: -80.838031 },
  },
  {
    title: "Belmont",
    coords: {lat: 35.228643, lng: -80.822258 },
    },
  {
    title: "South End",
    coords: { lat: 35.2125569, lng: -80.8588 },
  },
  {
    title: "North Davidson",
    coords: { lat: 35.2482123, lng: -80.8018 },
  },
  {
    title: "Plaza Midwood",
    coords: { lat: 35.2239, lng: -80.8018 },
  },
  {
    title: "Dilworth",
    coords: { lat: 35.2058895, lng: -80.8516 },
  },
  {
    title: "Cotswold",
    coords: { lat: 35.1849, lng: -80.7907 },
  },
  {
    title: "Oakhurst",
    coords: { lat: 35.1914, lng: -80.7771 },
  },
  {
    title: "Myers Park",
    coords: { lat: 35.1797, lng: -80.8262 },
  },
  {
    title: "Montford",
    coords: { lat: 35.1744, lng: -80.8502 },
  },
  {
    title: "Eastover",
    coords: { lat: 35.1924, lng: -80.8184 },
  },
  {
    title: "Elizabeth",
    coords: { lat: 35.2142, lng: -80.8184 },
  },
  {
    title: "First Ward",
    coords: { lat: 35.2264, lng: -80.835 },
  },
  {
    title: "Fourth Ward",
    coords: { lat: 35.231, lng: -80.8419 },
  },
  {
    title: "Greenville",
    coords: { lat: 35.2419, lng: -80.8422 },
  },
];

//passes selected neighborhood to results.html
function passValue() {
  var selectNeighborhood = document.getElementById("neighborhoods").value;
  localStorage.setItem("neighborhood", selectNeighborhood);
  return true;
}
function submitBtn() {
  var submitBtn = document.getElementById("submit-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", function (event) {
      event.preventDefault();
      passValue();
    });
  }
}

// Hide the cards by default
$(".card").hide()

//================Map=====================
// to hold the map
var map;
//function for map
function initMap() {
  // Disable default street stuff
  var myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];
  
  //new map
  map = new google.maps.Map(document.getElementById("map"), {
    //map options
    center: { lat: 35.2271, lng: -80.8431 },
    zoom: 12,
    disableDefaultUI: true,
    styles: myStyles
  });
  // Get selected neighborhoods from storage
  var neighborhood = localStorage.getItem("neighborhood");
  console.log(neighborhood);
  var neighborhoodCoords;
  // Iterate through the object
  for (var i = 0; i < neighborhoods.length; i++) {
    // If an objects title is equal to selected neighborhood
    if (neighborhood === neighborhoods[i].title) {
      // Assign the coordinates to a variable
      neighborhoodCoords = neighborhoods[i].coords;
      console.log(neighborhoodCoords);
    }
  }

  neighborhoodMarker(neighborhoodCoords);

  function neighborhoodMarker() {
    // add marker
    var marker = new google.maps.Marker({
      position: neighborhoodCoords,
      map: map,
      animation: google.maps.Animation.DROP,
    });

    // zoom and pan to marker
    map.panTo(neighborhoodCoords);
    map.setZoom(15);
  }
}

var outdoorMarkers = []
var popularMarkers = []
var restaurantMarkers = []

//===== Function to display cars ======
function displayEventsCard() {
  $(".events-card").show()
}

function displayOutdoorCard() {
  $(".outdoor-areas-card").show()
}

function displayPopularCard() {
  $(".popular-card").show()
}

function displayRestaurantCard(){
  $(".restaurant-card").show()
}

// Check if restaurant box is checked
function restaurantCheck(){ 
  var restaurantCheck = document.getElementById("restaurants").checked
  if(restaurantCheck == true) {
    getRestaurants()
  } else {
    clearRestaurantMarkers()
  }
}
// Get restaurant data from API
function getRestaurants() {
  // Get selected neighborhoods from storage
  var neighborhood = localStorage.getItem("neighborhood"); 
  // Iterate through object
  for (var i = 0; i < neighborhoods.length; i++) {
    // If an objects title is equal to selected neighborhood
    if (neighborhood === neighborhoods[i].title) {
      // Assign the coordinates to a variable
      var neighborhoodCoords = neighborhoods[i].coords;
    }
  }
  // Get places service
  var service = new google.maps.places.PlacesService(map)
  // Query for nearby places
  var request = {
    location: new google.maps.LatLng(neighborhoodCoords.lat, neighborhoodCoords.lng),
    radius: "1500",
    type: ["restaurant"],
  }
  service.nearbySearch(request, handleResults)

  function handleResults(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK) {
        for(var i=1; i < 10; i++) {
        console.log(results[i])
        addMarker(results[i])
        var restaurantsCard = $("card-section-four");
        var rItemOne = $("#restaurant-item-one").text(results[0].name);
        $(restaurantsCard).append(rItemOne);
        var rItemTwo = $("#restaurant-item-two").text(results[1].name);
        $(restaurantsCard).append(rItemTwo);
        var rItemThree = $("#restaurant-item-three").text(results[2].name);
        $(restaurantsCard).append(rItemThree);
        var rItemFour = $("#restaurant-item-four").text(results[3].name);
        $(restaurantsCard).append(rItemFour);
        var rItemFive = $("#restaurant-item-five").text(results[4].name);
        $(restaurantsCard).append(rItemFive);
        var rItemSix = $("#restaurant-item-six").text(results[5].name);
        $(restaurantsCard).append(rItemSix);
        var rItemSeven = $("#restaurant-item-seven").text(results[6].name);
        $(restaurantsCard).append(rItemSeven);
        var rItemEight = $("#restaurant-item-eight").text(results[7].name);
        $(restaurantsCard).append(rItemEight);
        var rItemNine = $("#restaurant-item-nine").text(results[8].name);
        $(restaurantsCard).append(rItemNine);
        var rItemTen = $("#restaurant-item-ten").text(results[9].name);
        $(restaurantsCard).append(rItemTen);
      }
   }
  }
  
  function addMarker(results) {
    var marker = new google.maps.Marker({
      position: results.geometry.location,
      map: map,
      animation: google.maps.Animation.DROP,
      icon : "https://img.icons8.com/ios-glyphs/30/000000/restaurant.png"
    })
    restaurantMarkers.push(marker)
  }
  
}

// Check if popular is checked
function popularCheck() {
  var popularCheck = document.getElementById("popular").checked
  if(popularCheck == true) {
    getPopular()
  }
}

// Get popular places data 
function getPopular() {
  // Get selected neighborhoods from storage
  var neighborhood = localStorage.getItem("neighborhood"); 
  // Iterate through object
  for (var i = 0; i < neighborhoods.length; i++) {
    // If an objects title is equal to selected neighborhood
    if (neighborhood === neighborhoods[i].title) {
      // Assign the coordinates to a variable
      var neighborhoodCoords = neighborhoods[i].coords;
    }
  }
  // Get places service
  var service = new google.maps.places.PlacesService(map)
  // Query for nearby places
  var request = {
    location: new google.maps.LatLng(neighborhoodCoords.lat, neighborhoodCoords.lng),
    radius: "1500",
    type: ["aquarium", "art-gallery", "shopping-mall", "tourist-attraction", "movie-theater", "stadium", "night-club"],
  }
  service.nearbySearch(request, handleResults)

  function handleResults(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK) {
        for(var i=1; i < 10; i++) {
        console.log(results[i])
        addMarker(results[i])
        var popularCard = $("card-section-three");
        var rItemOne = $("#popular-item-one").text(results[0].name);
        $(popularCard).append(rItemOne);
        var rItemTwo = $("#popular-item-two").text(results[1].name);
        $(popularCard).append(rItemTwo);
        var rItemThree = $("#popular-item-three").text(results[2].name);
        $(popularCard).append(rItemThree);
        var rItemFour = $("#popular-item-four").text(results[3].name);
        $(popularCard).append(rItemFour);
        var rItemFive = $("#popular-item-five").text(results[4].name);
        $(popularCard).append(rItemFive);
        var rItemSix = $("#popular-item-six").text(results[5].name);
        $(popularCard).append(rItemSix);
        var rItemSeven = $("#popular-item-seven").text(results[6].name);
        $(popularCard).append(rItemSeven);
        var rItemEight = $("#popular-item-eight").text(results[7].name);
        $(popularCard).append(rItemEight);
        var rItemNine = $("#popular-item-nine").text(results[8].name);
        $(popularCard).append(rItemNine);
        var rItemTen = $("#popular-item-ten").text(results[9].name);
        $(popularCard).append(rItemTen);
      }
   }
  }
  
  function addMarker(results) {
    var marker = new google.maps.Marker({
      position: results.geometry.location,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: "https://img.icons8.com/color/48/000000/popular-topic.png"
    })
    popularMarkers.push(marker)
  }
}

// Check if popular is checked
function popularCheck() {
  var popularCheck = document.getElementById("popular").checked
  if(popularCheck == true) {
    getPopular()
  } else {
    clearPopularMarkers()
  }
}

//Check if restaurants is checked
function restaurantCheck() {
  var restaurantCheck = document.getElementById("restaurants").checked
  if(restaurantCheck == true) {
    getRestaurants()
  } else {
    clearRestaurantMarkers()
  }
}

// Check if outdoors is checked
function outdoorCheck() {
  var outdoorCheck = document.getElementById("outdoor-areas").checked
  if(outdoorCheck == true) {
    getOutdoor()
  } else {
    clearOutdoorMarkers()
  }
}

// Get outdoor areas data
function getOutdoor() {
  // Get selected neighborhoods from storage
  var neighborhood = localStorage.getItem("neighborhood"); 
  // Iterate through object
  for (var i = 0; i < neighborhoods.length; i++) {
    // If an objects title is equal to selected neighborhood
    if (neighborhood === neighborhoods[i].title) {
      // Assign the coordinates to a variable
      var neighborhoodCoords = neighborhoods[i].coords;
    }
  }
  // Get places service
  var service = new google.maps.places.PlacesService(map)
  // Query for nearby places
  var request = {
    location: new google.maps.LatLng(neighborhoodCoords.lat, neighborhoodCoords.lng),
    radius: "1500",
    type: ["park"],
  }
  service.nearbySearch(request, handleResults)
  
  function handleResults(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK) {
        for(var i=1; i < 10; i++) {
        console.log(results[i])
        addMarker(results[i])
        var outdoorCard = $("card-section-two");
        var rItemOne = $("#outdoor-item-one").text(results[0].name);
        $(outdoorCard).append(rItemOne);
        var rItemTwo = $("#outdoor-item-two").text(results[1].name);
        $(outdoorCard).append(rItemTwo);
        var rItemThree = $("#outdoor-item-three").text(results[2].name);
        $(outdoorCard).append(rItemThree);
        var rItemFour = $("#outdoor-item-four").text(results[3].name);
        $(outdoorCard).append(rItemFour);
        var rItemFive = $("#outdoor-item-five").text(results[4].name);
        $(outdoorCard).append(rItemFive);
        var rItemSix = $("#outdoor-item-six").text(results[5].name);
        $(outdoorCard).append(rItemSix);
        var rItemSeven = $("#outdoor-item-seven").text(results[6].name);
        $(outdoorCard).append(rItemSeven);
        var rItemEight = $("#outdoor-item-eight").text(results[7].name);
        $(outdoorCard).append(rItemEight);
        var rItemNine = $("#outdoor-item-nine").text(results[8].name);
        $(outdoorCard).append(rItemNine);
        var rItemTen = $("#outdoor-item-ten").text(results[9].name);
        $(outdoorCard).append(rItemTen);
      }
   }
  }
  
  var icon = {
    url: "https://img.icons8.com/pastel-glyph/64/000000/tree.png",
    scaledSize: new google.maps.Size(50,50),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0,0)
  }  
  
  function addMarker(results) {
      var marker = new google.maps.Marker({
        position: results.geometry.location,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: icon
    })
    outdoorMarkers.push(marker)
    }
}

function setMapOnAll(arr, map) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setMap(map);
  }
}

function clearOutdoorMarkers() {
  setMapOnAll(outdoorMarkers, null)
  outdoorMarkers = []
}

function clearPopularMarkers() {
  setMapOnAll(popularMarkers, null)
  popularMarkers = []
}

function clearRestaurantMarkers() {
  setMapOnAll(restaurantMarkers, null)
  restaurantMarkers = []
}

//==========Events/Ticketmaster API===============
function ticketMasterFunc() {
  console.log("hello");

  var ticketMasterKey = "inHlvBLTGUTbsQyVFJkNPakSwfAWIMCa";
  var ticketMasterURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?city=charlotte&apikey=" +
    ticketMasterKey;

  $.ajax({
    url: ticketMasterURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
   
    
    var itemOne = $("<a>").attr("href", response._embedded.events[0].url).text(response._embedded.events[0].name);
    var itemTwo = $("<a>").attr("href", response._embedded.events[1].url).text(response._embedded.events[1].name);
    var itemThree = $("<a>").attr("href", response._embedded.events[2].url).text(response._embedded.events[2].name);
    var itemFour = $("<a>").attr("href", response._embedded.events[3].url).text(response._embedded.events[3].name);
    var itemFive = $("<a>").attr("href", response._embedded.events[4].url).text(response._embedded.events[4].name);
    var itemSix = $("<a>").attr("href", response._embedded.events[5].url).text(response._embedded.events[5].name);
    var itemSeven = $("<a>").attr("href", response._embedded.events[6].url).text(response._embedded.events[6].name);
    var itemEight = $("<a>").attr("href", response._embedded.events[7].url).text(response._embedded.events[7].name);
    var itemNine = $("<a>").attr("href", response._embedded.events[8].url).text(response._embedded.events[8].name);
    var itemTen = $("<a>").attr("href", response._embedded.events[9].url).text(response._embedded.events[9].name);


    $("#event-item-one").append(itemOne);
    $("#event-item-two").append(itemTwo);
    $("#event-item-three").append(itemThree);
    $("#event-item-four").append(itemFour); 
    $("#event-item-five").append(itemFive); 
    $("#event-item-six").append(itemSix); 
    $("#event-item-seven").append(itemSeven); 
    $("#event-item-eight").append(itemEight); 
    $("#event-item-nine").append(itemNine); 
    $("#event-item-ten").append(itemTen); 
  });
}
ticketMasterFunc();


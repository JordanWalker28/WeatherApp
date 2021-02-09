document.addEventListener("DOMContentLoaded", function(event) {
    var address = document.querySelector('.address')
    if (!navigator.geolocation){
      console.log("Geolocation is not supported by your browser");
      ipLookup();
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    
  function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      reverseGeocodingWithGoogle(longitude, latitude)
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
    function ipLookup() {
      fetch('https://extreme-ip-lookup.com/json/')
      .then( res => res.json())
      .then(response => {
          fallbackProcess(response)
      })
      .catch((data, status) => {
          address.innerText = 'We could not find your location'
      })
    }
    
  function reverseGeocodingWithGoogle(latitude, longitude) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?
        latlng=${latitude},${longitude}`)
      .then(response => {
        processUserData(response)
      })
      .catch(status => {
        ipLookup()
      })
    }
    
  function processUserData(response) {
      address.innerText = response.results[0].formatted_address
    }
    
    function fallbackProcess(response) {
      address.innerText = `${response.city}, ${response.country}`
    }
    
  });
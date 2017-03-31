const request = require('request');

const geocodeAddress = (address, callback) => {

  const encodeAddress = encodeURIComponent(address);

  request({
    url: `https://maps.google.com/maps/api/geocode/json?address=${encodeAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to the Google service.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        Lat: body.results[0].geometry.location.lat,
        Lng: body.results[0].geometry.location.lng
      });
    } else {
      console.log('Invalid address');
    }

  });
};

module.exports = {
  geocodeAddress
};

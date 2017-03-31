const request = require('request');

const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const encodeAddress = encodeURIComponent(address);
    request({
      url: `https://maps.google.com/maps/api/geocode/json?address=${encodeAddress}`,
      json: true
    }, (error, response, body) => {
      if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          Lat: body.results[0].geometry.location.lat,
          Lng: body.results[0].geometry.location.lng
        });
      } else {
        reject('Invalid address');
      }
    });
  })
};

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});

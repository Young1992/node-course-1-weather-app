const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .default('a', 'Dublin', 'Home weather.')
  .help()
  .alias('help', 'h')
  .argv;

const encodeAddress = encodeURIComponent(argv.address);
const geocodeURL = `https://maps.google.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(geocodeURL).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find the address.');
  }

  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  const weatherURL = `https://api.darksky.net/forecast/e20012a2c092d400161d8af5eabe0ba4/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherURL);
}).then((response) => {
  let temperature = response.data.currently.temperature;
  console.log(`It is currently ${temperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to the API server');
  } else {
    console.log(e.message);
  }
});

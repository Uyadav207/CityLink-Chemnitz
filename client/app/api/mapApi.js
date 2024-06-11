function mapApiUri(address, apiKey) {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
}

// function placeDetailsUi(key, placeId) {
//   return `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}`;
// }

export { mapApiUri };

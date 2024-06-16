function mapApiUri(address, apiKey) {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
}
export { mapApiUri };

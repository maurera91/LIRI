js
console.log('this is loaded');

module.exports.spotify_keys = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
module.exports.OMDB = {
    key: process.env.OMDB_KEY
}
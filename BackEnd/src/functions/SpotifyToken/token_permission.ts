// biome-ignore lint/style/noVar: <explanation>
var client_id = '';
// biome-ignore lint/style/noVar: <explanation>
var client_secret = '';

export const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    // biome-ignore lint/style/useTemplate: <explanation>
    'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: new URLSearchParams({
    grant_type: 'client_credentials'
  }),
};




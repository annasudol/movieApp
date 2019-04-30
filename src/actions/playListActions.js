export const handleFetchPlaylist = (id, name, images, tracks) => {
    return {
      type: 'FETCH_PLAYLIST',
      id,
      name,
      images,
      tracks
    };
  };
  
  
  export const fetchPlayList = (accessToken, playlist_id) => {
    return dispatch => {
      const request = new Request(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
        headers: new Headers({
          'Authorization': 'Bearer ' + accessToken
        })
      });
      fetch(request).then(res => {
        return res.json();
      }).then(res => {
        dispatch(handleFetchPlaylist(playlist_id, res.name, res.images, res.tracks));
      }).catch(err => {
        console.warn('Error with uploading playlist', err)
      });
    };
  };
  
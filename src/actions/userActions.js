export const handleFetchUser = (user) => {
  return {
    type: 'FETCH_USER',
    user
  };
};



export const fetchUser = (accessToken) => {

  return dispatch => {
    const request = new Request('https://api.spotify.com/v1/me', {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request).then(res => {
      // send user back to homepage if no token
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      dispatch(handleFetchUser(res));
    }).catch(err => {
      console.warn('Error with logging in', err)
    });
  };
};


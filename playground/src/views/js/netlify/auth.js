export function authorise() {
    return new Promise((resolve) => {
        resolve(handleAccessToken());
    });
  }
  
  function handleAccessToken() {
    // The access token is returned in the hash part of the document.location
    // We'll return access token only
  
    const response = document.location.hash
      .replace(/^#/, '')
      .split('&')
      .reduce((result, pair) => {
        const keyValue = pair.split('=')
        result[keyValue[0]] = keyValue[1]
        return result
      }, {})
  
    // Remove the token so it's not visible in the URL after we're done
    document.location.hash = ''
  
    if (!localStorage.getItem(response.state)) {
      // We need to verify the random state we set before starting the request,
      // otherwise this could be an access token from someone else than our user
      alert('CSRF Attack')
      return
    }
  
    localStorage.removeItem(response.state)
  
    // Store token in local storage.
    let key = 'autkn'
    localStorage.setItem(key, response.access_token)
  }
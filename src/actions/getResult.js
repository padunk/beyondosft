export function fetchData() {
  return (dispatch, getState) => {
    // Asynchronous code goes here
    // For example, you can dispatch a "request started" action
    // before making an API request, and a "request finished" action
    // when the request is complete
    dispatch(requestStarted());

    // Make an API request
    fetch("https://my-api.com/data")
      .then((response) => response.json())
      .then((json) => {
        // When the response is received, dispatch an action
        // with the data from the API
        dispatch(dataReceived(json));
      });
  };
}

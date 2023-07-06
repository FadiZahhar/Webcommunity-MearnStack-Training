(async () => {
  try{
    const response = await fetch("http://localhost:3333/", { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        msg: "hello there how are you"
      })
    });

    // const status_code = response.status;
    // const url = response.url;
    // const success = response.ok;
    // const headers = response.headers;
    
    // const json = await response.json();
    const text = await response.text();
    // const form_data = await response.formData();    
    
    console.log("🚀 ~ file: fetch.js:14 ~ json:", text);
  }catch(err){
    console.error("fetch failed: " + err);
  }
})();

// Promise no async/await
// fetch("http://localhost:3333/")
//   .then(response => response.json() )
//   .then(json => console.log(json) )
//   .catch(err => console.error("fetch failed: ", err));


// Summary
/*
fetch is promise based, so we can use it alongside async await.
other way to write it is using then and catch:
  1) get the response object, 
  2) request the response body to get data (json or text)
  3) do whatever with the data taken from api
  4) handle errors
*/

/*
 * fetch has 2 main arguments: 
 * - URL of resource you want to retrieve
 * - Options such as:
 *   1) method: GET, POST, PUT, DELETE, etc.
 *   2) headers: specify settings such as content-type so the api recognise the data you sent
 *   3) body: some data you want to send to the api in text or json format.
 * 
 * json format should be stringified before sending, as well as including the content-type in headers
 */
const axfetch = require('axios');

/*
 * axios is a package that simplifies sending http requests, just like
 * fetch API
 * the main benefits of it over fetch is the simplicity in writing code and
 * the cross compatibilty between node and the browser 
 * axios is promise based, so it can be used with async await or .then().catch()
 * 
 * you can either install it with npm locally: npm i axios
 *  1) import it inside js files
 *  2) import it in html (for no js imports): 
 *     <script src="node_modules/axios/dist/axios.min.js"></script>
 * 
 * or import it thru CDN in html:
 * <script src="https://unpkg.com/axios@1.4.0/dist/axios.min.js"></script>
 * 
 * axios has all methods of requesting from APIs: GET, POST, PUT, DELETE, etc.
 * take request's result data array by destructuring it {data}
 * the data array is always like a JSON format, an array of objects [ {...}, {...}, {...} ]
 * 
 * 
 * when you post something with axios, you want to add a body. just add an object as parameter
 * and provide data. all will be handled in background
 * in axios, the default content-type is application/json
*/

// GET method
const getFetch = async (user_id = "") => { 
  try {
    let {data} = await axfetch.get(`https://jsonplaceholder.typicode.com/users/${user_id}`);
  
    console.log("🚀 ~ file: axios.js:33 ~ getFetch ~ result:", data);
    // console.table(data);
  } catch (err) {
    console.log("🚀 ~ file: axios.js:36 ~ getFetch ~ error occured!")
  }
}
// getFetch(1);


// POST method
const postFetch = async (post_body) => {
  // we are creating a post to jsonplaceholder api, adding a body to the request
  try {
    let {data} = await axfetch.post(`https://jsonplaceholder.typicode.com/posts`, post_body);
  
    console.log("post created successfully");
    console.log("🚀 ~ file: axios.js:48 ~ postFetch ~ data:", data)
  } catch (err) {
    console.error("🚀 ~ file: axios.js:51 ~ postFetch ~ error occured");
  }
}
// postFetch({
//   title: "Something",
//   body: "Wow that's amazing!",
//   userId: 1,
// });


// PUT method
const putFetch = async (post_id = 1, post_body) => {
  // we are updating a post in jsonplaceholder api, adding a body to the request 
  // and specifying which post by id 
  try{
    let {data} = await axfetch.put(`https://jsonplaceholder.typicode.com/users/${post_id}`, post_body);
  
    console.log("post updated successfully");
    console.log("🚀 ~ file: axios.js:69 ~ putFetch ~ data:", data)
  }catch(err){
    console.error("🚀 ~ file: axios.js:71 ~ putFetch ~ err: choose a valid ID > 0 and <= 10!");
  }
}
// putFetch(5, {
//   title: "Something",
//   body: "Wow that's amazing!",
//   userId: 1,
// });


// DEL method
const deleteFetch = async (post_id) => {
  // we are deleting a post in jsonplaceholder api by specifying its id
  try{
    if(!post_id) throw "Enter a valid id!";
    let resp = await axfetch.delete(`https://jsonplaceholder.typicode.com/users/${post_id}`);
  
    console.log("post deleted successfully");
  }catch(err){
    console.error("🚀 ~ file: axios.js:91 ~ putFetch ~ err:", err);
  }
}
// deleteFetch(1);


/*
 * there is another way to send requests with axios, by passing a config object:
 *  -> url: endpoint route appended to baseURL unless it's a absolute path
 *  -> baseURL?: the default API protocol, domain name. example: http://www.example.com 
 *  -> method?: request method (GET by default)
 * 
 *  -> data?: request's body
 *  -> headers?: custom headers to be sent - ex: {'X-Requested-With': 'XMLHttpRequest'}
 *  -> params?: resembles to ?key1=val1&key2=val2 in a url, but in better way
 * 
 *  -> responseType?: specify how the server should respond (json, stream, text, ...)
 *  -> maxBodyLength?: specify size of request body in bytes (nodejs only)
 *  -> timeout?: if request >= 'timeout' then it's aborted (time in milliseconds)
 *  -> maxRate?: specify the up/download limit speed to be used in bytes
**/
const getFetch2 = async (user_id = "") => { 
  try {
    let {data} = await axfetch({
      method: "GET",
      url: `/users/${user_id}`,
      baseURL: "https://jsonplaceholder.typicode.com"
    });
  
    console.log("🚀 ~ file: axios.js:33 ~ getFetch ~ result:", data);
  } catch (err) {
    console.log("🚀 ~ file: axios.js:36 ~ getFetch ~ error occured!")
  }
}
// getFetch2(3);

/*
 * in axios, it's possible to modify the default configs for axios instances, such as: 
 *  -> baseURL: axios.defaults.baseURL = "http://www.example.com"
 *  -> Content-Type (on specific methods): 
 *     axios.defaults.headers.post['Content-Type'] = "text/html"
 * 
 * 
 * also, it's possible to create a custom axios instance with custom configs and use it normally
*/
const myAxios = axfetch.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000
});
// myAxios.get("/users/12")
//   .then( ({ data }) => console.log(data) )
//   .catch( err => console.error("invalid url") );

(async () => {
  try{
    const response = await fetch("http://localhost:3333/", { 
      method: "GET",
    });

    // const status_code = response.status;
    // const url = response.url;
    // const success = response.ok;
    // const headers = response.headers;

    const text = await response.text();
    console.log("🚀 ~ file: fetch.js:13 ~ text:", text);
    const json = await response.json();
    // const form_data = await response.formData();
    

    console.log(json);
  }catch(err){
    console.log("fetch failed: "+err);
  }
})();
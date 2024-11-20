const API_URL =  "https://api.escuelajs.co/api/v1/products"

/*
async function fetchData(){
    const res = await fetch(API_URL)
    const data = await res.json();
    console.log(data)
}
fetchData()
*/    


function sendHTTPRequest(method, url, data) {
    return fetch(url, {
      method: method,
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
      return response.json();
    });
}
  
  
async function fecthPosts() {
    const responseData = await sendHTTPRequest(
      "GET",
      API_URL
    );
    console.log(responseData);
}


let product_name = "Red"

async function fetch_by_title(){
    const response_title_data = await sendHTTPRequest("GET",`${API_URL}/?title=${product_name}`)
    console.log(response_title_data)
}


fecthPosts()
fetch_by_title()
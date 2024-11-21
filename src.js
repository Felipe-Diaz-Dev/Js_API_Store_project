const API_URL =  "https://api.escuelajs.co/api/v1/products"


const input_value = document.querySelector("#input-value")

const search_button = document.querySelector("#search-button")

const category_list = document.querySelector("#category-list")

const categories = category_list.children
console.log(categories)

for (let category of categories) {
  category.onclick = fecthPosts;
}

/*
async function fetchData(){
    const res = await fetch(API_URL)
    const data = await res.json();
    console.log(data)
}
fetchData()
*/    

search_button.addEventListener("click",function(event){
  event.preventDefault
  fetch_by_title(input_value.value)
  console.log(input_value.value)
})

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


async function fetch_by_title(product_name){
    const response_title_data = await sendHTTPRequest("GET",`${API_URL}/?title=${product_name}`)
    console.log(response_title_data)
}


async function fetch_by_category(category){
  const response_category_data = await sendHTTPRequest("GET",)
}
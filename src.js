const API_URL =  "https://api.escuelajs.co/api/v1"


const input_value = document.querySelector("#input-value")

const search_button = document.querySelector("#search-button")

const category_list = document.querySelector("#category-list")

const categories = category_list.children
console.log(categories)

const products_list = document.querySelector(".main-list-container")

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
      `${API_URL}/products`
    );
    console.log("Fetch All products",responseData);
}


async function fetchCategories(){
  const response_categories = await sendHTTPRequest("GET",
    `${API_URL}/categories`
  )
  console.log(response_categories)
  console.log(typeof response_categories)

  const categories_filtred =filter_content(response_categories,"name","New Category")
  console.log(categories_filtred)

  for (let category of categories_filtred){
    const category_element = document.createElement('li')
    category_element.id = category.id
    category_element.textContent = category.name
    
    category_element.addEventListener("click",()=>{
      console.log(category_element.textContent)
      fetch_products_by_category(category_element.id)
    })

    category_list.appendChild(category_element)
  }
}


async function fetch_products_by_category(category_id){
  const response_category_data = await sendHTTPRequest("GET",`${API_URL}/products/?categoryId=${category_id}`)
  console.log(response_category_data)
  const products_filtred = await filter_content(response_category_data,"title","New Product")

  console.log(products_filtred)
  render_products(products_filtred)
}

function filter_content(array,property,name){
  return array.filter(object => !object[property].includes(name))
}

function render_products(array){
  products_list.textContent = ""
  array.forEach(element => {
    console.log("Howdy")
    const product = document.createRange().createContextualFragment(`
      <div>
          <div class="image-container">
          <img src="" alt="Image">
          </div>
          <h2>${element.title}</h2>
          <p>${element.price}</p>
          <p>${element.description}</p>
      </div>`)

      products_list.append(product)
  });
}

//https://picsum.photos/200

async function fetch_by_title(product_name){
    const response_title_data = await sendHTTPRequest("GET",`${API_URL}/products/?title=${product_name}`)
    console.log(response_title_data)
}



fetchCategories()
//fecthPosts()
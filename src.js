const API_URL =  "https://api.escuelajs.co/api/v1"


const form = document.querySelector(".search-nav-products");
const input_value = document.querySelector("#input-value")
const search_button = document.querySelector("#search-button")
const category_list = document.querySelector("#category-list")
const categories = category_list.children
console.log(categories)

const products_list = document.querySelector(".main-list-container")

let discarted_words = ["New Category","string"]

/*
async function fetchData(){
    const res = await fetch(API_URL)
    const data = await res.json();
    console.log(data)
}
fetchData()
*/


form.addEventListener("submit", start_Rendering);
search_button.addEventListener("click",start_Rendering)

function start_Rendering(event){
  event.preventDefault();
  fetch_by_title(input_value.value)
  console.log(input_value.value)
}



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

  const categories_filtred = filter_content(response_categories,"name",discarted_words)
  console.log("FILTRED CATEGORIES",categories_filtred)

  for (let category of categories_filtred){
    const category_element = document.createElement('li')
    category_element.id = category.id
    category_element.textContent = category.name
    category_element.classList.add('category-element')
    
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
  const products_filtred = await filter_content(response_category_data,"title",discarted_words)

  console.log(products_filtred)
  render_products(products_filtred)
}

function filter_content(array,property,values){
  const seen = {}

  return array.filter(category =>
    !values.some(value => category[property] == value)
  ).filter(category => {
    if(seen[category[property]]){
      return false;
    }else{
      seen[category[property]] = true
      //console.log(seen)
      return true
    }
  })


}

let random_list;

function render_products(array){
  products_list.textContent = ""
  random_list = array.length;
  console.log(random_list)

  if(random_list <= 0){
      product_not_found()
  }else{
    array.forEach(element => {
        console.log("Howdy")
        const product = document.createRange().createContextualFragment(`
          <div class="product-container">
              <div class="image-container">
              <img src="https://picsum.photos/200/250?random=${random_list}" alt="Image">
              </div>
              <h2>${element.title}</h2>
              <p>${element.price}</p>
              <p>${element.description}</p>
          </div>`)
          random_list++;
          console.log(random_list)
          products_list.append(product)
    });   
  }
}

//https://picsum.photos/200

async function fetch_by_title(product_name){
    const response_title_data = await sendHTTPRequest("GET",`${API_URL}/products/?title=${product_name}`)
    console.log(response_title_data)

    render_products(response_title_data)
}

function product_not_found(){
  console.log("No content")
  const not_found = document.createRange().createContextualFragment(
    `
    <div class="product-not-found">
    <h2>Product not found</h2>
    <p>the product was not found or doesn't exist, try again</p>
    </div>
    `
  )
  products_list.append(not_found)
}

fetchCategories()
//fecthPosts()
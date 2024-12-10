const getDatas = new XMLHttpRequest();
getDatas.open("GET", "https://fakestoreapi.com/products");
getDatas.send();
getDatas.addEventListener("load", getProduct);

const allProducts = document.getElementById("allProducts");
const span = document.querySelector("span");
const input = document.querySelector("#search-input");
const basket = [];
let allProductsData = [];
const i = document.querySelector("i")
const body = document.querySelector("body")
const close = document.querySelector(".close")
const button = document.querySelectorAll(".button")
const allbutton = document.querySelectorAll(".all-button")

function getProduct() {
  const data = JSON.parse(getDatas.responseText);
  allProductsData = data;
  render(data);
}

function render(list) {
  const template = list.map((item) => {
    return `
            <div class='product'>
                <img src='${item.image}' />
                <h3>${item.title}</h3>
                <h5>category: ${item.category}</h5>
                <p>price: ${item.price}$</p>
                ${
                  basket.includes(item.id)
                    ? `<button class="added" onclick="handleRemoveFromBasket(${item.id})">Remove From Basket</button>`
                    : `<button onclick="handleAddToBasket(${item.id})">ADD to Basket</button>`
                }
            </div>
        `;
  });
  allProducts.innerHTML = template.join("");
  span.textContent = basket.length;
}
function renderBasket() {
  const cartItems = document.getElementById("cartItems");
  const basketProducts = allProductsData.filter((product) =>
    basket.includes(product.id)
  );
  if (basketProducts.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }
  const template = basketProducts.map((item) => {
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" />
        <div>
          <h4>${item.title}</h4>
          <p>Price: $${item.price}</p>
          <button onclick="handleRemoveFromBasket(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });

  cartItems.innerHTML = template.join("");
}


function handleAddToBasket(productId) {
  basket.push(productId);
  render(allProductsData);
  renderBasket();
}



function handleRemoveFromBasket(productId) {
  const index = basket.indexOf(productId);
  basket.splice(index, 1);
  render(allProductsData);
  renderBasket();
}

function handleSearch(event) {
  const value = event.target.value;
  const result = allProductsData.filter((product) => {
    return product.title.toLowerCase().search(value) >= 0;
  });
  render(result);
}



// events
input.addEventListener("keyup", handleSearch);
i.addEventListener("click", ()=> {
    body.classList.toggle("showCart")
})
close.addEventListener("click",()=>{
    body.classList.toggle("showCart")
})








const h5 = document.querySelectorAll("h5")

function handlelFilter(event){
    const result = allProductsData.filter((product)=>{
        return product.category === event.target.textContent;
    })
    render(result)
}




for (const btn of button) {
    btn.addEventListener("click",handlelFilter)
}

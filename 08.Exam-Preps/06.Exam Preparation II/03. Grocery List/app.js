const URL = `http://localhost:3030/jsonstore/grocery/`;
const form = document.querySelector("#signup .list");
const inputs = {
  name: document.querySelector("#product"),
  count: document.querySelector("#count"),
  price: document.querySelector("#price"),
};

const addProductBtn = document.querySelector("#add-product");
const updateProductBtn = document.querySelector("#update-product");
const loadAllProductsBtn = document.querySelector("#load-product");

loadAllProductsBtn.addEventListener("click", loadAllProducts);
addProductBtn.addEventListener("click", addNewProduct);
updateProductBtn.addEventListener("click", updateProduct);

function loadAllProducts(e) {
  e.preventDefault();
  fetch(URL)
    .then((res) => res.json())
    .then((products) => {
      const productsTable = document.querySelector("#tbody");
      productsTable.textContent = "";
      Object.values(products).forEach((product) => {
        productsTable.appendChild(createProductRow(product));
      });
    })
    .catch((err) => console.log(err));
}

function addNewProduct(e) {
  e.preventDefault();

  if (!inputs.name.value || !inputs.count.value || !inputs.price.value) {
    return;
  }

  fetch(URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      product: inputs.name.value,
      count: inputs.count.value,
      price: inputs.price.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        form.reset();
        loadAllProducts(e);
      }
    })
    .catch((err) => console.log(err));
}

function updateProduct(e) {
  e.preventDefault();

  if (!inputs.name.value || !inputs.count.value || !inputs.price.value) {
    return;
  }
  const id = e.currentTarget.dataset.id;

  fetch(`${URL}${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      product: inputs.name.value,
      count: Number(inputs.count.value),
      price: Number(inputs.price.value),
    }),
  })
    .then((res) => {
      if (res.ok) {
        updateProductBtn.disabled = true;
        addProductBtn.disabled = false;
        form.reset();
        loadAllProducts(e);
      }
    })
    .catch((err) => console.log(err));
}

function loadProductForUpdate(e) {
  e.preventDefault();
  updateProductBtn.disabled = false;
  addProductBtn.disabled = true;

  updateProductBtn.dataset.id = e.currentTarget.dataset.id;

  const productRow = e.currentTarget.parentElement.parentElement;

  inputs.name.value = productRow.querySelector(".name").textContent;
  const countStr = productRow.querySelector(".count-product").textContent;
  inputs.count.value = Number(countStr);
  const priceStr = productRow.querySelector(".product-price").textContent;
  inputs.price.value = Number(priceStr);

  productRow.remove();
}

function deleteProduct(e) {
  e.preventDefault();
  const id = e.currentTarget.dataset.id;

  fetch(`${URL}${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        loadAllProducts(e);
      }
    })
    .catch((err) => console.log(err));
}

function createProductRow(product) {
  const productRow = createDomElement("tr");
  productRow.appendChild(createDomElement("td", product.product, "name"));
  productRow.appendChild(
    createDomElement("td", product.count, "count-product")
  );
  productRow.appendChild(
    createDomElement("td", product.price, "product-price")
  );

  const btnsCell = createDomElement("td", null, "btn");
  productRow.appendChild(btnsCell);

  const updateBtn = createDomElement("button", "Update", "update");
  updateBtn.dataset.id = product._id;
  const deleteBtn = createDomElement("button", "Delete", "delete");
  deleteBtn.dataset.id = product._id;

  btnsCell.appendChild(updateBtn);
  btnsCell.appendChild(deleteBtn);

  updateBtn.addEventListener("click", loadProductForUpdate);
  deleteBtn.addEventListener("click", deleteProduct);

  return productRow;
}

function createDomElement(type, content, elClass) {
  const element = document.createElement(type);
  if (content) {
    element.textContent = content;
  }
  if (elClass) {
    element.classList.add(elClass);
  }

  return element;
}

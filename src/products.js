import starIcon from "./assets/-e-kz-star-line.svg";

const endpoint =
  "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
const key = "key";
let productsOffset = 0;
const generateUrl = () => `${endpoint}?api-key=${key}&offset=${productsOffset}`;

const setAttributes = (element, attributeList) => {
  for (const [key, val] of Object.entries(attributeList)) {
    element.setAttribute(key, val);
  }
};

const generateImgUrl = (isbn) =>
  `http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const standardProductHtml = (product) => {
  const { name, price, author, imgUrl } = product;

  const item = document.createElement("article");
  item.setAttribute("class", "item col-6");

  const img = document.createElement("img");
  setAttributes(img, {
    class: "item__img",
    src: imgUrl,
    alt: "",
  });

  const productName = document.createElement("h3");
  productName.setAttribute("class", "item__name");
  productName.textContent = name;

  const productPrice = document.createElement("p");
  productPrice.setAttribute("class", "item__price");
  productPrice.textContent = `$${price}`;

  const tags = document.createElement("p");
  tags.setAttribute("class", "item__tags");

  const imgTag = document.createElement("img");
  setAttributes(imgTag, { src: starIcon, alt: "" });

  tags.append(imgTag, author);
  item.append(img, productName, productPrice, tags);

  return item;
};

const sliderProductHtml = (product) => {
  const { name, price, imgUrl } = product;

  const item = document.createElement("article");
  item.setAttribute("class", "slider-item");

  const img = document.createElement("img");
  setAttributes(img, {
    class: "slider-item__img",
    src: imgUrl,
    alt: "",
  });

  const infoContainer = document.createElement("div");
  infoContainer.setAttribute("class", "slider-item__info");

  const productName = document.createElement("h3");
  productName.setAttribute("class", "slider-item__name");
  productName.textContent = name;

  const productPrice = document.createElement("p");
  productPrice.setAttribute("class", "slider-item__price");
  productPrice.textContent = `$${price}`;

  infoContainer.append(productName, productPrice);
  item.append(img, infoContainer);

  return item;
};

class Product {
  constructor({ id, name, price, author, imgUrl }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.author = author;
    this.imgUrl = imgUrl;
  }

  asHtml(callback) {
    return callback(this);
  }

  static fromApiRes(product) {
    const title = product.title ? product.title : "Unknown title";
    const author = product.author ? product.author : "Unknown author";
    const isbn = product.isbns[0]
      ? product.isbns[0].isbn13
      : Math.random() * 1000;
    const price = product.ranks_history[0]
      ? 50 - parseInt(product.ranks_history[0].rank)
      : 10;
    const imgUrl = generateImgUrl(isbn);

    return new Product({ id: isbn, name: title, price, author, imgUrl });
  }
}

class ProductList {
  constructor(...products) {
    this.inner = [...products];
  }

  static fromApiRes(response) {
    let list = response.results.map((product) => Product.fromApiRes(product));
    return new ProductList(...list);
  }

  reverse() {
    this.inner = [...this.inner].reverse();
  }

  asHtml(callback) {
    const fragment = document.createDocumentFragment();

    for (let product of this.inner) {
      fragment.append(product.asHtml(callback));
    }

    return fragment;
  }
}

const fetchJSON = (url) => fetch(url).then((res) => res.json());

const updateProducts = (data, container) => {
  const products = ProductList.fromApiRes(data);
  const productsHtml = products.asHtml(standardProductHtml);
  container.append(productsHtml);

  productsOffset += 20;
  return products;
};

const fetchProducts = (url, container) =>
  fetchJSON(url).then((data) => updateProducts(data, container));

const loadProducts = (url, container, slider) =>
  fetchProducts(url, container).then((products) => {
    products.reverse();
    const sliderItems = products.asHtml(sliderProductHtml);
    slider.append(sliderItems);
  });

export { generateUrl, fetchProducts, loadProducts };

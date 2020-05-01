import style from "./styles/index.scss";
import {
  scrollToTop,
  showScrollBtn,
  updateDate,
  viewMoreProducts,
} from "./main.js";

const setup = () => {
  const scrollBtn = document.getElementById("scroll-top");
  const date = document.getElementById("date");
  const allProducts = document.getElementById("all-products");
  const productsBtn = document.getElementById("products-btn");

  updateDate(date);

  scrollBtn.addEventListener("click", scrollToTop);
  productsBtn.addEventListener("click", () => viewMoreProducts(allProducts));
  window.addEventListener("scroll", () => {
    requestAnimationFrame(() => showScrollBtn(scrollBtn));
  });
};

window.addEventListener("DOMContentLoaded", setup);

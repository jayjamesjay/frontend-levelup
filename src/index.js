import style from "./styles/index.scss";
import { scrollToTop, showScrollBtn, updateDate } from "./main";
import Slider from "./slider";
import { fetchProducts, loadProducts, generateUrl } from "./products";

const setup = () => {
  const scrollBtn = document.getElementById("scroll-top");
  const date = document.getElementById("date");
  const productsBtn = document.getElementById("products-btn");
  const allProducts = document.getElementById("all-products");
  const sliderProducts = document.getElementById("slider-products");
  const gridContainer = document.querySelector(".section--campaigns");
  const slider = new Slider("slider");

  const grid = {
    main: ".section--campaigns .grid-item--main",
    square: ".section--campaigns .grid-item--square",
    square2: ".section--campaigns .grid-item--wide",
    wide: ".section--campaigns .grid-item--square-2",
  };
  const loaders = document.querySelectorAll(".loader");

  const url = generateUrl();

  loadProducts({
    url,
    newProducts: allProducts,
    slider: sliderProducts,
    grid,
    gridContainer,
    loaders,
    fetchBtn: productsBtn
  });
  updateDate(date);

  window.addEventListener("scroll", () => {
    requestAnimationFrame(() => showScrollBtn(scrollBtn));
  });
  scrollBtn.addEventListener("click", scrollToTop);
  productsBtn.addEventListener("click", () => {
    const url = generateUrl();
    fetchProducts(productsBtn, url, allProducts);
  });
  slider.inner.addEventListener("click", (event) => {
    const { target } = event;

    if (target.classList.contains("button--slider")) {
      target.name === "previous" ? slider.prevSlide() : slider.nextSlide();
    }
  });
};

window.addEventListener("DOMContentLoaded", setup);

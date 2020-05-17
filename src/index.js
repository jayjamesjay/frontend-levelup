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
  const slider = new Slider("slider");

  const gridMain = document.querySelector(
    ".section--campaigns .grid-item--main"
  );
  const gridSquare = document.querySelector(
    ".section--campaigns .grid-item--square"
  );
  const gridSquare2 = document.querySelector(
    ".section--campaigns .grid-item--square-2"
  );
  const gridWide = document.querySelector(
    ".section--campaigns .grid-item--wide"
  );
  const grid = {
    main: gridMain,
    square: gridSquare,
    square2: gridSquare2,
    wide: gridWide,
  };

  const url = generateUrl();

  loadProducts(url, allProducts, sliderProducts, grid);
  updateDate(date);

  scrollBtn.addEventListener("click", scrollToTop);
  productsBtn.addEventListener("click", () => {
    const url = generateUrl();
    fetchProducts(url, allProducts);
  });
  window.addEventListener("scroll", () => {
    requestAnimationFrame(() => showScrollBtn(scrollBtn));
  });
  slider.inner.addEventListener("click", (event) => {
    const { target } = event;

    if (target.classList.contains("button--slider")) {
      target.name === "previous" ? slider.prevSlide() : slider.nextSlide();
    }
  });
};

window.addEventListener("DOMContentLoaded", setup);

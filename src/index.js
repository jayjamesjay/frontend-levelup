import style from "./styles/index.scss";
import {
  scrollToTop,
  showScrollBtn,
  updateDate,
  viewMoreProducts,
  Slider,
} from "./main.js";

const setup = () => {
  const scrollBtn = document.getElementById("scroll-top");
  const date = document.getElementById("date");
  const allProducts = document.getElementById("all-products");
  const productsBtn = document.getElementById("products-btn");
  const slider = new Slider("slider");

  updateDate(date);

  scrollBtn.addEventListener("click", scrollToTop);
  productsBtn.addEventListener("click", () => viewMoreProducts(allProducts));
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

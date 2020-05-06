import style from "./styles/index.scss";
import {
  scrollToTop,
  showScrollBtn,
  updateDate,
  viewMoreProducts,
  Slider
} from "./main.js";

const setup = () => {
  const scrollBtn = document.getElementById("scroll-top");
  const date = document.getElementById("date");
  const allProducts = document.getElementById("all-products");
  const productsBtn = document.getElementById("products-btn");
  
  const slider = document.getElementById("slider");
  const sliderContent = document.querySelector("#slider .slider__content");
  const sliderControler = new Slider("slider", sliderContent);

  updateDate(date);

  scrollBtn.addEventListener("click", scrollToTop);
  productsBtn.addEventListener("click", () => viewMoreProducts(allProducts));
  window.addEventListener("scroll", () => {
    requestAnimationFrame(() => showScrollBtn(scrollBtn));
  });
  slider.addEventListener("click", event => {
    const target = event.target;

    if (target.classList.contains("button--slider")) {
      target.name === "previous" ? sliderControler.prevSlide() : sliderControler.nextSlide();
    }
  });
};

window.addEventListener("DOMContentLoaded", setup);

import style from "./styles/index.scss";

const setup = () => {
  const scrollBtn = document.getElementById("scroll-top");
  const date = document.getElementById("date");
  const allProducts = document.getElementById("all-products");
  const productsBtn = document.getElementById("products-btn");

  const methods = (function () {
    const scrollToTop = () =>
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

    const showScrollBtn = () => {
      const { scrollY, innerHeight } = window;
      const { classList } = scrollBtn;

      if (scrollY >= 0.5 * innerHeight) {
        classList.remove("button--top-hidden");
      } else {
        classList.add("button--top-hidden");
      }
    };

    const currentYear = () => {
      const currDate = new Date();
      return currDate.getFullYear();
    };

    const updateDate = () => {
      const year = currentYear();
      date.textContent = year;
    };

    const setAttributes = (element, attributeList) => {
      for (const [key, val] of Object.entries(attributeList)) {
        element.setAttribute(key, val);
      }
    };

    const viewMoreProducts = () => {
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < 4; i++) {
        const item = document.createElement("article");
        item.setAttribute("class", "item col-6");

        const img = document.createElement("img");
        setAttributes(img, {
          class: "item__img",
          src: "http://placekitten.com/309/390",
          alt: "",
        });

        const name = document.createElement("h3");
        name.setAttribute("class", "item__name");
        name.textContent = "Backpack with contrasting buckle";

        const price = document.createElement("p");
        price.setAttribute("class", "item__price");
        price.textContent = "$158.00";

        const tags = document.createElement("p");
        tags.setAttribute("class", "item__tags");

        const imgTag = document.createElement("img");
        setAttributes(imgTag, { src: "./assets/-e-kz-few.svg", alt: "" });

        tags.append(imgTag, "Only a few left");
        item.append(img, name, price, tags);

        fragment.append(item);
      }

      allProducts.append(fragment);
    };

    return {
      scrollToTop,
      showScrollBtn,
      updateDate,
      viewMoreProducts,
    };
  })();

  methods.updateDate();

  scrollBtn.addEventListener("click", methods.scrollToTop);
  productsBtn.addEventListener("click", methods.viewMoreProducts);
  window.addEventListener("scroll", () => {
    requestAnimationFrame(methods.showScrollBtn);
  });
};

window.addEventListener("DOMContentLoaded", setup);

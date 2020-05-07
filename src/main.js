const scrollToTop = () =>
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

const showScrollBtn = (scrollBtn) => {
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

const updateDate = (date) => {
  const year = currentYear();
  date.textContent = year;
};

const setAttributes = (element, attributeList) => {
  for (const [key, val] of Object.entries(attributeList)) {
    element.setAttribute(key, val);
  }
};

const generateProduct = () => {
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

  return item;
};

const viewMoreProducts = (products) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 4; i++) {
    fragment.append(generateProduct());
  }

  products.append(fragment);
};

export class Slider {
  constructor(
    id,
    contentSelector = ".slider__content",
    itemSelector = ".slider-item"
  ) {
    this.slider = document.getElementById(id);
    this.content = document.querySelector(`#${id} ${contentSelector}`);
    this.item = document.querySelector(`#${id} ${itemSelector}`);
  }

  get itemWidth() {
    return this.item.clientWidth;
  }

  get inner() {
    return this.slider;
  }

  scrollSlide(val) {
    const { content } = this;
    const { scrollLeft, clientWidth, scrollWidth } = content;

    const left = scrollLeft + 10 >= scrollWidth - clientWidth ? 0 : scrollLeft + val;

    content.scrollTo({
      left,
      behavior: "smooth",
    });
  }

  prevSlide() {
    const { itemWidth } = this;
    this.scrollSlide(-itemWidth);
  }

  nextSlide() {
    const { itemWidth } = this;
    this.scrollSlide(+itemWidth);
  }
}

export { scrollToTop, showScrollBtn, updateDate, viewMoreProducts };

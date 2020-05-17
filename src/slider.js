const itemWidth = 268;

class Slider {
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
    return itemWidth;
  }

  get inner() {
    return this.slider;
  }

  scrollSlide(val) {
    const { content } = this;
    const { scrollLeft, clientWidth, scrollWidth } = content;

    const left =
      scrollLeft + 10 >= scrollWidth - clientWidth ? 0 : scrollLeft + val;

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

export default Slider;

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

export { scrollToTop, showScrollBtn, updateDate };

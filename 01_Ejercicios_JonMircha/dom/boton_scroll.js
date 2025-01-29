const d = document,
  w = window;

export function scrollTopButton(btn) {
  const $scrollBtn = d.querySelector(btn);

  w.addEventListener("scroll", (e) => {
    let scrollTop = w.pageYOffset || d.documentElement.scrollTop;
    scrollTop > 600
      ? $scrollBtn.classList.remove("hidden")
      : $scrollBtn.classList.add("hidden");
  });

  d.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      d.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}

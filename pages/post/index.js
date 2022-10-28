let goUp = document.querySelector(".btn-footer")
let home = document.querySelector(".btn-home")
let tags = document.querySelectorAll(".tag")

goUp.addEventListener("click", () => {
    scrollTo(0, 0)
})

home.addEventListener("click", () => {
    localStorage.removeItem("livingBasePost")
    window.location.replace("../../index.html")
})

tags.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.add("btn-primary")
        localStorage.removeItem("livingBasePost")
        localStorage.setItem("livingBaseTag", button.innerText)
        window.location.replace("../../index.html")
    })
})

let categories = document.querySelector(".categories")

let isDown = false;
let startX;
let scrollLeft;

categories.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - categories.offsetLeft;
  scrollLeft = categories.scrollLeft;
});
categories.addEventListener('mouseleave', () => {
  isDown = false;
});
categories.addEventListener('mouseup', () => {
  isDown = false;
});
categories.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - categories.offsetLeft;
  const walk = (x - startX) * 1;
  categories.scrollLeft = scrollLeft - walk;
});

let button = document.querySelector(".arrow-icon")
if(isOverFlown(categories) == false){
    button.style.visibility = "hidden"
  } else {
    button.style.visibility = "visible"
}

function isOverFlown (element) {
  return element.scrollWidth > element.clientWidth;
}

window.addEventListener("resize", () => {
  if (isOverFlown(categories) == true){
    button.style.visibility = "visible"
  } else {
    button.style.visibility = "hidden"
  }
})

button.addEventListener("mousedown", () => {
  categories.scrollLeft += 30
})
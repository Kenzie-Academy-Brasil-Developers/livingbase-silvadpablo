import { getAllPosts } from "../../scripts/requets.js"
import { renderAllPosts } from "../../scripts/renderHome.js"

let toBeWatched = document.querySelector(".observed")

let lookOut = new IntersectionObserver((entries) => {
    loadNewPosts(entries)
})

lookOut.observe(toBeWatched)

async function loadNewPosts(entries) {
    if(entries[0].isIntersecting){
        let page = localStorage.getItem("livingBasePage")
        let posts = await getAllPosts(page)
        if (posts.news.length != 0) {
            let tag = document.querySelector(".btn-primary")
            if (tag.innerText != "Todos") {
                let allPosts = await getAllPosts(page)
                let selection = allPosts.news.filter((eachNews) => eachNews.category == tag.innerText)
                renderAllPosts(selection)
            } else {
                renderAllPosts()
            }
            page++
            localStorage.setItem("livingBasePage", page)
        } else {
            toBeWatched.innerHTML = `
            <h2 class="home-post-title observed">Fim dos posts</h2>
            `
        }
    }
}

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
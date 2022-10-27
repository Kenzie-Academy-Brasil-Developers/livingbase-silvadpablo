import { getAllPosts } from "../../scripts/requets.js"
import { renderAllPosts } from "../../scripts/renderHome.js"

let toBeWatched = document.querySelector(".observed")
let lookOut = new IntersectionObserver((entries) => {
    loadNewPosts(entries)
})

lookOut.observe(toBeWatched)

let page = 0
async function loadNewPosts(entries) {
    if(entries[0].isIntersecting){
        let posts = await getAllPosts(page)
        if (posts.news.length != 0) {
            renderAllPosts(toBeWatched, "beforebegin")
            page++
        } else {
            toBeWatched.innerHTML = `
            <h2 class="home-post-title">Fim dos posts</h2>
            `
        }
    }
}

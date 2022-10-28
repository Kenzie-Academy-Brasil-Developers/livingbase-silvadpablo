import { getAllPosts } from "./requets.js";

export async function renderAllPosts (selection) {
    let ulPosts = document.querySelector(".all-posts")

    let allPosts = selection

    if (!allPosts){
        let response = await getAllPosts()
        allPosts = response.news
    }
    allPosts.forEach(eachPost => {
        let {id, title, description, image, category} = eachPost
        let liPosts = document.createElement("li")
        liPosts.classList = `post flex flex-col ${category}`
        ulPosts.insertAdjacentElement("beforeend",liPosts)
        
        let img = document.createElement("img")
        img.alt = "post image"
        img.src = image
        liPosts.append(img)
        
        let h2 = document.createElement("h2")
        h2.classList = "home-post-title"
        h2.innerText = title
        liPosts.append(h2)
        
        let p = document.createElement("p")
        p.classList = "post-headline"
        p.innerText = description
        liPosts.append(p)
        
        let a = document.createElement("a")
        a.classList = "home-access"
        a.innerText = "Acessar conteúdo"
        liPosts.append(a)
        
        a.addEventListener("click", () => {
            localStorage.setItem("livingBasePost", id)
            localStorage.removeItem("livingBaseTag")
            window.location.replace("./pages/post/index.html")
        })
    })
}

let allTags = document.querySelectorAll(".tag")
let tagAll = document.querySelector(".tagAll")

let selected = localStorage.getItem("livingBaseTag")

allTags.forEach(tag => {
    tag.addEventListener("click", () => {
            allTags.forEach(tag => {
                tag.classList.remove("btn-primary")
                event.target.classList.add("btn-primary")
            })
            localStorage.setItem("livingBasePage", 0)
            let toBeWatched = document.querySelector(".observed")
            toBeWatched.innerHTML = `
                <div class="obs top-div"></div>
                <div class="obs middle-lines"></div>
                <div class="obs middle-lines"></div>
                <div class="obs bottom-line"></div>
            `
            handleTags(tag.innerText)
        })
    })
    
    if (!selected){
        tagAll.classList.toggle("btn-primary")
        localStorage.setItem("livingBasePage", 0)
        renderAllPosts()
    } else {
        allTags.forEach(tag => {
            if (selected == tag.innerText){
                tag.classList.add("btn-primary")
                localStorage.setItem("livingBasePage", 0)
            }
    })
    handleTags(selected)
}

async function handleTags (selected) {
    clearList()

    if (selected == "Todos"){
        renderAllPosts()
    } else {
        let allPosts = await getAllPosts(0)
        let selection = allPosts.news.filter((eachNews) => eachNews.category == selected)
        renderAllPosts(selection)
    }
}

function clearList () {
    let ulPosts = document.querySelector(".all-posts")
    ulPosts.innerHTML = ""
}


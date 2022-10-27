import { getAllPosts } from "./requets.js";

async function renderAllPosts () {
    let ulPosts = document.querySelector(".all-posts")

    let allPosts = await getAllPosts()
    
    allPosts.forEach(eachPost => {
        let {id, title, description, image, category} = eachPost

        let liPosts = document.createElement("li")
        liPosts.classList = "post flex flex-col"
        ulPosts.insertAdjacentElement("afterbegin", liPosts)

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
            window.location.replace("./pages/post/index.html")
        })
    })
}

renderAllPosts()
import { getPostById } from "./requets.js"

const postId = localStorage.getItem("livingBasePost")

async function renderPost(postId) {
    let header = document.querySelector(".post-header")
    let body = document.querySelector(".post-body")
    
    let post = await getPostById(postId)
    
    let {title, description, content, image} = post

    let postTitle = document.createElement("h2")
    postTitle.classList = "container home-post-header-title"
    postTitle.innerText = title
    header.append(postTitle)

    let postHeadline = document.createElement("p")
    postHeadline.classList = "container post-text"
    postHeadline.innerText = description
    header.append(postHeadline)

    let postImg = document.createElement("img")
    postImg.classList = "post-img-big"
    postImg.src = image
    postImg.alt = "post image"
    body.append(postImg)

    let postContent = document.createElement("p")
    postContent.classList = "post-text"
    postContent.innerText = content
    body.append(postContent)
}

renderPost(postId)
let goUp = document.querySelector(".btn-footer")
let home = document.querySelector(".btn-home")

goUp.addEventListener("click", () => {
    scrollTo(0, 0)
})

home.addEventListener("click", () => {
    window.location.replace("../../index.html")
})
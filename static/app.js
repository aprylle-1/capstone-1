let pokemonList = document.getElementById("pokemon-list")
let card = document.getElementById("card")
let moveList = document.getElementById("move-list")
const API_URL = "https://pokeapi.co/api/v2"

const getApiInfo = async function(route, id) {
    const result = await axios.get(`${API_URL}/${route}/${id}`)
    const new_result = await result
    return new_result
}

pokemonList.addEventListener("click", e => {
    card.innerHTML = ""
    e.preventDefault()
    id = e.target.dataset.id
    let x
    let y
    getApiInfo("pokemon", id).then(result => {
        let image = result["data"]["sprites"]["front_default"]
        let img = document.createElement("img")
        img.classList.add("pokemon-image")
        img.src= image
        card.append(img)

        let name = result["data"]["forms"][0]["name"]
        //div containing pokemon details
        let div = document.createElement("div")
        div.classList.add("card-body")

        let h5 = document.createElement("h5")
        h5.innerText = name

        div.append(h5)

        card.append(div)

        let moves = result["data"]["moves"]

        let movesContainer = document.createElement("div")
        movesContainer.classList.add("vertical-menu-moves")
        movesContainer.setAttribute("id", "move-list")
        
        let ul = document.createElement("ul")
        ul.classList.add("list-group")
        ul.setAttribute("id", "move-list")
        
        for (let move of moves){
            let li = document.createElement("li")
            li.classList.add("list-group-item")
            li.innerText = move["move"]["name"]

            let id = move["move"]["url"].replace(`${API_URL}/move`, "").replaceAll("/", "")
            li.setAttribute("data-id", id)
            ul.append(li)
        }
        
        movesContainer.append(ul)
        card.append(movesContainer)
    })
})
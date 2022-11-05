let pokemons = Array.prototype.slice.call(document.querySelectorAll(".pokemon"))

let pokemon_ids = []
const API_URL = "https://pokeapi.co/api/v2"

const getApiInfo = async function(route, id) {
    const result = await axios.get(`${API_URL}/${route}/${id}`)
    const new_result = await result
    return new_result
}

const getPokemonInfo = function (id){
    getApiInfo("pokemon", id).then(result=>{
        let image = result["data"]["sprites"]["front_default"]
        
        let imageContainer = document.createElement("img")
        imageContainer.src = image
        return imageContainer
    })
}

for (let i = 0; i < 6; i++){
    let pokemon = pokemons[i]

    let id = pokemon.dataset.id

    console.log(id)

    getApiInfo("pokemon", id).then(result=>{
        let image = result["data"]["sprites"]["front_default"]
        let imageContainer = document.createElement("img")

        imageContainer.src = image
        pokemon.parentElement.append(imageContainer)

        let types = result["data"]["types"]
        let info = document.createElement("div")
        info.innerText = "Types:"
        for (let type of types) {
            typeContainer = document.createElement("div")
            typeContainer.innerText = type["type"]["name"]
            typeContainer.classList.add(type["type"]["name"])
            typeContainer.classList.add("badge")
            info.append(typeContainer)
        }

        pokemon.parentElement.append(info)
    })
}

//get divs that contains all moves
let moveLists = Array.prototype.slice.call(document.querySelectorAll(".moves"))

let moves = []

for (let moveList of moveLists){
    let cardBody = moveList.parentElement
    moveList = Array.prototype.slice.call(moveList.childNodes)
    
    let moveContainer = document.createElement("div")
    cardBody.append(moveContainer)
    
    for (let i = 1; i < 8; i += 2){ 
        let id = moveList[i].dataset.id

        getApiInfo("move", id).then(result=>{
            let li = document.createElement("li")
            li.innerText = result.data.name
            li.setAttribute("data-id", id)
            moveContainer.append(li)
        })
    }
}

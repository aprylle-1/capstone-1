let pokemons = Array.prototype.slice.call(document.querySelectorAll(".pokemon"))

let pokemon_ids = []

let teamContainer = document.getElementById("team-container")

let moveLists = Array.prototype.slice.call(document.querySelectorAll(".moves"))

for (let i = 0; i < 6; i++){
    let pokemon = pokemons[i]

    let id = pokemon.dataset.id

    getApiInfo("pokemon", id).then(result=>{

        let name = result["data"]["name"]
        let sprite = result["data"]["sprites"]["front_default"]
        let types = result["data"]["types"]

        let moves = []

        for (let li of moveLists[i].children){
            let id = li.dataset.id
            moves.push(id)
        }

        let card = createPokemonCard(name, sprite, types)
        teamContainer.append(card)

        let moveContainer = document.createElement("div")
        
        let cardHeader = document.createElement("div")
        cardHeader.classList.add("card-header")
        cardHeader.innerText = "Moves"

        let moveListContainer = document.createElement("ul")
        moveListContainer.classList.add("list-group")
        moveListContainer.classList.add("list-group-flush")

        for (let move of moves){
            let li = document.createElement("li")

            getApiInfo("move", move).then(result=>{
                li.innerText = result["data"]["name"]
                li.classList.add("list-group-item")
                moveListContainer.append(li)
            })
        }
        
        moveContainer.append(cardHeader)
        moveContainer.append(moveListContainer)

        card.append(moveContainer)
    })
}
let pokemonList = document.getElementById("pokemon-list")
let card = document.getElementById("card")
let moveList = document.getElementById("move-list")
let moveDefinition = document.getElementById("move-card")
let versionName = document.getElementById("version").innerText

let pokemon1_name = document.getElementById("pokemon_1_name")
let pokemon2_name = document.getElementById("pokemon_2_name")
let pokemon3_name = document.getElementById("pokemon_3_name")
let pokemon4_name = document.getElementById("pokemon_4_name")
let pokemon5_name = document.getElementById("pokemon_5_name")
let pokemon6_name = document.getElementById("pokemon_6_name")

const API_URL = "https://pokeapi.co/api/v2"

const getApiInfo = async function(route, id) {
    const result = await axios.get(`${API_URL}/${route}/${id}`)
    const new_result = await result
    return new_result
}

pokemonList.addEventListener("click", e => {
    id = e.target.dataset.id
    card.innerHTML = ""
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
        h5.setAttribute("id", "pokemon-name")
        h5.setAttribute("data-id", id)

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
            li.classList.add("move")
            li.innerText = move["move"]["name"]

            let id = move["move"]["url"].replace(`${API_URL}/move`, "").replaceAll("/", "")
            li.setAttribute("data-id", id)
            ul.append(li)
        }

        movesContainer.append(ul)
        card.append(movesContainer)
    })
})

document.addEventListener("click", e => {
    if ([...e.target.classList].includes("move")){

        let move = e.target
        let id = move.dataset.id

        
        getApiInfo("move", id).then(result => {
            let moveInfo = result["data"]
            let textEntries = moveInfo["flavor_text_entries"]
            moveDefinition.innerText = ""
            for (let text_entry of textEntries){
                if (text_entry["version_group"]["name"] == versionName){
                    moveDefinition.innerText = text_entry["flavor_text"]
            }
        }
    })
    // console.log(definition)
    }
})

//Logic for the form --> will clean this up later

let pokemon1 = document.getElementById("pokemon_select_1")
let pokemon2 = document.getElementById("pokemon_select_2")
let pokemon3 = document.getElementById("pokemon_select_3")
let pokemon4 = document.getElementById("pokemon_select_4")
let pokemon5 = document.getElementById("pokemon_select_5")
let pokemon6 = document.getElementById("pokemon_select_6")


function create_move_options (element, moves) {
    for (let move of moves){
        let select_move = document.createElement("option")
        select_move.value = (move["move"]["url"]).replace(`${API_URL}/move`, "").replaceAll("/", "")
        select_move.innerText = move["move"]["name"]
        element.append(select_move)
    }
}

let pokemons = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6]

// for (let pokemon of pokemons) {
//     pokemon.addEventListener("change", e=>{
//         let pokemon_id = pokemon.value
//         let pokemon_number = 
//         getApiInfo("pokemon", pokemon_id).then(result=>{
//             let moves = result["data"]["moves"]
//             console.log(moves)
    
//             for (let i = 1; i < 5; i++){
//                 let option_id = `pokemon_1_move_${i}`
                
//                 let move_option = document.getElementById(option_id)
    
//                 move_option.innerText = ""
    
//                 create_move_options(move_option, moves)
//             }
    
//             let move1 = document.getElementById("pokemon_1_move_1")
//             let move2 = document.getElementById("pokemon_1_move_2")
//             let move3 = document.getElementById("pokemon_1_move_3")
//             let move4 = document.getElementById("pokemon_1_move_4")
    
//             // let move_1 = document.getElementById("pokemon_1_move_1")
//             // move_1.innerText = ""
//         })
//     })
// }
pokemon1.addEventListener("change", e=>{
    let pokemon_id = (pokemon1.value.split(" "))[1]
    getApiInfo("pokemon", pokemon_id).then(result=>{
        let moves = result["data"]["moves"]
        console.log(moves)

        for (let i = 1; i < 5; i++){
            let option_id = `pokemon_1_move_${i}`
            
            let move_option = document.getElementById(option_id)

            move_option.innerText = ""

            create_move_options(move_option, moves)
        }

        let move1 = document.getElementById("pokemon_1_move_1")
        let move2 = document.getElementById("pokemon_1_move_2")
        let move3 = document.getElementById("pokemon_1_move_3")
        let move4 = document.getElementById("pokemon_1_move_4")

        // let move_1 = document.getElementById("pokemon_1_move_1")
        // move_1.innerText = ""
    })
})
pokemon2.addEventListener("change", e=>{
    let pokemon_id = (pokemon2.value.split(" "))[1]
    pokemon2_name = pokemon2.innerText
    getApiInfo("pokemon", pokemon_id).then(result=>{
        let moves = result["data"]["moves"]
        console.log(moves)

        for (let i = 1; i < 5; i++){
            let option_id = `pokemon_2_move_${i}`
            
            let move_option = document.getElementById(option_id)

            move_option.innerText = ""

            create_move_options(move_option, moves)
        }
        // let move_1 = document.getElementById("pokemon_1_move_1")
        // move_1.innerText = ""
    })
})
pokemon3.addEventListener("change", e=>{
    let pokemon_id = (pokemon3.value.split(" "))[1]
    pokemon3_name = pokemon3.innerText
    getApiInfo("pokemon", pokemon_id).then(result=>{
        let moves = result["data"]["moves"]
        console.log(moves)

        for (let i = 1; i < 5; i++){
            let option_id = `pokemon_3_move_${i}`
            
            let move_option = document.getElementById(option_id)

            move_option.innerText = ""

            create_move_options(move_option, moves)
        }
        // let move_1 = document.getElementById("pokemon_1_move_1")
        // move_1.innerText = ""
    })
})
pokemon4.addEventListener("change", e=>{
    let pokemon_id = (pokemon4.value.split(" "))[1]
    pokemon4_name = pokemon4.innerText
    getApiInfo("pokemon", pokemon_id).then(result=>{
        let moves = result["data"]["moves"]
        console.log(moves)

        for (let i = 1; i < 5; i++){
            let option_id = `pokemon_4_move_${i}`
            
            let move_option = document.getElementById(option_id)

            move_option.innerText = ""

            create_move_options(move_option, moves)
        }
        // let move_1 = document.getElementById("pokemon_1_move_1")
        // move_1.innerText = ""
    })
})
pokemon5.addEventListener("change", e=>{
    let pokemon_id = (pokemon5.value.split(" "))[1]
    pokemon5_name = pokemon5.innerText
    getApiInfo("pokemon", pokemon_id).then(result=>{
        let moves = result["data"]["moves"]
        console.log(moves)

        for (let i = 1; i < 5; i++){
            let option_id = `pokemon_5_move_${i}`
            
            let move_option = document.getElementById(option_id)

            move_option.innerText = ""

            create_move_options(move_option, moves)
        }
        // let move_1 = document.getElementById("pokemon_1_move_1")
        // move_1.innerText = ""
    })
})
pokemon6.addEventListener("change", e=>{
    let pokemon_id = (pokemon6.value.split(" "))[1]
    pokemon6_name = pokemon6.innerText
    getApiInfo("pokemon", pokemon_id).then(result=>{
        let moves = result["data"]["moves"]
        console.log(moves)

        for (let i = 1; i < 5; i++){
            let option_id = `pokemon_6_move_${i}`
            
            let move_option = document.getElementById(option_id)

            move_option.innerText = ""

            create_move_options(move_option, moves)
        }
        // let move_1 = document.getElementById("pokemon_1_move_1")
        // move_1.innerText = ""
    })
})
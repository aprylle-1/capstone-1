/* contains functions that are repeatedly used */

const API_URL = "https://pokeapi.co/api/v2"

function createMoveInfo(name, power, pp, priority, text, damage_class, type)
{

    let move = document.createElement("div")
    let nameContainer = document.createElement("h4")
    nameContainer.innerText = `Name: ${name}`
    move.append(nameContainer)

    let typeContainer = document.createElement("div")
    let label = document.createElement("span")
    label.innerText = "Type: "
    typeContainer.append(label)

    let typeValue = document.createElement("span")
    typeValue.innerText = type
    typeValue.classList.add("badge")
    typeValue.classList.add(type)

    typeContainer.append(typeValue)
    
    move.append(typeContainer)

    let textContainer = document.createElement("div")
    textContainer.innerText = text
    move.append(textContainer)

    let damageClassContainer = document.createElement("div")
    damageClassContainer.innerText = `Damage Class: ${damage_class}`
    move.append(damageClassContainer)

    let powerContainer = document.createElement("div")
    powerContainer.innerText =  `Power: ${power}`
    move.append(powerContainer)

    let ppContainer = document.createElement("div")
    ppContainer.innerText = `PP: ${pp}`
    move.append(ppContainer)

    let priorityContainer = document.createElement("div")
    priorityContainer.innerText = `Priority: ${priority}`
    move.append(priorityContainer)

    return move
}

function create_move_options (element, moves) {

    //creating default option everytime a pokemon is chosen
    let default_option = document.createElement("option")
    default_option.innerText = "Select Move"
    default_option.setAttribute("selected", "selected")
    default_option.setAttribute("disabled", "disabled")
    default_option.setAttribute("hidden", "hidden")
    default_option.value = ""
    
    element.append(default_option)
    
    for (let move of moves){
        let version_groups = move["version_group_details"]
        
        let versions = []
        
        for (let version_group of version_groups){
            versions.push(version_group["version_group"]["name"])
        }
        console.log(versions.includes(versionName))
        console.log(move["move"]["name"])
        if (versions.includes(versionName)){
            let select_move = document.createElement("option")
            select_move.value = (move["move"]["url"]).replace(`${API_URL}/move`, "").replaceAll("/", "")
            select_move.innerText = move["move"]["name"]
            element.append(select_move)
        }
    }
}

const getApiInfo = async function(route, id) {
    const result = await axios.get(`${API_URL}/${route}/${id}`)
    const new_result = await result
    return new_result
}

function createPokemonCard (name, sprite, types){
    let card = document.createElement("div")

    card.classList.add("card")
    
    let infoContainer = document.createElement("div")

    let nameContainer = document.createElement("div")
    nameContainer.classList.add("card-header")
    nameContainer.innerText = name
    infoContainer.append(nameContainer)
    
    for (let type of types){
        
        let typeContainer = document.createElement("span")
        typeContainer.classList.add("badge")
        typeContainer.classList.add(type["type"]["name"])

        typeContainer.innerText = type["type"]["name"]

        infoContainer.append(typeContainer)
    }

    card.append(infoContainer)

    let imageContainer = document.createElement("div")
    imageContainer.classList.add("pokemon-image")

    let img = document.createElement("img")
    img.src = sprite
    img.classList.add("pokemon-image")

    imageContainer.append(img)

    card.append(imageContainer)

    return card
}
let move_1 = document.getElementById("move1_id")
let move_2 = document.getElementById("move2_id")
let move_3 = document.getElementById("move3_id")
let move_4 = document.getElementById("move4_id")

let pokemon = document.getElementById("select-pokemon")

let version_id = document.getElementById("version-id").innerText
let versionName = document.getElementById("version-name").innerText

pokemon.addEventListener("change", e=>{
    let pokemon_id = (pokemon.value.split(" "))[1]
    console.log(pokemon_id)
    getApiInfo("pokemon", pokemon_id).then(result=>{
        let moves = result["data"]["moves"]
        for (let i = 1; i < 5; i++){

            let option_id = `move${i}_id`
            
            let move_option = document.getElementById(option_id)

            move_option.innerText = ""

            create_move_options(move_option, moves)
        }
    })
})
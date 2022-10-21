from flask import Flask, jsonify, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
import requests

app = Flask(__name__)
API_URL = "https://pokeapi.co/api/v2"

#Flow user is directed to a page where they can choose a pokemon version
#That in turn will give them a list of pokemon using the pokedex

@app.route("/")
def show_all_pokemon_version():
    resp = (requests.get(f"{API_URL}/version-group/")).json()
    version_groups = resp["results"]

    version_groups = [(version_group["name"], version_group["url"].replace(f"{API_URL}/version-group", "").replace("/", "")) 
    for version_group in version_groups if version_group["name"] not in ("colosseum", "xd")]

    return render_template("homepage.html", version_groups=version_groups)

@app.route("/pokemons")
def show_all_pokemon_per_version():
    version_id = int(request.args["version_group"])

    pokedex_url = (requests.get(f"{API_URL}/version-group/{version_id}")).json()["pokedexes"][0]["url"]
    pokemons = [(pokemon["pokemon_species"]["name"], pokemon["pokemon_species"]["url"].replace(f"{API_URL}/pokemon-species", "").replace("/", "")) for pokemon in requests.get(pokedex_url).json()["pokemon_entries"]]

    return render_template("pokemons.html", pokemons=pokemons)

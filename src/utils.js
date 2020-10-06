export function getIdFromUrl(url) {
    return url.split("/")[6];
}

export function getAnimatedShinyImageFromId(id){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
}
import apiUrl from "../apiConfig"
import axios from "axios"

// GET
// /favorites
export const getAllFavorites = (user) => {
    return axios({
        url: `${apiUrl}/favorites`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// POST
// /favorites/:gameId
export const addFavorite = (user, gameId, newFav) => {
    return axios({
        url: `${apiUrl}/favorites/${gameId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { favorites: newFav }
    })
}

// DELETE
// /favorites/:gameId/:favId
export const deleteFavorite = (user, favId) => {
    return axios({
        url: `${apiUrl}/favorites/${favId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
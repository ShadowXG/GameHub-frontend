import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllGames = () => {
    return axios(`${apiUrl}/games`)
}

// READ -> Show
export const getOneGame = (id) => {
    return axios(`${apiUrl}/games/${id}`)
}

// CREATE -> New
export const createGame = (user, newGame) => {
    return axios({
        url: `${apiUrl}/games`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { game: newGame }
    })
}

// UPDATE -> Update Game
export const updateGame = (user, updatedGame) => {
    return axios({
        url: `${apiUrl}/games/${updatedGame.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { game: updatedGame }
    })
}

// DELETE -> Delete Game
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllGames = () => {
    return axios(`${apiUrl}/games`)
}


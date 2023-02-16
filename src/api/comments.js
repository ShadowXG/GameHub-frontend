import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /comments/:gameId
export const createComment = (gameId, newComment) => {
    return axios({
        url: `${apiUrl}/comments/${gameId}`,
        method: 'POST',
        data: { comment: newComment }
    })
}

// UPDATE
// /comments/:gameId/:commentId
export const updateComment = (user, gameId, updatedComment) => {
    return axios({
        url: `${apiUrl}/comments/${gameId}/${updatedComment._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { comment: updatedComment }
    })
}

// DELETE
// /comments/:gameId/:commentId
export const deleteComment = (user, gameId, commentId) => {
    // console.log('this the commentId', commentId)
    return axios({
        url: `${apiUrl}/comments/${gameId}/${commentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
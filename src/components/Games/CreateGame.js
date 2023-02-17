import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGame } from '../../api/games'
import { createGameSuccess, createGameFailure } from '../shared/AutoDismissAlert/messages'
import GameForm from '../shared/GameForm'

const CreateGame = (props) => {
    const { user, msgAlert } = props
    const navigate = useNavigate()
    console.log('This is navigate', navigate)

    const [ game, setGame ] = useState({
        title: ''
    })

    const onChange = (e) => {
        e.persist()

        setGame(prevGame => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            console.log('This is the input description', e.target.description)

            const updatedGame = {
                [updatedName] : updatedValue
            }

            console.log('The game', updatedGame)

            return {
                ...prevGame, ...updatedGame
            }

        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createGame(user, game)
            .then(res => { navigate(`/games/${res.data.game._id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeahhh!',
                    message: createGameSuccess,
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Oh Nooo!',
                    message: createGameFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <GameForm 
            game={game}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new game!"
        />
    )
}

export default CreateGame
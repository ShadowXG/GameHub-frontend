import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneGame } from '../../api/games'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'

const ShowGame = (props) => {
    const [game, setGame] = useState(null)
    // const [editModalShow, setEditModalShow] = useState(false)
    // const [toyModalShow, setToyModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in ShowGame props', user)
    console.log('msgAlert in ShowGame props', msgAlert)

    useEffect(() => {
        getOneGame(id)
            .then(res => setGame(res.data.game))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting games',
                    message: messages.getGamesFailure,
                    variant: 'danger'
                })
            })
    }, [])

    if(!game) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card.Header>{ game.title }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Description: {game.description}</small></div>
                        <div><small>Genre: {game.genre}</small></div>
                        <div><small>Platform: {game.platform}</small></div>
                    </Card.Text>
                </Card.Body>
            </Container>
        </>
    )
}

export default ShowGame
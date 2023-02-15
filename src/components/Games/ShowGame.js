import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneGame, removeGame, updateGame } from '../../api/games'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditGameModal from './EditGameModal'

const ShowGame = (props) => {
    const [game, setGame] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
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
    }, [updated])

    const setDeleteGame = () => {
        removeGame(user, game._id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeGameSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeGameFailure,
                    variant: 'danger'
                })
            })
    }

    if(!game) {
        return <LoadingScreen />
    }

    console.log('this is the game', game)
    console.log('this is the user', user)

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ game.title }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Description: {game.description}</small></div>
                            <div><small>Genre: {game.genre}</small></div>
                            <div><small>Platform: {game.platform}</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    {
                        game.owner && user && game.owner._id === user._id
                        ?
                        <>
                            <Button 
                                className="m-2" variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit {game.title}
                            </Button>
                            <Button 
                                className="m-2" variant="danger"
                                onClick={() => setDeleteGame()}
                            >
                                Delete {game.title} 
                            </Button>
                        </>
                        :
                        null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditGameModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateGame={updateGame}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                game={game}
            />
        </>
    )
}

export default ShowGame
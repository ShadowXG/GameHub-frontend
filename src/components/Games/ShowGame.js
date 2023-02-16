import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneGame, removeGame, updateGame } from '../../api/games'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditGameModal from './EditGameModal'
import ShowComment from '../Comments/ShowComment'
import NewCommentModal from '../Comments/NewCommentModal'

// comment layout
const commentCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}


const ShowGame = (props) => {
    const [game, setGame] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [commentModalShow, setCommentModalShow] = useState(false)
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

    // comment card should show
    let commentCards
    if (game) {
        if (game.comments.length > 0) {
            commentCards = game.comments.map(comment => (
                    <ShowComment
                    key={comment.id}
                    comment={comment}
                    user={user}
                    game={game}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
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
                        <Button
                            className="m-2" variant="info"
                            onClick={() => setCommentModalShow(true)}
                            >
                                Go make a comment for {game.title}!
                        </Button>
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
            <Container className="m-2" style={commentCardContainerLayout}>
                {commentCards}
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
            <NewCommentModal
                game={game}
                show={commentModalShow}
                handleClose={() => setCommentModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowGame
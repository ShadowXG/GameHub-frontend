import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneGame, removeGame, updateGame } from '../../api/games'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditGameModal from './EditGameModal'
import ShowComment from '../Comments/ShowComment'
import NewCommentModal from '../Comments/NewCommentModal'
import { addFavorite } from '../../api/favorites'

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

    const addNewFavorite = () => {
        addFavorite(user, game._id)
            .then(() => {
                msgAlert({
                    heading: 'Favorited!',
                    message: 'You added a favorite!',
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Was unable to add this as a favorite',
                    variant: 'danger'
                })
            })
    }

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

    // importing our loading screen
    if(!game) {
        return <LoadingScreen />
    }
    
    console.log('this is the game', game)
    console.log('this is the user', user)
    
    if (user) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                <Container className="m-2" style={{ maxWidth: '50%', color: 'white' }}>
                    <div style={{ 
                        fontSize: '50px', 
                        fontStyle: 'bold', 
                        borderBottom: '5px solid white',
                        marginBottom: '20px'
                        }}
                    >
                        { game.title }
                    </div>
                    <img src={game.picture} alt="Game Cover" style={{ 
                        maxWidth: '100%', maxHeight: '400px', 
                        borderRadius: '10px',
                        marginBottom: '15px'
                        }} 
                    />
                    <p style={{fontStyle: 'bold'}}>Description:<small> {game.description}</small></p>
                    <div style={{ marginBottom: '15px'}}>Genre:<small> {game.genre.join(' ')}</small></div>
                    <div style={{ marginBottom: '15px'}}>Platform:<small> {game.platform.join(' ')}</small></div>  
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            className="m-2" variant="outline-light"
                            onClick={() => setCommentModalShow(true)}
                            >
                                Comment on {game.title}!
                        </Button>
                        <Button
                            className="m-2" variant="outline-warning"
                            onClick={() => addNewFavorite()}
                        >
                            Add as favorite!
                        </Button> 
                        {
                            game.owner && user && game.owner._id === user._id
                            ?
                            <>
                                {/* <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {game.title}
                                </Button> */}
                                <Button 
                                    className="m-2" variant="outline-danger"
                                    onClick={() => setDeleteGame()}
                                >   
                                    Delete {game.title} 
                                </Button>
                            </>
                            :
                            null
                        }
                    </div>
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
            </div>
        )
    }else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                <Container className="m-2" style={{ maxWidth: '50%' }}>
                    <div style={{ 
                        fontSize: '50px', 
                        fontStyle: 'bold', 
                        borderBottom: '5px solid white',
                        marginBottom: '10px'
                        }}
                    >
                        { game.title }
                    </div>
                    <img src={game.picture} alt="Game Cover" style={{ 
                        maxWidth: '100%', maxHeight: '400px', 
                        borderRadius: '10px',
                        marginBottom: '15px'
                        }} 
                    />
                    <p style={{ fontStyle: 'bold'}}>Description:<small> {game.description}</small></p>
                    <div style={{ marginBottom: '15px'}}>Genre:<small> {game.genre.join(' ')}</small></div>
                    <div style={{ marginBottom: '15px'}}>Platform:<small> {game.platform.join(' ')}</small></div>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            className="m-2" variant="outline-light"
                            onClick={() => setCommentModalShow(true)}
                            >
                                Comment on {game.title}!
                        </Button>
                    </div>
                </Container>
                <Container className="m-2" style={commentCardContainerLayout}>
                    {commentCards}
                </Container>
                <NewCommentModal
                    game={game}
                    show={commentModalShow}
                    handleClose={() => setCommentModalShow(false)}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            </div>
        )
    }
}

export default ShowGame
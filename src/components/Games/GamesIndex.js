import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllGames } from '../../api/games'
import { addFavorite } from '../../api/favorites'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const GamesIndex = (props) => {
    const [games, setGames] = useState(null)
    const [error, setError] = useState(false)
    // console.log('these are the games', games)

    const { user, msgAlert } = props

    useEffect(() => {
        getAllGames()
            .then(res => setGames(res.data.games))
            .catch(err => {
                msgAlert({
                heading: 'Error geting games',
                message: messages.getGamesFailure,
                variant: 'danger'
            })
            setError(true)
         })
    }, [])

    const addNewFavorite = (game) => {
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

    if (error) {
        return <p>Error!</p>
    }

    if (!games) {
        return <LoadingScreen />
    } else if (games.length === 0) {
        return <p>No games yet, go add some!</p>
    }
    
    const gameCards = games.map(game => (
        <>
            <Card key={ game.id } style={{ width: '30%', margin: 5 }}>
                <Card.Header>{ game.title }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/games/${game._id}`} className="btn btn-warning">View { game.title }</Link>
                    </Card.Text>
                    {game.owner ?
                    <Card.Footer>
                        owner { game.owner.username }
                    </Card.Footer>
                    : null}
                </Card.Body>
            </Card>
        </>
    ))

    const userGameCards = games.map(game => (
        <>
            <Card key={ game.id } style={{ width: '30%', margin: 5 }}>
                <Card.Header>{ game.title }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/games/${game._id}`} className="btn btn-warning">View { game.title }</Link>
                    </Card.Text>
                    {game.owner ?
                    <Card.Footer>
                        <Button
                                className="m-2" variant="warning"
                                onClick={() => addNewFavorite(game)}
                            >
                                Add as favorite!
                        </Button> 
                        owner { game.owner.username }
                    </Card.Footer>
                    : null}
                </Card.Body>
            </Card>
        </>
    ))

    if (user) {
        return (
            <div className="container-md" style={ cardContainerStyle }>
                {userGameCards}
            </div>
        )

    } else {
        return (
            <div className="container-md" style={ cardContainerStyle }>
                {gameCards}
            </div>
        )
    }
}

export default GamesIndex

import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

import { getAllFavorites } from '../../api/favorites'
// import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const FavoriteIndex = (props) => {
    const [favorites, setFavorites] = useState(null)
    const [error, setError] = useState(false)
    // console.log('these are the favorites', favorites)

    const { user, msgAlert } = props
    // console.log(user)
    useEffect(() => {
        getAllFavorites(user)
            .then(res => setFavorites(res.data.favorites))
            .catch(err => {
                msgAlert({
                heading: 'Error geting favorites',
                message: 'failed to get your favorites',
                variant: 'danger'
            })
            setError(true)
        })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    if (!favorites) {
        return <LoadingScreen />
    } else if (favorites.length === 0) {
        return <p>No favorites yet, go add some!</p>
    }

    const favCards = favorites.map(fav => (
        <>
            <Card key={ fav.game.id } style={{ width: '30%', margin: 5 }}>
                <Card.Header>{ fav.game.title }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/games/${fav.game._id}`} className="btn btn-warning">View { fav.game.title }</Link>
                    </Card.Text>
                    {fav.owner ?
                    <Card.Footer>
                        owner { fav.owner.username }
                    </Card.Footer>
                    : null}
                </Card.Body>
            </Card>
        </>
    ))

    console.log('These are the cards', favCards)

    return (
        <div className="container-md" style={ cardContainerStyle }>
            {favCards}
        </div>
    )
}

export default FavoriteIndex
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

import { getAllFavorites, deleteFavorite } from '../../api/favorites'
import { Button } from 'react-bootstrap'
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

    // console.log(favorites.game)

    const removeFavorite = (fav) => {
        console.log('fav', fav)
        console.log('user', user)
        console.log('favorites id', favorites._id)
        deleteFavorite(user, fav._id)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'This game is not a favorite anymore',
                    variant: 'success'
                })
                setFavorites(favorites.filter(favorite => favorite._id !== fav._id))
            })
            // .then(() => {navigate('/favorites')})
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: 'Could not remove this favorite',
                    variant: 'danger'
                })
            })
    }

    if (error) {
        return <p>Error!</p>
    }

    if (!favorites) {
        return <LoadingScreen />
    } else if (favorites.length === 0) {
        return <p>No favorites yet, go add some!</p>
    }

    console.log(favorites.game)
    const favCards = favorites.map(fav => (
        <>
            { fav.game ?
                <Card key={ fav.game.id } style={{ width: '30%', margin: 5 }}>
                    <Card.Header>{ fav.game.title }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Link to={`/games/${fav.game._id}`} className="btn btn-warning">View { fav.game.title }</Link>
                        </Card.Text>
                        {fav.owner ?
                        <Card.Footer>
                            owner { fav.owner.username }
                            <Button 
                                className="m-2" variant="danger"
                                onClick={() => removeFavorite(fav)}
                                >   
                                Unfavorite
                            </Button>
                        </Card.Footer>
                        : null}
                    </Card.Body>
                </Card>
            :
                <Card key={ fav.game } style={{ width: '30%', margin: 5 }}>
                    <Card.Header>Removed</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            This game was removed
                        </Card.Text>
                        {fav.owner ?
                        <Card.Footer>
                            owner { fav.owner.username }
                            <Button 
                                className="m-2" variant="danger"
                                onClick={() => removeFavorite(fav)}
                                >   
                                Unfavorite
                            </Button>
                        </Card.Footer>
                        : null}
                    </Card.Body>
                </Card>
            }
        </>
    ))
        
    return (
        <div className="container-md" style={ cardContainerStyle }>
            {favCards}
        </div>
    )
}

export default FavoriteIndex
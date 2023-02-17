import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteComment } from '../../api/comments'
import EditCommentModal from './EditCommentModal'

const ShowComment = (props) => {
    const { comment, user, game, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)

    const destroyComment = () => {
        deleteComment(user, game._id, comment._id)
            .then(() => {
                msgAlert({
                    heading: 'Comment is gone',
                    message: 'Sayonara!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2">
                <Card.Header>{comment.author}</Card.Header>
                <Card.Body>
                    <small>{comment.note}</small><br/>
                </Card.Body>
                <Card.Footer>
                    {
                        user && game.owner && user._id === game.owner._id
                        ?
                    <>
                        <Button
                        onClick={() => setEditModalShow(true)}
                        variant='warning'
                        className='m-2'
                        >
                            Edit Comment
                        </Button>
                        <Button 
                            onClick={() => destroyComment()} 
                            variant="danger"
                            className="m-2"
                        >
                            Delete Comment
                        </Button>
                    </>
                    :
                    null
                }
                </Card.Footer>
             </Card>
             <EditCommentModal
                user={user}
                game={game}
                comment={comment}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowComment
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CommentForm from '../shared/CommentForm'
import { updateComment } from '../../api/comments'
// import messages from '../shared/AutoDismissAlert/messages'

const EditCommentModal = (props) => {
    const { user, game, show, handleClose, msgAlert, triggerRefresh } = props

    const [comment, setComment] = useState(props.comment)

    const onChange = (e) => {
        e.persist()
        
        setComment(prevComment => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            
            const updatedComment = {
                [updatedName] : updatedValue
            }
            
            console.log('the comment', updatedComment)
            console.log('the comment (state)', comment)

            return {
                ...prevComment, ...updatedComment
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateComment(user, game.id, comment)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Edited!',
                    message: 'You changed your mind huh?',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CommentForm 
                    comment={comment}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update your comment"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCommentModal
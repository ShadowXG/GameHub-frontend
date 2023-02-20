import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CommentForm from '../shared/CommentForm'
import { createComment } from '../../api/comments'
import messages from '../shared/AutoDismissAlert/messages'

const NewCommentModal = (props) => {
    const { game, show, handleClose, msgAlert, triggerRefresh } = props

    const [comment, setComment] = useState({})

    const onChange = (e) => {
        e.persist()
        
        setComment(prevComment => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            
            const updatedComment = {
                [updatedName] : updatedValue
            }
            
            console.log('the note', updatedComment)
            console.log('the comment (state)', comment)

            return {
                ...prevComment, ...updatedComment
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createComment(game._id, comment)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Noted!',
                    message: messages.createCommentSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.createCommentFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header style={{backgroundColor: '#191921'}} closeButton/>
            <Modal.Body style={{backgroundColor: '#191921'}}>
                <CommentForm 
                    comment={comment}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Write ${game.title} a comment!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewCommentModal
import { Form, Button, Container } from 'react-bootstrap'

const CommentForm = (props) => {
    const { comment, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                {/* <Form.Group className="m-2">
                    <Form.Label>Author</Form.Label>
                    <Form.Control 
                        placeholder={ comment.author }
                        name="author"
                        id="author"
                        value={ comment.author }
                        onChange={handleChange}
                    />
                </Form.Group> */}
                <Form.Group className="m-2">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control 
                        placeholder="Add a comment"
                        name="note"
                        id="note"
                        value={ comment.note }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm
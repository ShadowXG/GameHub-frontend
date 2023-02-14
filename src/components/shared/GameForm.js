import { Form, Button, Container } from 'react-bootstrap'

const GameForm = (props) => {
    const { game, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                    placeholder="What is the game title?"
                    name="title"
                    id="name"
                    value={ game.title }
                    onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default GameForm
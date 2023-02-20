import { Card, Form, Button, Container } from 'react-bootstrap'

const GameForm = (props) => {
    const { game, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <Card className='col-sm-10 col-md-7 mx-auto mt-5' style={{ minWidth: '30%', margin: 5, backgroundColor: '#191921'}}>
                <h3 className="m-2" style={{color: '#B0C4DE'}}>{heading}</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="m-2">
                        <Form.Label style={{color: '#B0C4DE'}}>Title:</Form.Label>
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
            </Card>
        </Container>
    )
}

export default GameForm
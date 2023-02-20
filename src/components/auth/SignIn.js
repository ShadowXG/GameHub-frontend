import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FloatingLabel } from 'react-bootstrap'

const SignIn = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		username: '',
	// 		password: '',
	// 	}
	// }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {username, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setUsername('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='row'>
            <Card className='col-sm-10 col-md-5 mx-auto mt-5' style={{ minWidth: '30%', margin: 5, backgroundColor: '#191921'}}>
                <Card.Body>
                    <Card.Title style={{color: '#B0C4DE'}}>Sign In</Card.Title>
                    <Form onSubmit={onSignIn}>
                    <Form.Group controlId='username'>
                        <FloatingLabel
                        controlId='floatingInput'
                        label='Username'
                        className='mb-3'
                        >
                        <Form.Control
                            required
                            type='username'
                            name='username'
                            value={username}
                            placeholder='Enter username'
                            onChange={e => setUsername(e.target.value)}
                        />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <FloatingLabel
                        controlId='floatingInput'
                        label='Password'
                        className='mb-3'
                        >
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SignIn

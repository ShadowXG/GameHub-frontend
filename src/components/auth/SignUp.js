// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FloatingLabel } from 'react-bootstrap'

const SignUp = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		username: '',
	// 		password: '',
	// 		passwordConfirmation: '',
	// 	}
	// }    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {username, password, passwordConfirmation}

		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setUsername('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Sign Up</h3>
                <Form onSubmit={onSignUp}>
                    <Form.Group controlId='username'>
                        <FloatingLabel
                        controlId='floatingLabel'
                        label='Username'
                        className='mb-2'
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
                        controlId='floatingLabel'
                        label='Password'
                        className='mb-2'
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
                    <Form.Group controlId='passwordConfirmation'>
                        <FloatingLabel
                        controlId='floatingInput'
                        label='Password Confirmation'
                        className='mb-2'
                        >
                        <Form.Control
                            required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='Confirm Password'
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )

}

export default SignUp
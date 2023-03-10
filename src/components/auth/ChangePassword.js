import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import { Card } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FloatingLabel } from 'react-bootstrap'

const ChangePassword = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		oldPassword: '',
	// 		newPassword: '',
	// 	}
	// }
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()

	const onChangePassword = (event) => {
		event.preventDefault()

		const { msgAlert, user } = props
        console.log('the user', user)
        

        const passwords = {oldPassword, newPassword}

		changePassword(passwords, user)
			.then(() =>
				msgAlert({
					heading: 'Change Password Success',
					message: messages.changePasswordSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
				setOldPassword('')
                setNewPassword('')
				msgAlert({
					heading: 'Change Password Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}



    return (
        <div className='row'>
            <Card className='col-sm-10 col-md-5 mx-auto mt-5' style={{ minWidth: '30%', margin: 5, backgroundColor: '#191921'}}>
                <Card.Body>
                    <Card.Title style={{color: '#B0C4DE'}}>Change Password</Card.Title>
                    <Form onSubmit={onChangePassword}>
                        <Form.Group controlId='oldPassword'>
                            <FloatingLabel
                            controlId='floatingLabel'
                            label='Old Password'
                            className='mb-3'
                            >
                            <Form.Control
                                required
                                name='oldPassword'
                                value={oldPassword}
                                type='password'
                                placeholder='Old Password'
                                onChange={e => setOldPassword(e.target.value)}
                            />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId='newPassword'>
                            <FloatingLabel
                            controlId='floatingLabel'
                            label='New Password'
                            className='mb-3'
                            >
                            <Form.Control
                                required
                                name='newPassword'
                                value={newPassword}
                                type='password'
                                placeholder='New Password'
                                onChange={e => setNewPassword(e.target.value)}
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

export default ChangePassword
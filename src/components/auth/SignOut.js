import { useNavigate } from 'react-router-dom'
import {Card, Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'See You Soon, Gamer!',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row'>
            <Card className='col-sm-10 col-md-5 mx-auto mt-5' style={{ minWidth: '30%', margin: 5, backgroundColor: '#191921'}}>
                <Card.Body>
                    <Card.Title style={{color: '#B0C4DE'}}>Are you sure you want to sign out?</Card.Title>
                    <ButtonGroup className='py-3 me-2'>
                        <Button variant='danger' onClick={onSignOut}>
                            Sign Out
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant='warning' onClick={onCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
            </div>
		</>
	)
}

export default SignOut

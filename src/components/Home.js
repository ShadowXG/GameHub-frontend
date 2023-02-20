import GamesIndex from './Games/GamesIndex'
import Container from 'react-bootstrap/Container'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<Container className="m-2" style={{ textAlign: 'center' }}>
				<h2 style={{fontSize: '32px', color: '#B0C4DE'}}>Games</h2>
				<GamesIndex msgAlert={ props.msgAlert } user={props.user}/>
			</Container>
		</div>
	)
}

export default Home

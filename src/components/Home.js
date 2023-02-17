import GamesIndex from './Games/GamesIndex'
import Container from 'react-bootstrap/Container'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<Container className="m-2" style={{textAlign: 'center'}}>
				<h2>See all Games</h2>
				<GamesIndex msgAlert={ props.msgAlert } user={props.user}/>
			</Container>
		</>
	)
}

export default Home

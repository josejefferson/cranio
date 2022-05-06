import Header from '../components/Header'
import Question from '../components/Question'
import Body from '../components/Body'

export default function test() {
	return (
		<>
			<div style={{
				height: '100vh',
				maxHeight: '100vh',
				display: 'flex',
				flexDirection: 'column'
			}}>
				<Header />
				<Question />
				<Body />
			</div>
		</>
	)
}
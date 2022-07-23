import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';
import Createblog from './components/Createblog';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Blogs from './components/Blogs';

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/login'
					element={<Signin />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='/create'
					element={<Createblog />}
				/>
				<Route path='/' element={<Blogs />} />
			</Routes>
		</Router>
	);
}

export default App;

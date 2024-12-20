import { Link } from 'react-router-dom';

export default function NavMenu() {
	return (
		<div className="App">
			<nav className="sticky top-0 shadow-md z-10">
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-center py-4">
						<div className="text-xl font-bold">Healthcare Management</div>
						<ul className="flex space-x-4">
							<li>
								<Link to="/" className="hover:text-blue-600">
									Home
								</Link>
							</li>
							<li>
								<Link to="/doctors" className="hover:text-blue-600">
									Doctors
								</Link>
							</li>
							<li>
								<Link to="/ambulances" className="hover:text-blue-600">
									Ambulances
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

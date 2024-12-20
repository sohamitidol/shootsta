import NavMenu from '@/components/NavMenu';

function Home() {
	return (
		<>
			<NavMenu />
			<div className="flex flex-col items-center">
				<img
					src="src/assets/illustration.jpeg?height=400&width=600"
					alt="Healthcare"
					width={600}
					height={400}
					className="rounded-lg shadow-md mt-12"
				/>
				<p className="mt-4 text-lg text-center max-w-2xl">
					Welcome to our Healthcare Management System. We provide easy access to
					information about our doctors and ambulance services to ensure you
					receive the best care possible.
				</p>
			</div>
		</>
	);
}

export default Home;

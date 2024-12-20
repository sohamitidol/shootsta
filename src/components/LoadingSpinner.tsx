export function LoadingSpinner() {
	return (
		<>
			<div
				className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500"
				aria-label="Loading spinner"
			></div>
			<span>Loading...</span>
		</>
	);
}

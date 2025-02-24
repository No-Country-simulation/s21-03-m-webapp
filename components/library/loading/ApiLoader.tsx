const ApiLoader = ({ isPending }: { isPending: boolean }) => {
	if (isPending) {
		return (
			<div className="flex h-[50vh] w-full items-center justify-center">
				<div className="animate-spin w-14 h-14 border-[3px] border-primary border-t-transparent rounded-full"></div>
			</div>
		);
	}
};

export default ApiLoader;

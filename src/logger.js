const logger = (msg = "", log) => {
	if (process.env.NODE_ENV === "development") {
		console.log(msg, log);
	}

	return;
}

export default logger
function notFound(req, res, next) {
	const error = new Error("La page demandée n'existe pas");
	error.statusCode = 404;

	next(error);
}

function catchErrors(fn) {
	return async function (req, res, next) {
		try {
			await fn(req, res, next );
		} catch (error) {
			next(error);
		}
	};
}

function errorHandler(error, req, res, next) {
	let statusCode = 500;

	if(error.statusCode){
		statusCode = error.statusCode;
	}

	res.status(statusCode).render('error', {
		error: error.message,
		stack: error.stack,
	})
}

module.exports = { notFound, catchErrors, errorHandler };
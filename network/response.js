exports.success = function(rew, res, message, status) {
	let statusCode    = status || 200;
	let statusMessage = message || '';
	res.status(statusCode).send({
		error: false,
		status: status,
		body: statusMessage
	});
}

exports.error = function(rew, res, message, status) {
	let statusCode    = status || 500;
	let statusMessage = message || 'internal Server Error';
	res.status(statusCode).send({
		error: false,
		status: status,
		body: statusMessage
	});
}
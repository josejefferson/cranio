export default function (middleware) {
	return async (req, res, next) => {
		try {
			if (middleware.constructor.name === 'AsyncFunction') {
				await middleware(req, res, next)
			} else {
				middleware(req, res, next)
			}
		} catch (err) {
			next(err)
		}
	}
}
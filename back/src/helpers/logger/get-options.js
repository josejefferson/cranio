const { isColor, isLevel } = require('./helpers')

/**
 * Retorna um objeto de opções do logger de acordo com os argumentos
 */
function getOptions(...args) {
	const options = {
		date: new Date().toISOString()
	}

	/**
	 * Se o último argumento for objeto, juntá-lo às opções
	 * (..., {})
	 */
	if (typeof args.at(-1) === 'object') {
		Object.assign(options, args.at(-1))
		args = args.slice(0, -1)
	}

	if (typeof args.at(-3) === 'boolean' && typeof args.at(-2) === 'boolean' && typeof args.at(-1) === 'boolean') {
		/**
		 * Se os três últimos argumentos forem booleanos
		 * (..., true, false, true)
		 */
		options.showProduction = args.at(-3)
		options.hideConsole = args.at(-2)
		options.ignoreLogger = args.at(-1)
		args = args.slice(0, -3)
	} else if (typeof args.at(-2) === 'boolean' && typeof args.at(-1) === 'boolean') {
		/**
		 * Se os dois últimos argumentos forem booleanos
		 * (..., true, false)
		 */
		options.showProduction = args.at(-2)
		options.hideConsole = args.at(-1)
		args = args.slice(0, -2)
	} else if (typeof args.at(-1) === 'boolean') {
		/**
		 * Se os dois últimos argumentos forem booleanos
		 * (..., true)
		 */
		options.showProduction = args.at(-1)
		args = args.slice(0, -1)
	}

	/**
	 * Procura uma cor
	 * (..., 'blue', ...)
	 */
	for (const [i, arg] of Object.entries(args).reverse()) {
		if (isColor(arg)) {
			options.color = arg
			args.splice(i, 1)
		}
	}

	/**
	 * Procura um nível
	 * (..., 'ERROR', ...)
	 */
	for (const [i, arg] of Object.entries(args).reverse()) {
		if (isLevel(arg)) {
			options.level = arg
			args.splice(i, 1)
		}
	}

	if (args.length >= 2) {
		/**
		 * Título no primeiro argumento e código no segundo
		 * ('Título', 'Código', ...)
		 */
		options.title = args[0]
		options.code = args[1]
	} else if (args.length === 1) {
		/**
		 * Título no primeiro argumento
		 * ('Título', ...)
		 */
		options.title = args[0]
	}

	return options
}

module.exports = getOptions
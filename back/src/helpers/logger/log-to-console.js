const chalk = require('chalk')

/**
 * Printa um log no console
 */
function logToConsole(opts, contents) {
	// Condições para logar no console
	if (!process.env.LOG_ALL && opts.hideConsole) return
	if (!process.env.LOG_ALL && process.env.NODE_ENV === 'production' && !opts.showProduction) return
	contents = [...contents]

	// Formata as horas
	const date = new Date(opts.date)
	const hours = date.getHours().toString().padStart(2, 0)
	const minutes = date.getMinutes().toString().padStart(2, 0)
	const seconds = date.getSeconds().toString().padStart(2, 0)
	const fmtDate = chalk.gray(`${hours}:${minutes}:${seconds}`)

	// Colore os textos
	for (const i in contents) {
		const content = contents[i]
		if (typeof content === 'string' && chalk[opts.color]) {
			contents[i] = chalk[opts.color](content)
		}
	}

	// Formata o título
	let title = null
	if (typeof opts.title === 'string') {
		title = chalk.underline(opts.title) + ':'
	}

	// Imprime
	if (!title) console.log(fmtDate, ...contents)
	else console.log(fmtDate, title, ...contents)
}

module.exports = logToConsole
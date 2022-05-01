const chalk = require('chalk')

/**
 * Prepara um função para imprimir logs formatados no console
 * 
 * @param {chalk.ForegroundColor} color - Cor do texto a ser impresso
 * @param {string} title - Título do log
 * @param {boolean} onlyDevelopment - Imprime apenas se estiver no ambiente de desenvolvimento
 * @returns {function(): void} Função de imprimir
 */
function log(color, title, onlyDevelopment = false) {
	if (onlyDevelopment && process.env.NODE_ENV !== 'development') return () => { }

	if (!chalk[color]) {
		title = color
	}

	/**
	 * Imprime os logs formatados no console
	 * 
	 * @param {...string} contents
	 */
	return (...contents) => {
		const date = new Date()
		const hours = date.getHours().toString().padStart(2, 0)
		const minutes = date.getMinutes().toString().padStart(2, 0)
		const seconds = date.getSeconds().toString().padStart(2, 0)
		const fmtDate = chalk.gray(`${hours}:${minutes}:${seconds}`)
	
		for (const i in contents) {
			const content = contents[i]
			if (typeof content === 'string' && chalk[color]) {
				contents[i] = chalk[color](content)
			}
		}
		
		if (typeof title === 'string') {
			title = chalk.underline(title) + ':'
		}
	
		if (!title) console.log(fmtDate, ...contents)
		else console.log(fmtDate, title, ...contents)
	}
}

module.exports = log
const chalk = require('chalk')

const LEVELS = [
	'SUCCESS',
	'ERROR',
	'DEBUG',
	'INFO',
	'WARNING'
]

/**
 * Retorna true se a string representa um nível
 */
function isLevel(string) {
	if (typeof string !== 'string') return false
	return LEVELS.includes(string.trim().toUpperCase())
}

/**
 * Retorna true se a string representa uma cor
 */
function isColor(string) {
	if (typeof string !== 'string') return false
	return !!chalk[string]
}

module.exports = {
	isLevel,
	isColor
}
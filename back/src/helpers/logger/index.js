const getOptions = require('./get-options')
const logToConsole = require('./log-to-console')
const Logs = require('./log-to-logger')
const setPresets = require('./presets')

function Logger(...args) {
	const opts = getOptions(...args)

	function log(...contents) {
		try { Logs.log(opts, contents) } catch (err) { console.error(err) }
		try { logToConsole(opts, contents) } catch (err) { console.error(err) }
		return opts
	}

	setPresets(log, Logger, opts)
	return log
}

Logger.getLogs = Logs.getLogs.bind(Logs)
module.exports = Logger
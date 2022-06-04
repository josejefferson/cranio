const chalk = require('chalk')

const LOG = false
const NO_LOG = true
const PROD = true
const DEV = false
const LOGGER = false
const NO_LOGGER = true

function setPresets(log, Logger, opts) {
	// log.foo = (...content) => Logger(Level, Color, ShowProduction, HideConsole, IgnoreLogger?, Options)(...content)
	log.success = (...content) => Logger('SUCCESS', 'greenBright',  PROD, LOG,    LOGGER,    opts)(...content)
	log.warning = (...content) => Logger('WARNING', 'yellowBright', PROD, LOG,    LOGGER,    opts)(...content)
	log.error   = (...content) => Logger('ERROR',   'redBright',    PROD, LOG,    LOGGER,    opts)(...content)
	log.info    = (...content) => Logger('INFO',    'cyanBright',   PROD, LOG,    LOGGER,    opts)(...content)
	log.debug   = (...content) => Logger('DEBUG',                   DEV,  LOG,    NO_LOGGER, opts)(...content)
	
	log.http = (details) => {
		const status = details.status >= 400 ? chalk.white(details.status) : details.status
		let text = `${details.method} (${status}) ${details.url} - ${details.time}ms`
		if (details.ips.length) text += ' - ' + details.ips.join(', ')
		if (details.referer) text += ' - ' + details.referer
		return Logger('HTTP', 'INFO', 'gray', DEV, !(process.env.LOG_HTTP && NO_LOG), Object.assign(opts, { details }))(text)
	}

	log.db = (details) => {
		const text = `${details.event} - ${details.collection} - ${details.id}`
		return Logger('DB', 'INFO', 'gray', DEV, !(process.env.LOG_DB && NO_LOG), Object.assign(opts, { details }))(text)
	}
}

module.exports = setPresets
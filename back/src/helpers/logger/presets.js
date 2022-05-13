const chalk = require('chalk')

const LOG = false
const NO_LOG = true
const PROD = true
const DEV = false
const LOGGER = true
const NO_LOGGER = false

function setPresets(log, Logger, opts) {
	// log.foo = (...content) => Logger(Level, Color, ShowProduction, HideConsole, IgnoreLogger?, Options)(...content)
	log.success = (...content) => Logger('SUCCESS', 'greenBright',  PROD, LOG,    LOGGER,    opts)(...content)
	log.warning = (...content) => Logger('WARNING', 'yellowBright', PROD, LOG,    LOGGER,    opts)(...content)
	log.error   = (...content) => Logger('ERROR',   'redBright',    PROD, LOG,    LOGGER,    opts)(...content)
	log.info    = (...content) => Logger('INFO',    'cyanBright',   PROD, LOG,    LOGGER,    opts)(...content)
	log.debug   = (...content) => Logger('DEBUG',                   DEV,  LOG,    NO_LOGGER, opts)(...content)
	
	log.http = (details) => {
		if (details.status >= 400) details.status = chalk.white(details.status)
		let text = details.method
		text += ' ' + `(${details.status})`
		text += ' ' + details.url
		text += ' - ' + `${details.time}ms`
		if (details.ips.length) text += ' - ' + details.ips.join(', ')
		if (details.hostname) text += ' - ' + details.hostname
		return Logger('INFO', 'gray', DEV, NO_LOG, Object.assign(opts, { details }))(text)
	}
}

module.exports = setPresets
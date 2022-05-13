const Log = require('../../models/Log')

class Logs {
	constructor() {
		this.logs = []
		this.logsForUpload = []
		this.load()

		if (process.env.NODE_ENV === 'production') {
			setInterval(this.save.bind(this), 60000)
		}
	}

	load() {
		return Log.find().then((logs) => {
			this.logs.unshift(...logs)
			return logs
		}).catch((err) => {
			console.error(err)
			return err
		})
	}

	save() {
		if (!this.logsForUpload.length) return false
		return Log.create(this.logsForUpload).then(() => {
			this.logsForUpload = []
			return true
		}).catch((err) => {
			console.error(err)
			return err
		})
	}

	log(opts, contents) {
		if (opts.ignoreLogger) return false
		opts.contents = contents
		this.logs.push(opts)
		this.logsForUpload.push(opts)
	}

	getLogs() {
		return [...this.logs, ...this.logsForUpload]
	}
}

module.exports = new Logs()
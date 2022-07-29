import { Router } from 'express'

export default function (Collection) {
	const router = Router()

	const getAll = (req, res, next) => {
		Collection.find()
			.then((data) => {
				res.status(200).json(data)
			})
			.catch(next)
	}

	const getOne = (req, res, next) => {
		Collection.findById(req.params.id)
			.then((data) => {
				res.status(200).json(data)
			})
			.catch(next)
	}

	const add = (req, res, next) => {
		Collection.create(req.body)
			.then((data) => {
				res.status(201).json(data)
			})
			.catch(next)
	}

	const update = (req, res, next) => {
		Collection.findByIdAndUpdate(req.params.id, { $set: req.body })
			.then((data) => {
				res.status(200).json(data)
			})
			.catch(next)
	}

	const remove = (req, res, next) => {
		Collection.findByIdAndDelete(req.params.id)
			.then((data) => {
				res.status(200).json(data)
			})
			.catch(next)
	}

	router.get('/', getAll)
	router.get('/:id', getOne)
	router.post('/', add)
	router.put('/:id', update)
	router.delete('/:id', remove)

	return {
		all: router,
		getAll: Router().get('/', getAll),
		getOne: Router().get('/:id', getOne),
		add: Router().post('/', add),
		update: Router().put('/:id', update),
		remove: Router().delete('/', remove)
	}
}


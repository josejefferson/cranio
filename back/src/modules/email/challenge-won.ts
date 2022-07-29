import sendEmail from './send'
import ejs from 'ejs'

export default async function (challenge, student) {
	const html = await ejs.renderFile('./src/modules/email/challenge-won.ejs', { challenge, student })
	await sendEmail({
		to: challenge.createdBy.map((challenge) => challenge.email),
		subject: `${student.shortName} cumpriu o desafio! [#${Math.floor(Math.random() * 9999)}]`,
		html: html
	})
}
import sendEmail from './send'
import ejs from 'ejs'

export default async function ChallengeWon(challenge: any, student: any) {
  const html = await ejs.renderFile('./src/modules/email/challenge-won.ejs', { challenge, student })
  await sendEmail({
    to: challenge.createdBy.map((challenge: any) => challenge.email),
    subject: `${student.shortName} cumpriu o desafio! [#${Math.floor(Math.random() * 9999)}]`,
    html: html
  })
}

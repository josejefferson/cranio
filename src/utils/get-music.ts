export default function getMusic(time: any) {
  const random = Math.floor(Math.random() * 3)
  const musicTime = getTime(time)

  function getTime(time: any) {
    if (time <= 5) return 5
    else if (time > 5 && time <= 10) return 10
    else if (time > 10 && time <= 20) return 20
    else if (time > 20 && time <= 30) return 30
    else if (time > 30 && time <= 60) return 60
    else if (time > 60 && time <= 90) return 90
    else if (time > 90) return 120
  }

  return `/music/answer-${musicTime}s-${random + 1}.mp3`
}
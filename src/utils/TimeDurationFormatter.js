 export function formatSecondsToHMS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  let result = ""
  if (hours > 0) result += `${hours} hr `
  if (minutes > 0) result += `${minutes} min `
  if (seconds > 0 || result === "") result += `${seconds} sec`

  return result.trim()
}

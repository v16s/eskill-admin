let timeParser = time => {
  let hours = parseInt(time / 3600)
  let minutes = parseInt((time % 3600) / 60)
  let seconds = parseInt((time % 3600) % 60)
  return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}:${
    seconds < 10 ? 0 : ''
  }${seconds}`
}
export { timeParser }

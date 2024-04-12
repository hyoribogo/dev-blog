const observerOption = {
  threshold: 0,
  rootMargin: '-100px 0px 0px 0px',
}

export const getHeadingObserver = (headings: string[], callback: (id: string) => void) => {
  let direction = ''
  let prevYposition = window.scrollY

  const checkScrollDirection = (prevY: number) => {
    if (window.scrollY === prevY) return
    if (window.scrollY > prevY) direction = 'down'
    else direction = 'up'

    prevYposition = window.scrollY
  }

  callback(decodeURIComponent(window.location.hash).slice(1) || '')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      checkScrollDirection(prevYposition)

      if (direction === 'down' && !entry.isIntersecting) {
        callback(entry.target.id)
      }

      if (direction === 'up' && entry.isIntersecting) {
        const index = headings.indexOf(entry.target.id)
        callback(headings[index - 1] || '')
      }
    })
  }, observerOption)

  return observer
}

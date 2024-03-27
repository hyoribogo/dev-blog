const observerOption = {
  threshold: 0,
  rootMargin: '-70px 0px 0px 0px',
}

export const getHedingObserver = (headings: string[], callback: (id: string) => void) => {
  let direction = ''
  let prevYposition = 0

  const checkScrollDirection = (prevY: number) => {
    if (window.scrollY === 0 && prevY === 0) return
    else if (window.scrollY > prevY) direction = 'down'
    else direction = 'up'

    prevYposition = window.scrollY
  }

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

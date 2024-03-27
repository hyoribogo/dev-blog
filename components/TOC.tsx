'use client'

import { getHedingObserver } from 'app/lib/observer'
import { useEffect, useState } from 'react'

interface TOCProps {
  toc: {
    value: string
    url: string
    depth: number
  }[]
}

const TOC = ({ toc }: TOCProps) => {
  const [currentId, setCurrentId] = useState('')
  const [_, setHeadingEls] = useState<Element[]>([])

  useEffect(() => {
    const headings = toc.map(({ url }) => url.slice(1))

    const observer = getHedingObserver(headings, setCurrentId)
    const headingElements = Array.from(document.querySelectorAll('h2, h3'))

    setHeadingEls(headingElements)

    headingElements.map((header) => {
      observer.observe(header)
    })
  }, [toc])

  return (
    <nav className="sticky top-32 pt-8">
      <ul>
        {toc.map(({ value, url, depth }) => (
          <li
            key={url}
            className={`pl-${
              (depth - 1) * 2
            } leading-8 transition-['font-size'] hover:text-black dark:hover:text-white ${
              currentId === url.slice(1)
                ? 'text-[1.05rem] font-bold text-black dark:text-white'
                : 'text-gray-300'
            }`}
          >
            <a href={url}>{value}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TOC

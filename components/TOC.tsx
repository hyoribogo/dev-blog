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
  // TODO: 새로고침 시 currentId 초기화

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
    <nav className="sticky top-32 mb-[44rem] pt-8">
      <ul>
        {toc.map(({ value, url, depth }) => (
          <li
            key={url}
            className={`pr-4 leading-8 transition-['font-size'] hover:text-black dark:hover:text-white ${
              currentId === url.slice(1)
                ? 'text-[1.05rem] font-semibold text-black dark:text-white'
                : 'text-gray-300'
            } ${depth === 3 ? 'pl-4' : depth === 4 ? 'pl-8' : ''}`}
          >
            <a href={url}>{value}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TOC

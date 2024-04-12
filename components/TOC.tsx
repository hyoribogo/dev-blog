'use client'

import { getHeadingObserver } from 'app/lib/observer'
import { useEffect, useState } from 'react'

interface TOCProps {
  toc: {
    value: string
    url: string
    depth: number
  }[]
  className?: string
}

const TOC = ({ toc, className }: TOCProps) => {
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    const headings = toc.map(({ url }) => url.slice(1))

    const observer = getHeadingObserver(headings, setCurrentId)
    const headingElements = toc.map(({ url }) => document.getElementById(url.slice(1)))

    headingElements.map((header) => {
      observer.observe(header!)
    })

    return () => {
      headingElements.map((header) => {
        observer.unobserve(header!)
      })
    }
  }, [toc])

  return (
    <nav className={`sticky top-32 mb-[44rem] pt-8 ${className ?? ''}`}>
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

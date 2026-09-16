import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

type PageTabsProps = {
  tabs: string[]
  active: string
  onChange: (tab: string) => void
}

export function PageTabs({ tabs, active, onChange }: PageTabsProps) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (direction: number) => {
    ref.current?.scrollBy({
      left: 240 * direction,
      behavior: 'smooth',
    })
  }

  return (
    <div className="tabs-shell">
      <button className="tab-arrow" onClick={() => scroll(-1)}>
        <ChevronLeft size={18} />
      </button>

      <div className="tabs" ref={ref}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={active === tab ? 'tab active' : 'tab'}
            onClick={() => onChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <button className="tab-arrow" onClick={() => scroll(1)}>
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

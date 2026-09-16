type Props = {
  items: string[]
  active: string
  onChange: (item: string) => void
}

export function PageTabs({ items, active, onChange }: Props) {
  return (
    <div className="tabs-scroll" role="tablist">
      {items.map((item) => (
        <button
          key={item}
          className={active === item ? 'tab-button active' : 'tab-button'}
          onClick={() => onChange(item)}
          role="tab"
          aria-selected={active === item}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

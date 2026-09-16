type StatusPillProps = {
  children: string
}

export function StatusPill({ children }: StatusPillProps) {
  const key = children.toLowerCase().replaceAll(' ', '-')

  return <span className={`status ${key}`}>{children}</span>
}

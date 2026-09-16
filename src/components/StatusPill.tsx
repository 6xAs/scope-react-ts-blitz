export function StatusPill({children}:{children:string}){const key=children.toLowerCase().replaceAll(' ','-');return <span className={`status ${key}`}>{children}</span>}

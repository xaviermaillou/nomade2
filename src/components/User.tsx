import { useContext, useEffect, useRef, useState } from "react"
import context, { ContextProps } from "../context/context"

const User: React.FunctionComponent = () => {
    const contextData: ContextProps = useContext(context)

    const [selected, setSelected] = useState<boolean>(false)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setSelected(false)
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [ref])

    return (
        <div ref={ref} id="user" className={selected ? "modal container fullHeight horizontal open" : "modal container fullHeight horizontal"}>
            <img onClick={() => setSelected(!selected)} alt="user" src="/img/user.png" className="fullHeight clickable" />
        </div>
    )
}

export default User
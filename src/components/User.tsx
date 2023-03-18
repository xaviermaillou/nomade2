import { useContext, useEffect, useRef, useState } from "react"
import context, { ContextProps } from "../context/context"
import requests, { RequestsProps } from "../context/requests"

const User: React.FunctionComponent = () => {
    const contextData: ContextProps = useContext(context)
    const requestsData: RequestsProps = useContext(requests)

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
            {!requestsData.user && <div id="userDrawer" className="fullHeight fullWidth horizontal">
                <img onClick={() => contextData.setModal(1)} alt="sign up with mail" className="fullHeight clickable" src="/img/mail.png" />
            </div>}
            {requestsData.user && <div id="userDrawer" className="fullHeight fullWidth horizontal">
                <div id="userName" className="fullWidth subtitle">{requestsData.userName}</div>
                <img onClick={() => contextData.setModal(2)} alt="sign out" className="fullHeight clickable" src="/img/logout.png" />
            </div>}
        </div>
    )
}

export default User
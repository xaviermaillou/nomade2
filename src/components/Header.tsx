import React, { useContext } from "react";
import Search from "./Search";
import context, { ContextProps } from "../context/context"

interface HeaderProps {
    
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
    const contextData: ContextProps = useContext(context)

    return (
        <div id="header" className="horizontal">
            <div id="user" className="container fullHeight clickable horizontal">
                <img alt="user" src="/img/user.png" className="fullHeight" />
            </div>
            <div id="closeListHeader" className={(contextData.displayLogo || !contextData.displayBody) ? "container fullHeight hidden" : "container fullHeight"} onClick={() => contextData.toggleDisplay()}>
                <img alt="close" src="/img/arrow.png" className="fullHeight" />
            </div>
            <div id="logo" className={(contextData.displayLogo || !contextData.displayBody) ? "container fullHeight" : "container fullHeight hidden"}>coffeeto.work</div>
            <Search />
        </div>
    )
}

export default Header
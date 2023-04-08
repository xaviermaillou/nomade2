import React, { useContext } from "react";
import Search from "./Search";
import context, { ContextProps } from "../context/context"
import User from "./User";

interface HeaderProps {
    
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
    const contextData: ContextProps = useContext(context)

    return (
        <div id="header" className="horizontal">
            <User />
            <div id="closeListHeader" className={(contextData.displayLogo || !contextData.displayBody) ? "container fullHeight clickable hidden" : "container fullHeight clickable"} onClick={() => contextData.toggleDisplay()}>
                <img alt="close list" src="/img/arrow.png" className="fullHeight" />
            </div>
            <div id="logo" className={(contextData.displayLogo || !contextData.displayBody) ? "container fullHeight" : "container fullHeight hidden"}>coffeeto.work</div>
            <Search />
        </div>
    )
}

export default Header
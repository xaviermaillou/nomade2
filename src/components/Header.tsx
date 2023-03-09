import React, { useContext } from "react";
import Search from "./Search";
import context, { ContextProps } from "../context/context"

interface HeaderProps {
    
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
    const contextData: ContextProps = useContext(context)

    return (
        <div id="header" className="horizontal">
            <div id="closeList" className="fullHeight clickable" onClick={() => contextData.toggleDisplay()}>
                <img alt={contextData.displayBody ? "close" : "open"} src="/img/arrow.png" className={
                    contextData.displayBody ?
                    "fullHeight reverse"
                    :
                    "fullHeight"}
                />
            </div>
            <div id="logo" className={(contextData.displayLogo || !contextData.displayBody) ? "fullHeight" : "fullHeight hidden"}>coffeeto.work</div>
            <Search />
        </div>
    )
}

export default Header
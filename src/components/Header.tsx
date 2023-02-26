import React, { useContext } from "react";
import Search from "./Search";
import context, { ContextProps } from "../context/context"

interface HeaderProps {
    
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
    const contextData: ContextProps = useContext(context)

    return (
        <div id="header" className="horizontal">
            <div id="closeList" className="fullHeight" onClick={() => contextData.toggleDisplay()}>
                <img alt={contextData.displayBody ? "close" : "open"} src="/img/arrow.png" className={
                    contextData.displayBody ?
                    "fullHeight fullWidth reverse"
                    :
                    "fullHeight fullWidth"}
                />
            </div>
            <Search />
        </div>
    )
}

export default Header
import React, { useContext } from "react";
import context, { ContextProps } from "../context/context"
import Search from "./Search";

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
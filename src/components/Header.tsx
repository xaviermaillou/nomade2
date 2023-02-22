import React, { useContext } from "react";
import context, { ContextProps } from "../context/context"

interface HeaderProps {
    
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
    const contextData: ContextProps = useContext(context)

    return (
        <div id="header" className="horizontal">
            <div id="closeList" className="fullHeight" onClick={() => contextData.toggleDisplay()}>
                <img alt="search" src="/img/arrow.png" className={
                    contextData.displayBody ?
                    "fullHeight fullWidth reverse"
                    :
                    "fullHeight fullWidth"}
                />
            </div>
            <div id="search" className="fullHeight">
                <img alt="search" src="/img/search.png" className="fullHeight fullWidth" />
            </div>
        </div>
    )
}

export default Header
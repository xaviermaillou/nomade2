import React from "react";

interface HeaderProps {
    displayBody: boolean
    toggleBody(): void
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
    return (
        <div id="header" className="horizontal">
            <div id="closeList" className="fullHeight" onClick={props.toggleBody}>
                <img alt="search" src="/img/arrow.png" className={props.displayBody ? "fullHeight fullWidth reverse" : "fullHeight fullWidth"} />
            </div>
            <div id="search" className="fullHeight">
                <img alt="search" src="/img/search.png" className="fullHeight fullWidth" />
            </div>
        </div>
    )
}

export default Header
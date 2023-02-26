import React, { useState } from "react"

const Search:React.FunctionComponent = () => {
    const [selected, setSelected] = useState<boolean>(false)
    return (
        <div id="search" className={selected ? "fullHeight horizontal open" : "fullHeight horizontal"}>
            <img onClick={() => setSelected(!selected)} alt="search" src="/img/search.png" className="fullHeight" />
        </div>
    )
}

export default Search
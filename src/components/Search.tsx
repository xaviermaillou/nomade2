import React, { useContext, useEffect, useRef, useState } from "react"
import context, { ContextProps } from "../context/context"

const Search:React.FunctionComponent = () => {
    const contextData: ContextProps = useContext(context)

    const [selected, setSelected] = useState<boolean>(false)
    const [searchCopy, setSearchCopy] = useState(contextData.searchString)

    const [searchTimer, setSearchTimer] = useState<any>(undefined)
    const runSearchTimer = (search: string) => {
        setSearchTimer(setTimeout(() => {
            contextData.setSearchString(search)
        }, 500))
    }
    const handleSearch = (search: string) => {
        setSearchCopy(search)
        clearTimeout(searchTimer)
        runSearchTimer(search)
    }

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node) && searchCopy.length === 0) setSelected(false)
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [ref, searchCopy.length])

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (selected && inputRef.current) setTimeout(() => inputRef.current?.focus(), 200)
    }, [selected])

    return (
        <div ref={ref} id="search" className={selected ? "fullHeight horizontal open" : "fullHeight horizontal"}>
            <img onClick={() => setSelected(!selected)} alt="search" src="/img/search.png" className="fullHeight" />
            <input
                value={searchCopy}
                onChange={(e) => handleSearch(e.target.value)}
                className="fullHeight fullWidth"
                ref={inputRef}
                placeholder="Type keywords"
            />
        </div>
    )
}

export default Search
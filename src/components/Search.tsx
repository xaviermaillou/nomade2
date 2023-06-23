import React, { useContext, useEffect, useRef, useState } from "react"
import { ContextProps, DataContext } from "../context/DataContext"

const Search:React.FunctionComponent = () => {
    const contextData: ContextProps = useContext(DataContext)

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

    const handleErasing = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        handleSearch('')
    }

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if ((ref.current && !ref.current.contains(e.target as Node) && searchCopy.length === 0)
                || ((e.target as HTMLElement).parentElement?.id === 'user')) setSelected(false)
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [ref, searchCopy.length])

    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = (enabled: boolean) => {
        if (enabled) setSelected(!selected)
    }

    useEffect(() => {
        if (selected && inputRef.current) setTimeout(() => inputRef.current?.focus(), 200)
    }, [selected])

    return (
        <div onClick={() => handleClick(!selected)} ref={ref} id="search" className={selected ? "modal container fullHeight horizontal open" : "modal container fullHeight horizontal clickable"}>
            <img onClick={() => handleClick(selected)} alt="search" src="/img/search.png" className="fullHeight clickable" />
            {(selected && searchCopy.length > 0) &&
                <div onClick={handleErasing} className="closingCross halfHeight horizontal inlineContainer clickable">
                    <img className="fullHeight" alt="close search" src="/img/close.png" />
                </div>
            }
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
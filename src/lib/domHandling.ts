export const scrollToElementInList = (desktopDisplay: boolean, id: number, previousId?: number) => {
    const list = document.getElementById('mainList') as HTMLDivElement
    (list.lastChild as HTMLDivElement).classList.add('temporaryMargin')
    const elementToShow = document.getElementById('placeElement' + id) as HTMLDivElement

    let heightToCompensate = 0
    const openedElementHeight = list.clientWidth - 48
    const closedElementHeight = 96
    const closingElementHeight = desktopDisplay ? 0 : 108

    if (previousId && previousId !== id && desktopDisplay) {
        const previousElement = document.getElementById('placeElement' + previousId) as HTMLDivElement
        const newElementIsBelowPrevious = previousElement.compareDocumentPosition(elementToShow) === 4
        if (newElementIsBelowPrevious) heightToCompensate = openedElementHeight - closedElementHeight
    }

    const verticalPositionToAccess = (elementToShow.offsetTop - ((window.innerHeight - openedElementHeight) / 2)) - heightToCompensate + closingElementHeight
    
    list.scrollTo({top: verticalPositionToAccess, behavior: 'smooth'})
    ;(list.lastChild as HTMLDivElement).classList.remove('temporaryMargin')
}

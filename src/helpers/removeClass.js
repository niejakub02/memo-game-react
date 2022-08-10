const removeClass = (element, ...classNames) => {
    classNames.forEach(className =>
        element.current.classList.remove(className)
    );
}


export default removeClass;
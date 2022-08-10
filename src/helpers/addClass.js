const addClass = (element, ...classNames) => {
    classNames.forEach(className => 
        element.current.classList.add(className)
    );
}

export default addClass;
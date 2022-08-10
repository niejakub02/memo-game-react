const setClass = (element, ...classNames) => {
    element.current.classList = classNames.join(" ");
}

export default setClass;
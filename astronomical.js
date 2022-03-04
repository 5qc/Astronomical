const items = document.querySelectorAll("*")
let styling = `<style type="text/css" id="astronomical-css">`
let classes = []
for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.hasAttribute("class")) {
        const getClasses = item.getAttribute("class").split(" ")
        
        for (let ii = 0; ii < getClasses.length; ii++) {
            const getRawClass = getClasses[ii]
            const getClass = getRawClass.split(":")
            const getProperty = getClass[0]
            const getValue = getClass[1]

            if (getProperty !== undefined) {
                if (getValue !== undefined) {
                    const styledClass = getRawClass
                                            .replace(/:/g, "\\:")
                                            .replace(/%/g, "\\%")
                                            .replace(/#/g, "\\#")
                                            .replace(/\(/g, "\\(")
                                            .replace(/\)/g, "\\)")
                                            .replace(/,/g, "\\,")
                                            .replace(/\[/g, "\\[")
                                            .replace(/\]/g, "\\]")

                    if (getValue.endsWith("[dark]")) {
                        const getNewValue = getValue.replace(/\[dark\]/, "")
                        styling += `@media(prefers-color-scheme: dark) {.${styledClass}{${getProperty}:${getNewValue}}}`
                    } else if (getValue.endsWith("[light]")) {
                        const getNewValue = getValue.replace(/\[light\]/, "")
                        styling += `@media(prefers-color-scheme: light) {.${styledClass}{${getProperty}:${getNewValue}}}`
                    } else {
                        styling += `.${styledClass}{${getProperty}:${getValue}}`
                    }
                }
            }
        }
    }

    if (item.hasAttribute("style")) {
        item.removeAttribute("style")
    }
}
styling += `</style>`
document.head.insertAdjacentHTML("beforeend", styling)

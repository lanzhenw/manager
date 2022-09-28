import React from "react"
import useResizeObserver from "@react-hook/resize-observer"

export const useSize = (target: any) => {
    const [size, setSize] = React.useState<DOMRectReadOnly | undefined>()

    React.useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect())
    }, [target])

    useResizeObserver(target, (entry) => setSize(entry.contentRect))
    return size
}
import { useRef, useState, useEffect } from 'react'

const useCanvas = (options = {}) => {
    const { draw, shapes } = options
    const [canvas, setCanvas] = useState(null)
    const canvasRef = useRef(null)

    const resizeCanvas = (canvas) => {
        const { width, height } = canvas.getBoundingClientRect()
        if (canvas.width !== width || canvas.height !== height) {
            const { devicePixelRatio:ratio=1 } = window
            const context = canvas.getContext('2d')
            canvas.width = width * ratio
            canvas.height = height * ratio
            context.scale(ratio, ratio)
            return { deltaWidth: width, deltaHeight: height }
        }
        return false
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        setCanvas(canvas)
        resizeCanvas(canvas)
        draw(context)
    }, [draw, shapes])

    return { canvas, canvasRef }
}

export default useCanvas
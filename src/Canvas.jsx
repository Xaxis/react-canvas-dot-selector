import React, { useState, useEffect } from 'react'
import useCanvas from './useCanvas'

const Canvas = (props) => {
    const { ...rest } = props
    const [startDragX, setStartDragX] = useState(0)
    const [startDragY, setStartDragY] = useState(0)
    const [curDragX, setCurDragX] = useState(0)
    const [curDragY, setCurDragY] = useState(0)
    const [isShapeDragging, setIsShapeDragging] = useState(false)
    const [activeDraggingShape, setActiveDraggingShape] = useState(null)
    const [shapes, setShapes] = useState({
        1: { x: 100, y: 100, radius: 10, color: 'red' },
        2: { x: 200, y: 200, radius: 10, color: 'green' },
        3: { x: 300, y: 300, radius: 10, color: 'blue' }
    })
    const [shapesArr, setShapesArr] = useState(Object.entries(shapes).map(([key, value]) => value))

    const canvasDraw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        for (let i = 0; i < shapesArr.length; i++) {
            let shape = shapesArr[i]
            if (shape.radius) {
                ctx.beginPath()
                ctx.arc(shape.x, shape.y, shape.radius + 2, 0, Math.PI * 2)
                ctx.fillStyle = 'white'
                ctx.fill()
                ctx.beginPath()
                ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2)
                ctx.fillStyle = shape.color
                ctx.fill()
            }
        }
    }

    const { canvas, canvasRef } = useCanvas({
        draw: canvasDraw,
        shapes: shapes
    })

    const handleMouseShapeHitDetect = (mx, my, shape) => {
        if (shape.radius) {
            let dx = mx - shape.x
            let dy = my - shape.y
            return (dx * dx + dy * dy) < shape.radius * shape.radius
        }
        return false
    }

    const handleMouseTouchDown = (e) => {
        let mx, my
        if (e.type === 'touchstart' && e.touches.length === 1) {
            let touch = e.touches[0]
            mx = touch.pageX - e.target.offsetLeft
            my = touch.pageY - e.target.offsetTop
        } else {
            mx = e.pageX - e.target.offsetLeft
            my = e.pageY - e.target.offsetTop
        }
        for (let i = 0; i < shapesArr.length; i++) {
            let shape = shapesArr[i]
            if (handleMouseShapeHitDetect(mx, my, shape)) {
                canvas.style.cursor = 'move'

                // Move 'shape' to the end of the array (top of the stack)
                shapesArr.splice(i, 1)
                shapesArr.push(shape)
                setShapesArr(shapesArr)

                // Set the active shape and its coordinates
                setStartDragX(mx)
                setStartDragY(my)
                setIsShapeDragging(true)
                setActiveDraggingShape(shape)
                return true
            }
        }
    }

    const handleMouseTouchUp = (e) => {
        canvas.style.cursor = 'default'
        if (!isShapeDragging) return
        setIsShapeDragging(false)
        setActiveDraggingShape(null)
    }

    const handleMouseTouchMove = (e) => {
        let mx, my, mmx, mmy
        if (e.type === 'touchmove' && e.touches.length === 1) {
            let touch = e.touches[0]
            mx = mmx = touch.pageX - e.target.offsetLeft
            my = mmy = touch.pageY - e.target.offsetTop
        } else {
            mx = mmx = e.pageX - e.target.offsetLeft
            my = mmy = e.pageY - e.target.offsetTop
        }
        for (let i = 0; i < shapesArr.length; i++) {
            let shape = shapesArr[i]
            if (handleMouseShapeHitDetect(mmx, mmy, shape)) {
                canvas.style.cursor = 'move'
                break
            } else {
                canvas.style.cursor = 'default'
            }
        }
        if (!isShapeDragging) return
        setCurDragX(mx)
        setCurDragY(my)
        let dx = mx - activeDraggingShape.x
        let dy = my - activeDraggingShape.y
        activeDraggingShape.x += dx
        activeDraggingShape.y += dy
        setStartDragX(curDragX)
        setStartDragY(curDragY)
    }

    // useEffect(() => {
    //     if (canvas) {
    //         // canvas.addEventListener('touchstart', handleMouseTouchDown, { passive: false })
    //         // canvas.addEventListener('touchend', handleMouseTouchUp, { passive: false })
    //         // canvas.addEventListener('touchcancel', handleMouseTouchUp, { passive: false })
    //         // canvas.addEventListener('touchmove', handleMouseTouchMove, { passive: false })
    //         // canvas.addEventListener('touchstart', handleMouseTouchDown)
    //         // canvas.addEventListener('touchend', handleMouseTouchUp)
    //         // canvas.addEventListener('touchcancel', handleMouseTouchUp)
    //         // canvas.addEventListener('touchmove', handleMouseTouchMove)
    //     }
    // }, [canvas])

    return (
        <canvas
            ref={canvasRef}
            {...rest}
            onMouseDown={handleMouseTouchDown}
            onMouseUp={handleMouseTouchUp}
            onMouseOut={handleMouseTouchUp}
            onMouseMove={handleMouseTouchMove}
            onTouchStart={handleMouseTouchDown}
            onTouchEnd={handleMouseTouchUp}
            onTouchCancel={handleMouseTouchUp}
            onTouchMove={handleMouseTouchMove}
        />
    )
}

export default Canvas
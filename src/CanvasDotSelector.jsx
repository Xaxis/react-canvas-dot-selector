import React, { useState, useEffect } from 'react'
import useCanvasDotSelector from './useCanvasDotSelector'

const CanvasDotSelector = (props) => {
    const {
        ...rest
    } = props
    const {
        canvasRef,
        dotsState,
        setDotsState,
        setBgImageLoadSrc,
        handleMouseTouchMoveDotStart,
        handleMouseTouchMoveDotEnd,
        handleMouseTouchMoveDotMove,
        handleTouchPinchZoomStart,
        handleTouchPinchZoomMove,
        handleMouseTouchMoveImageStart,
        handleMouseTouchMoveImageEnd,
        handleMouseTouchMoveImageMove,
        handleMouseWheelZoom
    } = useCanvasDotSelector({
        bgColor: '#000000',
        bgImageSrc: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        initDots: [
            { key: 'p', color: 'purple', xp: 0.5, yp: 0.5 },
            { key: 'g', color: 'green', xp: 0.6, yp: 0.6 },
            { key: 'b', color: 'blue', xp: 0.7, yp: 0.7 },
        ],
        initDotsHidden: true,
        dotRadius: 8,
        showGrid: true
    })

    /**
     * Demonstrate changing/loading a new background image.
     */
    useEffect(() => {
        // setTimeout(() => {
        //     setBgImageLoadSrc('https://www.thenews.com.pk/assets/uploads/tns/2015-03-15/558241_5306933_tns.jpg')
        // }, 2000)
    }, [])

    /**
     * Demonstrate changing state properties of a dot.
     */
    useEffect(() => {
        if (Object.entries(dotsState).length) {
            const { xp, yp, x, y } = dotsState.b
            console.log('dotsState: ', dotsState.p)
            // console.log('xp: ', xp, 'yp: ', yp, 'x: ', x, 'y: ', y)
        }
    }, [dotsState])

    return (
        <>
            <canvas
                ref={canvasRef}
                {...rest}

                // Demonstrate changing dot state
                // onDoubleClick={(e) => {
                //
                //     // Change state of 'b' (blue) dot
                //     dotsState.b.show = false
                //     setDotsState(dotsState)
                // }}

                onMouseDown={(e) => {
                    handleMouseTouchMoveDotStart(e)
                    handleMouseTouchMoveImageStart(e)
                }}
                onMouseUp={(e) => {
                    handleMouseTouchMoveDotEnd(e)
                    handleMouseTouchMoveImageEnd(e)
                }}
                onMouseOut={(e) => {
                    handleMouseTouchMoveDotEnd(e)
                    handleMouseTouchMoveImageEnd(e)
                }}
                onMouseMove={(e) => {
                    handleMouseTouchMoveDotMove(e)
                    handleMouseTouchMoveImageMove(e)
                }}
                onTouchStart={(e) => {
                    handleMouseTouchMoveDotStart(e)
                    handleTouchPinchZoomStart(e)
                    handleMouseTouchMoveImageStart(e)
                }}
                onTouchEnd={(e) => {
                    handleMouseTouchMoveDotEnd(e)
                    handleMouseTouchMoveImageEnd(e)
                }}
                onTouchCancel={(e) => {
                    handleMouseTouchMoveDotEnd(e)
                    handleMouseTouchMoveImageEnd(e)
                }}
                onTouchMove={(e) => {
                    handleMouseTouchMoveDotMove(e)
                    handleTouchPinchZoomMove(e)
                    handleMouseTouchMoveImageMove(e)
                }}
                onWheel={(e) => {
                    handleMouseWheelZoom(e)
                }}
            />
            <div>
                <button
                    onClick={() => {
                        dotsState.p.show = !dotsState.p.show
                        console.log('dotsState.p: ', dotsState.p)
                        setDotsState(dotsState)
                    }}
                >
                    Purple Dot
                </button>
                <button
                    onClick={() => {
                        dotsState.g.show = !dotsState.g.show
                        setDotsState(dotsState)
                    }}
                >
                    Green Dot
                </button>
                <button
                    onClick={() => {
                        dotsState.b.show = !dotsState.b.show
                        setDotsState(dotsState)
                    }}
                >
                    Blue Dot
                </button>
            </div>
        </>
    )
}

export default CanvasDotSelector
import { useEffect, useRef, useCallback } from 'react'
import './app.less'
import buttonImg from './button.png'

function rgb(r, g, b) {
    return {
        r: r / 256,
        g: g / 256,
        b: b / 256,
    }
}

function rgbToText(rgb) {
    return `rgb(${rgb.r * 256}, ${rgb.g * 256}, ${rgb.b * 256})`
}

const cmdMaps = {}
const figma = {
    exec(cmd: string, data: object, callback) {
        parent.postMessage({
            pluginMessage: {
                type: cmd,
                data,
            }
        }, '*')
        cmdMaps[cmd] = callback
    }
}

const App = () => {

    useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, data } = event.data.pluginMessage
            if (cmdMaps[type]) {
                cmdMaps[type](data)
            }
            // if (type === 'create-rectangles') {
            //     console.log(`Figma Says: ${message}`)
            // }
        }
    }, [])

    const list = [
        {
            name: 'Filled button',
            code: 'filled_button'
        },
        {
            name: 'Outlined button',
            code: 'outlined_button'
        },
    ]

    return (
        <div className="list">
            {list.map((item, idx) => {
                return (
                    <div
                        className="item"
                        key={idx}
                        onClick={() => {
                            parent.postMessage({
                                pluginMessage: {
                                    type: 'create',
                                    data: {
                                        code: item.code,
                                    }
                                }
                            }, '*')
                        }}
                    >
                        <div className="name">{item.name}</div>
                    </div>
                )
            })}

            <button className=""
                onClick={() => {
                    console.log('figma', window.figma)
                    figma.exec('setData', {}, () => {

                    })
                }}
            >test2</button>
            2
            
            {/* <img src={buttonImg} /> */}
        </div>
    )
}

export default App

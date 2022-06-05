console.log('aaaa', 'aaa2')
import Color from 'color'

const namespace = 'yunser.component'

const padding_x = 32
const padding_y = 32
function rgb(r, g, b) {
    return {
        r: r / 256,
        g: g / 256,
        b: b / 256,
    }
}

function hex2FigmaColor(hex) {
    const arr = Color(hex).rgb().color
    return {
        r: arr[0] / 256,
        g: arr[1] / 256,
        b: arr[2] / 256,
    }
}

console.log('hex2FigmaColor', hex2FigmaColor('#2D5EB8'))

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    console.log('onmessage', msg)
    if (msg.type === 'create') {
        create(msg.data.code)
    }
    else if (msg.type === 'setData') {
        console.log('111')
        const fNode = figma.currentPage.findChildren(node => {
            const data = node.getSharedPluginData('yunser.component', 'type')
            return data == 'button'
        })
        console.log('fNode', fNode)
        // const select0 = figma.currentPage.children[0]
        // select0.setRelaunchData({ edit: 'Edit this trapezoid with Shaper', open: '' })
        // // select0.setRelaunchData({
        // //     hello: 'hello223',
        // // })
        // select0.setPluginData('pData', 'pppDatata')
        // select0.setSharedPluginData('yunser', 'ppppDta', 'ppppDta')
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin()
}


function create(type = 'filled_button') {
    const { selection } = figma.currentPage
    const select0 = selection[0]
    // const select0 = figma.currentPage.children[0]
    // console.log('select0', select0)

    const types = {
        filled_button: {
            color: '#2D5EB8',
            border: null,
            labelColor: '#ffffff',
        },
        outlined_button: {
            color: null,
            border: '#2D5EB8',
            labelColor: '#2D5EB8',
        },
    }

    let nodeParent
    if (select0?.type == 'FRAME') {
        nodeParent = select0
    }
    else {
        nodeParent = figma.currentPage
    }


    function findNode(node, cb) {
        if (cb(node)) {
            return node
        }
        if (node.children?.length) {
            for (let child of node.children) {
                let n = findNode(child, cb)
                if (n) {
                    return n
                }
            }
        }
        return null
    }

    const fNode = findNode(figma.currentPage, node => {
        const data = node.getSharedPluginData(namespace, 'type')
        return data == type
    })

    console.log('fNode', fNode)
    if (fNode) {
        console.log('复制就行')
        const component = fNode as ComponentNode
        const instance = component.createInstance()
        nodeParent.appendChild(instance)
        return
    }
    console.log('创建')

    const button = figma.createComponent()
    button.layoutMode = 'HORIZONTAL'
    button.name = 'Button'
    button.cornerRadius = 20
    // button.primaryAxisSizingMode = 'FIXED'
    // button.resizeWithoutConstraints(80, 40)
    button.counterAxisSizingMode = 'FIXED'
    button.counterAxisAlignItems = 'CENTER'
    button.resize(button.width, 40)
    // button.
    // button.res
    // button.height = 48
    button.paddingLeft = 24
    button.paddingRight = 24
    // button.paddingTop = 8
    // button.paddingBottom = 8
    // button.ver
    // button.layoutPositioning = 'AUTO'
    // button.verticalPadding = 8
    if (types[type].color) {
        button.fills = [
            {
                type: 'SOLID',
                color: hex2FigmaColor(types[type].color),
                // opacity: 0,
            }
        ]
    }
    if (types[type].border) {
        button.strokes = [
            {
                type: 'SOLID',
                color: hex2FigmaColor(types[type].border),
                // opacity: 0,
            }
        ]
    }

    figma.loadFontAsync({ family: "Inter", style: "Regular" })
        .then(() => {
            const text = figma.createText()
            text.name = 'Label'
            const labelText = 'Button'
            text.characters = labelText
            text.setRangeFills(0, labelText.length, [
                {
                    type: 'SOLID',
                    color: hex2FigmaColor(types[type].labelColor),
                }
            ])
            text.setRangeFontSize(0, labelText.length, 14)
            // text.setRangeLineHeight(0, labelText.length, {
            //     value: 14,
            //     unit: 'PIXELS'
            // })

            button.appendChild(text)
            button.setSharedPluginData(namespace, 'type', type)

            nodeParent.appendChild(button)

            // const button2 = button.createInstance()
            // button2.x = 100
            // nodeParent.appendChild(button2)
        })


    
    // if (selection.length == 1) {
    // }
}

// create('filled_button')

// const select0 = figma.currentPage.children[0]
// if (select0?.type == 'FRAME') {
//     for (let child of select0.children) {
//         child.remove()
//     }
// }


// create('outlined_button')

figma.showUI(__html__, {
    width: 280,
    themeColors: true,
})

figma.on('selectionchange', () => {
    // console.log('selection', figma.currentPage.selection[0].layoutPosition)
})
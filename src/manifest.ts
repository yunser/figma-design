// import fs from 'fs-extra'
// import type PkgType from '../package.json'
// import { r } from '../scripts/utils'

export async function genManifest() {
    // const pkg = await fs.readJSON(r('package.json')) as typeof PkgType

    const manifest: Manifest = {
        name: 'Yunser Design',
        "id": "1115253540858802652",
        api: '1.0.0',
        main: 'code/index.js',
        ui: 'ui/index.html',
        editorType: ['figma'],
        "relaunchButtons": [
            { "command": "edit", "name": "Edit shape" },
            { "command": "open", "name": "Open Shaper", "multipleSelection": true }
        ]
    }

    return manifest
}

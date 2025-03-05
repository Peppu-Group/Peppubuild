<template>
    <div id="navbar" class="sidenav d-flex flex-column overflow-scroll">
        <nav class="navbar navbar-light">
            <div class="container-fluid">
                <router-link to="dashboard/projects">
                    <img src="https://www.peppubuild.com/logo.png" class="navbar-brand mb-0 h3 logo" />
                </router-link>
            </div>
        </nav>
        <div style="display: none">
            <div class="gjs-logo-cont" @click="popen()">
                <svg class="gjs-logo" width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 14H12M12 14H14M12 14V16M12 14V12" stroke="#1C274C" stroke-width="1.5"
                        stroke-linecap="round" />
                    <path
                        d="M22 11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975M21.9913 16C21.9554 18.4796 21.7715 19.8853 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V11"
                        stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                <div class="gjs-logo-version"></div>
            </div>
        </div>
        <div class="">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="style-tab" data-bs-toggle="tab" data-bs-target="#style"
                        type="button" role="tab" aria-controls="style" aria-selected="false">
                        Properties
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="symbols-tab" data-bs-toggle="tab" data-bs-target="#symbols" type="button"
                        role="tab" aria-controls="symbols" aria-selected="false">
                        Symbols
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="trait-tab" data-bs-toggle="tab" data-bs-target="#trait" type="button"
                        role="tab" aria-controls="trait" aria-selected="false">
                        Layers
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="data-tab" data-bs-toggle="tab" data-bs-target="#data" type="button"
                        role="tab" aria-controls="data" aria-selected="false">
                        Add Data
                    </button>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="style" role="tabpanel" aria-labelledby="style-tab">
                    <div id="properties-container"></div>
                </div>
                <div class="tab-pane fade show active" id="symbols" role="tabpanel" aria-labelledby="symbols-tab">
                    <div v-for="symbol in symbols" :key="symbol.getId()">
                        <div class="gjs-block gjs-one-bg gjs-four-color-h fa fa-list symbols__symbol"
                            @click="createInstance(symbol)">
                            <div title="Unlink all instances and delete Symbol" class="symbols__remove"
                                @click='deleteInstance(symbol)'>
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z">
                                    </path>
                                </svg>
                            </div>
                            <div class="symbols__num">
                                {{ symbol.getName() }}: {{
                                    getInstancesLength(symbol) }} </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="trait" role="tabpanel" aria-labelledby="trait-tab">
                    <div id="layers-containe"></div>
                </div>
                <div class="tab-pane fade" id="data" role="tabpanel" aria-labelledby="data-tab">
                    <p class="datatext">Create a collection to get data
                        from anywhere. (Coming soon)</p>

                    <div class="datasection">
                        <p class="datatext">Available Data</p>
                        <div class="alert alert-info alert-box" role="alert" v-for="data in peppuMethods" :key="data.id">
                            <p class="alerttext">{{ data.availMethod }} {{ data.id }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="main-content">
        <nav class="navbar navbar-light">
            <div class="container-fluid">
                <div class="panel__devices"></div>
                <div class="panel__basic-actions"></div>
            </div>
        </nav>
        <div id="editor"></div>
    </div>
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');

@import './css/style.css';

.symbols__num {
    font-size: 12px;
}

.symbols__symbol {
    position: relative;
}

.symbols__remove {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    line-height: 1;
    cursor: pointer;
}
</style>

<script>
import { grapesjs } from 'grapesjs'
import grapesjsIcons from 'grapesjs-icons';
import { userAuth } from './js/firebase.js';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
const serverUrl = 'https://server.peppubuild.com';

// var idx = 0;
const options = {
    // see https://icon-sets.iconify.design/
    collections: [
        'ri', // Remix Icon by Remix Design
        'mdi', // Material Design Icons by Pictogrammers
        'uim', // Unicons Monochrome by Iconscout
        'streamline-emojis' // Streamline Emojis by Streamline
    ]
}

export default {
    /**
      * This is the editor page.
      * It calls our empty editor or load data from gjs.
      * Onmounted(), we load our editor.
    */
    data() {
        return {
            edit: [],
            peppuMethods: "",
            symbols: [],
            userName: '',
        }
    },
    mounted() {
        this.userName = JSON.parse(localStorage.getItem('user')).displayName;
        // initialize grapesjs
        if (window.innerWidth <= '1050') {
            alert('Screen too small for Peppubuild, please use a larger screen.')
        }
        const editor = grapesjs.init({
            container: '#editor',
            height: '100vh',
            width: 'auto',
            showOffsets: true,
            fromElement: true,
            StorageManager: true,
            noticeOnUnload: false,
            pageManager: {
                pages: [
                    {
                        id: 'index'
                    }
                ]
            },
            layerManager: {
                appendTo: "#layers-containe",
            },
            traitManager: {
                appendTo: "#properties-container"
            },
            panels: {

            },
            styleManager: {
                sectors: [{
                    name: 'General',
                    open: false,
                    buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
                }, {
                    name: 'Dimension',
                    open: false,
                    buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding']
                }, {
                    name: 'Typography',
                    open: false,
                    buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-shadow']
                }, {
                    name: 'Decorations',
                    open: false,
                    buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
                }, {
                    name: 'Background',
                    open: false,
                    buildProps: ['background-color', 'background'],
                }, {
                    name: 'Extra',
                    open: false,
                    buildProps: ['opacity', 'transition', 'perspective', 'transform'],
                    properties: [{
                        type: 'slider',
                        property: 'opacity',
                        defaults: 1,
                        step: 0.01,
                        max: 1,
                        min: 0,
                    }]
                },
                {
                    name: 'Flex',
                    open: false,
                    properties: [{
                        name: 'Flex Container',
                        property: 'display',
                        type: 'select',
                        defaults: 'block',
                        list: [
                            { value: 'block', name: 'Disable' },
                            { value: 'flex', name: 'Enable' }
                        ],
                    }, {
                        name: 'Flex Parent',
                        property: 'label-parent-flex',
                        type: 'integer',
                    }, {
                        name: 'Direction',
                        property: 'flex-direction',
                        type: 'radio',
                        defaults: 'row',
                        list: [{
                            value: 'row',
                            name: 'Row',
                            className: 'icons-flex icon-dir-row',
                            title: 'Row',
                        }, {
                            value: 'row-reverse',
                            name: 'Row reverse',
                            className: 'icons-flex icon-dir-row-rev',
                            title: 'Row reverse',
                        }, {
                            value: 'column',
                            name: 'Column',
                            title: 'Column',
                            className: 'icons-flex icon-dir-col',
                        }, {
                            value: 'column-reverse',
                            name: 'Column reverse',
                            title: 'Column reverse',
                            className: 'icons-flex icon-dir-col-rev',
                        }],
                    }, {
                        name: 'Justify',
                        property: 'justify-content',
                        type: 'radio',
                        defaults: 'flex-start',
                        list: [{
                            value: 'flex-start',
                            className: 'icons-flex icon-just-start',
                            title: 'Start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-just-end',
                        }, {
                            value: 'space-between',
                            title: 'Space between',
                            className: 'icons-flex icon-just-sp-bet',
                        }, {
                            value: 'space-around',
                            title: 'Space around',
                            className: 'icons-flex icon-just-sp-ar',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-just-sp-cent',
                        }],
                    }, {
                        name: 'Align',
                        property: 'align-items',
                        type: 'radio',
                        defaults: 'center',
                        list: [{
                            value: 'flex-start',
                            title: 'Start',
                            className: 'icons-flex icon-al-start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-al-end',
                        }, {
                            value: 'stretch',
                            title: 'Stretch',
                            className: 'icons-flex icon-al-str',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-al-center',
                        }],
                    }, {
                        name: 'Flex Children',
                        property: 'label-parent-flex',
                        type: 'integer',
                    }, {
                        name: 'Order',
                        property: 'order',
                        type: 'integer',
                        defaults: 0,
                        min: 0
                    }, {
                        name: 'Flex',
                        property: 'flex',
                        type: 'composite',
                        properties: [{
                            name: 'Grow',
                            property: 'flex-grow',
                            type: 'integer',
                            defaults: 0,
                            min: 0
                        }, {
                            name: 'Shrink',
                            property: 'flex-shrink',
                            type: 'integer',
                            defaults: 0,
                            min: 0
                        }, {
                            name: 'Basis',
                            property: 'flex-basis',
                            type: 'integer',
                            units: ['px', '%', ''],
                            unit: '',
                            defaults: 'auto',
                        }],
                    }, {
                        name: 'Align',
                        property: 'align-self',
                        type: 'radio',
                        defaults: 'auto',
                        list: [{
                            value: 'auto',
                            name: 'Auto',
                        }, {
                            value: 'flex-start',
                            title: 'Start',
                            className: 'icons-flex icon-al-start',
                        }, {
                            value: 'flex-end',
                            title: 'End',
                            className: 'icons-flex icon-al-end',
                        }, {
                            value: 'stretch',
                            title: 'Stretch',
                            className: 'icons-flex icon-al-str',
                        }, {
                            value: 'center',
                            title: 'Center',
                            className: 'icons-flex icon-al-center',
                        }],
                    }]
                }
                ],
            },
            assetManager: {
                // Upload endpoint, set `false` to disable upload, default `false`
                uploadFile: async (ev) => {
                    const files = ev.dataTransfer ? ev.dataTransfer.files : ev.target.files;
                    Swal.showLoading();
                    var formData = new FormData();
                    editor.on('asset', () => {
                        Swal.close();
                    });
                    for (var i in files) {
                        formData.append('file', files[i]) //containing all the selected images from local
                    }
                    await fetch(`${serverUrl}/uploadfile/${localStorage.getItem('oauth')}`, {
                        method: 'POST',
                        body: formData,
                    }).then(response => {
                        response.json().then(res => {
                            let data = {
                                // You can pass any custom property you want
                                category: 'c1',
                                src: `https://drive.google.com/thumbnail?id=${res.id}&sz=w1000`,
                            }

                            editor.AssetManager.add(data);
                            editor.AssetManager.render();
                        })
                        /*
                        
                     */
                    })
                }
            },
            // Add peppu and other plugins.
            plugins: ['peppu-sidebar', 'peppubuild-custom-code', 'peppu-blocks', "gjs-blocks-basic", "grapesjs-plugin-forms", 'grapesjs-style-bg', 'grapesjs-touch', grapesjsIcons, 'grapesjs-rulers'],
            pluginsOpts: {
                'peppu-sidebar': { /* Test here your options  */ },
                'peppu-bootstrap': {},
                'gjs-blocks-basic': { flexGrid: true },
                [grapesjsIcons]: options,
                'grapesjs-rulers': {
                    dragMode: 'absolute'
                }
            },
            canvas: {
                styles: [
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
                    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css",
                    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                ],
                scripts: [
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                ],
            }
        });
        swal("Tour Guide", `${this.userName}, the right panel contains top icons for blocks and style manager. The bottom of the right panel contains the build with AI assistant button.`, "info")
            .then(() => {
                swal("Tour Guide", `The left panel allows you to view layers of divs in the editor, properties, and add symbols.`, "info")
                    .then(() => {
                        swal("Tour Guide", `The icons in the far right allows you to view your web page in different web pages.`, "info")
                            .then(() => {
                                swal("Tour Guide", `The center plus icon, written 'Pages' allows you to manage your website, add new pages, add products, and meta data`, "info")
                                    .then(() => {
                                        swal("The End!", `${this.userName}, please watch the video resources in your dashboard or send us a mail if you need more help`, "info")
                                    })
                            })
                    })
            })
        editor.on('block:drag:stop', async (model) => {
            await this.checkState();
            model.addAttributes({ id: this.randomID() });
        })
        editor.on('load', () => {
            const traitManager = editor.TraitManager;

            // Extend Trait Manager with a custom button type
            traitManager.addType('custom-button', {
                createInput({ trait }) {
                    const el = document.createElement('button');
                    el.innerHTML = trait.get('label') || 'Click me';
                    el.style.padding = '5px 10px';
                    el.style.border = '1px solid #ccc';
                    el.style.background = '#f5f5f5';
                    el.style.cursor = 'pointer';

                    el.onclick = () => {
                        const selected = editor.getSelected();
                        if (!selected) {
                            alert('Please select an element first.');
                            return;
                        }

                        const attrName = prompt('Enter attribute name:');
                        if (!attrName) return;

                        const attrValue = prompt(`Enter value for "${attrName}":`);
                        if (attrValue === null) return;

                        selected.addAttributes({ [attrName]: attrValue });

                        // Add the new attribute as an editable trait
                        selected.get('traits').add({
                            type: 'text',
                            name: attrName,
                            label: attrName,
                        });

                        editor.TraitManager.render(); // Refresh the traits panel
                    };

                    return el;
                }
            });

            // Enable the custom trait for all components
            editor.on('component:selected', (model) => {
                if (!model.get('traits').find(trait => trait.get('type') === 'custom-button')) {
                    model.get('traits').add({
                        type: 'custom-button',
                        label: 'Add Attribute',
                        full: true
                    });

                    editor.TraitManager.render();
                }
            });
        });



        var logoCont = document.querySelector('.gjs-logo-cont');
        document.querySelector('.gjs-logo-version').innerHTML = 'Pages';
        var logoPanel = document.querySelector('.gjs-pn-commands');
        logoPanel.appendChild(logoCont);
        var panelManager = editor.Panels;
        // get the buttons
        panelManager.getButton("views", "open-sm");
        panelManager.getButton("views", "open-tm");
        panelManager.getButton("views", "open-layers");

        const panelViews = panelManager.addPanel({
            id: "options"
        });
        panelViews.get("buttons").add([{
            attributes: {
                title: "Designer Mode"
            },
            label: `<svg width="18" viewBox="0 0 16 16"><path d="M0 8a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5A.5.5 0 0 1 0 8z"/><path d="M4 3h8a1 1 0 0 1 1 1v2.5h1V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2.5h1V4a1 1 0 0 1 1-1zM3 9.5H2V12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5h-1V12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/></svg>`,
            command: "ruler-visibility",
            id: "ruler-visibility",
            active: false
        }]);

        panelViews.get("buttons").add([{
            attributes: {
                title: "Create symbol"
            },
            label: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
            <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.5.5 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244z"/>
            </svg>`,
            command(editor) {
                const selected = editor.getSelected();
                if (!selected) return alert('Select a component first!');

                const info = editor.Components.getSymbolInfo(selected);
                if (info.isSymbol) return alert('Selected component is already a symbol!');

                // add symbol to views panel
                editor.Components.addSymbol(selected);

                /*
                const editMenuDiv = document.createElement('button');
                let symbol = editor.Components.addSymbol(selected);

                editMenuDiv.innerHTML = `${symbol.getName()}: ${editor.Components.getSymbolInfo(symbol).instances.length}`;
                editMenuDiv.className = 'btn btn-success';
                editMenuDiv.onclick = function () {
                    // editor.Components.addSymbol(selected);
                    editor.getWrapper().append(symbol, { at: 0 });

                }
                const panels = editor.Panels.getPanel('views-container')
                panels.set('appendContent', editMenuDiv).trigger('change:appendContent')
                */
            },
            id: "symbol-button",
            active: false
        }]);

        const data = JSON.parse(localStorage.getItem("init"));
        console.log({ data });
        if (data) editor.loadData(data);
        // remove the buttons
        panelManager.removeButton("views", "open-layers");
        panelManager.removeButton("views", "open-tm");
        /*
        if (payment == false) {
            panelManager.removeButton('options', 'export-template')
        }
        */
        this.peppuMethods = JSON.parse(localStorage.getItem('peppuMethods'))
        this.edit = editor;
        editor.on('symbol', this.updateMainSymbolsList);

    },
    unmounted() {
        this.edit.off('symbol', this.updateMainSymbolsList);
    },
    methods: {
        getInstancesLength(symbolMain) {
            return this.edit.Components.getSymbolInfo(symbolMain).instances.length;
        },
        deleteInstance(symbolMain) {
            grapesjs.editors.forEach((editor) => {
                editor.Components.detachSymbol(symbolMain);
            })
            return symbolMain.remove();
        },
        createInstance(symbolMain) {
            grapesjs.editors.forEach((editor) => {
                const instance = editor.Components.addSymbol(symbolMain);

                editor.addComponents([
                    instance
                ]);
            })
            /*
            
             */
            // editor.getWrapper().append(instance, { at: 0 });
        },
        updateMainSymbolsList() {
            this.symbols = this.edit.Components.getSymbols();
            console.log(this.symbols)
        },
        randomID() {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        },
        popen() {
            if (this.edit.Commands.isActive('peppu:open')) {
                this.edit.Commands.stop('peppu:open');
            } else {
                this.edit.Commands.run('peppu:open');
            }
        },
        checkState() {
            return new Promise((resolve, reject) => {
                userAuth.onAuthStateChanged((user) => {
                    if (user) {
                        user.getIdToken(true).then((accessToken) => {
                            resolve(document.cookie = `pepputoken=${accessToken}; max-age=3300`)
                        })
                    }
                    reject
                })
            })
        },
        createApi(type) {
            const modal = this.edit.Modal;

            const container = document.createElement('div');

            const inputHtml = `<div class="form-group">
                    <label>URL</label>
                    <input type="text" class="form-control" placeholder="http://test-data/" name="url" id="urlInput">
                    </div>
                    <br>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="getCheckbox" value=""
                    onclick="document.getElementById('getCheckbox').setAttribute('value', 'Get')">
                    <label class="form-check-label" for="getCheckbox">Get Request</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="postCheckbox" value=""
                    onclick="document.getElementById('postCheckbox').setAttribute('value', 'Post')">
                    <label class="form-check-label" for="postCheckbox">Post Request</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="deleteCheckbox" value=""
                    onclick="document.getElementById('deleteCheckbox').setAttribute('value', 'Delete')">
                    <label class="form-check-label" for="deleteCheckbox">Delete Request</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="putCheckbox" value=""
                    onclick="document.getElementById('putCheckbox').setAttribute('value', 'Put')">
                    <label class="form-check-label" for="putCheckbox">Put Request</label>
                    </div>
                    <br>`;
            const btnEdit = document.createElement('button');
            btnEdit.innerHTML = 'Submit';
            btnEdit.className = 'btn btn-success';
            btnEdit.onclick = function () {
                // get url value
                const urlInputElement = document.getElementById('urlInput');
                const urlVal = urlInputElement.value;

                // get value
                const getCheckElement = document.getElementById('getCheckbox');
                const getVal = getCheckElement.value;

                // post value
                const postCheckElement = document.getElementById('postCheckbox');
                const postVal = postCheckElement.value;

                // delete value
                const deleteCheckElement = document.getElementById('deleteCheckbox');
                const deleteVal = deleteCheckElement.value;

                // put value
                const putCheckElement = document.getElementById('putCheckbox');
                const putVal = putCheckElement.value;

                // here is where you put your ajax logic
                // myAjaxCallFunction(urlVal, idVal);
                console.log(urlVal);
                console.log(getVal);
                console.log(postVal);
                console.log(deleteVal);
                console.log(putVal);

                let methods = [getVal, postVal, deleteVal, putVal]
                let availMethod = methods.filter(str => /\w+/.test(str))
                let peppm = [{ id: urlVal, availMethod }]
                localStorage.setItem('peppuMethods', JSON.stringify(peppm))

                modal.close();
            };

            modal.setTitle(`Collect and manage data from ${type}`);
            container.innerHTML = inputHtml;
            container.appendChild(btnEdit);
            modal.setContent(container);
            modal.open();
        }
    }
}

</script>
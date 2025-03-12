<template>
    <div id="navbar" class="sidenav d-flex flex-column overflow-scroll">
        <nav class="navbar navbar-light">
            <div class="container-fluid">
                <router-link to="/dashboard/projects">
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
import { userAuth } from './js/firebase.js';
import Swal from 'sweetalert2';
import swal from 'sweetalert';

const serverUrl = 'https://server.peppubuild.com';

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
            plugins: ['peppu-sidebar', 'peppu-market', 'grapesjs-style-bg', 'grapesjs-touch', 'grapesjs-rulers'],
            pluginsOpts: {
                'peppu-sidebar': { /* Test here your options  */ },
                'grapesjs-rulers': {
                    dragMode: 'absolute'
                }
            },
            canvas: {
                styles: [
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
                    "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css",
                    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
                ],
                scripts: [
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
                    "https://cdn.jsdelivr.net/npm/pepputoken@0.0.5/dist/index.min.js"
                ],
            }
        });
        swal({
            title: "Tour Guide",
            text: `${this.userName}, the right panel contains top icons for blocks and the style manager. The bottom of the right panel contains the 'Build with AI Assistant' button.`,
            icon: "info",
            buttons: {
                skip: "Skip",
                next: "Next"
            }
        }).then((value) => {
            if (value === "next") {
                swal({
                    title: "Tour Guide",
                    text: `The left panel allows you to view layers of divs in the editor, adjust properties, and add symbols.`,
                    icon: "info",
                    buttons: {
                        skip: "Skip",
                        next: "Next"
                    }
                }).then((value) => {
                    if (value === "next") {
                        swal({
                            title: "Tour Guide",
                            text: `The icons in the far right allow you to preview your webpage on different screen sizes.`,
                            icon: "info",
                            buttons: {
                                skip: "Skip",
                                next: "Next"
                            }
                        }).then((value) => {
                            if (value === "next") {
                                swal({
                                    title: "Tour Guide",
                                    text: `The center plus icon, labeled 'Pages,' allows you to manage your website, add new pages, add products, and edit metadata.`,
                                    icon: "info",
                                    buttons: {
                                        skip: "Skip",
                                        next: "Next"
                                    }
                                }).then((value) => {
                                    if (value === "next") {
                                        swal({
                                            title: "The End!",
                                            text: `${this.userName}, please watch the video resources in your dashboard or contact us via email if you need more help.`,
                                            icon: "info",
                                            button: "Got it!"
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

        if (localStorage.getItem('New')) {
            editor.DomComponents.addType('custom-button', {
                model: {
                    defaults: {
                        components: [
                            {
                                tagName: 'div',
                                attributes: { id: 'CUz' },
                                components: [
                                    {
                                        tagName: 'div',
                                        attributes: { id: 'ZWT9' },
                                        components: [
                                            {
                                                tagName: 'div',
                                                attributes: { id: 'wrapper' },
                                                components: [
                                                    {
                                                        tagName: 'div',
                                                        attributes: { class: 'navbar' },
                                                        components: [
                                                            {
                                                                tagName: 'header',
                                                                attributes: { id: 'ibw9i' },
                                                                components: [
                                                                    {
                                                                        tagName: 'input',
                                                                        attributes: { type: 'checkbox', id: 'sidebar-toggle' }
                                                                    },
                                                                    {
                                                                        tagName: 'nav',
                                                                        attributes: { id: 'sidebar' },
                                                                        components: [
                                                                            {
                                                                                tagName: 'button',
                                                                                attributes: {
                                                                                    type: 'button',
                                                                                    onclick: "document.getElementById('sidebar-toggle').checked = false;",
                                                                                    class: 'close-button'
                                                                                },
                                                                                content: '×'
                                                                            },
                                                                            {
                                                                                tagName: 'ul',
                                                                                components: [
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        attributes: { id: 'itdat' },
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '/allperfumes', id: 'isv6v' },
                                                                                                content: 'All Perfumes'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '/women', id: 'iz8gl' },
                                                                                                content: 'Women'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        attributes: { id: 'iisaw' },
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '/men', id: 'ik2bs' },
                                                                                                content: 'Men'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '/belowprice', id: 'i14ge' },
                                                                                                content: 'Below ₦50k'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', id: 'i4fc6' },
                                                                                                content: 'Scented Candles & Diffusers'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '/unisex', id: 'ih3gg' },
                                                                                                content: 'Unisex'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '/newperf', id: 'i7orh' },
                                                                                                content: 'New Arrivals'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '/giftset', id: 'i0opy' },
                                                                                                content: 'Gift Set'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '/bestsellers', id: 'if3ha' },
                                                                                                content: 'Best Sellers'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', id: 'ifxi2' },
                                                                                                content: 'Deodorants'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', id: 'i953i' },
                                                                                                content: 'Niche Perfumes'
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'li',
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', id: 'i4rql' },
                                                                                                content: 'Recommendations for you'
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        tagName: 'div',
                                                                        attributes: { id: 'izeti', class: 'top-bar fixed-top' },
                                                                        components: [
                                                                            {
                                                                                tagName: 'div',
                                                                                attributes: { id: 'ihqqj', class: 'container' },
                                                                                components: [
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { id: 'i3v5u', class: 'logo' }
                                                                                    },
                                                                                    {
                                                                                        tagName: 'img',
                                                                                        attributes: {
                                                                                            src: 'https://peppubuild.com/logo.png',
                                                                                            alt: 'Fragrances.com.ng Logo',
                                                                                            id: 'i28sk'
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { id: 'i44hs3g', class: 'account-cart' },
                                                                                        components: [
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '/', id: 'i52kbo5' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'i',
                                                                                                        attributes: { id: 'iwhpcj4', class: 'fa-solid fa-cart-shopping' }
                                                                                                    },
                                                                                                    {
                                                                                                        type: 'textnode',
                                                                                                        content: 'Your Cart NGN '
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'span',
                                                                                                        attributes: { id: 'cart-total' },
                                                                                                        content: '0.00'
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                tagName: 'div',
                                                                                attributes: { id: 'im4rk', class: 'nav-bar' },
                                                                                components: [
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { id: 'ifpss', class: 'container' },
                                                                                        components: [
                                                                                            {
                                                                                                tagName: 'div',
                                                                                                attributes: {
                                                                                                    onclick: "document.getElementById('sidebar-toggle').checked = true;",
                                                                                                    id: 'ig6me',
                                                                                                    class: 'all-categories'
                                                                                                },
                                                                                                content: 'All Categories'
                                                                                            },
                                                                                            {
                                                                                                tagName: 'i',
                                                                                                attributes: {
                                                                                                    class: 'fa fa-bars close',
                                                                                                    onclick: "document.getElementById('i6rqp').classList.toggle('show') && document.getElementById('ZWT9').classList.toggle('reduce-margin');"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                tagName: 'nav',
                                                                                                attributes: { id: 'i6rqp' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'ul',
                                                                                                        attributes: { id: 'iwo1j' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'li',
                                                                                                                attributes: { id: 'i2ra2' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        type: 'link',
                                                                                                                        attributes: { href: '/', id: 'i97ry' },
                                                                                                                        content: 'HomE'
                                                                                                                    }
                                                                                                                ]
                                                                                                            },
                                                                                                            {
                                                                                                                tagName: 'li',
                                                                                                                attributes: { id: 'idfs1' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        type: 'link',
                                                                                                                        attributes: { href: '/newperf', id: 'i7jkz' },
                                                                                                                        components: [
                                                                                                                            {
                                                                                                                                type: 'textnode',
                                                                                                                                content: 'New Arrivals '
                                                                                                                            },
                                                                                                                            {
                                                                                                                                tagName: 'span',
                                                                                                                                attributes: { id: 'i5h89', class: 'hot' },
                                                                                                                                content: 'Hot'
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ]
                                                                                                            },
                                                                                                            {
                                                                                                                tagName: 'li',
                                                                                                                attributes: { id: 'iu94f' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        type: 'link',
                                                                                                                        attributes: { href: '/giftset', id: 'i4y2t' },
                                                                                                                        content: 'Deals'
                                                                                                                    }
                                                                                                                ]
                                                                                                            },
                                                                                                            {
                                                                                                                tagName: 'li',
                                                                                                                attributes: { id: 'ihr1p' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        type: 'link',
                                                                                                                        attributes: { href: '/bestsellers', id: 'i663a' },
                                                                                                                        content: 'Best Sellers'
                                                                                                                    }
                                                                                                                ]
                                                                                                            },
                                                                                                            {
                                                                                                                tagName: 'li',
                                                                                                                attributes: { id: 'ih1kr' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        type: 'link',
                                                                                                                        attributes: { href: '/', id: 'iln0p1' },
                                                                                                                        content: 'Brands'
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            {
                                                                                                tagName: 'div',
                                                                                                attributes: { id: 'i9g5zv', class: 'search-bar' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'input',
                                                                                                        attributes: { type: 'text', placeholder: 'Search Entire Store', id: 'iji4da' }
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'button',
                                                                                                        attributes: { type: 'button', id: 'ibrkp' },
                                                                                                        content: 'Search'
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        tagName: 'div',
                                                        attributes: { id: 'content' },
                                                        components: [
                                                            {
                                                                tagName: 'section',
                                                                attributes: { id: 'io50uj', class: 'hero' },
                                                                components: [
                                                                    {
                                                                        tagName: 'div',
                                                                        attributes: { id: 'i9sxzm', class: 'container' },
                                                                        components: [
                                                                            {
                                                                                tagName: 'h1',
                                                                                type: 'text',
                                                                                attributes: { id: 'iajfs8' },
                                                                                components: [{
                                                                                type: 'textnode',
                                                                                content: `Your Peppubuild Shop`
                                                                                }]
                                                                            },
                                                                            {
                                                                                tagName: 'p',
                                                                                type: 'text',
                                                                                attributes: { id: 'ifrj4f' },
                                                                                components: [{
                                                                                type: 'textnode',
                                                                                content: `Let us setup your Peppubuild shop!`
                                                                                }]
                                                                            },
                                                                            {
                                                                                type: 'link',
                                                                                attributes: { href: '/allperfumes', class: 'cta-button' },
                                                                                components: [{
                                                                                type: 'textnode',
                                                                                content: `Shop Now`
                                                                                }]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                tagName: 'section',
                                                                attributes: { class: 'featured-products' },
                                                                components: [
                                                                    {
                                                                        tagName: 'div',
                                                                        attributes: { id: 'feature', class: 'container feature' },
                                                                        components: [
                                                                            {
                                                                                tagName: 'h2',
                                                                                type: 'text',
                                                                                attributes: { id: 'iv6q35' },
                                                                                components: [{
                                                                                type: 'textnode',
                                                                                content: `Featured Products`
                                                                                }]
                                                                            },
                                                                            {
                                                                                tagName: 'div',
                                                                                attributes: { class: 'product-grid' },
                                                                                components: [
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { class: 'product' },
                                                                                        components: [
                                                                                            {
                                                                                                tagName: 'img',
                                                                                                attributes: {
                                                                                                    src: 'https://drive.google.com/thumbnail?id=1G8tqyqvCTHIOSbK7NGx6nV84Z0XiXK6c&sz=w1000',
                                                                                                    alt: 'Kay Ali',
                                                                                                    'style': 'width:100%;',
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                tagName: 'h5',
                                                                                                content: 'Kay Ali'
                                                                                            },
                                                                                            {
                                                                                                tagName: 'p',
                                                                                                content: 'Boujee Marshmallow'
                                                                                            },
                                                                                            {
                                                                                                tagName: 'p',
                                                                                                content: '₦ 20'
                                                                                            },
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', class: 'add-to-cart btn btn-primary mx-1' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'i',
                                                                                                        attributes: { class: 'bi bi-cart' }
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', class: 'pay-now btn btn-primary mx-1' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'i',
                                                                                                        attributes: { class: 'bi bi-wallet2' }
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', class: 'get-info btn btn-primary mx-1' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'i',
                                                                                                        attributes: { class: 'bi bi-info-circle' }
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { class: 'product' },
                                                                                        components: [
                                                                                            {
                                                                                                tagName: 'img',
                                                                                                attributes: {
                                                                                                    src: 'https://drive.google.com/thumbnail?id=1efqfmfLRx36UE3IrUbK_5Tc72kQ4XHOC&sz=w1000',
                                                                                                    alt: 'Ambre Nuit',
                                                                                                    'style': 'width:100%;'
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                tagName: 'h5',
                                                                                                content: 'Ambre Nuit'
                                                                                            },
                                                                                            {
                                                                                                tagName: 'p',
                                                                                                content: 'Christian Dior'
                                                                                            },
                                                                                            {
                                                                                                tagName: 'p',
                                                                                                content: '₦ 30'
                                                                                            },
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', class: 'add-to-cart btn btn-primary mx-1' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'i',
                                                                                                        attributes: { class: 'bi bi-cart' }
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', class: 'pay-now btn btn-primary mx-1' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'i',
                                                                                                        attributes: { class: 'bi bi-wallet2' }
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', class: 'get-info btn btn-primary mx-1' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'i',
                                                                                                        attributes: { class: 'bi bi-info-circle' }
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { class: 'product' },
                                                                                        components: [
                                                                                            {
                                                                                                tagName: 'img',
                                                                                                attributes: {
                                                                                                    src: 'https://drive.google.com/thumbnail?id=1MPYSwebssa2IzWC23hfWEXe1XQY334xn&sz=w1000',
                                                                                                    alt: 'Napoleon',
                                                                                                    'style': 'width:100%;'
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                tagName: 'h5',
                                                                                                content: 'Napoleon'
                                                                                            },
                                                                                            {
                                                                                                tagName: 'p',
                                                                                                content: 'Daniel'
                                                                                            },
                                                                                            {
                                                                                                tagName: 'p',
                                                                                                content: '₦ 50'
                                                                                            },
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', class: 'add-to-cart btn btn-primary mx-1' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'i',
                                                                                                        attributes: { class: 'bi bi-cart' }
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', class: 'pay-now btn btn-primary mx-1' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'i',
                                                                                                        attributes: { class: 'bi bi-wallet2' }
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            {
                                                                                                type: 'link',
                                                                                                attributes: { href: '#', class: 'get-info btn btn-primary mx-1' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'i',
                                                                                                        attributes: { class: 'bi bi-info-circle' }
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                tagName: 'section',
                                                                attributes: { class: 'featured-products' },
                                                                components: [
                                                                    {
                                                                        tagName: 'div',
                                                                        attributes: { class: 'container feature' },
                                                                        components: [
                                                                            {
                                                                                tagName: 'h2',
                                                                                type: 'text',
                                                                                attributes: { id: 'icylrj' },
                                                                                content: 'Shop by Categories'
                                                                            },
                                                                            {
                                                                                tagName: 'div',
                                                                                attributes: { id: 'Xkc0' },
                                                                                components: [
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        components: [
                                                                                            {
                                                                                                tagName: 'div',
                                                                                                attributes: { class: 'row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'div',
                                                                                                        attributes: { class: 'col' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'div',
                                                                                                                attributes: { class: 'card h-100' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'div',
                                                                                                                        attributes: { class: 'card-body' },
                                                                                                                        components: [
                                                                                                                            {
                                                                                                                                tagName: 'img',
                                                                                                                                attributes: {
                                                                                                                                    src: 'https://drive.google.com/thumbnail?id=1uAqLEn9L__LnOhQA-1jcCfmmZfdhg71g&sz=w1000',
                                                                                                                                    alt: 'Women',
                                                                                                                                    class: 'img-fluid',
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                tagName: 'h5',
                                                                                                                                type: 'text',
                                                                                                                                attributes: { class: 'card-title' },
                                                                                                                                components: [{
                                                                                                                                type: 'textnode',
                                                                                                                                content: `Women`
                                                                                                                                }]
                                                                                                                            },
                                                                                                                            {
                                                                                                                                type: 'link',
                                                                                                                                attributes: { href: '#', type: 'button', class: 'btn btn-primary' },
                                                                                                                                content: 'View'
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'div',
                                                                                                        attributes: { class: 'col' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'div',
                                                                                                                attributes: { class: 'card h-100' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'div',
                                                                                                                        attributes: { class: 'card-body' },
                                                                                                                        components: [
                                                                                                                            {
                                                                                                                                tagName: 'img',
                                                                                                                                attributes: {
                                                                                                                                    src: 'https://drive.google.com/thumbnail?id=1fjeZ4KpS2jsVDuaC1tLO6ake3Egyef52&sz=w1000',
                                                                                                                                    alt: 'Men',
                                                                                                                                    class: 'img-fluid',
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                tagName: 'h5',
                                                                                                                                type: 'text',
                                                                                                                                attributes: { class: 'card-title' },
                                                                                                                                components: [{
                                                                                                                                type: 'textnode',
                                                                                                                                content: `Men`
                                                                                                                                }]
                                                                                                                            },
                                                                                                                            {
                                                                                                                                type: 'link',
                                                                                                                                attributes: { href: '#', type: 'button', class: 'btn btn-primary' },
                                                                                                                                content: 'View'
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'div',
                                                                                                        attributes: { class: 'col' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'div',
                                                                                                                attributes: { class: 'card h-100' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'div',
                                                                                                                        attributes: { class: 'card-body' },
                                                                                                                        components: [
                                                                                                                            {
                                                                                                                                tagName: 'img',
                                                                                                                                attributes: {
                                                                                                                                    src: 'https://drive.google.com/thumbnail?id=1KWFGAWiHewz7mJYU4GNZ9s6H1YM58xQ6&sz=w1000',
                                                                                                                                    alt: 'Amouage',
                                                                                                                                    class: 'img-fluid',
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                tagName: 'h5',
                                                                                                                                type: 'text',
                                                                                                                                attributes: { class: 'card-title' },
                                                                                                                                components: [{
                                                                                                                                type: 'textnode',
                                                                                                                                content: `Unisex`
                                                                                                                                }]
                                                                                                                            },
                                                                                                                            {
                                                                                                                                type: 'link',
                                                                                                                                attributes: { href: '#', type: 'button', class: 'btn btn-primary' },
                                                                                                                                content: 'View'
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'div',
                                                                                                        attributes: { class: 'col' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'div',
                                                                                                                attributes: { class: 'card h-100' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'div',
                                                                                                                        attributes: { class: 'card-body' },
                                                                                                                        components: [
                                                                                                                            {
                                                                                                                                tagName: 'img',
                                                                                                                                attributes: {
                                                                                                                                    src: 'https://drive.google.com/thumbnail?id=1zAUZL7SFOA6_BpFgcRfIoWh4Un-woRtL&sz=w1000',
                                                                                                                                    alt: 'Electimuss',
                                                                                                                                    class: 'img-fluid',
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                tagName: 'h5',
                                                                                                                                type: 'text',
                                                                                                                                attributes: { class: 'card-title' },
                                                                                                                                components: [{
                                                                                                                                type: 'textnode',
                                                                                                                                content: `Gift`
                                                                                                                                }]
                                                                                                                            },
                                                                                                                            {
                                                                                                                                type: 'link',
                                                                                                                                attributes: { href: '#', type: 'button', class: 'btn btn-primary' },
                                                                                                                                content: 'View'
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'div',
                                                                                                        attributes: { class: 'col' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'div',
                                                                                                                attributes: { class: 'card h-100' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'div',
                                                                                                                        attributes: { class: 'card-body' },
                                                                                                                        components: [
                                                                                                                            {
                                                                                                                                tagName: 'img',
                                                                                                                                attributes: {
                                                                                                                                    src: 'https://drive.google.com/thumbnail?id=1IlVxMxj8k87qAJCN6NLuZQg-mL8ILnq9&sz=w1000',
                                                                                                                                    alt: 'Polio',
                                                                                                                                    class: 'img-fluid',
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                tagName: 'h5',
                                                                                                                                type: 'text',
                                                                                                                                attributes: { class: 'card-title' },
                                                                                                                                components: [{
                                                                                                                                type: 'textnode',
                                                                                                                                content: `Below 50k`
                                                                                                                                }]
                                                                                                                            },
                                                                                                                            {
                                                                                                                                type: 'link',
                                                                                                                                attributes: { href: '#', type: 'button', class: 'btn btn-primary' },
                                                                                                                                content: 'View'
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'div',
                                                                                                        attributes: { class: 'col' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'div',
                                                                                                                attributes: { class: 'card h-100' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'div',
                                                                                                                        attributes: { class: 'card-body' },
                                                                                                                        components: [
                                                                                                                            {
                                                                                                                                tagName: 'img',
                                                                                                                                attributes: {
                                                                                                                                    src: 'https://drive.google.com/thumbnail?id=15cBXOJxfoGWYX8tg7L_HBUWXO5UK4JRO&sz=w1000',
                                                                                                                                    alt: 'Arezzo',
                                                                                                                                    class: 'img-fluid',
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                tagName: 'h5',
                                                                                                                                type: 'text',
                                                                                                                                attributes: { class: 'card-title' },
                                                                                                                                components: [{
                                                                                                                                type: 'textnode',
                                                                                                                                content: `Niche`
                                                                                                                                }]
                                                                                                                            },
                                                                                                                            {
                                                                                                                                type: 'link',
                                                                                                                                attributes: { href: '#', type: 'button', class: 'btn btn-primary' },
                                                                                                                                content: 'View'
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                tagName: 'div',
                                                                attributes: { id: 'iz7fdgn-2', class: 'd-flex justify-content-center align-items-center flex-container mar' },
                                                                components: [
                                                                    {
                                                                        tagName: 'link',
                                                                        attributes: { id: 'i027p1l-2', class: 'bi bi-github large' }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                tagName: 'footer',
                                                                attributes: { id: 'i8d8qff-2' },
                                                                components: [
                                                                    {
                                                                        tagName: 'footer',
                                                                        attributes: { id: 'i4ufll1-2', class: 'container' },
                                                                        components: [
                                                                            {
                                                                                tagName: 'div',
                                                                                attributes: { id: 'ib0dlli-2', class: 'row' },
                                                                                components: [
                                                                                    // Profile section
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { id: 'if1itgl-2', class: 'col-6 col-md-2 mb-3' },
                                                                                        components: [
                                                                                            {
                                                                                                tagName: 'h5',
                                                                                                attributes: { id: 'iwj7z9f-2' },
                                                                                                components: [{
                                                                                                type: 'textnode',
                                                                                                content: `Profile`
                                                                                                }]
                                                                                            },
                                                                                            {
                                                                                                tagName: 'ul',
                                                                                                attributes: { id: 'i21oem3-2', class: 'nav flex-column' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'ifxwaei-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { href: '#', id: 'ipztm33-2', class: 'nav-link p-0 text-body-secondary' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'font',
                                                                                                                        attributes: { color: '#ffffff', id: 'izifwka-2' },
                                                                                                                        content: 'My Account'
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'iq35z08-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { href: '#', id: 'i68zg38-2', class: 'nav-link p-0 text-body-secondary' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'font',
                                                                                                                        attributes: { color: '#ffffff', id: 'iizo5yw-2' },
                                                                                                                        content: 'Checkout'
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'ib1u8je-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { href: '#', id: 'ilxikmy-2', class: 'nav-link p-0 text-body-secondary' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'font',
                                                                                                                        attributes: { color: '#ffffff', id: 'itgg3wl-2' },
                                                                                                                        content: 'My Cart'
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'i3lz78f-2', class: 'nav-item mb-2' }
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'i1uasbm-2', class: 'nav-item mb-2' }
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    // Information section
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { id: 'i4oo42h-2', class: 'col-6 col-md-2 mb-3' },
                                                                                        components: [
                                                                                            {
                                                                                                tagName: 'h5',
                                                                                                attributes: { id: 'ik5220i-2' },
                                                                                                components: [{
                                                                                                type: 'textnode',
                                                                                                content: `Information`
                                                                                                }]
                                                                                            },
                                                                                            {
                                                                                                tagName: 'ul',
                                                                                                attributes: { id: 'i9mtl8a-2', class: 'nav flex-column' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'i1b8cmm-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { href: '#', id: 'i3xicwb-2', class: 'nav-link p-0 text-body-secondary' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'span',
                                                                                                                        attributes: { id: 'ihs039u-2' }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        tagName: 'font',
                                                                                                                        attributes: { color: '#ffffff', id: 'i4i2yos-2' },
                                                                                                                        content: 'About Us'
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'i0pr4ci-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { href: '#', id: 'icp4e6w-2', class: 'nav-link p-0 text-body-secondary' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'font',
                                                                                                                        attributes: { color: '#ffffff', id: 'iy33jdt-2' },
                                                                                                                        content: 'Contact Us'
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'i91oy5d-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { href: '#', id: 'ipj66wi-2', class: 'nav-link p-0 text-body-secondary' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'font',
                                                                                                                        attributes: { color: '#ffffff', id: 'ii25zte-2' },
                                                                                                                        content: 'Delivery Information'
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'i27tkt1-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { href: '#', id: 'ioms8lh-2', class: 'nav-link p-0 text-body-secondary' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'font',
                                                                                                                        attributes: { color: '#ffffff', id: 'i7hihkv-2' },
                                                                                                                        content: 'Privacy Policy'
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'i6yhnyl-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { href: '#', id: 'ixh26mi-2', class: 'nav-link p-0 text-body-secondary' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'font',
                                                                                                                        attributes: { color: '#ffffff', id: 'i14jtwj-2' },
                                                                                                                        content: 'Return Policy'
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    // Social Media section
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { id: 'ix320oh-2', class: 'col-6 col-md-2 mb-3' },
                                                                                        components: [
                                                                                            {
                                                                                                tagName: 'h5',
                                                                                                attributes: { id: 'ivqvf0j-2' },
                                                                                                components: [{
                                                                                                type: 'textnode',
                                                                                                content: `Social Media`
                                                                                                }]
                                                                                            },
                                                                                            {
                                                                                                tagName: 'ul',
                                                                                                attributes: { id: 'ihalt6h-2', class: 'nav flex-column' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'ipvbax8-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { id: 'i72a0lp-2', class: 'bi bi-facebook large' }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'ieucxqw-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { id: 'itwoymd-2', class: 'bi bi-linkedin large' }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'ig3rqpt-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { id: 'isn65jf-2', class: 'bi bi-twitter large' }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'ikhcf8t-2', class: 'nav-item mb-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                type: 'link',
                                                                                                                attributes: { id: 'ift2lxl-2', class: 'bi bi-youtube large' }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'li',
                                                                                                        attributes: { id: 'i7j96pl-2', class: 'nav-item mb-2' }
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    // About Us section
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { id: 'iz8fqxg-2', class: 'col-md-5 offset-md-1 mb-3' },
                                                                                        components: [
                                                                                            {
                                                                                                tagName: 'form',
                                                                                                attributes: { method: 'get', id: 'ix9awe8-2' },
                                                                                                components: [
                                                                                                    {
                                                                                                        tagName: 'h5',
                                                                                                        attributes: { id: 'i2cxvod-2' },
                                                                                                        components: [{
                                                                                                        type: 'textnode',
                                                                                                        content: `About Us`
                                                                                                        }]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'p',
                                                                                                        attributes: { id: 'izqia6w-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'br',
                                                                                                                attributes: { id: 'ikvm37z-2' }
                                                                                                            },
                                                                                                            {
                                                                                                                tagName: 'span',
                                                                                                                attributes: { id: 'isswcle-2' }
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'p',
                                                                                                        attributes: { dir: 'ltr', id: 'i8jg9yg-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'span',
                                                                                                                attributes: { id: 'ik3ag4y-2' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'span',
                                                                                                                        type: 'text',
                                                                                                                        components: [{
                                                                                                                        type: 'textnode',
                                                                                                                        content: 'Vee\'s Mistique Luxury Perfumes '
                                                                                                                        }],
                                                                                                                        attributes: { id: 'ihox72x-2' },
                                                                                                                    },
                                                                                                                    {
                                                                                                                        type: 'text',
                                                                                                                        components: [{
                                                                                                                        type: 'textnode',
                                                                                                                        content: 'is an online perfume shop in Nigeria designed to awaken your senses with our large collection of authentic extraordinary perfumes, fragrances, scents, deodorants, best online perfumes deals and gift sets.'
                                                                                                                        }],
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'div',
                                                                                                        attributes: { id: 'ivncogi-2', class: 'newsletter-block' }
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'div',
                                                                                                        attributes: { id: 'i2n9bcn-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'span',
                                                                                                                attributes: { id: 'i8o4qml-2' },
                                                                                                                components: [
                                                                                                                    {
                                                                                                                        tagName: 'br',
                                                                                                                        attributes: { id: 'i54y8m4-2' }
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'p',
                                                                                                        attributes: { id: 'iqddtbk-2' }
                                                                                                    },
                                                                                                    {
                                                                                                        tagName: 'div',
                                                                                                        attributes: { id: 'inze5sc-2', class: 'd-flex flex-column flex-sm-row w-100 gap-2' },
                                                                                                        components: [
                                                                                                            {
                                                                                                                tagName: 'label',
                                                                                                                attributes: { for: 'newsletter1', id: 'idilz2h-2', class: 'visually-hidden' },
                                                                                                                content: 'Email address'
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        tagName: 'div',
                                                                                        attributes: { id: 'iz7fdgn-2', class: 'd-flex justify-content-center align-items-center flex-container mar' },
                                                                                        components: [
                                                                                            {
                                                                                                tagName: 'link',
                                                                                                attributes: { id: 'i027p1l-2', class: 'bi bi-github large' }
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        tagName: 'div',
                                                                        attributes: { id: 'ihl7j6h-2', class: 'container' },
                                                                        components: [
                                                                            {
                                                                                tagName: 'p',
                                                                                attributes: { id: 'il3ykuy-2' },
                                                                                type: 'text',
                                                                                components: [{
                                                                                type: 'textnode',
                                                                                content: '📍Lagos, Nigeria'
                                                                                }],
                                                                            },
                                                                            {
                                                                                tagName: 'p',
                                                                                attributes: { id: 'iovddck-2' },
                                                                                type: 'text',
                                                                                components: [{
                                                                                type: 'textnode',
                                                                                content: '© 2025 Peppubuild.com. All rights reserved.'
                                                                                }],
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }]
                                                    }]
                                            }]
                                    }]
                            }


                        ],
                        styles: `
                        body {
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
            margin-left: 0px;
            font-family: sans-serif;
            padding-top: 0px;
            padding-right: 0px;
            padding-bottom: 0px;
            padding-left: 0px;
            line-height: 1.6;
        }

        .container {
            margin-top: 0px;
            margin-right: auto;
            margin-bottom: 0px;
            margin-left: auto;
            padding-top: 20px;
            padding-right: 20px;
            padding-bottom: 20px;
            padding-left: 20px;
        }

        .top-bar {
            background-color: rgb(255, 255, 255);
            padding: 10px 0px 0px 0px;
        }

        .top-bar .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .top-bar .logo img {
            height: 50px;
        }

        .top-bar .account-cart a {
            text-decoration-line: none;
            text-decoration-thickness: initial;
            text-decoration-style: initial;
            text-decoration-color: initial;
            color: rgb(51, 51, 51);
            margin-left: 20px;
            font-size: 0.9em;
        }

        .top-bar .account-cart a i {
            margin-right: 5px;
        }

        .nav-bar {
            background-color: rgb(51, 51, 51);
            color: rgb(255, 255, 255);
            padding-top: 10px;
            padding-right: 0px;
            padding-bottom: 10px;
            padding-left: 0px;
        }

        .nav-bar .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-bar .all-categories {
            background-color: rgb(34, 34, 34);
            color: rgb(255, 255, 255);
            padding-top: 10px;
            padding-right: 15px;
            padding-bottom: 10px;
            padding-left: 15px;
            cursor: pointer;
        }

        .nav-bar nav ul {
            list-style-position: initial;
            list-style-image: initial;
            list-style-type: none;
            padding-top: 0px;
            padding-right: 0px;
            padding-bottom: 0px;
            padding-left: 0px;
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
            margin-left: 0px;
            display: flex;
        }

        .nav-bar nav ul li {
            margin-right: 20px;
        }

        .close {
            display: none;
        }

        .nav-bar nav ul li a {
            text-decoration-line: none;
            text-decoration-thickness: initial;
            text-decoration-style: initial;
            text-decoration-color: initial;
            color: rgb(255, 255, 255);
            font-weight: bold;
            text-transform: uppercase;
            font-size: 0.9em;
        }

        .nav-bar .search-bar {
            display: flex;
        }

        .nav-bar .search-bar input[type="text"] {
            padding-top: 8px;
            padding-right: 8px;
            padding-bottom: 8px;
            padding-left: 8px;
            border-top-width: initial;
            border-right-width: initial;
            border-bottom-width: initial;
            border-left-width: initial;
            border-top-style: none;
            border-right-style: none;
            border-bottom-style: none;
            border-left-style: none;
            border-top-color: initial;
            border-right-color: initial;
            border-bottom-color: initial;
            border-left-color: initial;
            border-image-source: initial;
            border-image-slice: initial;
            border-image-width: initial;
            border-image-outset: initial;
            border-image-repeat: initial;
            border-top-left-radius: 5px;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            border-bottom-left-radius: 5px;
            width: 250px;
        }

        .nav-bar .search-bar button {
            background-color: rgb(0, 188, 212);
            color: rgb(255, 255, 255);
            border-top-width: initial;
            border-right-width: initial;
            border-bottom-width: initial;
            border-left-width: initial;
            border-top-style: none;
            border-right-style: none;
            border-bottom-style: none;
            border-left-style: none;
            border-top-color: initial;
            border-right-color: initial;
            border-bottom-color: initial;
            border-left-color: initial;
            border-image-source: initial;
            border-image-slice: initial;
            border-image-width: initial;
            border-image-outset: initial;
            border-image-repeat: initial;
            padding-top: 8px;
            padding-right: 12px;
            padding-bottom: 8px;
            padding-left: 12px;
            cursor: pointer;
            border-top-left-radius: 0px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 0px;
        }

        .nav-bar .mobile-menu-icon {
            display: none;
            color: rgb(255, 255, 255);
            font-size: 1.5em;
            cursor: pointer;
        }

        .hot {
            background-color: red;
            color: white;
            padding-top: 2px;
            padding-right: 5px;
            padding-bottom: 2px;
            padding-left: 5px;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            border-bottom-left-radius: 3px;
            font-size: 0.7em;
            position: relative;
            top: -5px;
            left: 2px;
        }

        .hero {
            background-color: rgb(253, 235, 239);
            text-align: center;
            padding-top: 50px;
            padding-right: 0px;
            padding-bottom: 50px;
            padding-left: 0px;
        }

        .hero h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .hero p {
            font-size: 1.2em;
            color: rgb(102, 102, 102);
        }

        .cta-button {
            display: inline-block;
            background-color: rgb(51, 51, 51);
            color: white;
            padding-top: 12px;
            padding-right: 24px;
            padding-bottom: 12px;
            padding-left: 24px;
            text-decoration-line: none;
            text-decoration-thickness: initial;
            text-decoration-style: initial;
            text-decoration-color: initial;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            margin-top: 20px;
        }

        .featured-products {
            padding-top: 30px;
            padding-right: 0px;
            padding-bottom: 30px;
            padding-left: 0px;
            background-color: rgb(250, 250, 250);
        }

        .featured-products h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        .product-grid {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }

        .product {
            width: 30%;
            border-top-width: 1px;
            border-right-width: 1px;
            border-bottom-width: 1px;
            border-left-width: 1px;
            border-top-style: solid;
            border-right-style: solid;
            border-bottom-style: solid;
            border-left-style: solid;
            border-top-color: rgb(221, 221, 221);
            border-right-color: rgb(221, 221, 221);
            border-bottom-color: rgb(221, 221, 221);
            border-left-color: rgb(221, 221, 221);
            border-image-source: initial;
            border-image-slice: initial;
            border-image-width: initial;
            border-image-outset: initial;
            border-image-repeat: initial;
            padding-top: 15px;
            padding-right: 15px;
            padding-bottom: 15px;
            padding-left: 15px;
            margin-bottom: 20px;
            text-align: center;
        }

        .product img {
            max-width: 100%;
            height: auto;
        }

        .product h3 {
            font-size: 1.2em;
            margin-top: 10px;
        }

        .product .price {
            font-size: 1.1em;
            font-weight: bold;
            color: rgb(76, 175, 80);
            display: block;
            margin-bottom: 10px;
        }

        footer {
            background-color: rgb(51, 51, 51);
            color: white;
            text-align: center;
            padding-top: 20px;
            padding-right: 0px;
            padding-bottom: 20px;
            padding-left: 0px;
        }

        #wrapper:has(#sidebar-toggle:checked) #sidebar {
            transform: translateX(0px);
        }

        #sidebar .close-button {
            position: absolute;
            top: 10px;
            right: 20%;
            font-size: 20px;
            cursor: pointer;
            color: rgb(51, 51, 51);
            background-image: none;
            background-position-x: initial;
            background-position-y: initial;
            background-size: initial;
            background-repeat: initial;
            background-attachment: initial;
            background-origin: initial;
            background-clip: initial;
            background-color: initial;
            border-top-width: initial;
            border-right-width: initial;
            border-bottom-width: initial;
            border-left-width: initial;
            border-top-style: none;
            border-right-style: none;
            border-bottom-style: none;
            border-left-style: none;
            border-top-color: initial;
            border-right-color: initial;
            border-bottom-color: initial;
            border-left-color: initial;
            border-image-source: initial;
            border-image-slice: initial;
            border-image-width: initial;
            border-image-outset: initial;
            border-image-repeat: initial;
            padding-top: 5px;
            padding-right: 5px;
            padding-bottom: 5px;
            padding-left: 5px;
            z-index: 1046;
        }

        #sidebar ul {
            list-style-position: initial;
            list-style-image: initial;
            list-style-type: none;
            padding-top: 0px;
            padding-right: 0px;
            padding-bottom: 0px;
            padding-left: 0px;
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
            margin-left: 0px;
        }

        #sidebar li {
            padding-top: 15px;
            padding-right: 20px;
            padding-bottom: 15px;
            padding-left: 20px;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: rgb(238, 238, 238);
        }

        #sidebar li:last-child {
            border-bottom-width: initial;
            border-bottom-style: none;
            border-bottom-color: initial;
        }

        #sidebar a {
            text-decoration-line: none;
            text-decoration-thickness: initial;
            text-decoration-style: initial;
            text-decoration-color: initial;
            color: inherit;
            display: block;
        }

        #sidebar a:hover {
            background-color: rgb(240, 240, 240);
        }

        #sidebar a::after {
            content: "›";
            float: right;
            color: rgb(127, 140, 141);
        }

        #wrapper:has(#sidebar-toggle:checked)::before {
            opacity: 1;
            visibility: visible;
        }

        .fa.fa-bars {
            color: rgb(250, 145, 170);
        }

        .fa-regular.fa-heart {
            color: rgb(250, 145, 170);
        }

        .fa-regular.fa-user {
            color: rgb(250, 145, 170);
        }

        .fa-solid.fa-cart-shopping {
            color: rgb(250, 145, 170);
        }

        .container#feature {
            background-color: white;
        }

        .large {
            font-size: 30px;
            padding-top: 20px;
            padding-right: 20px;
            padding-bottom: 20px;
            padding-left: 20px;
            color: black;
        }

        .mar {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: rgb(227, 227, 227);
        }

        .container.py-5 {
            width: 100%;
            padding-top: 0px;
            padding-right: 0px;
            padding-bottom: 0px;
            padding-left: 0px;
            margin-top: 0px;
            margin-right: 0px;
            margin-bottom: 0px;
            margin-left: 5px;
        }

        .bi.bi-facebook.large {
            font-size: 20px;
            color: white;
        }

        .bi.bi-linkedin.large {
            font-size: 20px;
            color: white;
        }

        .bi.bi-twitter.large {
            font-size: 20px;
            color: white;
        }

        .bi.bi-youtube.large {
            font-size: 20px;
            color: white;
        }

        .nav-link.p-0.text-body-secondary {
            text-align: left;
        }

        #i28sk {
            width: 176px;
            height: 64px;
            margin: 0px 25% 0px 0px;
        }

        #wrapper {
            transition-behavior: normal;
            transition-duration: 0.3s;
            transition-timing-function: ease-in-out;
            transition-delay: 0s;
            transition-property: all;
            display: flex;
        }

        #sidebar-toggle {
            display: none;
        }

        #sidebar {
            width: 30vw;
            padding-top: 3%;
            background-color: rgb(248, 249, 250);
            overflow-y: auto;
            transition-behavior: normal;
            transition-duration: 0.3s;
            transition-timing-function: ease-in-out;
            transition-delay: 0s;
            transition-property: all;
            position: fixed;
            top: 0px;
            left: 0px;
            height: 100%;
            transform: translateX(-100%);
            z-index: 1045;
        }

        #content {
            flex-grow: 1;
            transition-behavior: normal;
            transition-duration: 0.3s;
            transition-timing-function: ease-in-out;
            transition-delay: 0s;
            transition-property: all;
        }

        #wrapper::before {
            content: "";
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1040;
            opacity: 0;
            transition-behavior: normal;
            transition-duration: 0.3s;
            transition-timing-function: ease-in-out;
            transition-delay: 0s;
            transition-property: opacity;
            visibility: hidden;
        }

        #ibrkp {
            background-color: rgb(250, 145, 170);
        }

        .container.feature {
            background-color: white;
        }

        #ZWT9 {
            margin: 22vh 0px 0px 0px;
        }

        #ipwjoe1 {
            margin: 0px 0px 10px 0px;
        }

        .featured-products.head-type {
            margin: 22vh 0px 0px 0px;
        }

        #pAA9 {
            display: none;
        }

        #r7V3 {
            display: none;
        }

        #iwj7z9f-2 {
            text-align: left;
        }

        #ik5220i-2 {
            text-align: left;
        }

        #ihox72x-2 {
            color: white;
            font-family: sans-serif;
            font-size: var(--bs-body-font-size);
            font-weight: var(--bs-body-font-weight);
        }

        #ik3ag4y-2 {
            font-family: Arial, sans-serif;
            color: white;
            background-color: transparent;
            font-variant-numeric: normal;
            font-variant-east-asian: normal;
            font-variant-alternates: normal;
            font-variant-position: normal;
            font-variant-emoji: normal;
            vertical-align: baseline;
            white-space-collapse: preserve;
        }

        #i8jg9yg-2 {
            line-height: 1.38;
            margin-top: 0pt;
            margin-bottom: 0pt;
            text-align: left;
        }

        #ivncogi-2 {
            margin-top: 40px;
            color: rgb(168, 174, 186);
            font-family: Rajdhani, "Helvetica Neue", Verdana, Arial, sans-serif;
            font-size: 14px;
            text-align: start;
            background-color: rgb(0, 0, 0);
        }

        #i8o4qml-2 {
            background-color: rgb(0, 0, 0);
            color: rgb(168, 174, 186);
            font-family: Rajdhani, "Helvetica Neue", Verdana, Arial, sans-serif;
            font-size: 13px;
            text-align: start;
            font-weight: var(--bs-body-font-weight);
        }

        #i4ufll1-2 {
            width: 99vw;
        }

        @media (max-width: 992px) {
            .featured-products.head-type {
                margin: 25vh 0px 0px 0px;
            }

            #iji4da {
                width: 7px;
            }
        }

        @media (max-width: 768px) {
            .container {
                width: 95%;
            }

            .top-bar .container {
                flex-direction: column;
                align-items: center;
            }

            .top-bar .account-cart {
                margin-top: 10px;
            }

            .nav-bar .container {
                flex-direction: column;
                align-items: flex-start;
            }

            .nav-bar nav {
                margin-top: 10px;
                width: 100%;
            }

            .nav-bar nav ul {
                flex-direction: column;
                text-align: left;
            }

            .nav-bar nav ul li {
                margin-top: 5px;
                margin-right: 0px;
                margin-bottom: 5px;
                margin-left: 0px;
            }

            .nav-bar .search-bar {
                margin-top: 10px;
                width: 100%;
            }

            .nav-bar .search-bar input[type="text"] {
                width: 100%;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
            }

            .nav-bar .search-bar button {
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                margin-top: 5px;
            }

            .product-grid {
                flex-direction: column;
            }

            .product {
                width: 90%;
                margin-top: 0px;
                margin-right: auto;
                margin-bottom: 20px;
                margin-left: auto;
            }

            #wrapper:has(#sidebar-toggle:checked) #sidebar {
                transform: translateX(0px);
                display: block;
            }

            .nav-bar .all-categories {
                display: block;
            }

            #wrapper:has(#sidebar-toggle:checked) #content {
                margin-left: 80%;
            }

            #i6rqp.show {
                display: none;
                /* Show when class "show" is added */
            }

            #sidebar {
                width: 80%;
            }

            #content {
                margin-left: 0px;
            }

            #ZWT9 {
                margin: 500px 0px 0px 0px;
            }

            #ZWT9.reduce-margin {
                margin: 300px 0px 0px 0px; /* Reduced margin when fa-bars is clicked */
            }

            .featured-products.head-type {
                margin: 49vh 0px 0px 0px;
            }

            .close {
                display: block;
                margin-left: 95%;
            }

        }

        @media (max-width: 480px) {
            #ibrkp {
                margin-top: 0px;
                margin-right: 0px;
                margin-bottom: 0px;
                margin-left: 10px;
            }

            #iji4da {
                width: auto;
            }
        }
                        `
                    },
                },
            });


            // **Append a new instance of the component to the editor**
            editor.on('load', function () {
                const components = editor.getWrapper().get('components');
                components.add({
                    type: 'custom-button'
                });
            });

            const projectdata = editor.getProjectData();
            let gjsProject = JSON.stringify(projectdata);
            let id = localStorage.getItem('projectId');
            let title = localStorage.getItem("projectTitle");
            let published = localStorage.getItem("published") || null;
            let accessToken = localStorage.getItem('oauth');
            let products = localStorage.getItem('products') || [];
            try {
                fetch(`https:/server.peppubuild.com/save/${id}`, {
                    method: "PUT", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ accessToken: accessToken, gjsProject: gjsProject, title: title, products: products, published: published }),
                }).then((response) => {
                    if (!response.ok) {
                        swal("Error", "You're not logged in", "error").then(() => {
                            // window.location.href = 'https://app.peppubuild.com/dashboard/projects';
                        })
                    }
                })
            } catch {
                swal("Error", "You're not logged in", "error").then(() => {
                    window.location.href = 'https://app.peppubuild.com/dashboard/projects';
                })
            }
        }
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
    }
}

</script>
import UI from '../utils/ui';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import JSZip from "jszip";
import FileSaver from 'file-saver';
import axios from 'axios'
import grapesjs_blocks_basic from 'grapesjs-blocks-basic';
import peppu_blocks from 'peppu-blocks';
import grapesjs_plugin_forms from 'grapesjs-plugin-forms';
import prettify from 'html-prettify';
import cssbeautify from 'cssbeautify';


var zip = new JSZip();

export default class PagesApp extends UI {
    constructor(editor, opts = {}) {
        super(editor, opts);
        this.addPage = this.addPage.bind(this);
        this.addTitle = this.addTitle.bind(this);
        this.addProject = this.addProject.bind(this);
        this.manageProject = this.manageProject.bind(this);
        this.loadProject = this.loadProject.bind(this);
        this.selectPage = this.selectPage.bind(this);
        this.removePage = this.removePage.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.getProject = this.getProject.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.readText = this.readText.bind(this);
        this.templatePublish = this.templatePublish.bind(this);
        this.addProduct = this.addProduct.bind(this);

        /* Set initial app state */
        this.state = {
            editablePageId: '',
            isShowing: true,
            nameText: '',
            projectTitle: '',
            pages: [],
            loading: false,
            projectName: ''
        };
    }

    get editableId() {
        return this.state.editablePageId;
    }

    onRender() {
        // this.pm.getMain().id = 'home';
        const { pm, setState, editor } = this;
        setState({
            loading: true
        });
        setState({
            pages: [...pm.getAll()]
        });
        editor.on('page', () => {
            setState({
                pages: [...pm.getAll()]
            })
        });
        setState({
            loading: false
        });
    }

    isSelected(page) {
        const { editor } = this;
        editor.Pages.getAll().forEach(e => {
            const name = e.id
            const component = e.getMainComponent()
            const html = editor.getHtml({ component });
            const css = editor.getCss({ component });
        })
        return this.pm.getSelected().id === page.id;
    }

    selectPage(e) {
        this.pm.select(e.currentTarget.dataset.key);
        this.update();
    }

    removePage(e) {
        if (this.opts.confirmDeletePage()) {
            this.pm.remove(e.currentTarget.dataset.key);
            this.update();
        }
    }

    deleteProject() {
        const { editor } = this;
        localStorage.removeItem("projectName");
        // call drive delete route
        try {

        } catch { swal("Error", "An error occurred", "error") }
    }

    openDelete(e) {
        if (this.opts.confirmDeleteProject()) {
            if (this.state.projectName) {
                this.state.projectName = null
                this.deleteProject();
            }
            else if (localStorage.getItem("projectName") != null) {
                this.deleteProject();
            }

            // this.pm.remove(e.currentTarget.dataset.key);
            // call delete in localhost and possibly db
            this.update();
        }
    }

    openEdit(e) {
        const { editor } = this;
        this.setStateSilent({
            editablePageId: e.currentTarget.dataset.key
        });
        editor.Modal.close();
        editor.SettingsApp.setTab('page');
        editor.runCommand('open-settings');
        // call command to rename page in directory
    }

    editPage(id, name) {
        const currentPage = this.pm.get(id);
        currentPage?.set('id', name);
        this.update()
    }

    manageProject() {
        const { editor } = this;
        return new Promise((resolve, reject) => {
            // const pages = JSON.parse(localStorage.getItem('gjsProject'))

            function getCss() {
                let allCSS = '';

                // Get all pages
                const pages = editor.Pages.getAll();

                pages.forEach((page) => {
                    // Activate the page to retrieve its styles
                    editor.Pages.select(page);

                    // Get CSS for the currently active page
                    allCSS += `/* CSS for page: ${page.get('name')} */\n`;
                    allCSS += editor.getCss() + '\n\n';
                });

                return allCSS;
            }

            // let cssstreams = Readable.from(getCss())
            // await client.uploadFrom(cssstreams, `style.css`);
            zip.file("style.css", cssbeautify(getCss()));
            let indexhtml = `
                <!DOCTYPE html>
                <html>

                <head>
                    <title>${localStorage.getItem("projectTitle") ?? 'Peppubuild - Project'}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css" rel="stylesheet">
                    <link href="https://unpkg.com/pepputoken/dist/index.min.css" rel="stylesheet">
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
                    <link href="./style.css" rel="stylesheet">
                    <!-- VueJS development version -->
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.12/vue.min.js"></script>
                    <!-- Vue Router -->
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.0.0/vue-router.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/pepputoken"></script>
                    <script src="https://unpkg.com/sweetalert"></script>
                </head>
                <body>
                <div id="app">
                <a href="https://www.peppubuild.com" class="built-with-peppubuild-btn">
                    Built with Peppubuild
                </a>
                    <router-view></router-view>
                </div>

                <!-- Vue Pages -->
                ${(function fun() {
                    let value = ""
                    for (const e of editor.Pages.getAll()) {
                        value += `<script src="pages/${e.id}.js"></script>`
                    }
                    return value
                })()}

                <!-- Routes -->
                <script>
                ${(function fun() {
                    var value = ""
                    for (const e of editor.Pages.getAll()) {
                        value += `
                            { path: '/${e.id}', component: ${e.id} },
                        `
                    }
                    return `
                    var routes = [
                        ${value},
                        { path: '/', component: index }
                    ];
                    `
                })()}


                    var router = new VueRouter({
                        routes: routes,
                        mode: 'history',
                        base: '/'
                    });

                    var app = new Vue({
                        el: '#app',
                        router: router
                    })
                </script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                <script defer>
                fetch("/socials.json")
                    .then(response => response.json())
                    .then(data => {
                        localStorage.setItem("socials", JSON.stringify(data));
                    })
                .catch(error => console.error("Failed to load socials.json:", error));
                </script>
                </body>
                </html>
                `
            zip.file("index.html", prettify(indexhtml));

            let htaccess = `
                <IfModule mod_rewrite.c>
                    RewriteEngine On
                    RewriteBase /
                    RewriteRule ^index\.html$ - [L]
                    RewriteCond %{REQUEST_FILENAME} !-f
                    RewriteCond %{REQUEST_FILENAME} !-d
                    RewriteRule . /index.html [L]
                </IfModule>
                `
            zip.file(".htaccess", htaccess);

            let socials = localStorage.getItem('socials');
            if (socials) {
                JSON.parse(localStorage.getItem('socials'));
                zip.file("socials.json", socials);
            } else {
                throw new Error(swal("Publish Unsuccessful", "You cannot publish or download artifact, without updating your socials. Click on the button to update it.", "error").then(() => {
                    swal({
                        title: 'Update Socials',
                        text: `Update your socials so that your customers can reach you.`,
                        content: {
                            element: 'div',
                            attributes: {
                                innerHTML: '<label for="swal-input1" style="display: block; font-weight: bold; margin-top: 10px;">WhatsApp Number</label>' +
                                    '<input id="swal-input1" class="swal-input" placeholder="Your WhatsApp Number" style="width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;">' +
                                    '<label for="swal-input2" style="display: block; font-weight: bold; margin-top: 10px;">Facebook Username</label>' +
                                    '<input id="swal-input2" class="swal-input" placeholder="Your Facebook Username" style="width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;">'
                            }
                        },
                        buttons: true,
                        dangerMode: false,
                    }).then((value) => {
                        if (value) {
                            let input1 = document.getElementById('swal-input1').value;
                            let input2 = document.getElementById('swal-input2').value;

                            let socials = `{"whatsapp": "${input1}", "facebook": "${input2}"}`
                            localStorage.setItem('socials', socials)

                            console.log('First Input:', input1);
                            console.log('Second Input:', input2);
                        }
                    }).finally(() => {
                        swal("Success", "Now that you've updated your socials, you can now publish", "success")
                    })
                }))
            }

            let headerHtml = ""; // Variable to store header content
            let footerHtml = ""; // Variable to store footer content

            // First, extract header content from the index page
            for (const e of editor.Pages.getAll()) {
                if (e.id === "index") {
                    const component = e.getMainComponent();
                    const indexHtml = editor.getHtml({ component });

                    // Extract header content using regex or DOM manipulation
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = indexHtml;
                    const headerElement = tempDiv.querySelector("header");

                    // Extract footer
                    const footerElement = tempDiv.querySelector("footer");

                    if (headerElement) {
                        headerHtml = headerElement.outerHTML; // Store header content
                    }

                    if (footerElement) {
                        footerHtml = footerElement.outerHTML; // Store footer content
                    }
                    break; // No need to continue searching
                }
            }

            // Now process all pages and prepend the header (except the index page itself)
            for (const e of editor.Pages.getAll()) {
                const name = e.id;

                const component = e.getMainComponent();
                let html = editor.getHtml({ component });
                
                // Parse the HTML and extract only the body content
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const bodyContent = doc.body.innerHTML; // Extracts everything inside <body>

                // Add header and footer only if the page is not "index"
                if (name !== "index" && headerHtml) {
                    html = `
                    <body>
                    <div id="wrapper">
                        <div id="ZWT9">
                            <div class="navbar">
                            ${headerHtml}
                            </div>
                        </div>
                    </div>
                    ${bodyContent + footerHtml}
                    </body>`;
                } else {
                    html = 
                    `<body>
                        ${bodyContent}
                    </body>`
                }

                let htmlContent = `
                        var ${name} = { 
                            template: \`${html}\`
                        };
                    `;

                zip.file(`pages/${name}.js`, htmlContent);
            }

            /* 
                        for (const e of editor.Pages.getAll()) {
                            const name = e.id
                            const component = e.getMainComponent()
                            const html = editor.getHtml({ component });
                            let htmlContent = `
                                    var ${name} = { 
                                    template: \`${html}\`
                                    };
                                    `
                            zip.file(`pages/${name}.js`, `${htmlContent}`);
                        }
                        */
            resolve();
        })
    }

    addProject() {
        let pname = localStorage.getItem('projectName');
        /*
        const { editor } = this;
        const projectdata = editor.getProjectData();
        let pages = JSON.stringify(projectdata);
        let pname = localStorage.getItem('projectName');
        Swal.showLoading();
        try {
            fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/clientdeploy/${pname}`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pages: pages }),
            }).then((response) => {
                if (response.ok) {
                    swal("Successful!", "Project Published", "success").then(() => {
                        window.location.replace(`http://www.${pname}.peppubuild.com`);
                    })
                }
            })
        } catch { swal("Error", "An error occurred", "error") }
        */
        // IF PAYMENT STATUS IS UNPAID
        /* 
        if (payment == false) {
            window.FlutterwaveCheckout({
                public_key: process.env.VUE_APP_PUBLICKEY,
                tx_ref: 'titanic-48981487343MDI0NzMx',
                amount: 5000,
                currency: 'NGN',
                payment_options: 'card, bank, ussd',
                redirect_url: '/dashboard/projects',
                meta: {
                    consumer_id: 23,
                    consumer_mac: '92a3-912ba-1192a',
                },
                customer: {
                    email: 'ugochi.ukpai@peppubuild.com',
                    name: 'Ugochi Ukpai',
                },
                customizations: {
                    title: 'Peppubuild',
                    description: 'Payment for Peppubuild Pro',
                    logo: 'https://www.peppubuild.com/logo.png',
                },
            });
        }
        */
        Swal.fire({
            title: "How would you like to publish your work?",
            icon: "info",
            showDenyButton: true,
            denyButtonColor: "#3085d6",
            denyButtonText: "Publish on Netlify",
            confirmButtonText: "Download Artifacts",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                swal("Publishing, please wait...", "We're publishing and updating your work, please wait", "info")
                this.manageProject().then(() => {
                    zip.generateAsync({ type: "blob" })
                        .then(function (blob) {
                            FileSaver.saveAs(blob, `${pname}.zip`);
                            swal.close();
                            swal("Successful!", "Downloaded Artifacts Successfully!", "success")
                        });
                })
            } else if (result.isDenied) {
                // change isDismissed, use multi-buttons.
                let key = localStorage.getItem('autkn');
                let published = localStorage.getItem("published");
                if (key) {
                    if (published != 'No') {
                        let netlifyContent = `
                    # The following redirect is intended for use with most SPA's that handles routing internally.
                    [[redirects]]
                    from = "/*"
                    to = "/index.html"
                    status = 200
                    `
                        zip.file(`netlify.toml`, `${netlifyContent}`);
                        this.manageProject().then(() => {
                            zip.generateAsync({ type: "blob" }).then(function (blob) {
                                axios(`https://netlify-proxy.onrender.com/netlify/${published}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/zip',
                                        Authorization: 'Bearer ' + localStorage.getItem('autkn'),
                                    },
                                    data: blob,
                                }).then((response) => {
                                    swal.close();
                                    swal("Successful!", "Updated Website!", "success").then(() => {
                                        window.open(`https://${response.data.subdomain}.netlify.app`);
                                    })
                                }).catch(function () {
                                    swal("Error!", "An error occurred, we don't know what it is.", "error")
                                })
                            })
                        })
                    } else {
                        let netlifyContent = `
                    # The following redirect is intended for use with most SPA's that handles routing internally.
                    [[redirects]]
                    from = "/*"
                    to = "/index.html"
                    status = 200
                    `
                        zip.file(`netlify.toml`, `${netlifyContent}`);
                        this.manageProject().then(() => {
                            zip.generateAsync({ type: "blob" }).then(function (blob) {
                                // User the token to fetch the list of sites for the user
                                // let name = 'mybabygirl'
                                let name = prompt('What would you like to name your site?');
                                if (name != null) {
                                    axios('https://netlify-proxy.onrender.com/netlify', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/zip',
                                            Authorization: 'Bearer ' + localStorage.getItem('autkn'),
                                        },
                                        data: blob,
                                        params: { name: `${name}.peppubuild` }
                                    })
                                        .then((response) => {
                                            localStorage.setItem("published", response.data.id);
                                            swal.close();
                                            swal("Successful!", "Published to Netlify Successfully!", "success").then(() => {
                                                window.open(`https://${response.data.subdomain}.netlify.app`);
                                            })
                                            // add response in page so user knows it was published.
                                        }).catch(function (error) {
                                            if (error.response.status === 422) {
                                                swal("Error!", "The site name is already taken, website can't be deployed", "error")
                                            } else {
                                                swal("Error!", "An error occurred, we don't know what it is.", "error")
                                            }
                                        })
                                }
                            })
                        })
                    }
                } else {
                    // sweet alert asking them to connect netlify account first and try to publish later
                    swal("Error!", "Connect your Netlify account First and Try to Publish Later", "error");
                }
            }
        });

    }

    addPage() {
        const { pm } = this;
        const { nameText } = this.state
        if (!nameText) return;
        pm.add({
            id: nameText,
            component: ''
        });
        document.getElementById("textfield2").value = ""
        this.update();
    }

    addTitle() {
        const { projectTitle } = this.state;
        localStorage.setItem('projectTitle', projectTitle);
        swal("Successful!", "Web Title Saved!", "success");
        document.getElementById("textfield1").value = "";
        this.saveProject();
    }

    saveProject() {
        const { editor } = this;
        const projectdata = editor.getProjectData();
        let gjsProject = JSON.stringify(projectdata);
        let id = localStorage.getItem('projectId');
        let title = localStorage.getItem("projectTitle");
        let published = localStorage.getItem("published");
        let accessToken = localStorage.getItem('oauth');
        let products = localStorage.getItem('products') || [];
        try {
            fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/save/${id}`, {
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

    addProduct() {
        // show form to create product name, images, categories, and description.
        // the image form can use peppu image to send images to drive, or store images in images folder, in root of file.
        // store data as json format for each product in a .json file and read from it.
        // for preview, this data can be stored in reddis or localstorage
        // you can call the data in the .json file, to place images from different categories accross the page.
        const { editor } = this;
        const mdl = editor.Modal;
        mdl.setTitle('Project Manager');
        mdl.setContent(editor.ProductApp.render());
        mdl.open();
    }

    listProducts() {
        // show list of all products and an edit button and delete button.
        // effect these changes in localstorage or reddis.
    }

    async templatePublish() {
        Swal.fire({
            title: "Are you sure? You can't edit template after this step.",
            text: "To make your templates more appealing, you need an image snapshot of the template. Add an image url when requested.",
            icon: "info",
            confirmButtonText: "Convert to Template",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const { editor } = this;
                const projectdata = editor.getProjectData();
                let gjsProject = JSON.stringify(projectdata);
                let title = localStorage.getItem("projectTitle");
                let accessToken = localStorage.getItem('oauth');
                let products = localStorage.getItem('products');
                let name = prompt('What will you like to name your template');
                let url = prompt('Add an Image URL for your template');
                if (!url) {
                    swal("Error", "We cannot proceed if there's no image", "error")
                }
                if (name) {
                    try {
                        fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/template/${name}`, {
                            method: "PUT", // or 'PUT'
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ name: name, accessToken: accessToken, gjsProject: gjsProject, products: products, title: title, url: url }),
                        }).then(() => {
                            swal("Success", "We've successfully converted your project to a template.", "success")
                                .then(() => {
                                    window.location.href = 'https://app.peppubuild.com/dashboard/projects';
                                })
                        })
                    } catch {
                        swal("Error", "An error occurred.", "error")
                    }
                }
            }
        })
    }

    async getProject(id) {
        const { editor } = this;
        let data = await fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/project/${id}`).then(response => { return response.json() });
        return data;
    }

    loadProject() {
        // allow users choose the folder of choice.
        // look for db.json file in the root of the folder.
        // save the gjsProject in localhost.
        // call reload.
        // reference: index line 72 - 74
    }

    async readText(event) {
        const file = event.target.files.item(0)
        const text = await file.text();
        const { editor } = this;
        let data = JSON.parse(text);
        let value = data.gjsProject.project;
        editor.loadProjectData(value);
        var input = file.name;
        var output = input.substring(0, input.lastIndexOf('.')) || input;
        this.state.projectName = output;
        localStorage.setItem("projectName", output);
        await this.setProjectName(output);
        this.update();
    }

    handleNameInput(e) {
        this.setStateSilent({
            nameText: e.target.value.trim()
        })
    }

    handleTitle(e) {
        this.setStateSilent({
            projectTitle: e.target.value.trim()
        })
    }

    renderPagesList() {
        const { pages, loading } = this.state;
        const { opts, isSelected } = this;

        if (loading) return opts.loader || '<div>Loading pages...</div>';

        return pages.map((page, i) => `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <div 
                data-id="${i}" 
                data-key="${page.get('private') ? '' : (page.id || page.get('name'))}"  
                class="page ${isSelected(page) ? 'selected' : ''}"
            >
                <i class="fa fa-file-o" style="margin:5px;"></i>
                ${page.get('name') || page.id}
                ${isSelected(page) || page.get('internal') ? '' : `<span class="page-close" data-key="${page.id || page.get('name')}">&Cross;</span>`}
                ${page.get('internal') ? '' : `<span class="page-edit" data-key="${page.id || page.get('name')}"><i class="fa fa-pencil"></i></span>`}
            </div>`).join("\n");
    }

    renderProject() {
        if (localStorage.getItem("projectName") != null) {
            return `
            <span class="project-text"><i class="fa fa-folder-o" style="margin:5px;"></i>${localStorage.getItem("projectName")}</span>
            `
        } else {
            return 'No project yet'
        }
        // console.log(localStorage.getItem('projectName'))
        // return localStorage.getItem('projectName');
        // return this.state.projectName
    }

    update() {
        this.$el?.find('.pages').html(this.renderPagesList());
        this.$el?.find('.project').html(this.renderProject());
        this.$el?.find('.page').on('click', this.selectPage);
        this.$el?.find('.page-edit').on('click', this.openEdit);
        this.$el?.find('.page-close').on('click', this.removePage);
    }

    render() {
        const { $, editor } = this;

        // Do stuff on render
        this.onRender();
        this.$el?.remove();

        const cont = $(`<div style="display: ${this.state.isShowing ? 'flex' : 'none'};" class="pages-wrp">
                <div  class="flex-row">
                <input 
                    class="tm-input bm" 
                    id="textfield1"
                    type="text" 
                    placeholder="Webpage Title" 
                />
                </div>
                <div class="add-title">
                    Change Webpage Title
                </div>
                <div class="pages">
                    ${this.renderPagesList()}
                </div>
                <div  class="flex-row">
                    <input 
                        class="tm-input sm" 
                        id="textfield2"
                        type="text" 
                        placeholder="${editor.I18n.t('peppu-sidebar.pages.placeholder')}" 
                    />
                </div>
                <div class="add-page">
                    ${editor.I18n.t('peppu-sidebar.pages.new')}
                </div>
                <div class="template add-template">
                    Convert to Template
                </div>
                <div class="add-project">
                    ${editor.I18n.t('peppu-sidebar.project.publish')}
                </div>
                <div class="products add-template">
                    ${editor.I18n.t('peppu-sidebar.product.new')}
                </div>
                <div class="project">
                    ${this.renderProject()}
                </div>
            </div>`);
        cont.find('.add-page').on('click', this.addPage);
        cont.find('.add-project').on('click', this.addProject);
        cont.find('.template').on('click', this.templatePublish);
        cont.find('.products').on('click', this.addProduct);
        cont.find('.sm').on('change', this.handleNameInput);
        cont.find('.add-title').on('click', this.addTitle);
        cont.find('.bm').on('change', this.handleTitle);

        // cont.find('.load-project').on('change', this.readText);

        this.$el = cont;
        return cont;
    }

    get findPanel() {
        return this.editor.Panels.getPanel('views-container');
    }

    showPanel() {
        this.state.isShowing = true;
        this.findPanel?.set('appendContent', this.render()).trigger('change:appendContent');
        this.update();
    }

    hidePanel() {
        this.state.isShowing = false;
        this.render();
    }

    saveChanges() {
        return this.pm.getSelected().id;
    }
}
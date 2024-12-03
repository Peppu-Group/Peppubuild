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
        this.readText = this.readText.bind(this)

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
        return new Promise((resolve, reject) => {
            const pages = JSON.parse(localStorage.getItem('gjsProject'))
            let editor = grapesjs.init({
                headless: true,
                pageManager: {
                    pages: pages.pages
                },
                plugins: [peppu_blocks, grapesjs_blocks_basic, grapesjs_plugin_forms],

            });

            function getCss() {
                let css = ''
                for (const style of pages.styles) {
                    if (style.selectorsAdd) {
                        const cssRule = editor.Css.setRule(style.selectorsAdd, style.style, {
                            atRuleType: style.atRuleType,
                            atRuleParams: style.mediaText
                        })
                        css += cssRule.toCSS();

                    } else {
                        const cssRule = editor.Css.setRule(style.selectors, style.style, {
                            atRuleType: style.atRuleType,
                            atRuleParams: style.mediaText
                        })
                        css += cssRule.toCSS();
                    }
                }
                return css
            }

            // let cssstreams = Readable.from(getCss())
            // await client.uploadFrom(cssstreams, `style.css`);
            zip.file("style.css", cssbeautify(getCss()));

            let indexhtml = `
                <!DOCTYPE html>
                <html>

                <head>
                    <title>${localStorage.getItem("projectTitle") ?? 'Peppubuild - Project'}</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css" rel="stylesheet">
                    <link href="./style.css" rel="stylesheet">
                    <!-- VueJS development version -->
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.12/vue.min.js"></script>
                    <!-- Vue Router -->
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.0.0/vue-router.min.js"></script>
                </head>
                <body>
                <div id="app">
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

        Swal.fire({
            title: "How would you like to publish your work?",
            icon: "info",
            showDenyButton: true,
            denyButtonColor: "#3085d6",
            denyButtonText: "Publish on Netlify",
            confirmButtonText: "Download Artifacts",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            swal("Publishing, please wait...", "We're publishing and updating your work, please wait", "info")
            if (result.isConfirmed) {
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
                                            console.log(response)
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
        try {
            fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/save/${id}`, {
                method: "PUT", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessToken: accessToken, gjsProject: gjsProject, title: title, published: published }),
            }).then((response) => {
                if (response.ok) {
                    swal("Successful!", "Saved Project", "success");
                } else {
                    swal("Error", "You're not logged in", "error").then(() => {
                        window.location.href = 'https://app.peppubuild.com/dashboard/projects'; 
                    })
                }
            })
        } catch { swal("Error", "You're not logged in", "error").then(() => {
            window.location.href = 'https://app.peppubuild.com/dashboard/projects'; 
        }) }
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
                <div class="add-project">
                    ${editor.I18n.t('peppu-sidebar.project.publish')}
                </div>
                <div class="project">
                    ${this.renderProject()}
                </div>
            </div>`);
        cont.find('.add-page').on('click', this.addPage);
        cont.find('.add-project').on('click', this.addProject);
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
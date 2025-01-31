import UI from '../utils/ui';

export default class ProductApp extends UI {
    constructor(editor, opts = {}) {
        super(editor, opts);
        this.handleSave = this.handleSave.bind(this);
        this.handleThumbnail = this.handleThumbnail.bind(this);
        this.handleThumbnailInput = this.handleThumbnailInput.bind(this);

        /* Set initial app state */
        this.state = {
            tab: 'page',
            loading: false
        };
    }

    setTab(tab) {
        this.state.tab = tab;
    }

    update() {
        const { $el } = this;
        $el?.find('#settings').html(this.renderSettings());
        $el?.find('#settings').html(this.renderSettings());
        $el?.find('#generate').on('click', this.handleThumbnail);
        $el?.find('input#thumbnail').on('change', this.handleThumbnailInput);
    }

    onRender() {
        const { setState } = this;
        setState({
            loading: true
        });
        //? Setup code here 
        setState({
            loading: false
        });
    }

    renameProject(fileName, newName) {
        let data = fetch(`${editor.I18n.t('peppu-sidebar.project.url')}/prename/${fileName}/${newName}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
        })
        return data;
    }

    handleSave() {
        const form = document.getElementById('productForm');

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Access the target of the event, which is the form
            const formData = new FormData(e.target); // Get all form data

            var image = formData.get('file');

            let oauth = localStorage.getItem('oauth')
            const url = `https://photodrive.peppubuild.com/uploadfile/${oauth}`;

            formData.forEach(async (value, key) => {
                if (value == null) {
                    Swal.fire({
                        title: "Error During Upload!",
                        text: "One or more information are missing, upload did not complete.",
                        icon: "error"
                    })
                } else {
                    // send image to drive.
                    await fetch(url, {
                        method: 'POST',
                        body: image
                    }).then((res) => {
                        if (res.ok) {
                            Swal.fire({
                                title: "Successful Upload!",
                                text: "We've uploaded your product successfully.",
                                icon: "success"
                            })
                        }
                    })
                    // save in local storage
                    let products = JSON.parse(localStorage.getItem(products));
                    products.push(`${key}: ${value}`)
                    localStorage.setItem('products', products);
                } // run save and show success
            });
            // send image using photodrive.
            // reset form on submit.
            // send success or fail message, using try catch
        })
    }

    handleThumbnail() {
        const { editor } = this;
        const mdl = editor.Modal;
        mdl.setTitle('Project Manager');
        mdl.setContent(this.renderProducts());
    }

    renderProducts() {
        return `<div class="app">
        <div class="contents">
            <div class="site-wrapper-header">
                <div
                    class="site-screenshot-header header"
                    data-sort="id"
                >
                    Product Info
                </div>
                <div
                    class="site-info header"
                    data-sort="id"
                ></div>
                <div
                    class="site-update-time header"
                    data-sort="updated_at"
                >
                    Category
                </div>
                <div
                    class="site-actions header"
                    data-sort="id"
                >
                    Actions
                </div>
            </div>
            <div id="site-list">
                ${this.renderProductsInfo()}
            </div>
        </div>
    </div>`
    }

    renderProductsInfo() {
        // get products from product state and render with forEach loop
        return `
    <div 
        class="site-wrapper" 
        title="sites">
        <div class="site-screenshot">
            <img src="https://www.peppubuild.com/logo.png" alt="" />
        </div>
        <div class="site-info">
            <h2>
                Product Name
            </h2>
            <div class="site-meta">
                Product
            </div>
        </div>
        <div class="site-update-time">
            My category
        </div>
        <div class="site-actions">
            <i class="caret-icon fa fa-pencil edit" title="edit"></i>
            <i class="caret-icon fa fa-trash-o delete" title="delete"></i>
            <button>Add product to editor</button>
        </div>
    </div> 
    </div>   
        `
    }

    handleThumbnailInput(e) {
        this.$el?.find('img').attr('src', e.target.value.trim());
    }

    renderSettings() {
        const { tab, loading } = this.state;
        const { opts, pfx, pm, editor } = this;

        if (loading) return opts.loader || '<div>Loading settings...</div>';

        const page = pm.get(editor.PagesApp.editableId);
        const value = page?.get('name') || page?.id || '';
        return `<label for="name">
                    ${editor.I18n.t('peppu-sidebar.settings.labels.name')}
                </label>
                <div class="flex-row">
                    <input 
                        class="name tm-input" 
                        value="${value}" 
                        placeholder="${editor.I18n.t('peppu-sidebar.settings.placeholders.name')}"/>
                </div>`
    }

    render() {
        const { $, editor } = this;

        // Do stuff on render
        this.onRender();
        this.$el?.remove();

        const cont = $(`<div class="app">
            <button id='vwproducts' class='add-template'> View Products</button>
            <div class="formbold-main-wrapper">
                <!-- Author: FormBold Team -->
                <!-- Learn More: https://formbold.com -->
                <div class="formbold-form-wrapper">
                    <form id='productForm'>
                            <div class="formbold-mb-5">
                                <label for="description" class="formbold-form-label">
                                    Product Description
                                </label>
                                <input type="text" name="description" id="description" placeholder="Enter your product's description"
                                    class="formbold-form-input" />
                            </div>

                            <div class="formbold-mb-5">
                                <label for="name" class="formbold-form-label">
                                    Product Name
                                </label>
                                <input type="text" name="name" id="name" placeholder="Enter your product's name"
                                    class="formbold-form-input" />
                            </div>

                            <div class="formbold-mb-5">
                                <label for="category" class="formbold-form-label">
                                    Product Category
                                </label>
                                <input type="text" name="category" id="category" placeholder="Enter your product's category"
                                    class="formbold-form-input" />
                            </div>

                            <div class="mb-6 pt-4">
                                <label class="formbold-form-label formbold-form-label-2">
                                    Upload Product Image
                                </label>

                                <div class="formbold-mb-5 formbold-file-input">
                                    <input type="file" name="file" id="file" />
                                    <label for="file">
                                        <div>
                                            <span class="formbold-drop-file"> Drop files here </span>
                                            <span class="formbold-or"> Or </span>
                                            <span class="formbold-browse"> Browse </span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        <div class="flex-row">
                            <button id="save" class="formbold-btn w-full" >
                                Upload File
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
                
            </div>`);
        cont.find('#save').on('click', this.handleSave);
        cont.find('#vwproducts').on('click', this.handleThumbnail);
        cont.find('input#thumbnail').on('change', this.handleThumbnailInput);

        this.$el = cont;
        return cont;
    }
}
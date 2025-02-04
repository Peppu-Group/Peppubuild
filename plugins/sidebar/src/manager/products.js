import UI from '../utils/ui';
import Swal from 'sweetalert2';

export default class ProductApp extends UI {
    constructor(editor, opts = {}) {
        super(editor, opts);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleThumbnail = this.handleThumbnail.bind(this);
        this.productEditor = this.productEditor.bind(this);

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

        // Add new event listener with delete delegation
        $el?.find('#site-list').on('click', '.delete', (e) => this.handleDelete(e));

        // Add new event listener to add product to editor
        $el?.find('#site-list').on('click', '.add-editor', (e) => this.productEditor(e));
    }

    onRender() {
        const { setState, $el, model } = this;
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

    handleDelete(e) {
        const productIndex = e.target.getAttribute('data-id'); 
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(productIndex, 1);
        localStorage.setItem('products', JSON.stringify(products));

        // Re-attach event handlers after updating content
        this.update();
    }

    productEditor(e) {
        const { editor } = this;
        const productIndex = e.target.getAttribute('data-id');
        editor.addComponents({
            type: 'collection',
            productIndex: productIndex // Render only the product at index 2
        })
        this.update()
    }

    handleSave() {
        Swal.showLoading();
        const form = document.getElementById('productForm');

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            let hasEmptyField = false;
            // Access the target of the event, which is the form
            const formData = new FormData(e.target); // Get all form data

            var image = formData.get('file');

            let oauth = 'ya29.a0AXeO80Se5TG6MyJ9uOrhEGeKAxuhAl9CXJC4C7Zfk5CpfXYbvIZKGN5B_qiOVj2MpoYPoKk_lXOD7JyBgOrtzpK7cXeSoHDTvWqa9ZUBV7sT_nUaEkWjEHs70cXEpVUNF29mvHeaua1lWyz6jrirc-cPbs_9iRcEzuB2afeWSlcaCgYKAVsSARESFQHGX2Mi-47-KAlILGfc71150h6Okw0178'
            const url = `http://localhost:1423/uploadfile/${oauth}`;

            formData.forEach(async (value, key) => {
                if (value === '' || (value && value.name === '')) {
                    hasEmptyField = true; // Mark that there's an empty field
                }
            });
            const imgdata = new FormData();
            imgdata.append('file', image)
            if (hasEmptyField) {
                Swal.fire({
                    title: "Error During Upload!",
                    text: "One or more information are missing, upload did not complete.",
                    icon: "error"
                })
            } else {
                // send image using photodrive.
                try {
                    await fetch(url, {
                        signal: AbortSignal.timeout(10000),
                        method: 'POST',
                        body: imgdata
                    }).then((res) => {
                        if (res.ok) {
                            res.json().then((res) => {
                                // save in local storage
                                let products = JSON.parse(localStorage.getItem('products')) || [];
                                const name = formData.get('name');
                                const description = formData.get('description');
                                const category = formData.get('category');
                                // const file = formData.get('file');
                                let newProduct = { name: name, description: description, category: category, file: res.id };
                                products.push(newProduct)
                                localStorage.setItem('products', JSON.stringify(products));
                            })
                            Swal.fire({
                                title: "Successful Upload!",
                                text: "We've uploaded your product successfully.",
                                icon: "success"
                            }).then(() => {
                                // reset form on submit.
                                document.getElementById("productForm").reset();
                            })
                        } else {
                            Swal.fire({
                                title: "Error During Upload!",
                                text: "We've encountered an error while uploading your product",
                                icon: "error"
                            })
                        }
                    })
                } catch {
                    Swal.fire({
                        title: "Error During Upload!",
                        text: "We've encountered an error while uploading your product",
                        icon: "error"
                    })
                }
            }
        })
    }

    handleThumbnail() {
        this.$el?.find('#vwproducts').html(this.renderProducts());
        const element = document.getElementById("productForm");
        if (element) {
            element.remove();
        }
    }

    renderProducts() {
        const content = `<div class="table">
        <div class="contents" id="renderproducts">
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
            <div id="site-list" class="productlist">
                ${this.renderProductsInfo()}
            </div>
        </div>
    </div>`;

        // Call update after rendering products
        setTimeout(() => this.update(), 0);

        return content;
    }

    renderProductsInfo() {
        // get products from product state and render with forEach loop
        let productslocal = JSON.parse(localStorage.getItem('products'));
        if (!productslocal || productslocal.length == 0) {
            return `<h2>You have no product to display, add some first</h2>`
        }

        return productslocal.map((product, i) => `
        <div>
            <div key="${i}" class="site-wrapper" title="products">
                <div class="site-screenshot">
                    <img src="https://drive.google.com/thumbnail?id=${product.file}&sz=w1000" alt="" />
                </div>
                <div class="site-info">
                    <h2>
                        ${product.name}
                    </h2>
                    <div class="site-meta">
                        ${product.description}
                    </div>
                </div>
                <div class="site-update-time">
                        ${product.category}
                </div>
                <div class="site-actions">
                    <i class="caret-icon fa fa-pencil edit" title="edit"></i>
                    <i class="caret-icon fa fa-trash-o delete" title="delete" data-id="${i}"></i>
                    <button class='add-editor' data-id="${i}">Add product to editor</button>
                </div>
            </div>
        </div>  
        `).join("");
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
                                    <label for="file">
                                        <div>
                                        <input type="file" name="file" id="file" class="formbold-drop-file"/>
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

        this.$el = cont;
        return cont;
    }
}
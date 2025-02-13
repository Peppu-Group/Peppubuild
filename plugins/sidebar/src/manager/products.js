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

        // Add new event listener with edit delegation
        $el?.find('#site-list').on('click', '.edit', (e) => this.handleEdit(e));

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
        if (this.opts.confirmDeleteProject()) {
            const productIndex = e.target.getAttribute('data-id');
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.splice(productIndex, 1);
            localStorage.setItem('products', JSON.stringify(products));

            // Re-attach event handlers after updating content
            this.update();
        }
    }
    handleEdit(e) {
        const productIndex = e.target.getAttribute('data-id');
        let products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products[productIndex];

        // Show a SweetAlert2 modal with a form to edit the product (without file input)
        Swal.fire({
            title: 'Edit Product',
            html: `
                <h6>You can't edit your product's image (photo), delete the product instead</h6>
                <input id="edit-name" class="swal2-input" value="${product.name}" placeholder="Product Name">
                <input id="edit-description" class="swal2-input" value="${product.description}" placeholder="Product Description">
                <input id="edit-category" class="swal2-input" value="${product.category}" placeholder="Product Category">
                <input id="edit-price" class="swal2-input" value="${product.price}" placeholder="Product Price">
            `,
            showCancelButton: true,
            confirmButtonText: 'Save',
            preConfirm: () => {
                return {
                    updatedName: document.getElementById('edit-name').value,
                    updatedDescription: document.getElementById('edit-description').value,
                    updatedCategory: document.getElementById('edit-category').value,
                    updatedPrice: document.getElementById('edit-price').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { updatedName, updatedDescription, updatedCategory, updatedPrice } = result.value;

                // Update product details
                products[productIndex].name = updatedName;
                products[productIndex].description = updatedDescription;
                products[productIndex].category = updatedCategory;
                products[productIndex].price = updatedPrice;

                // Save updated products to local storage
                localStorage.setItem('products', JSON.stringify(products));

                // Force immediate UI update
                this.$el.find(`#site-list`).html(this.renderProductsInfo());
                this.update(); // Ensure event handlers remain attached
            }
        });
    }

    productEditor(e) {
        const { editor } = this;
        const productIndex = e.target.getAttribute('data-id');
        editor.addComponents({
            type: 'collection',
            productIndex: productIndex // Render only the product at index
        })
        Swal.fire('Added to Editor',
            `Your product has successfully been added to the bottom of the editor, you can drag it to any location of 
        your choice. The default property added is the name, you can duplicate it and change to image, description,  
        or price, using the properties tab`,
            'success');
        this.update()
    }

    handleSave() {
        ///// Products won't save until added to editor. Trigger save now, on each product add.
        Swal.showLoading();
        const form = document.getElementById('productForm');

        // Remove any previous event listeners before adding a new one
        form.removeEventListener('submit', this.submitHandler);

        // Define and store the event handler to avoid duplicate bindings
        this.submitHandler = async (e) => {
            e.preventDefault();
            let hasEmptyField = false;
            const formData = new FormData(e.target);
            var image = formData.get('file');
            let oauth = localStorage.getItem('oauth');
            const url = `https://photodrive.peppubuild.com/uploadfile/${oauth}`;

            formData.forEach((value) => {
                if (value === '' || (value && value.name === '')) {
                    hasEmptyField = true;
                }
            });

            const imgdata = new FormData();
            imgdata.append('file', image);

            if (hasEmptyField) {
                Swal.fire({
                    title: "Error During Upload!",
                    text: "One or more fields are empty. Upload did not complete.",
                    icon: "error"
                });
                return;
            }

            try {
                const res = await fetch(url, {
                    signal: AbortSignal.timeout(10000),
                    method: 'POST',
                    body: imgdata
                });

                if (res.ok) {
                    const responseData = await res.json();
                    let products = JSON.parse(localStorage.getItem('products')) || [];
                    const name = formData.get('name');
                    const description = formData.get('description');
                    const category = formData.get('category');
                    const price = formData.get('price');

                    let newProduct = {
                        name,
                        description,
                        category,
                        file: responseData.id,
                        price
                    };

                    products.push(newProduct);
                    localStorage.setItem('products', JSON.stringify(products));

                    Swal.fire({
                        title: "Successful Upload!",
                        text: `We've uploaded your product successfully. 
                               Now, click on the 'view products' button to add to the editor.`,
                        icon: "success"
                    }).then(() => {
                        form.reset(); // ✅ Ensure the form resets properly
                    });

                } else {
                    Swal.fire({
                        title: "Error During Upload!",
                        text: "We've encountered an error while uploading your product",
                        icon: "error"
                    });
                }
            } catch {
                Swal.fire({
                    title: "Error During Upload!",
                    text: "We've encountered an error while uploading your product",
                    icon: "error"
                });
            }
        };

        // Attach the event listener correctly without duplication
        form.addEventListener('submit', this.submitHandler);
    }

    handleThumbnail() {
        this.$el?.find('#vwproducts').html(this.renderProducts());
        const element = document.getElementById("productForm");
        if (element) {
            element.remove();
        }
    }

    renderProducts() {
        const content = `<div class="table-container">
        <div class="table">
        <div class="contents" id="renderproducts">
            <div class="site-wrapper-header">
                <div
                    class="site-screenshot-header header"
                    data-sort="id"
                >
                    Image
                </div>
                <div
                    class="site-info header"
                    data-sort="id"
                >
                Product Info
                </div>
                <div
                    class="site-price header"
                    data-sort="id"
                >
                Price
                </div>
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
                <div class="site-price">
                    ${product.price}
                </div>
                <div class="site-update-time">
                    ${product.category}
                </div>
                <div class="site-actions">
                    <h2>
                    <i class="caret-icon fa fa-pencil edit" title="edit" data-id="${i}"></i>
                    <i class="caret-icon fa fa-trash-o delete" title="delete" data-id="${i}"></i>
                    </h2>
                    <div class="site-meta">
                        <button class='add-editor' data-id="${i}">Add product to editor</button>
                    </div>
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
                                <label for="name" class="formbold-form-label">
                                    Product Name
                                </label>
                                <input type="text" name="name" id="name" placeholder="Enter your product's name"
                                    class="formbold-form-input" />
                            </div>

                            <div class="formbold-mb-5">
                                <label for="description" class="formbold-form-label">
                                    Product Description
                                </label>
                                <input type="text" name="description" id="description" placeholder="Enter your product's description"
                                    class="formbold-form-input" />
                            </div>

                            <div class="formbold-mb-5">
                                <label for="price" class="formbold-form-label">
                                    Product Price
                                </label>
                                <input type="number" name="price" id="description" placeholder="Enter your product's price"
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
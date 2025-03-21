import UI from '../utils/ui';
import Swal from 'sweetalert2';

export default class ProductApp extends UI {
    constructor(editor, opts = {}) {
        super(editor, opts);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleThumbnail = this.handleThumbnail.bind(this);
        this.handleCSV = this.handleCSV.bind(this);
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
        const productContainer = editor.getWrapper().find('.product-grid')[0]; // Select the target div

        /* 
        editor.addComponents({
            type: 'collection',
            productIndex: productIndex // Render only the product at index
        })
        */
        Swal.fire({
            title: "Individual or Group Import",
            text: "Will you like to import only this product or everything in the category?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Single Product",
            cancelButtonText: "All Categories",
            reverseButtons: true // Swaps position of confirm and cancel buttons
        }).then((result) => {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const selectedProduct = products[productIndex];

            const category = selectedProduct.category;
            const filteredProducts = products.filter(product => product.category === category);

            if (result.isConfirmed) {
                if (productContainer) {
                    const wrapper = editor.Components.addComponent({
                        tagName: 'div',
                        classes: ['product']
                    });

                    // Append the product inside the wrapper
                    wrapper.append({
                        type: 'collection',
                        productIndex: productIndex, // Render only the product at index
                    });

                    // Finally, append the wrapper to the editor
                    productContainer.append(wrapper);
                } else {
                    Swal.fire("Error", "Cannot find a product section in your current page", "error");
                }

                Swal.fire("Added to your product section!", "Single Product Added", "success");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (productContainer) {
                    filteredProducts.forEach((product, index) => {
                        const wrapper = editor.Components.addComponent({
                            tagName: 'div',
                            classes: ['product']
                        });

                        wrapper.append({
                            type: 'collection',
                            productIndex: index // Assign one product per collection
                        });

                        productContainer.append(wrapper);
                    });
                    Swal.fire("Added to your product section!", "Multiple Products Added", "success");
                } else {
                    Swal.fire("Error", "Cannot find a product section in your current page", "error");
                }
            }
        });

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
                    signal: AbortSignal.timeout(300000),
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

    handleCSV() {
        document.getElementById('fileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
        
            if (!file) {
                console.log("No file selected");
                return;
            }
        
            const reader = new FileReader();
        
            reader.onload = function(e) {
                const content = e.target.result;
                console.log("Raw CSV Content:", content); // Debugging
        
                // Split CSV into rows and remove empty lines
                const rows = content.trim().split("\n").filter(row => row.trim() !== "");
        
                // Extract headers (first row)
                const headers = rows[0].split(",").map(h => h.trim());
                console.log("Headers:", headers); // Debugging
        
                // Extract data rows and map to objects
                const products = rows.slice(1).map(row => {
                    const values = row.split(",").map(value => value.trim());
                    return headers.reduce((obj, key, index) => {
                        obj[key] = values[index] || ""; // Assign values to corresponding keys
                        return obj;
                    }, {});
                });
        
                console.log("Parsed Products:", products); // Debugging
        
                // Retrieve existing products from localStorage
                let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        
                // Add new products from CSV
                storedProducts = storedProducts.concat(products);
        
                // Store updated products in localStorage
                localStorage.setItem("products", JSON.stringify(storedProducts));
        
                console.log("Updated LocalStorage:", localStorage.getItem("products"));
        
                // Display success message
                document.getElementById("output").innerHTML = "<strong>Products added successfully!</strong>";
            };
        
            reader.onerror = function() {
                console.error("Error reading file");
            };
        
            reader.readAsText(file);
        });
        
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
                    <h4>
                        ${product.name}
                    </h4>
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

            <label for="fileInput" class="custom-button"> Upload Products via CSV </label>
            <input type="file" id="fileInput" accept=".csv" />

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
        cont.find('#fileInput').on('click', this.handleCSV);

        this.$el = cont;
        return cont;
    }
}
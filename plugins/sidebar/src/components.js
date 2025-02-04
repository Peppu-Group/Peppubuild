export default (editor, opts = {}) => {
    const domc = editor.DomComponents;

    // Add the custom component
    domc.addType('collection', {
        model: {
            defaults: {
                category: 'SET-1',
                productIndex: 0 // Default value if not provided
            },
            // Customize the export HTML
            toHTML() {
                const category = this.get('category');
                return `<div class="product-container">{ VAR-TO-REPLACE-${category} }</div>`;
            }
        },
        view: {
            onRender() {
                const { $el, model } = this;
                const category = model.get('category');
                const productIndex = model.get('productIndex'); // Get specific product index
                $el.empty();
                // eg. you can make some ajax request and then...

                // Get products from localStorage
                const products = JSON.parse(localStorage.getItem('products')) || [];

                // Get the specific product
                const product = products[productIndex];

                // Generate Bootstrap card for the specific product
                const cardHtml = `
                <div class="card m-2" style="width: 18rem;">
                    <img src="https://drive.google.com/thumbnail?id=${product.file}&sz=w1000" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <button class="btn btn-primary" data-index="${productIndex}">View Product</button>
                    </div>
                </div>
                `;

                $el.append(cardHtml); // Append only the specific product card
            }
        }
    });
}
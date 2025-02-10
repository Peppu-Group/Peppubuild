export default (editor, opts = {}) => {
    const domc = editor.DomComponents;

    domc.addType('collection', {
        model: {
            defaults: {
                category: 'SET-1',  
                productIndex: 0,    
                attributeType: 'name',
                traits: [
                    {
                        type: 'text',
                        label: 'Category',
                        name: 'category',
                        changeProp: true
                    },
                    {
                        type: 'select',
                        label: 'Attribute',
                        name: 'attributeType',
                        options: [
                            { value: 'name', name: 'Product Name' },
                            { value: 'price', name: 'Price' },
                            { value: 'description', name: 'Description' },
                            { value: 'image', name: 'Image' }
                        ],
                        changeProp: true
                    },
                    {
                        type: 'number',
                        label: 'Product Index',
                        name: 'productIndex',
                        min: 0,
                        changeProp: true
                    }
                ]
            },
            toHTML() {
                const category = this.get('category');
                const productIndex = this.get('productIndex');
                const attributeType = this.get('attributeType');
    
                // Get products from localStorage
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const product = products[productIndex];
    
                if (!product) {
                    return `<p>Product not found in ${category}</p>`;
                }
    
                // Return the actual value in the exported HTML
                switch (attributeType) {
                    case 'name':
                        return `<h5>${product.name}</h5>`;
                    case 'price':
                        return `<p>$${product.price}</p>`;
                    case 'description':
                        return `<p>${product.description}</p>`;
                    case 'image':
                        return `<img src="https://drive.google.com/thumbnail?id=${product.file}&sz=w1000" alt="${product.name}" style="width:100%;" />`;
                    default:
                        return `<p>Invalid Attribute</p>`;
                }
            }
        },
        view: {
            init() {
                this.listenTo(this.model, 'change:attributeType change:productIndex change:category', this.updateContent);
            },
            onRender() {
                this.updateContent();
            },
            updateContent() {
                const { model, $el } = this;
                const category = model.get('category');
                const attributeType = model.get('attributeType');
                const productIndex = model.get('productIndex');
    
                // Get products from localStorage
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const product = products[productIndex];
    
                if (!product) {
                    $el.html(`<p>Product not found in ${category}</p>`);
                    return;
                }
    
                // Display the selected attribute
                let content = '';
                switch (attributeType) {
                    case 'name':
                        content = `<h5>${product.name}</h5>`;
                        break;
                    case 'price':
                        content = `<p>$${product.price}</p>`;
                        break;
                    case 'description':
                        content = `<p>${product.description}</p>`;
                        break;
                    case 'image':
                        content = `<img src="https://drive.google.com/thumbnail?id=${product.file}&sz=w1000" alt="${product.name}" style="width:100%;" />`;
                        break;
                    default:
                        content = `<p>Invalid Attribute</p>`;
                        break;
                }
    
                $el.html(content);
            }
        }
    });
}
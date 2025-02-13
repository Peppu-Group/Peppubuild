export default (editor, opts = {}) => {
    const domc = editor.DomComponents;

    const currencySymbols = {
        USD: '$',  // US Dollar
        EUR: '€',  // Euro
        NGN: '₦',  // Nigerian Naira
        GBP: '£',  // British Pound
        INR: '₹',  // Indian Rupee
        JPY: '¥',  // Japanese Yen
        AUD: 'A$', // Australian Dollar
        CAD: 'C$', // Canadian Dollar
    };

    domc.addType('collection', {
        model: {
            defaults: {
                attributeType: 'name',
                currency: 'USD', // Default currency
                traits: [
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
                        type: 'select',
                        label: 'Currency',
                        name: 'currency',
                        options: Object.keys(currencySymbols).map(code => ({
                            value: code,
                            name: `${currencySymbols[code]} (${code})`
                        })),
                        changeProp: true
                    }
                ]
            },
            toHTML() {
                const attributeType = this.get('attributeType');
                const currency = this.get('currency') || 'USD';
                const productIndex = this.get('productIndex');
                const symbol = currencySymbols[currency] || '$';

                // Get products from localStorage
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const product = products[productIndex]; // Default to first product

                if (!product) {
                    return `<p>Product not found</p>`;
                }

                switch (attributeType) {
                    case 'name':
                        return `<h5>${product.name}</h5>`;
                    case 'price':
                        return `<p>${symbol} ${product.price}</p>`;
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
                this.listenTo(this.model, 'change:attributeType change:currency', this.updateContent);
            },
            onRender() {
                this.updateContent();
            },
            updateContent() {
                const { model, $el } = this;
                const attributeType = model.get('attributeType');
                const currency = model.get('currency') || 'USD';
                const productIndex = model.get('productIndex');
                const symbol = currencySymbols[currency] || '$';

                // Get products from localStorage
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const product = products[productIndex]; // Default to first product

                if (!product) {
                    $el.html(`<p>Product not found</p>`);
                    return;
                }

                let content = '';
                switch (attributeType) {
                    case 'name':
                        content = `<h5>${product.name}</h5>`;
                        break;
                    case 'price':
                        content = `<p>${symbol} ${product.price}</p>`;
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

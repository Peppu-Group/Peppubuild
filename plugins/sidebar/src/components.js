export default (editor, opts = {}) => {
    const domc = editor.DomComponents;

    // Add the custom component
    domc.addType('collection', {
        model: {
            defaults: {
                category: 'SET-1',
            },
            // create card, to attach components
            // Customize the export HTML
            toHTML() {
                const category = this.get('category');
                return `<div>{ VAR-TO-REPLACE-${category} }</div>`
            }
        },
        view: {
            onRender() {
                const { $el, model } = this;
                const category = model.get('category');
                $el.empty();
                // eg. you can make some ajax request and then...
                const products = JSON.parse(localStorage.getItem('products')) || [];
                products.forEach(product => {
                    // If you append to the element, products will be static
                    // and you won't be able to select/edit them.
                    // So this approach is to use when you want kind 
                    // of placeholders elements.
                    $el.append(product);

                    // If actually need to select/edit them, append the HTML
                    // to the model
                    // model.append(product);
                });
            }
        }
    });
}
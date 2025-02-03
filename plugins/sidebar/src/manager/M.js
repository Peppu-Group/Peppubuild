const editor = grapesjs.init({
	container: '#gjs',
  fromElement: 1,
  height: '100%',
  storageManager: { type: 0 },
  plugins: ['gjs-blocks-basic']
});

// Add blocks
editor.BlockManager.add('collection-1', {
	label: 'Collection 1',
  content: { type: 'collection', category: 'SET-1' },
});
editor.BlockManager.add('collection-2', {
	label: 'Collection 2',
  content: { type: 'collection', category: 'SET-2' },
});

// Add the custom component
editor.DomComponents.addType('collection', {
	model: {
  	defaults: {
    	category: 'SET-1',
    },
    // Customize the export HTML
    toHTML() {
    	const category = this.get('category');
    	return `<div>{ VAR-TO-REPLACE-${category} }</div>`
    },
  },
  view: {
  	onRender() {
     	const { $el, model } = this;
      const category = model.get('category');
			$el.empty();
    	// eg. you can make some ajax request and then...
      const products = [ 
      	'<div>Product 1</div>',
        '<div>Product 2</div>',
        '<div>Product 4</div>',
       ];
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
})
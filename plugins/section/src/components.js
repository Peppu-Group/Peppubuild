export default (editor, opts = {}) => {
  const domc = editor.DomComponents;

  domc.addType('NAVBAR', {
    model: {
      defaults: {
        tagName: 'nav',
        attributes: { class: 'navbar navbar-expand-lg fixed-top navbar-light' },
        components: [
          {
            tagName: 'div',
            attributes: { class: 'container-fluid' },
            components: [{
              type: 'link',
              attributes: { class: 'navbar-brand' },
              content: 'Navbar'
            }, {
              type: 'button',
              attributes: { class: 'navbar-toggler', type: 'button', 'data-bs-toggle': '#navbarSupportedContent', 'aria-controls': 'navbarSupportedContent', 'aria-expanded': 'false', 'aria-label': 'Toggle navigation' },
              components: [{
                tagName: 'span',
                attributes: { class: 'navbar-toggler-icon' },
              }]
            },
            {
              tagName: 'div',
              attributes: { class: 'collapse navbar-collapse', id: 'navbarSupportedContent' },
              components: [{
                tagName: 'ul',
                attributes: { class: 'navbar-nav me-auto mb-2 mb-lg-0' },
                components: [{
                  tagName: 'li',
                  attributes: { class: 'nav-item' },

                }]
              }]
            }
            ],
          }
        ]
      }
    }
  })
};

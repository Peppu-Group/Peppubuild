export default (editor, opts = {}) => {
  const domc = editor.DomComponents;

  // accordion
  domc.addType('B-ACCORDION', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { id: 'accordionExample', class: 'container col-xxl-8 px-4 py-5 accordion' },
        components: [
          {
            tagName: 'h2',
            type: 'text',
            attributes: { class: 'pb-2 border-bottom' },
            components: [{
              type: 'textnode',
              content: 'Accordion'
            }]
          },
          {
            tagName: 'div',
            attributes: { class: 'accordion-item' },
            components: [
              {
                tagName: 'h2',
                type: 'text',
                attributes: { class: 'accordion-header', id: 'headingOne' },
                components: [{
                  tagName: 'button',
                  attributes: { class: 'accordion-button', type: 'button', 'data-bs-toggle': "collapse", 'data-bs-target': "#collapseOne", 'aria-expanded': "true", 'aria-controls': "collapseOne" },
                  components: [{
                    type: 'textnode',
                    content: 'Accordion Item #1'
                  }]
                }]
              },
              {
                tagName: 'div',
                attributes: { class: 'accordion-collapse collapse show', id: 'collapseOne', 'aria-labelledby': "headingOne", 'data-bs-parent': "#accordionExample" },
                components: [
                  {
                    tagName: 'div',
                    type: 'text',
                    attributes: { class: 'accordion-body' },
                    components: [
                      {
                        tagName: 'strong',
                        components: [{
                          type: 'textnode',
                          content: `This is the first item's accordion body.`
                        }]
                      },
                      {
                        type: 'textnode',
                        content: `It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the accordion-body, though the transition does limit overflow`
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            tagName: 'div',
            attributes: { class: 'accordion-item' },
            components: [
              {
                tagName: 'h2',
                type: 'text',
                attributes: { class: 'accordion-header', id: 'headingTwo' },
                components: [{
                  tagName: 'button',
                  attributes: { class: 'accordion-button', type: 'button', 'data-bs-toggle': "collapse", 'data-bs-target': "#collapseTwo", 'aria-expanded': "true", 'aria-controls': "collapseTwo" },
                  components: [{
                    type: 'textnode',
                    content: 'Accordion Item #1'
                  }]
                }]
              },
              {
                tagName: 'div',
                attributes: { class: 'accordion-collapse collapse show', id: 'collapseTwo', 'aria-labelledby': "headingTwo", 'data-bs-parent': "#accordionExample" },
                components: [
                  {
                    tagName: 'div',
                    type: 'text',
                    attributes: { class: 'accordion-body' },
                    components: [
                      {
                        tagName: 'strong',
                        components: [{
                          type: 'textnode',
                          content: `This is the second item's accordion body.`
                        }]
                      },
                      {
                        type: 'textnode',
                        content: `It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the accordion-body, though the transition does limit overflow`
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
    },

    view: {

    },
  });

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

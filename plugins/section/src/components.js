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

  domc.addType('B-NAVBAR', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'navbar navbar-expand-lg nav-contain' },
        components: [{
          tagName: 'div',
          attributes: { class: 'container-fluid' },
          components: [
            {
              type: 'link',
              attributes: { class: 'navbar-brand', href: '#' },
              components: [{
                type: 'image',
                attributes: { src: 'https://peppubuild.com/logo.png' },
              }]
            },
            {
              tagName: 'button',
              attributes: { class: 'navbar-toggler', type: 'button', 'data-bs-toggle': "collapse", 'data-bs-target': "#navbarSupportedContent" },
              components: [{
                tagName: 'span',
                attributes: { class: 'navbar-toggler-icon' },
              }]
            },
            {
              tagName: 'div',
              attributes: { class: 'collapse navbar-collapse', id: 'navbarSupportedContent' },
              components: [
                {
                  tagName: 'ul',
                  attributes: { class: 'navbar-nav me-auto mb-2 mb-lg-0' },
                  components: [
                    {
                      tagName: 'li',
                      attributes: { class: 'nav-item' },
                      components: [{
                        type: 'link',
                        attributes: { class: 'nav-link active', 'aria-current': 'page', href: '#' },
                        components: [{
                          type: 'textnode',
                          content: 'Home'
                        }]
                      }]
                    },
                    {
                      tagName: 'li',
                      attributes: { class: 'nav-item' },
                      components: [{
                        type: 'link',
                        attributes: { class: 'nav-link', 'aria-current': 'page', href: '#' },
                        components: [{
                          type: 'textnode',
                          content: 'Link'
                        }]
                      }]
                    },
                    {
                      tagName: 'li',
                      attributes: { class: 'nav-item dropdown' },
                      components: [
                        {
                          type: 'link',
                          attributes: { class: 'nav-link dropdown-toggle', id: 'navbarDropdown', href: '#', role: 'button', 'data-bs-toggle': "dropdown" },
                          components: [{
                            type: 'textnode',
                            content: 'Dropdown'
                          }]
                        },
                        {
                          tagName: 'ul',
                          attributes: { class: 'dropdown-menu', 'aria-labelledby': 'navbarDropdown' },
                          components: [
                            {
                              tagName: 'li',
                              components: [{
                                type: 'link',
                                attributes: { class: 'dropdown-item', href: '#' },
                                components: [{
                                  type: 'textnode',
                                  content: 'Action'
                                }]
                              }]
                            },
                            {
                              tagName: 'li',
                              components: [{
                                type: 'link',
                                attributes: { class: 'dropdown-item', href: '#' },
                                components: [{
                                  type: 'textnode',
                                  content: 'Action'
                                }]
                              }]
                            },
                            {
                              tagName: 'li',
                              components: [{
                                tagName: 'hr',
                                attributes: { class: 'dropdown-divider' },
                              }]
                            },
                            {
                              tagName: 'li',
                              components: [{
                                type: 'link',
                                attributes: { class: 'dropdown-item', href: '#' },
                                components: [{
                                  type: 'textnode',
                                  content: 'Action'
                                }]
                              }]
                            },
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  tagName: 'form',
                  attributes: { class: 'd-flex' },
                  components: [
                    {
                      tagName: 'input',
                      attributes: { class: 'form-control me-2', type: 'search', placeholder: 'Search', 'aria-label': 'Search' }
                    },
                    {
                      type: 'B-BUTTON',
                    }
                  ]
                }
              ]
            }
          ]
        }],
        styles: `
        .container-fluid img {
          width: 50px; 
          height: 25px;
          margin: 0px 15px 0px 25px;
        }
        .nav-contain {
          border-bottom: 1px solid #e3e3e3;
        }
        `
      },
    },

    view: {

    },
  });
  domc.addType('B-SIDEBAR', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'container-fluid' },
        components: [{
          tagName: 'div',
          attributes: { class: 'row flex-nowrap' },
          components: [{
            tagName: 'div',
            attributes: { class: 'col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark' },
            components: [{
              tagName: 'div',
              attributes: { class: 'd-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100' },
              components: [
                {
                type: 'link',
                attributes: { href: '#', class: 'd-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none' },
                components: [{
                  tagName: 'span',
                  type: 'text',
                  attributes: { class: 'fs-5 d-none d-sm-inline'}
                }]
              },
              {
                tagName: 'ul',
                attributes: { class: 'nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start', id: 'menu'}
              }
            ],
            }]
          }]
        }]
      }
    }
    })
};

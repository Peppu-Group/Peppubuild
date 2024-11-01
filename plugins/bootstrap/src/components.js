export default (editor, opts = {}) => {
  const domc = editor.DomComponents;

  const attrsToString = (attrs) => {
    const result = [];

    for (let key in attrs) {
      let value = attrs[key];
      const toParse = value instanceof Array || value instanceof Object;
      value = toParse ? JSON.stringify(value) : value;
      result.push(`${key}=${toParse ? `'${value}'` : `'${value}'`}`);
    }

    return result.length ? ` ${result.join(' ')}` : '';
  };
  const stylePrefix = 'gjs';
  const clsRow = `${stylePrefix}row`;
  const clsCell = `${stylePrefix}cell`;
  const styleRow =  `
    .${clsRow} {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 10px;
    }
    @media (max-width: 768px) {
      .${clsRow} {
        flex-wrap: wrap;
      }
    }`;
    const colAttr = {
      class: clsCell,
      'data-gjs-draggable': `.${clsRow}`,
      'data-gjs-name': 'Cell'
    };
    const attrsCell = attrsToString(colAttr);
  const rowAttr = {
    class: clsRow,
    'data-gjs-droppable': `.${clsCell}`,
    'data-gjs-name': 'Row'
  };
  const styleClm = `
    .${clsCell} {
      min-height: 100px;
      flex-grow: 1;
      flex-basis: 100%;
    }`;
  const attrsRow = attrsToString(rowAttr);
  domc.addType('VUE-INPUT', {
    // Make the editor understand when to bind `my-input-type`
    // Model definition
    model: {
      // Default properties
      defaults: {
        tagName: 'div',
        draggable: true, // Can be dropped only inside `form` elements
        droppable: true, // Can't drop other elements inside
        content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
      </div>
      ${
         `<style>
          ${styleRow}
          ${styleClm}
        </style>`
      }`,
        traits: [
          'v-for',
          'v-if'
        ],
      }
    }
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
  // Bootstrap card component
  domc.addType('B-CARD', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'card' },
        components: [
          {
            type: 'image',
            attributes: { src: 'https://fakeimg.pl/600x400?text=Replace+image', alt: '' },
          },
          {
            tagName: 'div',
            attributes: { class: 'card-body' },
            components: [
              {
                tagName: 'h5',
                type: 'text',
                attributes: { class: 'card-title' },
                components: [{
                  type: 'textnode',
                  content: 'Card title'
                }]
              },
              {
                tagName: 'p',
                type: 'text',
                attributes: { class: 'card-text' },
                components: [{
                  type: 'textnode',
                  content: `Some quick example text to build on the card title and make up the bulk of the card's content.`
                }]
              },
              {
                type: 'link',
                attributes: { href: '#', class: 'btn btn-primary' },
                components: [{
                  type: 'textnode',
                  content: 'Go somewhere'
                }]
              },
            ]
          }
        ],
        styles: `
        .card img {
          card-img-top
        }
        .card {
          width: 18rem;
        }
        `
      },
    },
    view: {

    },
  });

  // Bootstrap hero component
  domc.addType('B-HERO', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'container col-xxl-8 px-4 py-5' },
        components: [{
          tagName: 'div',
          attributes: { class: 'row flex-lg-row-reverse align-items-center g-5 py-5' },
          components: [
            {
              tagName: 'div',
              attributes: { class: 'col-10 col-sm-8 col-lg-6 himg' },
              components: [{
                type: 'image',
                attributes: { src: 'https://fakeimg.pl/600x400?text=Replace+image', alt: '', class: 'd-block mx-lg-auto img-fluid' },
              }],
            },
            {
              tagName: 'div',
              attributes: { class: 'col-lg-6' },
              components: [
                {
                  tagName: 'h1',
                  type: 'text',
                  attributes: { class: 'display-5 fw-bold text-body-emphasis lh-1 mb-3' },
                  components: [{
                    type: 'textnode',
                    content: 'Responsive left-aligned hero with image'
                  }]
                },
                {
                  tagName: 'p',
                  type: 'text',
                  attributes: { class: 'lead' },
                  components: [{
                    type: 'textnode',
                    content: `Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.`
                  }]
                },
                {
                  tagName: 'div',
                  attributes: { class: 'd-grid gap-2 d-md-flex justify-content-md-start' },
                  components: [
                    {
                      type: 'B-BUTTON',
                    }
                  ]
                }
              ]
            }
          ],
        }],
        styles: `
        .himg img {
          width: 700; 
          height: 500;
        }
        `
      }
    },
    view: {

    },
  });

  // Bootstrap Navbar
  domc.addType('B-NAVBAR', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'navbar navbar-expand-lg' },
        components: [{
          tagName: 'div',
          attributes: { class: 'container-fluid' },
          components: [
            {
              type: 'link',
              attributes: { class: 'navbar-brand', href: '#' },
              components: [{
                type: 'image',
                attributes: { src: 'https://fakeimg.pl/600x400?text=Replace+image' },
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
          height: 30px
        }
        `
      },
    },

    view: {

    },
  });

  // Bootstrap Button
  domc.addType('B-BUTTON', {
    isComponent: el => el.tagName == 'BUTTON',

    model: {
      defaults: {
        tagName: 'button',
        attributes: { type: 'button', class: 'btn btn-primary' },
        text: 'Send',
        traits: [
          {
            name: 'text',
            changeProp: true,
          }, {
            type: 'select',
            name: 'type',
            options: [
              { value: 'button' },
              { value: 'submit' },
              { value: 'reset' },
            ]
          }]
      },

      init() {
        const comps = this.components();
        const tChild = comps.length === 1 && comps.models[0];
        const chCnt = (tChild && tChild.is('textnode') && tChild.get('content')) || '';
        const text = chCnt || this.get('text');
        this.set('text', text);
        this.on('change:text', this.__onTextChange);
        (text !== chCnt) && this.__onTextChange();
      },

      __onTextChange() {
        this.components(this.get('text'));
      },
    },

    view: {

    },
  });

  // Bootstrap Accordion.
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

  // Bootstrap Footer part
  domc.addType('B-FOOTER-PT', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'col-6 col-md-2 mb-3' },
        components: [
          {
            tagName: 'h5',
            type: 'text',
            components: [{
              type: 'textnode',
              content: 'Section'
            }]
          },
          {
            tagName: 'ul',
            attributes: { class: 'nav flex-column' },
            components: [
              {
                tagName: 'li',
                attributes: { class: 'nav-item mb-2' },
                components: [{
                  type: 'link',
                  attributes: { href: '#', class: 'nav-link p-0 text-body-secondary' },
                  components: [{
                    type: 'textnode',
                    content: 'Home'
                  }]
                }]
              },
              {
                tagName: 'li',
                attributes: { class: 'nav-item mb-2' },
                components: [{
                  type: 'link',
                  attributes: { href: '#', class: 'nav-link p-0 text-body-secondary' },
                  components: [{
                    type: 'textnode',
                    content: 'Features'
                  }]
                }]
              },
              {
                tagName: 'li',
                attributes: { class: 'nav-item mb-2' },
                components: [{
                  type: 'link',
                  attributes: { href: '#', class: 'nav-link p-0 text-body-secondary' },
                  components: [{
                    type: 'textnode',
                    content: 'Pricing'
                  }]
                }]
              },
              {
                tagName: 'li',
                attributes: { class: 'nav-item mb-2' },
                components: [{
                  type: 'link',
                  attributes: { href: '#', class: 'nav-link p-0 text-body-secondary' },
                  components: [{
                    type: 'textnode',
                    content: 'FAQs'
                  }]
                }]
              },
              {
                tagName: 'li',
                attributes: { class: 'nav-item mb-2' },
                components: [{
                  type: 'link',
                  attributes: { href: '#', class: 'nav-link p-0 text-body-secondary' },
                  components: [{
                    type: 'textnode',
                    content: 'About'
                  }]
                }]
              },
            ]
          }
        ]
      },
    },

    view: {

    },
  });

  // Bootstrap Footer
  domc.addType('B-FOOTER', {
    model: {
      defaults: {
        tagName: 'footer',
        attributes: { class: 'container py-5' },
        components: [
          {
            tagName: 'div',
            attributes: { class: 'row' },
            components: [
              {
                type: 'B-FOOTER-PT',
              },
              {
                type: 'B-FOOTER-PT',
              },
              {
                type: 'B-FOOTER-PT',
              },
              {
                tagName: 'div',
                attributes: { class: 'col-md-5 offset-md-1 mb-3' },
                components: [{
                  tagName: 'form',
                  components: [
                    {
                      tagName: 'h5',
                      type: 'text',
                      components: [{
                        type: 'textnode',
                        content: 'Subscribe to our newsletter'
                      }]
                    },
                    {
                      tagName: 'p',
                      type: 'text',
                      components: [{
                        type: 'textnode',
                        content: `Monthly digest of what's new and exciting from us.`
                      }]
                    },
                    {
                      tagName: 'div',
                      attributes: { class: 'd-flex flex-column flex-sm-row w-100 gap-2' },
                      components: [
                        {
                          tagName: 'label',
                          type: 'text',
                          attributes: { class: 'visually-hidden', for: 'newsletter1' },
                          components: [{
                            type: 'textnode',
                            content: `Email address`
                          }]
                        },
                        {
                          tagName: 'input',
                          attributes: { class: 'form-control', id: 'newsletter1', type: 'text', placeholder: 'Email address' },
                          components: [{
                            type: 'textnode',
                            content: `Email address`
                          }]
                        },
                        {
                          type: 'B-BUTTON',
                        },
                      ]
                    }
                  ]
                }]
              },
              {
                tagName: 'div',
                attributes: { class: 'd-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top' },
                components: [
                  {
                    tagName: 'p',
                    type: 'text',
                    components: [{
                      type: 'textnode',
                      content: `&copy; 2023 Company, Inc. All rights reserved.`
                    }]
                  },
                  {
                    tagName: 'div',
                    attributes: { class: 'list-unstyled d-flex' },
                    components: [
                      {
                        tagName: 'li',
                        attributes: { class: 'ms-3' },
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

  // Bootstrap Features part
  domc.addType('B-FEATURES-PT', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'col d-flex align-items-start' },
        components: [
          {
            tagName: 'div',
            attributes: { class: 'icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3' },
            components: [
              {
                type: 'image',
                attributes: { class: 'bi square' }
              }
            ]
          },
          {
            tagName: 'div',
            components: [
              {
                tagName: 'h3',
                type: 'text',
                attributes: { class: 'fs-2 text-body-emphasis' },
                components: [{
                  type: 'textnode',
                  content: 'Featured title'
                }]
              },
              {
                tagName: 'p',
                type: 'text',
                components: [{
                  type: 'textnode',
                  content: `Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.`
                }]
              },
              {
                type: 'link',
                attributes: { href: '#', class: 'btn btn-primary' },
                components: [{
                  type: 'textnode',
                  content: 'Primary button'
                }]
              },
            ]
          }
        ],
        styles: `
        .square {
          width: 100px; 
          height: 100px;
        }
        `
      },
    },

    view: {

    },
  });

  // Bootstrap Features
  domc.addType('B-FEATURES', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { id: 'hanging-icons', class: 'container px-4 py-5' },
        components: [
          {
            tagName: 'h2',
            type: 'text',
            attributes: { class: 'pb-2 border-bottom' },
            components: [{
              type: 'textnode',
              content: 'Features'
            }]
          },
          {
            tagName: 'div',
            attributes: { class: 'row g-4 py-5 row-cols-1 row-cols-lg-3' },
            components: [
              {
                type: 'B-FEATURES-PT',
              },
              {
                type: 'B-FEATURES-PT',
              },
              {
                type: 'B-FEATURES-PT',
              },
            ]
          },
        ]
      },
    },

    view: {

    },
  });

  // Bootstrap Carousel
  domc.addType('B-CAROUSEL', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'carousel slide mb-6', id: 'myCarousel', 'data-bs-ride': "carousel" },
        components: [
          {
            tagName: 'div',
            attributes: { class: 'carousel-indicators' },
            components: [
              {
                tagName: 'button',
                attributes: { class: 'active', type: 'button', 'data-bs-target': "#myCarousel", 'data-bs-slide-to': '0', 'aria-current': "true", 'aria-label': "Slide 1" },
              },
              {
                tagName: 'button',
                attributes: { type: 'button', 'data-bs-target': "#myCarousel", 'data-bs-slide-to': '1', 'aria-label': "Slide 2" },
              },
              {
                tagName: 'button',
                attributes: { type: 'button', 'data-bs-target': "#myCarousel", 'data-bs-slide-to': '2', 'aria-label': "Slide 3" },
              },
            ]
          },
          {
            tagName: 'div',
            attributes: { class: 'carousel-inner' },
            components: [
              {
                tagName: 'div',
                attributes: { class: 'carousel-item active cactive' },
                components: [
                  {
                    type: 'image',
                    attributes: { src: 'https://fakeimg.pl/1024x400/141111/141111', alt: '', class: 'bd-placeholder-img' },
                  },
                  {
                    tagName: 'div',
                    attributes: { class: 'container' },
                    components: [
                      {
                        tagName: 'div',
                        attributes: { class: 'carousel-caption text-start' },
                        components: [
                          {
                            tagName: 'h1',
                            type: 'text',
                            components: [{
                              type: 'textnode',
                              content: 'Example headline.'
                            }]
                          },
                          {
                            tagName: 'p',
                            type: 'text',
                            attributes: { class: 'opacity-75' },
                            components: [{
                              type: 'textnode',
                              content: 'Some representative placeholder content for the first slide of the carousel.'
                            }]
                          },
                          {
                            tagName: 'p',
                            type: 'text',
                            components: [
                              {
                                type: 'link',
                                attributes: { href: '#', class: 'btn btn-lg btn-primary' },
                                components: [{
                                  type: 'textnode',
                                  content: 'Sign up today'
                                }]
                              },
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                tagName: 'div',
                attributes: { class: 'carousel-item cactive' },
                components: [
                  {
                    type: 'image',
                    attributes: { src: 'https://fakeimg.pl/1024x400/141111/141111', alt: '', class: 'bd-placeholder-img' },
                  },
                  {
                    tagName: 'div',
                    attributes: { class: 'container' },
                    components: [
                      {
                        tagName: 'div',
                        attributes: { class: 'carousel-caption text-start' },
                        components: [
                          {
                            tagName: 'h1',
                            type: 'text',
                            components: [{
                              type: 'textnode',
                              content: 'Example headline.'
                            }]
                          },
                          {
                            tagName: 'p',
                            type: 'text',
                            attributes: { class: 'opacity-75' },
                            components: [{
                              type: 'textnode',
                              content: 'Some representative placeholder content for the first slide of the carousel.'
                            }]
                          },
                          {
                            tagName: 'p',
                            type: 'text',
                            components: [
                              {
                                type: 'link',
                                attributes: { href: '#', class: 'btn btn-lg btn-primary' },
                                components: [{
                                  type: 'textnode',
                                  content: 'Sign up today'
                                }]
                              },
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                tagName: 'div',
                attributes: { class: 'carousel-item cactive' },
                components: [
                  {
                    type: 'image',
                    attributes: { src: 'https://fakeimg.pl/1024x400/141111/141111', alt: '', class: 'bd-placeholder-img' },
                  },
                  {
                    tagName: 'div',
                    attributes: { class: 'container' },
                    components: [
                      {
                        tagName: 'div',
                        attributes: { class: 'carousel-caption text-start' },
                        components: [
                          {
                            tagName: 'h1',
                            type: 'text',
                            components: [{
                              type: 'textnode',
                              content: 'Example headline.'
                            }]
                          },
                          {
                            tagName: 'p',
                            type: 'text',
                            attributes: { class: 'opacity-75' },
                            components: [{
                              type: 'textnode',
                              content: 'Some representative placeholder content for the first slide of the carousel.'
                            }]
                          },
                          {
                            tagName: 'p',
                            type: 'text',
                            components: [
                              {
                                type: 'link',
                                attributes: { href: '#', class: 'btn btn-lg btn-primary' },
                                components: [{
                                  type: 'textnode',
                                  content: 'Sign up today'
                                }]
                              },
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                tagName: 'button',
                attributes: { class: 'carousel-control-prev', 'data-bs-target': "#myCarousel", type: 'button', 'data-bs-slide': "prev" },
                components: [
                  {
                    tagName: 'span',
                    attributes: { class: 'carousel-control-prev-icon', 'aria-hidden': "true" }
                  },
                  {
                    tagName: 'span',
                    type: 'text',
                    attributes: { class: 'visually-hidden' },
                    components: [{
                      type: 'textnode',
                      content: 'Previous'
                    }]
                  },
                ]
              },
              {
                tagName: 'button',
                attributes: { class: 'carousel-control-next', 'data-bs-target': "#myCarousel", type: 'button', 'data-bs-slide': "next" },
                components: [
                  {
                    tagName: 'span',
                    attributes: { class: 'carousel-control-next-icon', 'aria-hidden': "true" }
                  },
                  {
                    tagName: 'span',
                    type: 'text',
                    attributes: { class: 'visually-hidden' },
                    components: [{
                      type: 'textnode',
                      content: 'Next'
                    }]
                  },
                ]
              }
            ]
          }
        ],
        styles: `
        .cactive img {
          width:100%; 
         
        }
        `
      },
    },

    view: {

    },
  });

  // Pricing part
  domc.addType('B-PRICING-PT', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'col' },
        components: [
          {
            tagName: 'div',
            attributes: { class: 'card mb-4 rounded-3 shadow-sm' },
            components: [
              {
                tagName: 'div',
                attributes: { class: 'card-header py-3' },
                components: [
                  {
                    tagName: 'h4',
                    type: 'text',
                    attributes: { class: 'my-0 fw-normal' },
                    components: [{
                      type: 'textnode',
                      content: 'Pro'
                    }]
                  }
                ]
              },
              {
                tagName: 'div',
                attributes: { class: 'card-body' },
                components: [
                  {
                    tagName: 'h1',
                    type: 'text',
                    attributes: { class: 'card-title pricing-card-title' },
                    components: [
                      {
                        type: 'textnode',
                        content: '$15'
                      },
                      {
                        tagName: 'small',
                        type: 'text',
                        attributes: { class: 'text-body-secondary fw-light' },
                        components: [
                          {
                            type: 'textnode',
                            content: '/mo'
                          },
                        ]
                      }
                    ]
                  },
                  {
                    tagName: 'ul',
                    attributes: { class: 'list-unstyled mt-3 mb-4' },
                    components: [
                      {
                        tagName: 'li',
                        components: [{
                          type: 'textnode',
                          content: '20 users included'
                        }]
                      },
                      {
                        tagName: 'li',
                        components: [{
                          type: 'textnode',
                          content: '10 GB of storage'
                        }]
                      }, {
                        tagName: 'li',
                        components: [{
                          type: 'textnode',
                          content: 'Priority email support'
                        }]
                      }, {
                        tagName: 'li',
                        components: [{
                          type: 'textnode',
                          content: 'Help center access'
                        }]
                      },
                    ]
                  },
                  {
                    tagName: 'button',
                    type: 'button',
                    attributes: { class: 'w-100 btn btn-lg btn-primary' },
                    components: [{
                      type: 'textnode',
                      content: 'Sign up for free'
                    }]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  });

  // Pricing
  domc.addType('B-PRICING', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'container col-sm-8 px-4 py-5' },
        components: [
          {
            tagName: 'h2',
            type: 'text',
            attributes: { class: 'pb-2 border-bottom' },
            components: [{
              type: 'textnode',
              content: 'Pricing'
            }]
          },
          {
            tagName: 'div',
            attributes: { class: 'row row-cols-1 row-cols-md-3 mb-3 text-center' },
            components: [
              {
                type: 'B-PRICING-PT',
              },
              {
                type: 'B-PRICING-PT',
              },
              {
                type: 'B-PRICING-PT',
              }
            ]
          }
        ]
      },
    },

    view: {

    },
  });
};

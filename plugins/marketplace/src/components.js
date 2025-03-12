export default (editor, opts = {}) => {
  const domc = editor.DomComponents;

  domc.addType('HERO-COMPONENT', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { id: 'content' },
        components: [
          {
            tagName: 'section',
            attributes: { id: 'io50uj', class: 'hero' },
            components: [
              {
                tagName: 'div',
                attributes: { id: 'i9sxzm', class: 'container' },
                components: [
                  {
                    tagName: 'h1',
                    type: 'text',
                    attributes: { id: 'iajfs8' },
                    components: [{
                      type: 'textnode',
                      content: `Your Peppubuild Shop`
                    }]
                  },
                  {
                    tagName: 'p',
                    type: 'text',
                    attributes: { id: 'ifrj4f' },
                    components: [{
                      type: 'textnode',
                      content: `Let us setup your Peppubuild shop!`
                    }]
                  },
                  {
                    type: 'link',
                    attributes: { href: '/allperfumes', class: 'cta-button' },
                    components: [{
                      type: 'textnode',
                      content: `Shop Now`
                    }]
                  }
                ]
              }
            ]
          },
        ],
        styles: `
        .container {
          margin-top: 0px;
          margin-right: auto;
          margin-bottom: 0px;
          margin-left: auto;
          padding-top: 20px;
          padding-right: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
        }
        .hero {
          background-color: rgb(253, 235, 239);
          text-align: center;
          padding-top: 50px;
          padding-right: 0px;
          padding-bottom: 50px;
          padding-left: 0px;
      }

      .hero h1 {
          font-size: 2.5em;
          margin-bottom: 10px;
      }

      .hero p {
          font-size: 1.2em;
          color: rgb(102, 102, 102);
      }

      .cta-button {
          display: inline-block;
          background-color: rgb(51, 51, 51);
          color: white;
          padding-top: 12px;
          padding-right: 24px;
          padding-bottom: 12px;
          padding-left: 24px;
          text-decoration-line: none;
          text-decoration-thickness: initial;
          text-decoration-style: initial;
          text-decoration-color: initial;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
          margin-top: 20px;
      }
        `
      },
    },
    view: {

    },
  });

  domc.addType('PRODUCTS-COMPONENT', {
    model: {
      defaults: {
        tagName: 'section',
        attributes: { class: 'featured-products' },
        components: [
          {
            tagName: 'div',
            attributes: { id: 'feature', class: 'container feature' },
            components: [
              {
                tagName: 'h2',
                type: 'text',
                attributes: { id: 'iv6q35' },
                components: [{
                  type: 'textnode',
                  content: `Featured Products`
                }]
              },
              {
                tagName: 'div',
                attributes: { class: 'product-grid' },
                components: [
                  {
                    tagName: 'div',
                    attributes: { class: 'product' },
                    components: [
                      {
                        tagName: 'img',
                        attributes: {
                          src: 'https://drive.google.com/thumbnail?id=1G8tqyqvCTHIOSbK7NGx6nV84Z0XiXK6c&sz=w1000',
                          alt: 'Kay Ali',
                          'style': 'width:100%;',
                        }
                      },
                      {
                        tagName: 'h5',
                        content: 'Kay Ali'
                      },
                      {
                        tagName: 'p',
                        content: 'Boujee Marshmallow'
                      },
                      {
                        tagName: 'p',
                        content: '₦ 20'
                      },
                      {
                        type: 'link',
                        attributes: { href: '#', class: 'add-to-cart btn btn-primary mx-1' },
                        components: [
                          {
                            tagName: 'i',
                            attributes: { class: 'bi bi-cart' }
                          }
                        ]
                      },
                      {
                        type: 'link',
                        attributes: { href: '#', class: 'pay-now btn btn-primary mx-1' },
                        components: [
                          {
                            tagName: 'i',
                            attributes: { class: 'bi bi-wallet2' }
                          }
                        ]
                      },
                      {
                        type: 'link',
                        attributes: { href: '#', class: 'get-info btn btn-primary mx-1' },
                        components: [
                          {
                            tagName: 'i',
                            attributes: { class: 'bi bi-info-circle' }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    tagName: 'div',
                    attributes: { class: 'product' },
                    components: [
                      {
                        tagName: 'img',
                        attributes: {
                          src: 'https://drive.google.com/thumbnail?id=1efqfmfLRx36UE3IrUbK_5Tc72kQ4XHOC&sz=w1000',
                          alt: 'Ambre Nuit',
                          'style': 'width:100%;'
                        }
                      },
                      {
                        tagName: 'h5',
                        content: 'Ambre Nuit'
                      },
                      {
                        tagName: 'p',
                        content: 'Christian Dior'
                      },
                      {
                        tagName: 'p',
                        content: '₦ 30'
                      },
                      {
                        type: 'link',
                        attributes: { href: '#', class: 'add-to-cart btn btn-primary mx-1' },
                        components: [
                          {
                            tagName: 'i',
                            attributes: { class: 'bi bi-cart' }
                          }
                        ]
                      },
                      {
                        type: 'link',
                        attributes: { href: '#', class: 'pay-now btn btn-primary mx-1' },
                        components: [
                          {
                            tagName: 'i',
                            attributes: { class: 'bi bi-wallet2' }
                          }
                        ]
                      },
                      {
                        type: 'link',
                        attributes: { href: '#', class: 'get-info btn btn-primary mx-1' },
                        components: [
                          {
                            tagName: 'i',
                            attributes: { class: 'bi bi-info-circle' }
                          }
                        ]
                      }
                    ]
                  },
                  {
                    tagName: 'div',
                    attributes: { class: 'product' },
                    components: [
                      {
                        tagName: 'img',
                        attributes: {
                          src: 'https://drive.google.com/thumbnail?id=1MPYSwebssa2IzWC23hfWEXe1XQY334xn&sz=w1000',
                          alt: 'Napoleon',
                          'style': 'width:100%;'
                        }
                      },
                      {
                        tagName: 'h5',
                        content: 'Napoleon'
                      },
                      {
                        tagName: 'p',
                        content: 'Daniel'
                      },
                      {
                        tagName: 'p',
                        content: '₦ 50'
                      },
                      {
                        type: 'link',
                        attributes: { href: '#', class: 'add-to-cart btn btn-primary mx-1' },
                        components: [
                          {
                            tagName: 'i',
                            attributes: { class: 'bi bi-cart' }
                          }
                        ]
                      },
                      {
                        type: 'link',
                        attributes: { href: '#', class: 'pay-now btn btn-primary mx-1' },
                        components: [
                          {
                            tagName: 'i',
                            attributes: { class: 'bi bi-wallet2' }
                          }
                        ]
                      },
                      {
                        type: 'link',
                        attributes: { href: '#', class: 'get-info btn btn-primary mx-1' },
                        components: [
                          {
                            tagName: 'i',
                            attributes: { class: 'bi bi-info-circle' }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        styles: `
        .featured-products {
          padding-top: 30px;
          padding-right: 0px;
          padding-bottom: 30px;
          padding-left: 0px;
          background-color: rgb(250, 250, 250);
      }

      .featured-products h2 {
          text-align: center;
          margin-bottom: 20px;
      }

      .product-grid {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
      }

      .product {
          width: 30%;
          border-top-width: 1px;
          border-right-width: 1px;
          border-bottom-width: 1px;
          border-left-width: 1px;
          border-top-style: solid;
          border-right-style: solid;
          border-bottom-style: solid;
          border-left-style: solid;
          border-top-color: rgb(221, 221, 221);
          border-right-color: rgb(221, 221, 221);
          border-bottom-color: rgb(221, 221, 221);
          border-left-color: rgb(221, 221, 221);
          border-image-source: initial;
          border-image-slice: initial;
          border-image-width: initial;
          border-image-outset: initial;
          border-image-repeat: initial;
          padding-top: 15px;
          padding-right: 15px;
          padding-bottom: 15px;
          padding-left: 15px;
          margin-bottom: 20px;
          text-align: center;
      }

      .product img {
          max-width: 100%;
          height: auto;
      }

      .product h3 {
          font-size: 1.2em;
          margin-top: 10px;
      }

      .product .price {
          font-size: 1.1em;
          font-weight: bold;
          color: rgb(76, 175, 80);
          display: block;
          margin-bottom: 10px;
      }
        `
      },
    }
  });

  domc.addType('SINGLE-PRODUCT', {
    model: {
      defaults: {
        tagName: 'div',
        attributes: { class: 'product-grid' },
        components: [
          {
            tagName: 'div',
            attributes: { class: 'product' },
            components: [
              {
                tagName: 'img',
                attributes: {
                  src: 'https://drive.google.com/thumbnail?id=1G8tqyqvCTHIOSbK7NGx6nV84Z0XiXK6c&sz=w1000',
                  alt: 'Kay Ali',
                  'style': 'width:100%;',
                }
              },
              {
                tagName: 'h5',
                content: 'Kay Ali'
              },
              {
                tagName: 'p',
                content: 'Boujee Marshmallow'
              },
              {
                tagName: 'p',
                content: '₦ 20'
              },
              {
                type: 'link',
                attributes: { href: '#', class: 'add-to-cart btn btn-primary mx-1' },
                components: [
                  {
                    tagName: 'i',
                    attributes: { class: 'bi bi-cart' }
                  }
                ]
              },
              {
                type: 'link',
                attributes: { href: '#', class: 'pay-now btn btn-primary mx-1' },
                components: [
                  {
                    tagName: 'i',
                    attributes: { class: 'bi bi-wallet2' }
                  }
                ]
              },
              {
                type: 'link',
                attributes: { href: '#', class: 'get-info btn btn-primary mx-1' },
                components: [
                  {
                    tagName: 'i',
                    attributes: { class: 'bi bi-info-circle' }
                  }
                ]
              }
            ]
          },
        ],
        styles: `
        .featured-products {
          padding-top: 30px;
          padding-right: 0px;
          padding-bottom: 30px;
          padding-left: 0px;
          background-color: rgb(250, 250, 250);
      }

      .featured-products h2 {
          text-align: center;
          margin-bottom: 20px;
      }

      .product-grid {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
      }

      .product {
          width: 30%;
          border-top-width: 1px;
          border-right-width: 1px;
          border-bottom-width: 1px;
          border-left-width: 1px;
          border-top-style: solid;
          border-right-style: solid;
          border-bottom-style: solid;
          border-left-style: solid;
          border-top-color: rgb(221, 221, 221);
          border-right-color: rgb(221, 221, 221);
          border-bottom-color: rgb(221, 221, 221);
          border-left-color: rgb(221, 221, 221);
          border-image-source: initial;
          border-image-slice: initial;
          border-image-width: initial;
          border-image-outset: initial;
          border-image-repeat: initial;
          padding-top: 15px;
          padding-right: 15px;
          padding-bottom: 15px;
          padding-left: 15px;
          margin-bottom: 20px;
          text-align: center;
      }

      .product img {
          max-width: 100%;
          height: auto;
      }

      .product h3 {
          font-size: 1.2em;
          margin-top: 10px;
      }

      .product .price {
          font-size: 1.1em;
          font-weight: bold;
          color: rgb(76, 175, 80);
          display: block;
          margin-bottom: 10px;
      }
        `
      }
    }
  })
};

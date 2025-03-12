export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add('HERO-BLOCK', {
    label: 'Hero block',
    content: { type: 'HERO-COMPONENT' },
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="25" y="16" width="16" height="16" fill="white" stroke="black" stroke-width="2"/>
    <rect x="9" y="19" width="8" height="9" fill="white" stroke="black" stroke-width="2"/>
    </svg>`,
  });
  bm.add('PRODUCTS-BLOCK', {
    label: 'Products block',
    content: { type: 'PRODUCTS-COMPONENT' },
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="10" y="13" width="27" height="22" fill="white" stroke="black" stroke-width="2"/>
    <line x1="9" y1="23.5" x2="38" y2="23.5" stroke="black"/>
    <line x1="24.5" y1="12" x2="24.5" y2="36" stroke="black"/>
    </svg>
    `,
  });
  bm.add('SINGLE-PRODUCT', {
    label: 'Single Products',
    content: { type: 'SINGLE-PRODUCT' },
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="10" y="25" width="27" height="9" fill="white" stroke="black" stroke-width="2"/>
    </svg>`,
  });
}

export default (editor, opts = {}) => {
  const bm = editor.BlockManager;

  bm.add('Top Navbar', {
    label: 'Top Navbar',
    category: 'Navigation Bar',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <line y1="12" x2="48" y2="12" stroke="black" stroke-width="2"/>
    </svg>`,
    content: { type: 'B-NAVBAR' }
  });

  bm.add('Side Navbar', {
    label: 'Side Navbar',
    category: 'Navigation Bar',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <line x1="13" y1="48" x2="13" stroke="black" stroke-width="2"/>
    </svg>`,
    content: `
    <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto px-0" style='margin:20px'>
            <div id="sidebar" class="collapse collapse-horizontal show border-end">
                <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100">
                    <a href="https://www.peppubuild.com" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><img src='https://www.peppubuild.com/logo.png'/> </a>
                    (more nav items) ... 
                </div>
            </div>
        </div>
        <main class="col ps-md-2 pt-2">
            <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 p-1 text-decoration-none"><i class="bi bi-list bi-lg py-2 p-1"></i> Menu</a>
            <div class="row">
                <div class="col-12">
                    Content area...
                </div>
            </div>
        </main>
    </div>
</div>
    `
  })

  bm.add('Bottom Navbar', {
    label: 'Bottom Navbar',
    category: 'Navigation Bar',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <line y1="37" x2="48" y2="37" stroke="black" stroke-width="2"/>
    </svg>`,
  })

  bm.add('Home Page', {
    label: 'Home Page',
    category: 'Pages',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <line y1="9" x2="48" y2="9" stroke="black" stroke-width="2"/>
    <rect x="13.5" y="32.5" width="21" height="4" fill="white" stroke="black"/>
    <rect x="20" y="16" width="8" height="7" fill="white" stroke="black" stroke-width="2"/>
    <path d="M17.8352 33.7273L18.6193 35.0653L19.4034 33.7273H19.983L18.9261 35.3636L19.983 37H19.4034L18.6193 35.7301L17.8352 37H17.2557L18.2955 35.3636L17.2557 33.7273H17.8352ZM22.763 33.7273L23.5471 35.0653L24.3311 33.7273H24.9107L23.8539 35.3636L24.9107 37H24.3311L23.5471 35.7301L22.763 37H22.1834L23.2232 35.3636L22.1834 33.7273H22.763ZM27.6907 33.7273L28.4748 35.0653L29.2589 33.7273H29.8384L28.7816 35.3636L29.8384 37H29.2589L28.4748 35.7301L27.6907 37H27.1112L28.1509 35.3636L27.1112 33.7273H27.6907Z" fill="black"/>
    </svg>`,
  });

  bm.add('Flex Right', {
    label: 'Flex Right',
    category: 'Orientation',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <line y1="9" x2="48" y2="9" stroke="black" stroke-width="2"/>
    <rect x="13.5" y="32.5" width="21" height="4" fill="white" stroke="black"/>
    <rect x="20" y="16" width="8" height="7" fill="white" stroke="black" stroke-width="2"/>
    <path d="M17.8352 33.7273L18.6193 35.0653L19.4034 33.7273H19.983L18.9261 35.3636L19.983 37H19.4034L18.6193 35.7301L17.8352 37H17.2557L18.2955 35.3636L17.2557 33.7273H17.8352ZM22.763 33.7273L23.5471 35.0653L24.3311 33.7273H24.9107L23.8539 35.3636L24.9107 37H24.3311L23.5471 35.7301L22.763 37H22.1834L23.2232 35.3636L22.1834 33.7273H22.763ZM27.6907 33.7273L28.4748 35.0653L29.2589 33.7273H29.8384L28.7816 35.3636L29.8384 37H29.2589L28.4748 35.7301L27.6907 37H27.1112L28.1509 35.3636L27.1112 33.7273H27.6907Z" fill="black"/>
    </svg>`,
  });

  bm.add('Flex Left', {
    label: 'Flex Left',
    category: 'Orientation',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <line y1="9" x2="48" y2="9" stroke="black" stroke-width="2"/>
    <rect x="13.5" y="32.5" width="21" height="4" fill="white" stroke="black"/>
    <rect x="20" y="16" width="8" height="7" fill="white" stroke="black" stroke-width="2"/>
    <path d="M17.8352 33.7273L18.6193 35.0653L19.4034 33.7273H19.983L18.9261 35.3636L19.983 37H19.4034L18.6193 35.7301L17.8352 37H17.2557L18.2955 35.3636L17.2557 33.7273H17.8352ZM22.763 33.7273L23.5471 35.0653L24.3311 33.7273H24.9107L23.8539 35.3636L24.9107 37H24.3311L23.5471 35.7301L22.763 37H22.1834L23.2232 35.3636L22.1834 33.7273H22.763ZM27.6907 33.7273L28.4748 35.0653L29.2589 33.7273H29.8384L28.7816 35.3636L29.8384 37H29.2589L28.4748 35.7301L27.6907 37H27.1112L28.1509 35.3636L27.1112 33.7273H27.6907Z" fill="black"/>
    </svg>`,
  });

  bm.add('Flex Center', {
    label: 'Flex Center',
    category: 'Orientation',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <line y1="9" x2="48" y2="9" stroke="black" stroke-width="2"/>
    <rect x="13.5" y="32.5" width="21" height="4" fill="white" stroke="black"/>
    <rect x="20" y="16" width="8" height="7" fill="white" stroke="black" stroke-width="2"/>
    <path d="M17.8352 33.7273L18.6193 35.0653L19.4034 33.7273H19.983L18.9261 35.3636L19.983 37H19.4034L18.6193 35.7301L17.8352 37H17.2557L18.2955 35.3636L17.2557 33.7273H17.8352ZM22.763 33.7273L23.5471 35.0653L24.3311 33.7273H24.9107L23.8539 35.3636L24.9107 37H24.3311L23.5471 35.7301L22.763 37H22.1834L23.2232 35.3636L22.1834 33.7273H22.763ZM27.6907 33.7273L28.4748 35.0653L29.2589 33.7273H29.8384L28.7816 35.3636L29.8384 37H29.2589L28.4748 35.7301L27.6907 37H27.1112L28.1509 35.3636L27.1112 33.7273H27.6907Z" fill="black"/>
    </svg>`,
  });

  bm.add('Hero Section', {
    label: 'Hero Section',
    category: 'Section',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <line y1="9" x2="48" y2="9" stroke="black" stroke-width="2"/>
    <rect x="13.5" y="32.5" width="21" height="4" fill="white" stroke="black"/>
    <rect x="20" y="16" width="8" height="7" fill="white" stroke="black" stroke-width="2"/>
    <path d="M17.8352 33.7273L18.6193 35.0653L19.4034 33.7273H19.983L18.9261 35.3636L19.983 37H19.4034L18.6193 35.7301L17.8352 37H17.2557L18.2955 35.3636L17.2557 33.7273H17.8352ZM22.763 33.7273L23.5471 35.0653L24.3311 33.7273H24.9107L23.8539 35.3636L24.9107 37H24.3311L23.5471 35.7301L22.763 37H22.1834L23.2232 35.3636L22.1834 33.7273H22.763ZM27.6907 33.7273L28.4748 35.0653L29.2589 33.7273H29.8384L28.7816 35.3636L29.8384 37H29.2589L28.4748 35.7301L27.6907 37H27.1112L28.1509 35.3636L27.1112 33.7273H27.6907Z" fill="black"/>
    </svg>`,
  });

  bm.add('Accordion', {
    label: 'Accordion',
    category: 'Section',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="10" y="15" width="28" height="9" fill="#D9D9D9"/>
    <rect x="10" y="29" width="28" height="11" fill="#D9D9D9"/>
    <path d="M33.7074 17.6364L35.0028 21.3097H35.054L36.3494 17.6364H36.9034L35.3011 22H34.7557L33.1534 17.6364H33.7074Z" fill="black"/>
    </svg>`,
    content: { type: 'B-ACCORDION' }
  });

  bm.add('Form', {
    label: 'Bootstrap Form',
    category: 'Section',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="10" y="15" width="28" height="9" fill="#D9D9D9"/>
    <rect x="10" y="29" width="28" height="11" fill="#D9D9D9"/>
    <path d="M33.7074 17.6364L35.0028 21.3097H35.054L36.3494 17.6364H36.9034L35.3011 22H34.7557L33.1534 17.6364H33.7074Z" fill="black"/>
    </svg>`,
    content: `
    <form class='container col-xxl-6 px-4 py-5'>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    `
  });
}

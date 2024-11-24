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
                    <a href="https://www.peppubuild.com" class="list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><img src='https://www.peppubuild.com/logo.png' style="height:50; width: 50px"/> </a>
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
    content: {type: 'Bottom-NAVBAR'}
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
    content: {type: 'B-Pages'}
  });

  bm.add('Flex Container', {
    label: 'Flex Container',
    category: 'Orientation',
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    </svg>`,
    content: { type: 'B-Container' }
  });

  bm.add('Tabs', {
    label: 'Tabs',
    category: 'Orientation',
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <line y1="15.5" x2="12" y2="15.5" stroke="black"/>
    <line x1="12.5" y1="16" x2="12.5" y2="24" stroke="black"/>
    <line x1="12" y1="23.5" x2="48" y2="23.5" stroke="black"/>
    </svg>
    `,
    content: `
   <div>
   <nav>
   <div class="nav nav-tabs" id="nav-tab" role="tablist">
     <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
     <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
     <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
   </div>
 </nav>
 <div class="tab-content" id="nav-tabContent">
   <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">Your Home content goes here</div>
   <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">Your Profile content goes here</div>
   <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">Your Contact content goes here</div>
 </div>
   </div>
    `
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
    content: { type: 'B-Center' }
  });

  bm.add('Hero Section', {
    label: 'Hero Section',
    category: 'Section',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="25" y="16" width="16" height="16" fill="white" stroke="black" stroke-width="2"/>
    <rect x="9" y="19" width="8" height="9" fill="white" stroke="black" stroke-width="2"/>
    </svg>`,
    content: { type: 'B-HERO' }
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

  bm.add('Social', {
    label: 'Social',
    category: 'Elements',
    media: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="10" y="15" width="28" height="9" fill="#D9D9D9"/>
    <rect x="10" y="29" width="28" height="11" fill="#D9D9D9"/>
    <path d="M33.7074 17.6364L35.0028 21.3097H35.054L36.3494 17.6364H36.9034L35.3011 22H34.7557L33.1534 17.6364H33.7074Z" fill="black"/>
    </svg>`,
    content: { type: 'B-Socials' }
  });

  bm.add('Form', {
    label: 'Bootstrap Form',
    category: 'Forms',
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="10" y="15" width="28" height="9" fill="#D9D9D9"/>
    <rect x="10" y="29" width="28" height="11" fill="#D9D9D9"/>
    </svg>
    `,
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

  bm.add('INPUT', {
    label: 'INPUT',
    category: 'Forms',
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="10" y="18" width="28" height="11" fill="#D9D9D9"/>
    </svg>
    `,
    content: { type: 'B-INPUT' }
  });
  // Accordion
  bm.add('Accordion', {
    label: 'Accordion',
    category: 'Elements',
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>`,
    content: `
    
  `,
  });

  // Card
  bm.add('B-CARD', {
    label: 'Card',
    category: 'Elements',
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="10" y="13" width="27" height="22" fill="white" stroke="black" stroke-width="2"/>
    <line x1="9" y1="23.5" x2="38" y2="23.5" stroke="black"/>
    <line x1="24.5" y1="12" x2="24.5" y2="36" stroke="black"/>
    </svg>
    `,
    content: { type: 'B-CARD' }
  });
  /* 
  bm.add('Card-Feature', {
    label: 'Card-Feature',
    category: 'Bootstrap Card',
    content: `<div class="card text-center">
    <div class="card-header">
      Featured
    </div>
    <div class="card-body">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    <div class="card-footer text-muted">
      2 days ago
    </div>
  </div>`,
  });

  bm.add('Card-Border', {
    label: 'Card-Border',
    category: 'Bootstrap Card',
    content: `
    <div class="card border-success mb-3" style="max-width: 18rem;">
    <div class="card-header bg-transparent border-success">Header</div>
    <div class="card-body text-success">
      <h5 class="card-title">Success card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div class="card-footer bg-transparent border-success">Footer</div>
  </div>`,
  });
    */

  bm.add('Footer', {
    label: 'Footer',
    category: 'Elements',
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <line y1="33" x2="48" y2="33" stroke="black" stroke-width="2"/>
    </svg>
    `,
    /*
    content: `
  <div class="">
  <footer class="container py-5">
    <div class="row">
      <div class="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
        </ul>
      </div>

      <div class="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
        </ul>
      </div>

      <div class="col-6 col-md-2 mb-3">
        <h5>Section</h5>
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
          <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
        </ul>
      </div>

      <div class="col-md-5 offset-md-1 mb-3">
        <form>
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <div class="d-flex flex-column flex-sm-row w-100 gap-2">
            <label for="newsletter1" class="visually-hidden">Email address</label>
            <input id="newsletter1" type="text" class="form-control" placeholder="Email address">
            <button class="btn btn-primary" type="button">Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
      <p>&copy; 2023 Company, Inc. All rights reserved.</p>
      <ul class="list-unstyled d-flex">
        <li class="ms-3"><a class="link-body-emphasis" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"/>
      </svg></a></li>
        <li class="ms-3"><a class="link-body-emphasis" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
      </svg></a></li>
        <li class="ms-3"><a class="link-body-emphasis" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
      </svg></a></li>
      </ul>
    </div>
  </footer>
</div>
    `
    */
   content: {type: 'B-FOOTER'}
  });

 
  bm.add('Pricing', {
    label: 'Pricing',
    category: 'Elements',
    /*
    content: `<div>
    <div class="container col-sm-8 px-4 py-5">
    <h2 class="pb-2 border-bottom">Pricing</h2>
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Free</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$0<small class="text-body-secondary fw-light">/mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Pro</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$15<small class="text-body-secondary fw-light">/mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>20 users included</li>
              <li>10 GB of storage</li>
              <li>Priority email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-primary">Get started</button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm border-primary">
          <div class="card-header py-3 text-bg-primary border-primary">
            <h4 class="my-0 fw-normal">Enterprise</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$29<small class="text-body-secondary fw-light">/mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>30 users included</li>
              <li>15 GB of storage</li>
              <li>Phone and email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-primary">Contact us</button>
          </div>
        </div>
      </div>
    </div>

    <h2 class="display-6 text-center mb-4">Compare plans</h2>

    <div class="table-responsive">
      <table class="table text-center">
        <thead>
          <tr>
            <th style="width: 34%;"></th>
            <th style="width: 22%;">Free</th>
            <th style="width: 22%;">Pro</th>
            <th style="width: 22%;">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-start">Public</th>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Private</th>
            <td></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" class="text-start">Permissions</th>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Sharing</th>
            <td></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Unlimited members</th>
            <td></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
          </svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Extra security</th>
            <td></td>
            <td></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
    `
    */
    content: {type: 'B-PRICING'},
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="11" y="13" width="25" height="21" fill="white" stroke="black" stroke-width="2"/>
    <path d="M23.4773 29.0909V18.1818H24.1761V29.0909H23.4773ZM25.8295 21.4545C25.7784 21.0227 25.571 20.6875 25.2074 20.4489C24.8438 20.2102 24.3977 20.0909 23.8693 20.0909C23.483 20.0909 23.1449 20.1534 22.8551 20.2784C22.5682 20.4034 22.3438 20.5753 22.1818 20.794C22.0227 21.0128 21.9432 21.2614 21.9432 21.5398C21.9432 21.7727 21.9986 21.973 22.1094 22.1406C22.223 22.3054 22.3679 22.4432 22.544 22.554C22.7202 22.6619 22.9048 22.7514 23.098 22.8224C23.2912 22.8906 23.4688 22.946 23.6307 22.9886L24.517 23.2273C24.7443 23.2869 24.9972 23.3693 25.2756 23.4744C25.5568 23.5795 25.8253 23.723 26.081 23.9048C26.3395 24.0838 26.5526 24.3139 26.7202 24.5952C26.8878 24.8764 26.9716 25.2216 26.9716 25.6307C26.9716 26.1023 26.848 26.5284 26.6009 26.9091C26.3565 27.2898 25.9986 27.5923 25.527 27.8168C25.0582 28.0412 24.4886 28.1534 23.8182 28.1534C23.1932 28.1534 22.652 28.0526 22.1946 27.8509C21.7401 27.6491 21.3821 27.3679 21.1207 27.0071C20.8622 26.6463 20.7159 26.2273 20.6818 25.75H21.7727C21.8011 26.0795 21.9119 26.3523 22.1051 26.5682C22.3011 26.7812 22.5483 26.9403 22.8466 27.0455C23.1477 27.1477 23.4716 27.1989 23.8182 27.1989C24.2216 27.1989 24.5838 27.1335 24.9048 27.0028C25.2259 26.8693 25.4801 26.6847 25.6676 26.4489C25.8551 26.2102 25.9489 25.9318 25.9489 25.6136C25.9489 25.3239 25.8679 25.0881 25.706 24.9062C25.544 24.7244 25.331 24.5767 25.0668 24.4631C24.8026 24.3494 24.517 24.25 24.2102 24.1648L23.1364 23.858C22.4545 23.6619 21.9148 23.3821 21.517 23.0185C21.1193 22.6548 20.9205 22.179 20.9205 21.5909C20.9205 21.1023 21.0526 20.6761 21.3168 20.3125C21.5838 19.946 21.9418 19.6619 22.3906 19.4602C22.8423 19.2557 23.3466 19.1534 23.9034 19.1534C24.4659 19.1534 24.9659 19.2543 25.4034 19.456C25.8409 19.6548 26.1875 19.9276 26.4432 20.2741C26.7017 20.6207 26.8381 21.0142 26.8523 21.4545H25.8295Z" fill="black"/>
    </svg>
    `
  });

  bm.add('Features', {
    label: 'Features',
    category: 'Elements',
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="11" y="13" width="25" height="21" fill="white" stroke="black" stroke-width="2"/>
    <line x1="10" y1="28.5" x2="37" y2="28.5" stroke="black"/>
    <rect x="15.5" y="17.5" width="6" height="6" fill="white" stroke="black"/>
    </svg>
    `,
    /*
       content: `
    <div>
    <div class="container px-4 py-5" id="hanging-icons">
    <h2 class="pb-2 border-bottom">Features</h2>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <img src='' class="bi" width="100px" height="100px"><use xlink:href="#toggles2"/></img>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Featured title</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="#" class="btn btn-primary">
            Primary button
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <img src='' class="bi" width="100px" height="100px"><use xlink:href="#cpu-fill"/></img>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Featured title</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="#" class="btn btn-primary">
            Primary button
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <img src='' class="bi" width="100px" height="100px"><use xlink:href="#tools"/></img>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Featured title</h3>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="#" class="btn btn-primary">
            Primary button
          </a>
        </div>
      </div>
    </div>
  </div>
  </div>
    `
    */
   content: {type: 'B-FEATURES'}
  });

  bm.add('Button', {
    label: 'Button',
    category: 'Elements',
    content: { type: 'B-BUTTON' },
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="10" y="25" width="27" height="9" fill="white" stroke="black" stroke-width="2"/>
    </svg>
    `
  });

  bm.add('Carousel', {
    label: 'Carousel',
    category: 'Animation',
    media: `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.00024" y="1" width="46" height="46" rx="4" fill="white" stroke="black" stroke-width="2"/>
    <rect x="11" y="13" width="25" height="21" fill="white" stroke="black" stroke-width="2"/>
    <path d="M18.6989 24.9318L13.2102 27.7273V26.6364L17.4205 24.608L17.3864 24.6761V24.5057L17.4205 24.5739L13.2102 22.5455V21.4545L18.6989 24.25V24.9318Z" fill="black"/>
    <path d="M28.2102 24.9318V24.25L33.6989 21.4545V22.5455L29.4886 24.5739L29.5227 24.5057V24.6761L29.4886 24.608L33.6989 26.6364V27.7273L28.2102 24.9318Z" fill="black"/>
    </svg>
    `,
    /*
    content: `
    <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://fakeimg.pl/1024x400/141111/141111" class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></img>
        <div class="container">
          <div class="carousel-caption text-start">
            <h1>Example headline.</h1>
            <p class="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
            <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
      <img src="https://fakeimg.pl/1024x400/141111/141111" class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></img>
      <div class="container">
        <div class="carousel-caption text-start">
          <h1>Example headline.</h1>
          <p class="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
          <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
        </div>
      </div>
      </div>
      <div class="carousel-item">
      <img src="https://fakeimg.pl/1024x400/141111/141111" class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></img>
      <div class="container">
        <div class="carousel-caption text-start">
          <h1>Example headline.</h1>
          <p class="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
          <p><a class="btn btn-lg btn-primary" href="#">Sign up today</a></p>
        </div>
      </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  
    `
    */
   content: {type: 'B-CAROUSEL'}
    
  });
}

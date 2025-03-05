<template>
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
      <div class="dropdown pb-4 black-box" v-if="imageLink">
        <a href="#" class="d-flex align-items-center text-black text-decoration-none dropdown-toggle" id="dropdownUser1"
          data-bs-toggle="dropdown" aria-expanded="false">
          <img :src="imageLink" alt="profile_picture" width="30" height="30" class="rounded-circle">
          <span class="d-none d-sm-inline mx-1"></span>
        </a>
        <ul class="dropdown-menu dropdown-menu-dark text-small shadow blac">
          <li>
            <hr class="dropdown-divider">
          </li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
      <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-5 d-none d-sm-inline black">Menu</span>
      </a>
      <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
        <li class="nav-item">
          <router-link to="/dashboard/projects" class="nav-link align-middle px-0">
            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/overview" class="nav-link align-middle px-0">
            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Overview</span>
          </router-link>
        </li>
        <li>
          <a href="#" class="nav-link px-0 align-middle" @click="inProgress()">
            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">People</span> </a>
        </li>
        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span class="fs-5 d-none d-sm-inline black">Configurations</span>
        </a>
        <li>
          <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-gear"></i> <span class="ms-1 d-none d-sm-inline">Settings</span> </a>
          <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
            <li class="w-100">
              <a href="#" class="nav-link px-0" @click="inProgress()"> <span class="d-none d-sm-inline">User
                </span> Settings </a>
            </li>
            <li>
              <a href="#" class="nav-link px-0" @click="updateSocials()"> <span class="d-none d-sm-inline">Project
                </span> Settings
              </a>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/dashboard/templates" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-folder2"></i> <span class="ms-1 d-none d-sm-inline">Templates</span>
          </router-link>
        </li>
        <li>
          <a href="#" class="nav-link px-0 align-middle" @click="inProgress()">
            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Plugins</span></a>
        </li>
      </ul>
      <hr>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import swal from 'sweetalert';

let userinfo = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'SideBar',
  data() {
    return {
      imageLink: userinfo.photoURL,
      shops: null
    };
  },
  methods: {
    inProgress() {
      Swal.fire({
        title: "Coming Soon!",
        text: "We're adding this soon. Check later.",
        icon: "info"
      });
    },
    updateSocials() {
      swal({
        title: 'Update Socials',
        text: `Update your socials so that your customers can reach you.`,
        content: {
          element: 'div',
          attributes: {
            innerHTML: '<label for="swal-input1" style="display: block; font-weight: bold; margin-top: 10px;">WhatsApp Number</label>' +
              '<input id="swal-input1" class="swal-input" placeholder="Your WhatsApp Number" style="width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;">' +
              '<label for="swal-input2" style="display: block; font-weight: bold; margin-top: 10px;">Facebook Username</label>' +
              '<input id="swal-input2" class="swal-input" placeholder="Your Facebook Username" style="width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;">'
          }
        },
        buttons: true,
        dangerMode: false,
      }).then((value) => {
        if (value) {
          let input1 = document.getElementById('swal-input1').value;
          let input2 = document.getElementById('swal-input2').value;

          let socials = `{"whatsapp": "${input1}", "facebook": "${input2}"}`
          localStorage.setItem('socials', socials)

          console.log('First Input:', input1);
          console.log('Second Input:', input2);
        }
      });
    }
  }
}
</script>
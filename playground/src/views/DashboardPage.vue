<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <SideBar />
      <div class="col py-3">
        <div v-if="shops && shops.length > 0 && !socials" class="alert alert-danger alert-dismissible fade show" role="alert">
          <h1>ATTENTION !!!</h1>
          <strong>Update your Socials!</strong> Please, click on the notification button in shops, or project settings 
            navigation in the sidebar.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="dash-content" id="d-cont">
          <div id="i2sw">Manage your Projects
          </div>
          <section-one>
            <div class="one-container">
              <div class="one-child">
                <p class="i0sf">
                  Hi, welcome back!
                </p>
                <p class="i0sg">
                  We hope you're having a great day and are
                  ready to dive back and start creating magic.
                </p>
              </div>
            </div>
          </section-one>
          <div>
            <div id="i2sw">Bootstrap your UI with Peppubuild</div>
            <div class="container row">
              <div class="col">
                <button class="btn btn-outline-primary"><i class="bi bi-stars h2"></i>
                  Build with AI</button>
              </div>
              <div class="col" data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target="#templateModal">
                <button class="btn btn-outline-success"><i class="bi bi-columns-gap h2"></i>
                  Start from a Template</button>
              </div>
              <div class="col" @click="emptyProject()">
                <button class="btn btn-outline-danger"><i class="bi bi-columns h2"></i>
                  Start from Scratch</button>
              </div>
            </div>
            <div class="one-container">
              <div id="i2sw">Build an online store with Peppubuild</div>
              <p class="one-child">With Peppubuild, you can build your own online store faster, gain more traction,
                and sell on Whatsapp/Instagram</p>
              <button class="btn btn-warning" @click="peppuShop()"><i class="bi bi-shop h1"></i>
                Build an Online Store</button>
              <h2>Shops
                <button v-if="shops && shops.length && !socials" type="button" class="btn btn-primary position-relative" @click="updateSocials()">
                  Update your Socials
                  <span
                    class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    <span class="visually-hidden">New alerts</span>
                  </span>
                </button>
              </h2>
              <p class="project-deck" style="text-align: center;"> Continue from where you left off. Please note that
                projects have auto-save turned
                on.</p>
              <div class="row" v-if="shops">
                <div class="col-sm-6" v-for="shop in shops" :key="shop.id">
                  <div class="card project-deck">
                    <div class="card-header">
                      Shops
                    </div>
                    <div class="card-body">
                      <h2 class="card-title">{{ shop.name.split('.').slice(0, -1).join('.') }}</h2>
                      <div class="card-footer">
                        <button @click="deleteProject(shop.id, 'shop')" class="btn btn-danger space">Delete</button>
                        <button @click="projectWorkspace(shop.id, 'shop', shop.name.split('.').slice(0, -1).join('.'))"
                          class="btn btn-primary">Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="!shops">
                <div class="text-center">
                  <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>

          <section-one>
            <div id="inyx">
              <div class="action_btn">
                <h2>Projects</h2>
                <p class="project-deck"> Continue from where you left off. Please note that projects have auto-save turned
                  on.</p>
                <div class="card text-center project-deck">
                  <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="true" href="#">Active</a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">Create New Project</h5>
                    <p class="card-text">With Peppubuild, you can create a new project from scratch, build with our
                      personalised AI, or build with a template</p>
                    <button type="button" class="action_btn btn btn-success" data-bs-toggle="modal"
                      data-bs-target="#exampleModal">New Project</button>
                    <button type="button" class="action_btn btn btn-dark" @click="redirect()">Connect Netlify</button>
                  </div>
                </div>
                <div class="row" v-if="projects">
                  <div class="col-sm-6" v-for="project in projects" :key="project.id">
                    <div class="card project-deck">
                      <div class="card-header">
                        Project
                      </div>
                      <div class="card-body">
                        <h2 class="card-title">{{ project.name.split('.').slice(0, -1).join('.') }}</h2>
                        <div class="card-footer">
                          <button @click="deleteProject(project.id, 'project')"
                            class="btn btn-danger space">Delete</button>
                          <button @click="projectWorkspace(project.id, 'project', project.name.split('.').slice(0, -1).join('.'))"
                            class="btn btn-primary">Continue</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row" v-if="!projects">
                  <div class="text-center">
                    <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal for choosing template-->
            <!-- Modal -->
            <div class="modal fade" id="templateModal" tabindex="-1" aria-labelledby="templateModalLabel"
              aria-hidden="true">
              <div class="modal-dialog modal-lg" v-if="templates">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="templateModalLabel">Recommended for you</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-sm-6 col-lg-4" @click="openWorkspace(template.id, template.value)"
                          data-bs-dismiss="modal" v-for="template in templates" :key="template.id">
                          <img :src="template.properties.url" style="height: 200px;width: 200px; margin-top: 10px;" />
                          {{ template.name.split('.').slice(0, -1).join('.') }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
              <div class="modal-dialog" v-else>
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="templateModalLabel">Recommended for you</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-md-4" data-bs-dismiss="modal">
                          No Template to Show
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Modal for creating project-->

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">New Project</h1>
                  </div>
                  <div class="modal-body">
                    Choose if you'd like to create from an empty workspace or using a template
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="emptyProject()">Empty
                      Workspace</button>
                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-dismiss="modal"
                      data-bs-target="#templateModal">Build with Template</button>
                    <button type="button" class="btn btn-success" @click="aiProject()">Build with AI</button>
                  </div>
                </div>
              </div>
            </div>
          </section-one>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
  * This is the Dashbord page.
  * It calls routes in our server-side 'server.js'.
*/
import { userAuth } from './js/firebase.js';
import Swal from 'sweetalert2';
import SideBar from '../components/SideBar.vue';
import swal from 'sweetalert';
import templatesData from '../assets/templates.json';

// users can use the create template function to create their template.
// The templates button should be changed to 'create new template button'. The user
// will name the template and it should be stored in google docs.
// hence, templates will be fetched from gdrive using the v-if directive.
// At publish, the template will be available in the template option.
// this works with the template method, where id is template name

const serverUrl = 'https://server.peppubuild.com';

export default {
  name: 'DashboardPage',
  components: { SideBar },

  /**
    * On mounted, we call route /projects/:accessToken.
    * This returns and displays all projects.
  */
  async mounted() {
    this.socials = JSON.parse(localStorage.getItem('socials')) || null;
    this.userName = JSON.parse(localStorage.getItem('user')).displayName;
    swal({
  title: "Your Friendly Navigator!",
  text: `Hello ${this.userName}, Let's help you navigate Peppubuild`,
  icon: "info",
  buttons: {
    skip: "Skip",
    next: "Next"
  }
}).then((value) => {
  if (value === "next") {
    swal({
      title: "Why Peppubuild?",
      text: "Peppubuild is a no-code tool that allows you to build websites and online stores without writing any code.",
      icon: "info",
      buttons: {
        skip: "Skip",
        next: "Next"
      }
    }).then((value) => {
      if (value === "next") {
        swal({
          title: "How to Guide?",
          text: `${this.userName}, We're committed to seeing you build. Choose from a template, build from scratch, or use our AI prompt.`,
          icon: "info",
          buttons: {
            skip: "Skip",
            done: "Got it!"
          }
        });
      }
    });
  }
});

    this.getFiles('project');
    this.getFiles('template');
    this.getFiles('shop')
    let json = templatesData;
    for (let i = 0; i < json.length; i++) {
      let obj = json[i];
      this.templates.push(obj)
    }

  },
  data() {
    return {
      projects: null,
      shops: null,
      templates: [],
      userName: '',
      socials: null
    };
  },

  methods: {
    async getFiles(fileType) {
      let accessToken = localStorage.getItem('oauth')
      let url = `${serverUrl}/projects/${accessToken}/${fileType}`
      await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((response) => {
          if (response.status == 401) {
            swal("Oops!", `You're not logged in`, "error").then(() => {
              this.$router.push({ name: "Auth" })
            })
          } else if (response.status == 403) {
            swal("Oops!", `You did not give Peppubuild access. Tick Select all before you click continue.`, "error").then(() => {
              this.$router.push({ name: "Auth" })
            })
          }
          else if (fileType == 'template' && response.length) {
            for (let i = 0; i < response.length; i++) {
              let obj = response[i];
              this.templates.push(obj)
            }
          } else if (fileType == 'project') {
            this.projects = response;
          } else if (fileType == 'shop') {
            this.shops = response;
          }
        })
      })
    },
    /**
      * We call checkState(), to ensure user is still logged in.
    */
    checkState() {
      return new Promise((resolve, reject) => {
        userAuth.onAuthStateChanged((user) => {
          if (user) {
            user.getIdToken(true).then((accessToken) => {
              resolve(document.cookie = `pepputoken=${accessToken}; max-age=3300`)
            })
          }
          reject
        })
      })
    },
    /**
      * The projectWorkspace() function, loads our editor with the current project.
    */
    async projectWorkspace(id, project, name) {
      Swal.showLoading();
      let url = `${serverUrl}/project/${id}`
      localStorage.setItem('projectId', id);
      localStorage.setItem('projectName', name);
      let accessToken = localStorage.getItem('oauth')
      await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: accessToken }),
      }).then((res) => {
        res.json().then((response) => {
          localStorage.setItem('projectTitle', response.title)
          localStorage.setItem('published', response.published)
          localStorage.setItem('products', JSON.stringify(response.products) || '[]')
          localStorage.setItem('gjsProject', JSON.stringify(response.project));
          Swal.close();
          // add publishfront to actually create project
          if (project == 'project') {
            this.$router.push({ name: "Home", params: { id } });
          } else {
            this.$router.push({ name: "Shop", params: { id } });
          }
        })
      })
    },
    async openWorkspace(id, value) {
      id = id || 0;
      value = value || 0;
      swal({
        title: `Build with Template`,
        text: 'What will you like to name your project?',
        content: "input",
        button: {
          text: "Create!",
          closeModal: false,
        },
      })
        .then(async name => {
          if (!name) {
            return swal("You need to input something!");
          }
          try {
            if (id == 0) {
              this.publishFront(JSON.stringify(value), name);
            } else if (value == 0) {
              let url = `${serverUrl}/project/${id}`
              let accessToken = localStorage.getItem('oauth')
              await fetch(url, {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ accessToken: accessToken }),
              }).then((res) => {
                res.json().then((response) => {
                  this.publishFront(JSON.stringify(response.project), name);
                })
              })
            }
          } catch {
            return swal("An error occurred");
          }
        })
      // get content.
      // set the value of gjsProject.
    },
    /**
      * The deleteProject() function, takes the id of the project, calls /pdelete/:id and deletes it..
    */
    async deleteProject(id, project) {
      let accessToken = localStorage.getItem('oauth')
      let url = `${serverUrl}/pdelete/${id}`
      let deleteQuestion = confirm('Do you want to delete this project');
      if (deleteQuestion) {
        Swal.showLoading();
        await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken: accessToken }),
        }).then((res) => {
          if (res.status == 200) {
            Swal.close();
            // delete project from array
            // console.log(this.projects)
            let index = this.projects.findIndex(project => project.id === id)
            if (project == 'project') {
              this.projects.splice(index, 1);
            } else {
              let index = this.shops.findIndex(shop => shop.id === id)
              this.shops.splice(index, 1);
            }
            // alert('Successfully deleted project')                    
          }
        })
      }
    },
    /**
      * The emptyProject() function, allows you to create an empty project.
    */
    async publishFront(gjsProject, name) {
      localStorage.setItem('projectName', name);
      let accessToken = localStorage.getItem('oauth');
      let published = 'No';
      let title = 'Peppubuild - Project';
      let url = `${serverUrl}/publishfront/${name}`;
      let products = '[]';
      await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gjsProject: gjsProject, accessToken: accessToken, title: title, products: products, published: published }),
      }).then((res) => {
        res.json().then((response) => {
          if (res.status == 200) {
            Swal.close();
            let id = response.id
            localStorage.setItem('projectId', id);
            localStorage.setItem('gjsProject', gjsProject);
            localStorage.setItem('published', published);
            localStorage.setItem('projectTitle', title);
            localStorage.setItem('products', products);
            this.$router.push({ name: "Home", params: { id } });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.error,
              footer: '<a href="https://www.docs.peppubuild.com">Why do I have this issue?</a>'
            });
          }
        })
      })
    },

    async createShop(gjsProject, name) {
      localStorage.setItem('projectName', name);
      let accessToken = localStorage.getItem('oauth');
      let published = 'No';
      let title = 'Peppubuild - Project';
      let url = `${serverUrl}/shop/${name}`;
      let products = '[]';
      await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gjsProject: gjsProject, accessToken: accessToken, title: title, products: products, published: published }),
      }).then((res) => {
        res.json().then((response) => {
          if (res.status == 200) {
            Swal.close();
            let id = response.id
            localStorage.setItem('projectId', id);
            localStorage.setItem('gjsProject', gjsProject);
            localStorage.setItem('published', published);
            localStorage.setItem('projectTitle', title);
            localStorage.setItem('products', products);
            this.$router.push({ name: "Shop", params: { id } });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.error,
              footer: '<a href="https://www.docs.peppubuild.com">Why do I have this issue?</a>'
            });
          }
        })
      })
    },
    async emptyProject() {
      let gjsProject = '{}';
      swal({
        title: `Build from Scratch`,
        text: 'What will you like to name your project?',
        content: "input",
        button: {
          text: "Create!",
          closeModal: false,
        },
      })
        .then(name => {
          if (!name) {
            return swal("You need to input something!");
          }
          try {
            this.publishFront(gjsProject, name);
          } catch {
            return swal("An error occurred");
          }
        })
    },
    async peppuShop() {
      let gjsProject = '{}';
      swal({
        title: `Build your Shop`,
        text: 'What will you like to name your project?',
        content: "input",
        button: {
          text: "Create!",
          closeModal: false,
        },
      }).then(name => {
        if (!name) {
          return swal("You need to input something!");
        }
        try {
          localStorage.setItem('New', true);
          this.createShop(gjsProject, name);
        } catch {
          return swal("An error occurred");
        }
      })
    },
    /**
      * The templateProject() function, allows you to create a project from a template.
    */
    async templateProject(id) {
      console.log(this.templates[id])
      this.publishFront(this.templates[id]);
    },
    /**
      * The aiProject() function, allows you to create a project with AI.
    */
    aiProject() {
      alert('coming soon!')
    },

    redirect() {
      // We don't have access to netlify's server (CORS).
      // We'll redirect to authorisation page, instead of axios.
      let state = null
      state = Math.random()
      localStorage.setItem(state, true)
      let clientId = 'k7RNYuUbYsS1Rb99qz74DMA1F1NWHUaW2fw5dSE-URI'
      let redirectURI = 'https://app.peppubuild.com/callback'

      let uri =
        'https://app.netlify.com/authorize?' +
        'client_id=' +
        clientId +
        '&response_type=token' +
        '&redirect_uri=' +
        redirectURI +
        '&state=' +
        state
      window.location.href = uri
    }
  }
}
</script>
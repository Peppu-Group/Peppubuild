<template>
    <div class="container-fluid">
        <div class="row flex-nowrap">
            <SideBar />
            <div class="col py-3">
                <div class="dash-content" id="d-cont">
                    <div id="inyx">
                        <div class="action_btn">
                            <h2>Templates</h2>
                            <div class="card text-center project-deck">
                                <div class="card-header">
                                    <ul class="nav nav-tabs card-header-tabs">
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="true" href="#">Active</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Manage your Templates</h5>
                                    <p class="card-text">In this section, you can manage your templates, publish them to the
                                        general public
                                        or delete them from your local template repository.
                                    </p>
                                    <div class="row pt-5" v-if="templates">
                                        <div class="card col-sm-6 col-lg-4" v-for="template in templates" :key="template.id">
                                            <img :src="template.properties.url" class="card-img-top" alt="">
                                            <div class="card-body">
                                                <h5 class="card-title">{{ template.name.split('.').slice(0, -1).join('.') }}</h5>
                                                <button @click="deleteProject(template.id)" class="btn btn-danger space">Delete</button>
                                                <button class="btn btn-primary space">Publish</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row pt-5" v-if="!templates">
                                        <h2>No Templates to Show</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert';
import SideBar from '../components/SideBar.vue';
// read templates from templates.json page attached to file.
// next, add this.templates.push, to add general (published) templates to recommended templates.
// publish template will take user email and gjs project data. After review, it'll be added to templates.json page or rejected.
const serverUrl = 'http://localhost:1404';
export default {
    name: 'TemplatesPage',
    components: { SideBar},

    data() {
        return {
            templates: null
        };
    },
    async mounted() {
        let accessToken = localStorage.getItem('oauth')
        let url = `${serverUrl}/projects/${accessToken}/template`
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
                else if (response.length){
                    this.templates = response;
                }
            })
        })
    },
    methods: {
     async deleteProject(id) {
      let accessToken = localStorage.getItem('oauth')
      let url = `${serverUrl}/pdelete/${id}`
      let deleteQuestion = confirm(`Do you want to delete this? It'll be removed from you local repository and unpublished. `);
      if (deleteQuestion) {
        await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken: accessToken }),
        }).then((res) => {
          if (res.status == 200) {
            // delete project from array
            // console.log(this.projects)
            let index = this.templates.findIndex(templates => templates.id === id)
            this.templates.splice(index, 1);
            // alert('Successfully deleted project')                    
          }
        })
      }
    }
    }
}
</script>
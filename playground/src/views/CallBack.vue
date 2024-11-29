<template>
    Redirecting ...
</template>

<script>
import { authorise } from './js/netlify/auth'
import swal from 'sweetalert';


export default {
    name: 'CallBack',
    mounted() {
        authorise.call().then(() => {
            let key = localStorage.getItem('autkn');
            if (key) {
                this.$router.push({ name: "Dashboard" }).then(() => {
                    swal("Success!", "Netlify Account is Connected", "success");
                })
            } else {
                swal("Error!", "Connecting Netlify Account Failed", "error");
            }
        })
    }
}
</script>
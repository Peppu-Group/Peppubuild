<template>
    <!---v-if payment status is unpaid-->
    <button type="submit" class="btn btn-success position-relative" @click="makePayment()">
        Upgrade your account to get more features
        <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
            <span class="visually-hidden">New alerts</span>
        </span>
    </button>
</template>

<style></style>

<script>
export default {
    name: 'PaymentStatus',

    created() {
        const script = document.createElement("script");
        script.src = !this.isProduction
            ? "https://ravemodal-dev.herokuapp.com/v3.js"
            : "https://checkout.flutterwave.com/v3.js";
        document.getElementsByTagName("head")[0].appendChild(script);
    },

    methods: {
        makePayment() {
            window.FlutterwaveCheckout({
                public_key: process.env.VUE_APP_PUBLICKEY,
                tx_ref: 'titanic-48981487343MDI0NzMx',
                amount: 5000,
                currency: 'NGN',
                payment_options: 'card, bank, ussd',
                redirect_url: '/dashboard/projects',
                meta: {
                    consumer_id: 23,
                    consumer_mac: '92a3-912ba-1192a',
                },
                customer: {
                    email: 'ugochi.ukpai@peppubuild.com',
                    name: 'Ugochi Ukpai',
                },
                customizations: {
                    title: 'Peppubuild',
                    description: 'Payment for Peppubuild Pro',
                    logo: 'https://www.peppubuild.com/logo.png',
                },
            });
        }
    }
}
</script>
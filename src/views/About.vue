<template>
    <div style = "text-align: center;" v-if="user">
    <h3> This is About Page</h3>
    <h2> Welcome to CPP</h2>
    <h3> Crypto Paper Portfolio (CPP) is an app to track your crypto portfolio</h3>
    </div>
</template>

<script>
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default {
    name: "About",
    data() {
        return {
            user: false
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    }
 }
</script>
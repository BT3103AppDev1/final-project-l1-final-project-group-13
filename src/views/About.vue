<template>
    <br>
   <JoinGroup/>
</template>

<script>
import {getAuth, onAuthStateChanged} from "firebase/auth";
import LeaveGroup from "@/components/LeaveGroup.vue";
import JoinGroup from "@/components/JoinGroup.vue";

export default {
    name: "About",
    components: {
    JoinGroup,
    LeaveGroup
},

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
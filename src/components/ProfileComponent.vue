<template>
  <main>
    <h1 id="mainHead">Profile</h1>
    <div id="pagecontent">
      <br /><br />
      <router-link to="/userprofile">
        <button>
          <span class="material-icons">account_circle</span>
          <div class="text">
            <span class="pageTitle">User Profile</span>
            <br />
            <span class="description">Edit your personal details</span>
          </div>
        </button></router-link
      >
      <router-link to="/preferences">
        <button>
          <span class="material-icons">interests</span>
          <div class="text">
            <span class="pageTitle">Preferences</span>
            <br />
            <span class="description">Change your preferences</span>
          </div>
        </button></router-link
      >
      <!-- <router-link class="button" to="/editemail">
        <button>
          <span class="material-icons">email</span>
          <div class="text">
            <span class="pageTitle">Reset Email</span>
            <br />
            <span class="description">Change your email</span>
          </div>
        </button></router-link
      > -->
      <router-link to="/resetpassword"
        ><button>
          <span class="material-icons">security</span>
          <div class="text">
            <span class="pageTitle">Reset Password</span>
            <br />
            <span class="description">Change your password</span>
          </div>
        </button></router-link
      >
    </div>
  </main>
</template>

<script>
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase.js";

const db = getFirestore(firebaseApp);

export default {
  name: "Profile",

  data() {
    return {
      user: false,
    };
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;

        const docRef = await getDoc(doc(db, "User", String(user.email)));

        if (docRef.exists()) {
          let data = docRef.data();

          // HAVE NOT COMPLETED STEP 2 OF ACCOUNT CREATION
          if (!data.Major) {
            this.$router.push("/createaccount2");
          }
          // Completed account creation
          else {
            return false;
          }
        } else {
          this.$router.push("/createaccount1");
        }
      } else {
        this.$router.push("/");
      }
    });
  },
};
</script>

<style scoped>
main {
  background: var(--background-color, #f5f5f5);
  /* width: 100%;
  height: 100vh;
  position: relative;
  margin-left: 0px; */
}

/* #pagecontent {
  display: grid;
  grid-template-columns: auto;
  grid-auto-rows: auto;
  grid-gap: 20px;
} */

h1 {
  color: #000;
  font-family: ABeeZee;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  float: left;
  margin: 0px;
}

.material-icons {
  font-size: 2rem;
  color: #000000;
  width: 40px;
  height: 0px;
  line-height: 35px;
  float: left;
  margin-left: 5px;
}

.pageTitle {
  color: #000;
  font-family: ABeeZee;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  /* line-height: 0px; */
}

.description {
  color: #000;
  font-family: ABeeZee;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: -5px;
}

.text {
  float: left;
  text-align: left;
  margin-left: 45px;
  margin-top: 5px;
  line-height: 15px;
}

button {
  border-radius: 12px;
  border: 1px solid #000;
  background: #fff;
  width: 220px;
  height: 55px;
  flex-shrink: 0;
  margin: 20px;
  float: left;
}

router-link {
  width: 220px;
}

/* .pageContent {
  float: left;
} */
</style>

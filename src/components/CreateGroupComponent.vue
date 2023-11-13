<template>
  <main>
    <h1 id="mainHead">Create Group</h1>
    <br /><br /><br />

    <div class="body">
      <div class="main">
        <br /><br />
        <div class="secondcontainer">
          <form id="userForm">
            <label for="groupName">Group Name: </label>
            <input
              type="text"
              id="groupName"
              placeholder="In no more than 50 characters..."
              v-model="groupName"
              @input="validateFields"
              required=""
            />
            <br />
            <br />
            <label for="groupSize">Group Size: </label>
            <input
              type="number"
              id="groupSize"
              placeholder="Maximum group size is 10"
              required=""
              v-model="groupSize"
              @input="validateFields"
            />
            <br />
            <br />
            <label for="groupDescription">Group Description: </label>
            <textarea
              type="text"
              id="groupDescription"
              placeholder="In no more than 150 characters..."
              required=""
              v-model="groupDescription"
              @input="validateFields"
              style="height: 100px"
            ></textarea>

            <button id="saveButton" type="button" @click="saveData">
              Create Group
            </button>
            <h2 class="output"></h2>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { firebaseApp } from "../firebase.js";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore(firebaseApp);

console.log("in App");
export default {
  name: "CreateGroupComponent",
  data() {
    return {
      user: false,
      email: "",
      groupName: "",
      groupSize: "",
      groupDescription: "",
      errorMessage: "",
      usedNames: [],
    };
  },
  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        const groups = await getDocs(collection(db, "Group"));
        groups.forEach((doc) => {
          this.usedNames.push(doc.id);
        });
      }
    });
  },

  methods: {
    validateFields() {
      if (this.groupSize > 10) {
        this.errorMessage = "Maximum group size is 10";
        return false;
      }
      else if (this.groupSize < 2) {
        this.errorMessage = "Please enter a valid size";
        return false;
      }
       else if (!this.groupName || !this.groupSize || !this.groupDescription) {
        this.errorMessage = "Please fill in all required fields";
        return false;
      } else {
        this.errorMessage = "";
        return true;
      }
    },
    async saveData() {
      if (!this.validateFields()) {
        alert(this.errorMessage);
      } else if (this.usedNames.includes(this.groupName)) {
        alert("Group name already exists!");
      } else {
        const docRef = doc(db, "Group", this.groupName);
        const data = {
          Description: this.groupDescription,
          Members: [this.email],
          Name: this.groupName,
          NumberOfMembers: 1,
          Requests: [],
          Size: this.groupSize,
          Files: [],
        };
        await setDoc(docRef, data);
        await updateDoc(doc(db, "User", this.email), {
          Groups: arrayUnion(this.groupName),
        });
        alert("Group created successfully!");
        this.$router.push("/home");
      }
    },
  },
};
</script>

<style scoped>
h1, h2, h3, h4, h5, h6, p {
  color: #000;
  font-family: ABeeZee;
  font-style: normal;
  font-weight: 400;
}
main {
  background: var(--background-color, #f5f5f5);
  height: auto;
  width: 100vw;
  position: relative;
}

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

button {
  width: 250px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--standard-yellow, #ffb904);
  background: var(--standard-yellow, #ffb904);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  text-align: center;
  font-family: ABeeZee;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  left: 35%;
  bottom: 10%;
}

.main {
  width: 700px;
  height: 400px;
  border-radius: 20px;
  background: white;
  /* margin: auto; */
  position: relative;
}

label {
  width: 260px;
  float: left;
  text-align: right;
  padding: 8px;
  color: #5a5a5a;
  font-size: 18px;
}

input,
select,
textarea {
  border-radius: 8px;
  border: 1px solid #968888;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  float: left;
  width: 300px;
  height: 40px;
  flex-shrink: 0;
  padding: 12px 12px;
  font-size: 15px;
  color: #000;
  font-family: ABeeZee;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 20px;
}

input::placeholder {
  color: #645b5b;
  font-family: ABeeZee;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  /* padding: 10px; */
}

/* label {
  font-size: larger;
  display: inline-block;
  width: 14%;
  text-align: right;
}
input {
  display: inline-block;
  text-align: left;
  border-radius: 10px;
  border: 1px solid #968888;
  padding: 10px;
  margin: 0px;
} */
/* #groupDetails {
  height: 200px;
} */
</style>

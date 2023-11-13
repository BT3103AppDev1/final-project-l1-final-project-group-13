<template>
  <div id="filesTable">
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Size</th>
          <th>Date Created</th>
          <th>Uploaded By</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.name">
          <td>
            <a :href="file.url" target="_blank"> {{ file.name }} </a>
          </td>
          <td>{{ file.size }}</td>
          <td>{{ file.timeCreated }}</td>
          <td>{{ file.customMetadata.uploadedBy }}</td>
          <td>
            <span
              class="material-icons"
              style="cursor: pointer"
              @click="deleteFile(file.name)"
              >delete</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  ref,
  getDownloadURL,
  listAll,
  getMetadata,
  deleteObject
} from "firebase/storage";
import { firebaseApp, storage } from "../firebase.js";
import {
  doc,
  updateDoc,
  arrayRemove,
  getFirestore
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      user: false,
      files: [],
      email: "",
    };
  },
  props: {
    group: String
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      }
    });
  },
  watch: {
    group: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.fetchData();
        }
      }
    }
  },
  methods: {
    async fetchData() {
      console.log(this.group)
      const listRef = ref(storage, this.group);
      try {
        const res = await listAll(listRef);
        await Promise.all(
          res.items.map(async (itemRef) => {
            console.log("File:", itemRef.name);
            const downloadURL = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);
            const sizeInMB = (metadata.size / (1024 * 1024)).toFixed(2) + " MB";
            const date = new Date(metadata.timeCreated);
            date.setHours(date.getHours());
            const formattedDate = `${date.getDate()} ${date.toLocaleString(
              "default",
              { month: "short" }
            )} ${date.getFullYear()}`;
            this.files.push({
              name: itemRef.name,
              size: sizeInMB,
              timeCreated: formattedDate,
              customMetadata: metadata.customMetadata,
              url: downloadURL,
            });
            console.log(itemRef);
          })
        );
        this.files.sort((a, b) => {
          return new Date(a.timeCreated) - new Date(b.timeCreated);
        });
      } catch (error) {
        console.error("Error listing files:", error);
      }
    },

    async deleteFile(fileName) {
      try {
        if (confirm("Confirm deleting file?")) {
          const fileRef = ref(storage, `${this.group}/` + fileName);
          await deleteObject(fileRef)
          const docRef = await updateDoc(doc(db, "Group", this.group), {
            Files: arrayRemove(fileName), 
          });
          this.$emit("deleted");
          alert("File deleted!");

        }
      } catch (error) {
        console.error("Error deleting file: ", error);
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
#filesTable {
  width: 70%;
  height: 70%;
  margin-left: auto;
  margin-right: auto;
}

#icon {
  font-size: 2rem;
  color: black;
  margin-right: 2px;
}

.material-icons:hover {
  color: red; 
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th,
td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: white;
  border-bottom: 1px solid black;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

a:hover {
  text-decoration: underline;
}

a {
  color: black;
  text-decoration: none;
}
</style>

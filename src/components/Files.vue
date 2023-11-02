<template>
  <div id="uploadFile">
    <label for="file" class="filelabel">
      <span class="material-symbols-outlined" id="icon">upload</span> File
    </label>
    <input
      id="file"
      class="hide-file-input"
      type="file"
      @change="onFileChange($event)"
    />
  </div>

  <div>
    <h2>Image URLs:</h2>
    <div v-for="[key, value] in imageUrls" :key="key">
      <a :href="value" target="_blank">{{ key.name }}</a>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  updateMetadata,
  getMetadata
} from "firebase/storage";
import { firebaseApp, storage } from "../firebase.js";
import { arrayUnion, getFirestore } from "firebase/firestore";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      user: false,
      group: "BT3103",
      imageUrls: new Map(),
    };
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
  methods: {
    async onFileChange($event) {
      const file = $event.target.files[0];
      const fileRef = ref(storage, this.group + "/" + file.name);
      const newMetadata = {
        customMetadata: {
        'uploadedBy': "brandon"//this.user.name
        }
      }
      const uploadTask = uploadBytesResumable(fileRef, file, newMetadata);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },

        
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            
      getMetadata(fileRef).then((metadata) => {
        const size = metadata.size
        console.log(size)
        const custome = metadata.customMetadata.uploadedBy
        console.log(custome)
      })
          });
        }
      );

      await updateDoc(doc(db, "Group", this.group), {
        Files: arrayUnion(file.name),
      });

      const storageRef = ref(storage);

      // List all items in the storage bucket
      listAll(storageRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            console.log("File:", itemRef.name);
            // You can download the file using the itemRef.downloadURL() method
          });
        })
        .catch((error) => {
          console.error("Error listing files:", error);
        });
    },

    async fetchData() {
      const listRef = ref(storage, this.group);
      try {
        const res = await listAll(listRef);
        await Promise.all(
          res.items.map(async (itemRef) => {
            console.log("File:", itemRef.name);
            const u = await getDownloadURL(itemRef);
            this.imageUrls.set(itemRef, u)
            console.log(itemRef);
          })
        );
      } catch (error) {
        console.error("Error listing files:", error);
      }
      console.log(this.imageUrls);
    },
  },

  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.hide-file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.filelabel {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #ffb904;
  padding: 4px;
  border-radius: 0.25rem;
  cursor: pointer;
}

#uploadFile {
  font-family: "AbeeZee", Helvetica;
  text-align: center;
  background-color: #ffb904;
  color: white;
  border-radius: 6px;
  border: 1px solid #ffb904;
  width: 100px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  cursor: pointer;
}

#icon {
  font-size: 2rem;
  color: black;
  margin-right: 2px;
}
</style>
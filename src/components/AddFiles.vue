<template>
  <div id="uploadFile" @change="onFileChange($event)">
    <label for="file" class="filelabel">
      <span class="material-symbols-outlined" id="icon">upload</span> File
    </label>
    <input id="file" class="hide-file-input" type="file" />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getMetadata,
} from "firebase/storage";
import { firebaseApp, storage } from "../firebase.js";
import { arrayUnion, getFirestore } from "firebase/firestore";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      user: false,
      email: "",
      userName: ""
    };
  },
  props: {
    group: String
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
        this.userName = (await getDoc(doc(db, "User", this.email))).data().Name
      }
    });
  },
  methods: {
    async onFileChange($event) {
      try {
        const file = $event.target.files[0];
        const fileName = file.name;
        const fileRef = ref(storage, `${this.group}/${file.name}`);
        const existingFiles = (await getDoc(doc(db, "Group", this.group))).data().Files;

    if (existingFiles.includes(fileName)) {
      alert("File with the same name has already been uploaded!");
      return;
    }
        const newMetadata = {
          customMetadata: {
            uploadedBy: this.userName, 
          },
        };

        const uploadTask = uploadBytesResumable(fileRef, file, newMetadata);
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (error) => {
              // Handle error
              reject(error);
            },
            async () => {
              // Handle successful upload
              try {
                const metadata = await getMetadata(fileRef);
                const size = metadata.size;
                const custom = metadata.customMetadata.uploadedBy;
                console.log(size, custom);
                
                await updateDoc(doc(db, "Group", this.group), {
                  Files: arrayUnion(file.name),
                });

                const noti = {
                  title:
                    this.userName +
                    " has uploaded " +
                    file.name + " in " + this.group +
                    " study group",
                  time: this.formatDate(new Date()),
                };
                const member = (await getDoc(doc(db, "Group", this.group))).data().Members;
                // add uploaded file activity to the notification bar
                for (let i = 0; i < member.length; i++) {
                  await updateDoc(doc(db, "User", member[i]), {
                    Notifications: arrayUnion(noti),
                  });
                }

                alert("File uploaded successfully!");
                this.$emit("uploaded");

                // Resolve the promise to indicate the upload is complete
                resolve();
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
    formatDate(date) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const day = String(date.getDate()).padStart(2, "0");
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours %= 12;
      hours = hours ? hours : 12;

      const formattedDate = `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
      return formattedDate;
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
  width: 120px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

#icon {
  font-size: 2rem;
  color: black;
  margin-right: 10px;
}
</style>

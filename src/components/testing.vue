<template>
      <Multiselect
        v-model="value4"
        mode="tags"
        placeholder="location"
        :options="options"
        class="multiselect"
        :searchable="true"
        :groups="true"
        :close-on-select="false"
      />
</template>

<script>
import firebaseApp from '../firebase.js'
import {getFirestore} from "firebase/firestore"
import {getDoc, doc, setDoc, updateDoc, arrayUnion, getDocs,collection} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Multiselect from '@vueform/multiselect'
const db = getFirestore(firebaseApp);
  
    export default {
      components: { Multiselect },
      data() {
        return {
          value4: [],
          options: []
        }
      },
      async mounted() {
        const docRef = doc(db, "Preference_info_instances", "Course");
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
        Object.keys(data).forEach(key => {
            let values = data[key];
            let obj = {label:key,options:values}
            this.options.push(obj)
        });        
    }
}
 </script>
  
  <style src="@vueform/multiselect/themes/default.css"></style>
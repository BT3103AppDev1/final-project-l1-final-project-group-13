<template>
    <br>
    <div>
      <img v-if="filePreview" :src="filePreview" alt="fileName" style="max-height: 256px">
      <Files @file-updated="captureFile($event)"/>
    </div>
    </template>
    <script>
    import Files from "@/components/Files.vue"
    export default {
      components: { Files },
      data() {
        return {
          // Add two new data properties here to capture the emitted file properties we need
          filePreview: '',
          fileName: ''
        }
      },
      methods: {
        captureFile($event) {
          this.filePreview = $event.previewBase64;
          this.fileName = $event.name;
        }
      }
    }
    </script>
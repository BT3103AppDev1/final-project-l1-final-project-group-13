<template>
  <div class="PageBody">
    <div class="body">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.PageBody {
  background: var(
    --background-color,
    linear-gradient(
      180deg,
      #ffb904 0%,
      rgba(255, 218, 79, 0.86) 52.08%,
      rgba(255, 201, 0, 0.24) 97.4%
    )
  );
  height: 100vh;
  width: 100vw;
  /* position: relative; */
}

.body {
  margin: 0;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

img {
  margin: auto;
  width: 400px;
  mix-blend-mode: multiply;
}
</style>

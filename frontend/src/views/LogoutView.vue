<template>
  <div class="Login">
    <h1>This is Logout Page</h1>
    <div class="alert alert-danger" v-if="logoutError">{{ logoutError }}</div>
    <button class="btn btn-danger" @click="doLogout">Logout</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      logoutError: "",
    };
  },
  methods: {
    doLogout() {
      axios
        .post("/api/auth/token/logout/")
        .then((response) => {
          this.$store.commit("logout");
          this.$router.push("/login");
        })
        .catch((error) => {
          this.logoutError = error.response.data;
        });
    },
  },
};
</script>

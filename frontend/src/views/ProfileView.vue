<template>
  <div class="Profile">
    <h1>This is a profile page</h1>
    <div class="alert alert-success">Hello {{ username }}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    axios
      .get("/api/auth/users/me/")
      .then((response) => {
        this.username = response.data.username;
      })
      .catch((error) => {
        this.$store.commit("logout");
        this.$router.push("/login");
      });
  },
};
</script>

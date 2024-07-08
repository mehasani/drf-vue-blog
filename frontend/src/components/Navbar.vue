<template>
  <div class="Navbar">
    <nav
      id="nav"
      class="navbar navbar-expand-lg navbar-light mb-5"
      style="background-color: #e3f2fd"
    >
      <router-link class="navbar-brand" to="/">Pages</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/profile"
              v-if="$store.state.isAuthenticated"
              >Profile</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/add"
              v-if="$store.state.isAuthenticated"
              >Write an article</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/login"
              v-if="!$store.state.isAuthenticated"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/register"
              v-if="!$store.state.isAuthenticated"
              >Register</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/logout"
              v-if="$store.state.isAuthenticated"
              >Logout</router-link
            >
          </li>
        </ul>
        <form class="form-inline" @submit.prevent="doSearch">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchInput"
          />
          <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      filteredArticles: [],
      searchInput: "",
    };
  },
  methods: {
    doSearch() {
      this.articles = this.$store.getters.getArticles;

      this.filteredArticles = this.articles.filter((article) =>
        article.title.toLowerCase().includes(this.searchInput.toLowerCase())
      );

      this.$store.commit("setArticles", this.filteredArticles);
    },
  },
  watch: {
    searchInput: function (val) {
      if (this.searchInput.length == 0) {
        this.$store.dispatch("getArticlesFromServer");
      }
    },
  },
};
</script>

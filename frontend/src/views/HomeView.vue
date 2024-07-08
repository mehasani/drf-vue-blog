<template>
  <div class="Home">
    <h1 class="text-center mb-5">Home page</h1>
    <article v-if="articles.length" v-for="article in articles">
      <h3>
        <router-link :to="`/article/${article.slug}`">{{
          article.title
        }}</router-link>
      </h3>
      <div>
        {{ article.description }}
        <router-link :to="`/article/${article.slug}`">+ more</router-link>
      </div>
      <hr />
    </article>
    <div class="alert alert-warning" v-if="!articles.length">
      there is not any article
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    articles() {
      return this.$store.getters.getArticles;
    },
  },
  mounted() {
    this.$store.dispatch("getArticlesFromServer");
  },
};
</script>

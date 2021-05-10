<template>
  <div id="app" :class="{ pageEnglish: lang == 'en' }">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters({
      lang: "lang",
    }),
  },
  mounted() {
  },
};
</script>


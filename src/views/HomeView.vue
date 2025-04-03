<template>
  <section>
    <div v-if="loading" class="flex justify-center pt-20">
      <Loader></Loader>
    </div>
    <ul v-else>
      <li v-for="post in posts" :key="post.slug" class="py-7 border-b border-gray-200 relative">
        <div
          class="text-zinc-400 text-xs mb-2 sm:mb-0 sm:absolute sm:left-0 sm:top-8.5 tracking-widest"
        >
          {{ new Date(post.published).toLocaleDateString() }}
        </div>
        <h2 class="hover:text-sky-500 sm:text-xl transition duration-300 sm:ml-24 tracking-wide">
          <RouterLink :to="`/detail/${post.slug}`">
            {{ post.title }}
          </RouterLink>
        </h2>
      </li>
    </ul>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router'
import api from '../api/request'
import Loader from '@/components/Loader.vue'

export default {
  components: {
    RouterLink,
    Loader,
  },
  data() {
    return {
      posts: [],
      postsLimit: 10,
      page: 1,
      loading: false,
    }
  },
  created() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      this.loading = true
      try {
        const res = await api.get(
          `/posts?limit=${this.postsLimit}&offset=${(this.page - 1) * this.postsLimit}`,
        )
        this.posts = res.data.data
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped></style>

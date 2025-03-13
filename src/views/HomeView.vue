<template>
  <ul>
    <li v-for="post in posts" :key="post.slug" class="py-7 border-b border-gray-200 relative">
      <div class="text-zinc-400 text-xs mb-2 sm:mb-0 sm:absolute sm:left-0 sm:top-8.5">
        {{ new Date(post.updated).toLocaleDateString() }}
      </div>
      <h2 class="hover:text-sky-500 font-light sm:text-xl transition duration-300 sm:ml-24">
        <RouterLink :to="`/detail/${post.slug}`">
          {{ post.title }}
        </RouterLink>
      </h2>
    </li>
  </ul>
</template>

<script>
import { RouterLink } from 'vue-router'
import api from '../api/request'

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      posts: [],
      postsLimit: 10,
      page: 1,
    }
  },
  created() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      try {
        const res = await api.get(
          `/posts?limit=${this.postsLimit}&offset=${(this.page - 1) * this.postsLimit}`,
        )
        this.posts = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped></style>

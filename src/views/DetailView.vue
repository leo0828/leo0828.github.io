<template>
  <div class="relative">
    <PostContent v-if="post" :post="post" />
  </div>
</template>

<script>
import api from '../api/request'
import PostContent from '@/components/PostContent.vue'

export default {
  components: {
    PostContent,
  },
  props: ['id'],
  data() {
    return {
      post: null,
    }
  },
  created() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      try {
        const res = await api.get(`/posts/${this.id}`)
        this.post = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped></style>

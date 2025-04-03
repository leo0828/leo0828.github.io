<template>
  <section>
    <div v-if="loading" class="flex justify-center pt-20">
      <Loader></Loader>
    </div>
    <PostContent v-else :post="post" />
  </section>
</template>

<script>
import api from '../api/request'
import PostContent from '@/components/PostContent.vue'
import Loader from '@/components/Loader.vue'

export default {
  components: {
    PostContent,
    Loader,
  },
  props: ['id'],
  data() {
    return {
      post: null,
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
        const res = await api.get(`/posts/${this.id}`)
        this.post = res.data.data
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

<script setup lang="ts">
import { prisma } from "@/lib/prisma";
import PostListItem from "./PostListItem.vue";

const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    author: {
      select: {
        id: true,
        name: true,
      },
    },
    _count: {
      select: {
        comments: true,
      },
    },
  },
  take: 20,
  orderBy: { body: "asc" }, // 同じ著者が並ばないようにしているだけ
});
</script>

<template>
  <h1 class="mb-4 px-6 text-2xl">Recent Posts</h1>
  <ul class="-space-y-px">
    <li v-for="post in posts" :key="post.id">
      <PostListItem :post />
    </li>
  </ul>
</template>

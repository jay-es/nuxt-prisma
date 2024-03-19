<script setup lang="ts">
type Props = {
  post: {
    id: number;
    title: string;
    author: {
      id: number;
      name: string;
    };
    _count: {
      comments: number;
    };
  };
};

defineProps<Props>();
</script>

<template>
  <div class="border-y px-6 py-4">
    <h2 class="mb-4 text-lg">
      <a :href="`/posts/${post.id}`" class="text-black">
        {{ post.title }}
      </a>
    </h2>
    <div class="flex justify-between text-sm text-gray-500">
      <span>
        by
        <a :href="`/users/${post.author.id}`" class="underline">
          {{ post.author.name }}
        </a>
      </span>
      <span>{{ post._count.comments }} comments</span>
    </div>
  </div>
</template>

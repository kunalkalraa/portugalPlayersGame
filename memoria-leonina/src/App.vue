<template>
  <div class="flex h-screen flex-col bg-green-500">
    <nav class="bg-green-700 p-4">
      <div class="container mx-auto">
        <router-link to="/">
          <h1 class="text-xl font-bold text-white">🦁 Memória Leonina</h1>
        </router-link>
      </div>
    </nav>

    <main class="container mx-auto mt-4 flex-1 max-w-4xl">
      <router-view></router-view>
    </main>

    <footer class="mt-4 bg-green-700 py-4 text-white">
      <div class="container mx-auto text-center">
        <p>&copy; {{ year }} - Memória Leonina</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

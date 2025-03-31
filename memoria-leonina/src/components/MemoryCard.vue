<template>
  <article
    :class="{
      flipped: card.flipped,
      matched: card.matched,
    }"
    class="card card-back flex h-72 transform-gpu flex-col rounded-lg border-14 bg-white shadow-lg focus:outline-none"
    @click="handleCardClick"
    :aria-label="card.flipped ? 'Flipped Card' : 'Unflipped Card'"
  >
    <img
      class="h-full w-full rounded-lg object-contain"
      :class="{
        'p-4': !card.flipped,
        'object-cover': card.flipped,
        'object-top': card.flipped,
      }"
      :src="card.flipped ? `.${card.player.image}` : './badge.svg'"
      :alt="card.flipped ? card.player.name : 'Card Back'"
      :aria-label="card.flipped ? card.player.name : 'Card Back'"
      :style="{
        transform: card.flipped ? 'rotateY(180deg)' : '',
      }"
    />
  </article>
</template>

<script setup>
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['flip'])

function handleCardClick() {
  emit('flip', props.card)
}
</script>

<style lang="scss" scoped>
.card {
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  @media screen and (max-width: 768px) {
    height: 220px;
  }
}

.card-back {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.card-back:hover {
  transform: scale(1.02);
}

.card-back:active {
  transform: scale(0.8);
}

.card-back.flipped {
  transform: rotateY(180deg);
  transition: transform 0.2s ease-in-out;
}

.card-back.matched {
  cursor: default;
}
</style>

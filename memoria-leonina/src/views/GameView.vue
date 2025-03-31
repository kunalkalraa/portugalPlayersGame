<template>
  <section class="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
    <MemoryCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @click="handleCardClick(card)"
      :disabled="card.disabled"
    />
  </section>
</template>
<script setup>
import confetti from 'canvas-confetti'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { nextTick, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

import MemoryCard from '../components/MemoryCard.vue'
import useImagePreloader from '../composables/useImagePreloader'
import useMemoryGame from '../composables/useMemoryGame'
import useSound from '../composables/useSound'

const {
  cards,
  flipCard,
  handleMatchedCards,
  isMatching,
  isVictory,
  resetGame,
} = useMemoryGame()
const router = useRouter()
const { playVictorySound, playFlipSound } = useSound()
const { preloadImages } = useImagePreloader()
const VICTORY_DELAY_MS = 1000

const preload = async () => {
  const imagesToPreload = cards.value.map(card => card.player.image)

  await preloadImages(imagesToPreload)
}

// Preload images when cards change
watch(cards, () => {
  preload()
})

// Watch the victory state and handle it when the user wins
watch(isVictory, victory => {
  if (victory) {
    handleVictory()
  }
})

/**
 * Handles the beforeRouteLeave navigation guard.
 * This guard is called whenever the user tries to leave the route - we can use it
 * to ask the user if they really want to leave the game.
 */
onBeforeRouteLeave(async () => {
  const hasInteractedWithCards = cards.value.some(
    card => card.flipped || card.matched,
  )

  if (!isVictory.value && hasInteractedWithCards) {
    const answer = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will lose your progress!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, leave the game!',
      cancelButtonText: 'No, stay',
    })

    return answer.isConfirmed
  }

  return true
})

/**
 * Handles the click event when a card is clicked.
 *
 * @param {Card} card - The card that was clicked.
 */
function handleCardClick(card) {
  if (canFlipCard(card) && !isMatching.value) {
    flipCard(card)
    playFlipSound()
    handleMatchedCards()
  }
}

/**
 * Checks if a card can be flipped.
 *
 * @param {Card} card - The card to check.
 * @returns {boolean} - True if the card can be flipped, false otherwise.
 */
function canFlipCard(card) {
  return !card.matched && !card.flipped && !card.disabled
}

/**
 * Handles the victory condition.
 */
async function handleVictory() {
  confetti({
    particleCount: 150,
    spread: 180,
  })
  playVictorySound()

  setTimeout(async () => {
    const answer = await Swal.fire({
      title: 'You won!',
      text: 'Do you want to play again?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, play again!',
      cancelButtonText: 'No, leave',
    })

    if (answer.isConfirmed) {
      resetGame()
      isVictory.value = false
    } else {
      router.push({ name: 'Home' })
    }
  }, VICTORY_DELAY_MS)
}

nextTick(preload) // Preload images when the component is mounted
</script>

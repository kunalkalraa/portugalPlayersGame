import { ref } from 'vue'

import usePlayersList from './usePlayersList'
import useSound from './useSound'

/**
 * Represents a card in the game.
 *
 * @typedef {Object} Card
 * @property {number} id - The unique identifier of the card.
 * @property {boolean} flipped - Indicates if the card is currently flipped.
 * @property {boolean} matched - Indicates if the card has been matched with another card.
 * @property {Player} player - The player associated with the card.
 */

/**
 * Represents a player in the game.
 *
 * @typedef {Object} Player
 * @property {number} id - The unique identifier of the player.
 * @property {string} name - The name of the player.
 * @property {string} image - The path to the player's image.
 */

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 *
 * @param {Array} array - The array to be shuffled.
 */
function shuffleArray(array) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

/**
 * Creates and initializes the game cards.
 *
 * @param {number} pairCount - The number of pairs of cards to create.
 * @param {Array<Player>} players - The array of players to create cards for.
 *
 * @returns {Array<Card>} - An array of shuffled game cards.
 */
function initializeGameCards(pairCount, players) {
  const cardArray = []
  for (let i = 0; i < pairCount; i++) {
    // Create a card and its matching pair
    const playerIndex = i % players.length
    const newCard = () => ({
      flipped: false,
      matched: false,
      player: players[playerIndex],
    })

    cardArray.push(newCard(i))
    cardArray.push(newCard(i + pairCount)) // Matching pair
  }

  return shuffleArray(cardArray)
}

/**
 * Represents the game logic for the memory card game.
 *
 * @param {number} pairCount - The number of pairs of cards to create.
 * @property {Ref<Array<Card>>} cards - A ref containing the array of game cards.
 * @property {Function} flipCard - A function to flip a card.
 * @property {Function} checkMatch - A function to check if two cards match.
 * @property {Function} checkVictory - A function to check if the player has won.
 * @property {Function} resetGame - A function to reset the game.
 *
 * @returns {Object} An object containing the game logic.
 */
export default function useMemoryGame(pairCount = 4) {
  const { players } = usePlayersList()
  // TODO: remove sound dependency from this composable
  const { playMatchSound } = useSound()
  const initialPlayers = players.value.slice() // Copy the array
  const isMatching = ref(false)
  const isVictory = ref(false)
  const cards = ref([])

  // Initialize the game when the composable is created
  initializeGame(pairCount)

  /**
   * Creates and initializes the game cards with shuffled players.
   */
  function initializeGame() {
    const shuffledPlayers = shuffleArray(initialPlayers)
    cards.value = initializeGameCards(pairCount, shuffledPlayers)
  }

  /**
   * Flips a card (toggles its flipped state).
   *
   * @param {Card} card - The card to flip.
   */
  function flipCard(card) {
    card.flipped = !card.flipped
  }

  /**
   * Checks if two cards match.
   *
   * @param {Card} card1 - The first card.
   * @param {Card} card2 - The second card.
   *
   * @returns {boolean} - True if the cards match, false otherwise.
   */
  function checkMatch(card1, card2) {
    if (card1.player.id === card2.player.id) {
      card1.matched = true
      card2.matched = true

      return true
    }

    return false
  }

  /**
   * Checks if the player has won the game.
   *
   * @returns {boolean} - True if the player has won, false otherwise.
   */
  function checkVictory() {
    return cards.value.every(card => card.matched)
  }

  /**
   * Resets the game by creating and shuffling a new set of cards.
   */
  function resetGame() {
    isVictory.value = false
    initializeGame(pairCount)
  }

  function handleMatchedCards() {
    const PLAY_MATCH_SOUND_DELAY = 150 // Delay before playing match sound
    const FLIP_BACK_DELAY = 1000 // Delay after cards don't match
    const flippedCards = cards.value.filter(c => c.flipped && !c.matched)

    if (flippedCards.length === 2) {
      isMatching.value = true // Disable further card clicks during matching
      const [card1, card2] = flippedCards

      if (checkMatch(card1, card2)) {
        setTimeout(() => {
          playMatchSound()
        }, PLAY_MATCH_SOUND_DELAY)

        if (checkVictory()) {
          handleVictory()
        }

        isMatching.value = false
      } else {
        setTimeout(() => {
          flipCard(card1)
          flipCard(card2)
          isMatching.value = false
        }, FLIP_BACK_DELAY)
      }
    }
  }

  /**
   * Handles the victory state.
   */
  function handleVictory() {
    isVictory.value = true
  }

  return {
    isMatching,
    isVictory,
    cards,
    flipCard,
    checkMatch,
    checkVictory,
    resetGame,
    handleMatchedCards,
  }
}

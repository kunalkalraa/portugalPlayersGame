import { Howl } from 'howler'

const CARD_FLIP_SOUND_URL = './audio/flip.ogg'
const TADA_VICTORY_SOUND_URL = './audio/tada.flac'
const BLOB_SOUND_URL = './audio/blob.ogg'

const cardFlipSound = new Howl({
  src: [CARD_FLIP_SOUND_URL],
})

const tadaVictorySound = new Howl({
  src: [TADA_VICTORY_SOUND_URL],
  volume: 0.2,
})

const matchSound = new Howl({
  src: [BLOB_SOUND_URL],
})

export default function useSound() {
  const playFlipSound = () => {
    cardFlipSound.play()
  }

  const playVictorySound = () => {
    tadaVictorySound.play()
  }

  const playMatchSound = () => {
    matchSound.play()
  }

  return {
    playFlipSound,
    playVictorySound,
    playMatchSound,
  }
}

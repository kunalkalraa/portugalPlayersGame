import { ref } from 'vue'

/**
 * Represents a player in the game.
 */
const players = ref([
  {
    id: 1,
    image: '/players/afonso_moreira.jpg',
    name: 'Afonso Moreira',
  },
  { id: 2, image: '/players/antonio_adan.jpg', name: 'Antonio Adan' },
  {
    id: 3,
    image: '/players/daniel_braganca.jpg',
    name: 'Daniel Bragança',
  },
  { id: 4, image: '/players/daurio_essugo.jpg', name: 'Daurio Essugo' },
  { id: 5, image: '/players/diego_callai.jpg', name: 'Diego Callai' },
  {
    id: 6,
    image: '/players/francisco_trincao.jpg',
    name: 'Francisco Trincão',
  },
  { id: 7, image: '/players/franco_israel.jpg', name: 'Franco Israel' },
  {
    id: 8,
    image: '/players/goncalo_inacio.jpg',
    name: 'Gonçalo Inácio',
  },
  {
    id: 9,
    image: '/players/hidemasa_morita.jpg',
    name: 'Hidemasa Morita',
  },
  {
    id: 10,
    image: '/players/ivan_fresneda.jpg',
    name: 'Ivan Fresneda',
  },
  { id: 11, image: '/players/luis_neto.jpg', name: 'Luís Neto' },
  {
    id: 12,
    image: '/players/marcus_edwards.jpg',
    name: 'Marcus Edwards',
  },
  { id: 13, image: '/players/matheus_reis.jpg', name: 'Matheus Reis' },
  {
    id: 14,
    image: '/players/morten_hjulmand.jpg',
    name: 'Morten Hjulmand',
  },
  { id: 15, image: '/players/nuno_santos.jpg', name: 'Nuno Santos' },
  {
    id: 16,
    image: '/players/ousmane_diomande.jpg',
    name: 'Ousmane Diomande',
  },
  { id: 17, image: '/players/paulinho.jpg', name: 'Paulinho.jpg' },
  {
    id: 18,
    image: '/players/pedro_goncoalves.jpg',
    name: 'Pedro Gonçalves',
  },
  {
    id: 19,
    image: '/players/ricardo_esgaio.jpg',
    name: 'Ricardo Esgaio',
  },
  {
    id: 20,
    image: '/players/sebastian_coates.jpg',
    name: 'Sebastian Coates',
  },
  { id: 21, image: '/players/st._juste.jpg', name: 'St. Juste' },
  {
    id: 22,
    image: '/players/viktor_gyoekeres.jpg',
    name: 'Viktor Gyoekeres',
  },
])

export default function usePlayersList() {
  return { players }
}

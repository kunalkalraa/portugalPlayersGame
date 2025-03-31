import { createApp } from 'vue'

import App from './App.vue'
import './assets/styles/app.scss'
import routes from './routes/routes.js'
import './style.css'

const app = createApp(App)

app.use(routes)
app.mount('#app')

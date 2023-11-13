import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

export default function installVuetify(app) {
  const vuetify = createVuetify();
  app.use(vuetify);
}
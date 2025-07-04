import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square } from 'ionicons/icons';


/* TailwindCSS */
import './theme/app.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* High contrast theme Ionic */
import '@ionic/react/css/palettes/high-contrast.system.css';
import '@ionic/react/css/palettes/high-contrast.always.css';

/* Theme variables */
import './theme/variables.css';
import MyBooks from './pages/MyBooks';
import ReadingNotes from './pages/ReadingNotes';
import { AddNewNoteProvider } from './context/AddNewNoteContext';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <AddNewNoteProvider>
            <Route exact path="/my-books">
              <MyBooks />
            </Route>
            <Route exact path="/reading-notes">
              <ReadingNotes />
            </Route>
            <Route exact path="/">
              <Redirect to="/my-books" />
            </Route>
          </AddNewNoteProvider>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="my-books" href="/my-books">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>My Books</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/reading-notes">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Reading Notes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

import React, { useState, useEffect } from 'react';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonList, IonFab, IonFabButton, IonIcon} from '@ionic/react';
import {firestore} from '../Firebase';
import {Entry, toEntry} from '../models';
import { useAuth } from '../auth';
import {add as addIcon} from 'ionicons/icons'


const Home: React.FC = () => {
  const {userId} = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const todosRef = firestore
      .collection('users')
      .doc(userId)
      .collection('todos');
      return todosRef.onSnapshot(({docs}) => setEntries(docs.map(toEntry)));
  }, [userId]); // empty array means it will only run once when the component is mounted
  return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonList>
        {entries.map((entry) => 
          <IonItem 
            button 
            key={entry.id}
            routerLink={`/my/entries/view/${entry.id}`}>{entry.title}</IonItem>
        )}
      </IonList>
      <IonFab vertical="bottom" horizontal="end">
        <IonFabButton routerLink="/my/entries/add">
          <IonIcon icon={addIcon} />
        </IonFabButton>
      </IonFab>
    </IonContent>
  </IonPage>
  );
}

export default Home;

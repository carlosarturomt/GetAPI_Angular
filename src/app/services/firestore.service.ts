import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  /* getData(collectionName: string): Observable<any[]> {
        return this.firestore.collection(collectionName).valueChanges();
    }

    getDocument(collectionName: string, docId: string): Observable<any> {
        return this.firestore.collection(collectionName).doc(docId).valueChanges();
    } */

  // Método para obtener los datos de userAuth
  getUserAuth(userId: string): Observable<any> {
    return this.firestore.collection('userAuth').doc(userId).valueChanges();
  }

  // Método para obtener los datos de userData
  getUserData(userId: string): Observable<any> {
    return this.firestore.collection('userData').doc(userId).valueChanges();
  }

  // Método para guardar o actualizar los datos en userData
  saveUserData(userId: string, data: any): Promise<void> {
    return this.firestore
      .collection('userData')
      .doc(userId)
      .set(data, { merge: true });
  }
}

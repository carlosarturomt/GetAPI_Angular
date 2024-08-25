import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { FirestoreService } from '@app/services/firestore.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: any = null;
  isLoading = false;
  userAuthData: any = {}; // Datos de la colección userAuth
  userData: any = {}; // Datos de la colección userData
  isEditing = false;
  editedName = '';
  editedDescription = '';

  objectKeys = Object.keys;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.authService.getUserState().subscribe((user) => {
      this.user = user;
      if (user) {
        this.loadUserData(user.uid);
      }
    });
  }

  loadUserData(userId: string) {
    this.isLoading = true;

    // Cargar datos de autenticación
    this.firestoreService.getUserAuth(userId).subscribe((authData) => {
      this.userAuthData = authData || {};
    });

    // Cargar datos generales del usuario
    this.firestoreService.getUserData(userId).subscribe(
      (data) => {
        this.userData = data || {}; // Si no hay datos, inicializa como un objeto vacío
        this.editedName = this.userData.name || '';
        this.editedDescription = this.userData.description || '';
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading data', error);
        this.isLoading = false;
      }
    );
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing; // Cambia el estado de edición
    if (!this.isEditing) {
      // Guardar datos si se sale del modo de edición
      this.saveProfileData();
    }
  }

  saveProfileData() {
    if (this.user) {
      const data = {
        name: this.editedName,
        description: this.editedDescription,
      };
      this.firestoreService
        .saveUserData(this.user.uid, data)
        .then(() => {
          console.log('Datos guardados exitosamente');
        })
        .catch((error) => {
          console.error('Error al guardar los datos', error);
        });
    }
  }
}

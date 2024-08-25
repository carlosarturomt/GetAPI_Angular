import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '@app/services/firestore.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user: any = null;
  isLoading = false;
  firestoreData: any[] = [];

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.authService.getUserState().subscribe((user) => {
      this.user = user;
      this.loadData();
    });
  }

  loadData() {
    this.isLoading = true;
    //this.firestoreService.getData('userAuth')
    this.firestoreService.getUserData('userAuth').subscribe(
      (data) => {
        this.firestoreData = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading data', error);
        this.isLoading = false;
      }
    );
  }
}

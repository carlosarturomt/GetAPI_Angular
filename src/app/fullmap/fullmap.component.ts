import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { FirestoreService } from '@app/services/firestore.service';

@Component({
  selector: 'app-fullmap',
  templateUrl: './fullmap.component.html',
})

export class FullmapComponent implements OnInit {
  user: any = null;
  isLoading = false;
  userAuthData: any = {};
  userData: any = {};
  nameSelected = '';
  descriptionSelected = '';


  private apiUrl = 'https://api.datos.gob.mx/v1/condiciones-atmosfericas';
  private currentInfoWindow: google.maps.InfoWindow | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.loadGoogleMaps();
    this.authService.getUserState().subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.initMap();
      }
    });
  }

  loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2fYAoBMNMlZxeweURNZfWas9KvS3AdZk&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    (window as any).initMap = () => this.initMap();
  }

  initMap() {
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(23.6345, -102.5528),
      zoom: 5,
    };

    const mapElement = document.getElementById('map') as HTMLElement;
    if (mapElement) {
      const map = new google.maps.Map(mapElement, mapOptions);

      this.http.get(this.apiUrl).subscribe((data: any) => {
        this.addMarkers(map, data.results);
      });
    } else {
      console.error('No se encontró el elemento del mapa.');
    }
  }

  addMarkers(map: google.maps.Map, locations: any[]) {
    locations.forEach((location) => {
      const latLng = new google.maps.LatLng(
        Number(location.latitude),
        Number(location.longitude)
      );

      const marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: location.name,
      });

      const infoWindowContent = this.createInfoWindowContent(location);

      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
      });

      marker.addListener('click', () => {
        if (this.currentInfoWindow) {
          this.currentInfoWindow.close();
        }

        this.nameSelected = location.name;
        this.descriptionSelected = location.skydescriptionlong;

        infoWindow.open(map, marker);
        this.currentInfoWindow = infoWindow;

        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          const saveButton = document.querySelector('.save-favorites-btn') as HTMLButtonElement;
          if (saveButton) {
            saveButton.addEventListener('click', () => this.saveApiData());
          }
        });
      });
    });
  }

  createInfoWindowContent(location: any): string {
    let content = /*html*/`
      <h3 class="font-semibold uppercase flex items-center gap-2">
        <span class="relative h-[35px] flex items-center">
          <i class="material-icons text-[#009dd1]">cloud</i>
          <i class="material-icons text-yellow-500 absolute -right-1 top-0">wb_sunny</i>
        </span>
        <span class="text-[#009dd1] text-lg">${location.name}</span>
      </h3>
      <p class="text-[#009dd1] text-base -mt-2">${location.skydescriptionlong}</p>
    `;

    if (this.user) {
      content += /*html*/`
        <button class="save-favorites-btn tracking-widest uppercase my-2 text-xs text-white rounded-full py-2 px-4 transition-colors duration-700 bg-[#009dd1] hover:bg-[#009dd1]/80">Guardar en favoritos</button>
      `;
    }

    return content;
  }

  saveApiData() {
    if (this.user) {
      const data = {
        favorites: {
          [this.nameSelected] : {
            name: this.nameSelected,
            description: this.descriptionSelected,
          }
        }
      };
      this.firestoreService.saveUserData(this.user.uid, data).then(() => {
        alert('Datos guardados exitosamente. Puedes ver tus Favoritos en tu perfil.');
      }).catch(error => {
        console.error('Error al guardar los datos', error);
      });
    }
  }

}

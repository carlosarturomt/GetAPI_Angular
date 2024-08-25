import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar solicitudes HTTP

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  private apiUrl = 'https://api.datos.gob.mx/v1/condiciones-atmosfericas';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadGoogleMaps();
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
      center: new google.maps.LatLng(23.6345, -102.5528), // Coordenadas
      zoom: 4,
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

      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${location.name}</h3><p>${location.skydescriptionlong}</p>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }
}

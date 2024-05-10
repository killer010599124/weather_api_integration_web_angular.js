import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface WeatherData {
  datetime: string;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  windspeed: number;
  windgust: number;
  winddir: number;
  pressure: number;
  visibility: number;
  cloudcover: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather';
  location = '';

  weatherData: WeatherData[] | null = null;

   constructor(private http: HttpClient) {}

  async searchWeather() {
    try {
      // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hongkong?unitGroup=us&key=3C8TRCWYPKSPU83H6U8CJ5CUR&contentType=json
      const data = await this.http.get<any>(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.location}?unitGroup=us&key=3C8TRCWYPKSPU83H6U8CJ5CUR&contentType=json`).toPromise();
      this.weatherData = data.days;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
}

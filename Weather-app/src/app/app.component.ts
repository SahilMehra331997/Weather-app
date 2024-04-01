import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'Weather-app';
  city: string = '';
  weatherData: WeatherData | null = null;
  error: string | null = null;
  date=new Date;
  time: any;
  constructor(private http: HttpClient) {
     this.time = this.date.getTime();
     console.log(this.time);
  }

  getWeather() {
    const apiKey = '14f0aa872f37c96c45c486595a9ed74d'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&units=metric`;
    

    this.http.get<WeatherData>(apiUrl)
      .subscribe(
        (response) => {
          this.weatherData = response;
          this.error = null;
        },
        (error) => {
          this.weatherData = null;
          this.error = 'Error fetching weather data.';
        }
      );
  }
}

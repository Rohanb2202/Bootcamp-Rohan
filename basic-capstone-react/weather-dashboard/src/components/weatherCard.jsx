import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { X, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind } from 'lucide-react';

const getWeatherIcon = (weatherMain) => {
  const icons = {
    Clear: <Sun className="h-16 w-16 text-yellow-400" />,
    Clouds: <Cloud className="h-16 w-16 text-gray-400" />,
    Rain: <CloudRain className="h-16 w-16 text-blue-400" />,
    Snow: <CloudSnow className="h-16 w-16 text-blue-200" />,
    Thunderstorm: <CloudLightning className="h-16 w-16 text-yellow-500" />,
    Drizzle: <CloudRain className="h-16 w-16 text-blue-300" />,
    Mist: <CloudFog className="h-16 w-16 text-gray-400" />,
    Smoke: <CloudFog className="h-16 w-16 text-gray-600" />,
    Haze: <CloudFog className="h-16 w-16 text-gray-400" />,
    Dust: <Wind className="h-16 w-16 text-orange-300" />,
    Fog: <CloudFog className="h-16 w-16 text-gray-400" />,
    Sand: <Wind className="h-16 w-16 text-orange-300" />,
    Ash: <CloudFog className="h-16 w-16 text-gray-600" />,
    Squall: <Wind className="h-16 w-16 text-blue-600" />,
    Tornado: <Wind className="h-16 w-16 text-gray-700" />
  };
  return icons[weatherMain] || <Sun className="h-16 w-16 text-yellow-400" />;
};

const getWeatherBackground = (weatherMain, isNight = false) => {
  // Using placeholder images instead of external URLs
  // We'll use different placeholder dimensions to simulate different images
  const backgrounds = {
    Clear: '/api/placeholder/800/600', // Sunny sky
    Clouds: '/api/placeholder/800/500', // Cloudy sky
    Rain: '/api/placeholder/700/500', // Rainy scene
    Snow: '/api/placeholder/800/550', // Snowy landscape
    Thunderstorm: '/api/placeholder/750/500', // Storm clouds
    Drizzle: '/api/placeholder/800/450', // Light rain
    Mist: '/api/placeholder/700/600', // Foggy scene
    Smoke: '/api/placeholder/750/550', // Hazy scene
    Haze: '/api/placeholder/800/500', // Hazy scene
    Dust: '/api/placeholder/700/500', // Dusty scene
    Fog: '/api/placeholder/750/600', // Foggy scene
    Sand: '/api/placeholder/800/550', // Sandy scene
    Ash: '/api/placeholder/700/550', // Ashy scene
    Squall: '/api/placeholder/750/500', // Stormy scene
    Tornado: '/api/placeholder/800/600', // Extreme weather
  };
  return backgrounds[weatherMain] || backgrounds.Clear;
};

export default function WeatherCard({ city, onRemove, showRemoveButton = true }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = 'e031cbb83aa1a7b7715813ab75860305';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [city]);

  if (error) {
    return (
      <Card className="relative bg-destructive/10 text-destructive">
        {showRemoveButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <CardContent className="pt-6">
          <p className="text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </CardContent>
      </Card>
    );
  }

  const isNight = weatherData.weather[0].icon.includes('n');
  const bgImage = getWeatherBackground(weatherData.weather[0].main, isNight);

  return (
    <Card className="relative overflow-hidden group transition-all duration-300 hover:shadow-xl">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
      >
        <img 
          src={bgImage}
          alt="weather background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>
      <div className="relative z-10 text-white">
        {showRemoveButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-white hover:bg-white/20"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{city}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl font-bold">
              {Math.round(weatherData.main.temp)}°C
            </span>
            <div className="flex flex-col items-center">
              {getWeatherIcon(weatherData.weather[0].main)}
              <span className="capitalize text-lg mt-2">
                {weatherData.weather[0].description}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🌡️", label: "Feels like", value: `${Math.round(weatherData.main.feels_like)}°C` },
              { icon: "💧", label: "Humidity", value: `${weatherData.main.humidity}%` },
              { icon: "💨", label: "Wind", value: `${Math.round(weatherData.wind.speed * 3.6)} km/h` },
              { icon: "🌡️", label: "Pressure", value: `${weatherData.main.pressure} hPa` },
              { icon: "👁️", label: "Visibility", value: `${(weatherData.visibility / 1000).toFixed(1)} km` },
              { icon: "☁️", label: "Cloud Cover", value: `${weatherData.clouds.all}%` }
            ].map((detail, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md rounded-lg hover:-translate-y-0.5 transition-all duration-300 hover:bg-white/20"
              >
                <span className="text-2xl">{detail.icon}</span>
                <div>
                  <p className="text-sm text-white/70">{detail.label}</p>
                  <p className="font-semibold">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
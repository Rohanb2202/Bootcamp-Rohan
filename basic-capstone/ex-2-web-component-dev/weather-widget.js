class CityWeather extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._city = '';
        this.API_KEY = 'e031cbb83aa1a7b7715813ab75860305';
    }

    static get observedAttributes() {
        return ['city'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'city' && oldValue !== newValue) {
            this._city = newValue;
            this.updateDisplay();
            this.fetchWeather();
        }
    }

    connectedCallback() {
        this.updateDisplay();
        if (this._city) {
            this.fetchWeather();
        }
    }

    getWeatherBackground(weatherCode) {
        // Comprehensive background mapping for all weather conditions
        const bgMap = {
            // Clear sky
            '01d': 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1562619425-c307bb31a374?w=800&q=80")',
            '01n': 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1532978879514-6cb2cac0c50f?w=800&q=80")',
            
            // Few clouds
            '02d': 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&q=80")',
            '02n': 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1573011201784-7ad0bf3037d6?w=800&q=80")',
            
            // Scattered clouds
            '03d': 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80")',
            '03n': 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80")',
            
            // Broken clouds
            '04d': 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80")',
            '04n': 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80")',
            
            // Shower rain
            '09d': 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&q=80")',
            '09n': 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&q=80")',
            
            // Rain
            '10d': 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&q=80")',
            '10n': 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&q=80")',
            
            // Thunderstorm
            '11d': 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&q=80")',
            '11n': 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&q=80")',
            
            // Snow
            '13d': 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=800&q=80")',
            '13n': 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=800&q=80")',
            
            // Mist/fog
            '50d': 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://images.unsplash.com/photo-1543968996-ee822b8176ba?w=800&q=80")',
            '50n': 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1543968996-ee822b8176ba?w=800&q=80")'
        };
        
        return bgMap[weatherCode] || bgMap['01d']; // Default to clear day if no match
    }

    updateDisplay() {
        this.shadowRoot.innerHTML = `
            <style>
                .weather-card {
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                    font-family: system-ui, sans-serif;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    background-size: cover;
                    background-position: center;
                    min-height: 400px;
                }
                
                .weather-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: inherit;
                    filter: blur(2px);
                    z-index: -1;
                }
                
                .remove-button {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(255, 0, 0, 0.1);
                    border: none;
                    color: #ff3333;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    transition: all 0.2s;
                    z-index: 2;
                }

                .remove-button:hover {
                    background: rgba(255, 0, 0, 0.2);
                    transform: scale(1.1);
                }

                .city-name {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    color: #1a1a1a;
                    text-transform: capitalize;
                    position: relative;
                    z-index: 1;
                }
                
                .weather-info {
                    position: relative;
                    z-index: 1;
                }
                
                .temperature-container {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin: 1.5rem 0;
                }
                
                .temperature {
                    font-size: 3.5rem;
                    font-weight: bold;
                    color: #1a1a1a;
                }
                
                .weather-icon {
                    width: 64px;
                    height: 64px;
                }
                
                .description {
                    font-size: 1.2rem;
                    color: #4a4a4a;
                    text-transform: capitalize;
                    margin-bottom: 1.5rem;
                }
                
                .weather-details {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    background: rgba(255, 255, 255, 0.5);
                    padding: 1rem;
                    border-radius: 8px;
                }

                .detail {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 8px;
                    transition: transform 0.2s;
                }

                .detail:hover {
                    transform: translateY(-2px);
                }

                .detail-icon {
                    font-size: 1.5rem;
                }

                .detail-info {
                    flex: 1;
                }

                .detail-label {
                    font-size: 0.875rem;
                    color: #666;
                    margin-bottom: 0.25rem;
                }

                .detail-value {
                    font-weight: bold;
                    color: #1a1a1a;
                }

                .loading-spinner {
                    display: inline-block;
                    width: 2rem;
                    height: 2rem;
                    border: 3px solid rgba(0, 0, 0, 0.1);
                    border-radius: 50%;
                    border-top-color: #0083b0;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                .error {
                    padding: 1rem;
                    background: rgba(255, 0, 0, 0.1);
                    border-radius: 8px;
                    color: #ff3333;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
            </style>
            
            <div class="weather-card">
                <button class="remove-button">×</button>
                <div class="city-name">${this._city}</div>
                <div class="weather-info">
                    <div class="loading-spinner"></div>
                </div>
            </div>
        `;

        // Add event listener for remove button
        const removeButton = this.shadowRoot.querySelector('.remove-button');
        removeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent('cityRemoved', {
                bubbles: true,
                composed: true,
                detail: { city: this._city }
            }));
            this.remove();
        });
    }
    async fetchWeather() {
        const weatherInfo = this.shadowRoot.querySelector('.weather-info');
        const weatherCard = this.shadowRoot.querySelector('.weather-card');
        
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this._city)}&units=metric&appid=${this.API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            
            // Update background image based on weather condition
            weatherCard.style.backgroundImage = this.getWeatherBackground(data.weather[0].icon);
            
            weatherInfo.innerHTML = `
                <div class="temperature-container">
                    <div class="temperature">${Math.round(data.main.temp)}°C</div>
                    <img class="weather-icon" 
                         src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                         alt="${data.weather[0].description}"
                    />
                </div>
                <div class="description">${data.weather[0].description}</div>
                <div class="weather-details">
                    <div class="detail">
                        <span class="detail-icon">🌡️</span>
                        <div class="detail-info">
                            <div class="detail-label">Feels like</div>
                            <div class="detail-value">${Math.round(data.main.feels_like)}°C</div>
                        </div>
                    </div>
                    <div class="detail">
                        <span class="detail-icon">💧</span>
                        <div class="detail-info">
                            <div class="detail-label">Humidity</div>
                            <div class="detail-value">${data.main.humidity}%</div>
                        </div>
                    </div>
                    <div class="detail">
                        <span class="detail-icon">💨</span>
                        <div class="detail-info">
                            <div class="detail-label">Wind</div>
                            <div class="detail-value">${Math.round(data.wind.speed * 3.6)} km/h</div>
                        </div>
                    </div>
                    <div class="detail">
                        <span class="detail-icon">🌡️</span>
                        <div class="detail-info">
                            <div class="detail-label">Pressure</div>
                            <div class="detail-value">${data.main.pressure} hPa</div>
                        </div>
                    </div>
                    <div class="detail">
                        <span class="detail-icon">👁️</span>
                        <div class="detail-info">
                            <div class="detail-label">Visibility</div>
                            <div class="detail-value">${(data.visibility / 1000).toFixed(1)} km</div>
                        </div>
                    </div>
                    <div class="detail">
                        <span class="detail-icon">☁️</span>
                        <div class="detail-info">
                            <div class="detail-label">Cloud Cover</div>
                            <div class="detail-value">${data.clouds.all}%</div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            weatherInfo.innerHTML = `
                <div class="error">
                    <span class="detail-icon">⚠️</span>
                    ${error.message === 'City not found' 
                        ? 'City not found. Please check the spelling.' 
                        : 'Failed to load weather data. Please try again.'}
                </div>
            `;
        }
    }
}

customElements.define('city-weather', CityWeather);
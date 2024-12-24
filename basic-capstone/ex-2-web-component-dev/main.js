import './weather-widget.js';

class WeatherDashboard {
    constructor() {
        this.currentView = 'single';
        this.mainContent = document.getElementById('mainContent');
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadView('single');
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.target.dataset.view;
                this.switchView(view);
            });
        });
    }

    switchView(view) {
        if (this.currentView === view) return;

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.view === view);
        });

        this.loadView(view);
        this.currentView = view;
    }

    async loadView(view) {
        const container = document.createElement('div');
        container.className = 'view-container fade-enter';

        if (view === 'single') {
            container.innerHTML = `
                <div class="input-group">
                    <input type="text" 
                           id="cityInput" 
                           placeholder="Enter city name"
                           onkeypress="if(event.key === 'Enter') window.updateCity()">
                    <button onclick="window.updateCity()">Update Weather</button>
                </div>
                <city-weather id="weatherWidget" city="Los Angeles"></city-weather>
            `;
        } else {
            container.innerHTML = `
                <div class="input-group">
                    <input type="text" 
                           id="newCityInput" 
                           placeholder="Enter city name"
                           onkeypress="if(event.key === 'Enter') window.addCity()">
                    <button onclick="window.addCity()">Add City</button>
                </div>
                <div class="widget-container" id="weatherContainer">
                    <city-weather city="New York"></city-weather>
                    <city-weather city="Chennai"></city-weather>
                    <city-weather city="Hawaii"></city-weather>
                </div>
            `;
        }

        // Animate view transition
        this.mainContent.innerHTML = '';
        this.mainContent.appendChild(container);
        requestAnimationFrame(() => {
            container.classList.remove('fade-enter');
            container.classList.add('fade-enter-active');
        });

        this.setupViewHandlers(view);
    }

    setupViewHandlers(view) {
        if (view === 'single') {
            window.updateCity = () => {
                const input = document.getElementById('cityInput');
                const widget = document.getElementById('weatherWidget');
                
                if (input.value.trim()) {
                    widget.removeAttribute('city');
                    widget.setAttribute('city', input.value.trim());
                    input.value = '';
                }
            };
        } else {
            window.addCity = () => {
                const cityInput = document.getElementById('newCityInput');
                const container = document.getElementById('weatherContainer');
                
                if (cityInput.value.trim()) {
                    const newWidget = document.createElement('city-weather');
                    newWidget.setAttribute('city', cityInput.value.trim());
                    container.appendChild(newWidget);
                    cityInput.value = '';
                }
            };
        }
    }
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherDashboard();
});
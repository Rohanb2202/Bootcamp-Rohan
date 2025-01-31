import React, { useState } from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import WeatherCard from './weatherCard';
import Navigation from './Navigation';
import BackButton from './Back_button';
import { ArrowLeft } from 'lucide-react';

export default function WeatherDashboard() {
  const [currentView, setCurrentView] = useState('single');
  const [singleCity, setSingleCity] = useState('Los Angeles');
  const [compareCities, setCompareCities] = useState(['New York', 'Chennai', 'Hyderabad']);
  const [inputValue, setInputValue] = useState('');

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (currentView === 'single') {
      setSingleCity(inputValue.trim());
    } else {
      setCompareCities(prev => [...prev, inputValue.trim()]);
    }
    setInputValue('');
  };

  const handleRemoveCity = (cityToRemove) => {
    if (currentView === 'comparison') {
      setCompareCities(prev => prev.filter(city => city !== cityToRemove));
    }
  };

  const renderSingleCityView = () => (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleAddCity} className="flex gap-2 mb-8">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
        />
        <Button 
          type="submit"
          className="bg-white text-gray-900 hover:bg-white/90"
        >
          Update City
        </Button>
      </form>
      <WeatherCard
        key={singleCity}
        city={singleCity}
        onRemove={() => {}}
        showRemoveButton={false}
      />
    </div>
  );

  const renderComparisonView = () => (
    <>
      <form onSubmit={handleAddCity} className="flex gap-2 mb-8">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
        />
        <Button 
          type="submit"
          className="bg-white text-gray-900 hover:bg-white/90"
        >
          Add City
        </Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {compareCities.map((city) => (
          <WeatherCard
            key={city}
            city={city}
            onRemove={() => handleRemoveCity(city)}
            showRemoveButton={true}
          />
        ))}
      </div>
    </>
  );

  // const BackButton = () => (
  //   <Button
  //     onClick={() => window.location.href = 'https://stellular-marshmallow-b77b25.netlify.app/'}
  //     variant="ghost"
  //     className="absolute left-4 bottom-4 flex items-center gap-2 text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
  //   >
  //     <ArrowLeft size={20} />
  //     Back
  //   </Button>
  // );
  const Back_Button = () => (
    <Button 
      onClick={() => window.location.href = 'https://stellular-marshmallow-b77b25.netlify.app/'} 
      variant="ghost" 
      className="absolute left-4 bottom-4 flex items-center gap-2 text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
    >
      <ArrowLeft size={20} />
      Back
    </Button>
  );


  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
  //     <Navigation currentView={currentView} onViewChange={setCurrentView} />
  //     <main className="container py-8">
  //       {currentView === 'single' ? renderSingleCityView() : renderComparisonView()}
  //     </main>
  //   </div>
  // );

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
  //     <div className="relative">
  //       <Back_Button />
  //       <Navigation currentView={currentView} onViewChange={setCurrentView} />
  //     </div>
  //     <main className="container py-8">
  //       {currentView === 'single' ? renderSingleCityView() : renderComparisonView()}
  //     </main>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="container py-8">
        {currentView === 'single' ? renderSingleCityView() : renderComparisonView()}
      </main>
      <Back_Button />
    </div>
  );
}
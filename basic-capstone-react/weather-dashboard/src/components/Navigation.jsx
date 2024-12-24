import React from 'react';
import { Button } from "./ui/button";

export default function Navigation({ currentView, onViewChange }) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Weather Dashboard
        </h1>
        <div className="flex gap-4">
          <Button
            variant={currentView === 'single' ? "default" : "outline"}
            onClick={() => onViewChange('single')}
          >
            Single City
          </Button>
          <Button
            variant={currentView === 'comparison' ? "default" : "outline"}
            onClick={() => onViewChange('comparison')}
          >
            Compare Cities
          </Button>
        </div>
      </div>
    </nav>
  );
}
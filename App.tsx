import React from 'react';
import { Layers } from 'lucide-react';
import GenerationForm from './components/GenerationForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Layers size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              E-Com<span className="text-indigo-600">Studio</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Dashboard</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">History</a>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/user/100/100" alt="User" />
              </div>
              <span className="text-sm font-medium text-gray-700">Studio Pro</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            AI Product Editing
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Upload your product photo and describe the changes. 
            Our AI workflow handles the rest.
          </p>
        </div>

        <GenerationForm />
      </main>
    </div>
  );
}

export default App;
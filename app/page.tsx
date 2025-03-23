'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 shadow-xl' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transform rotate-6"></div>
              <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">CS</span>
              </div>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              CalorieSense
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-blue-400 transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
            <Link href="/login" className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-colors">
              Get Started
            </Link>
          </div>
          
          <div className="md:hidden">
            <button className="p-2 rounded-lg bg-gray-800" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 shadow-xl border-t border-gray-800">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <a href="#features" className="block py-2 hover:text-blue-400 transition-colors">Features</a>
              <a href="#testimonials" className="block py-2 hover:text-blue-400 transition-colors">Testimonials</a>
              <a href="#pricing" className="block py-2 hover:text-blue-400 transition-colors">Pricing</a>
              <div className="flex flex-col space-y-3 pt-3 border-t border-gray-800">
                <Link href="/login" className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-center">
                  Sign In
                </Link>
                <Link href="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-colors text-center">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900"></div>
        
        <div className="container mx-auto px-6 relative z-10 pt-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-8">
                Track Calories <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Intelligently</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Snap a photo of your meal, and let AI analyze its nutritional content. Make informed decisions about your diet with CalorieSense.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <Link href="/signup" className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-center font-medium">
                  Start Free Trial
                </Link>
                <a href="#demo" className="px-8 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-center font-medium">
                  Watch Demo
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 relative mt-10 md:mt-0">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-xl opacity-50 transform -rotate-6"></div>
                <div className="relative bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
                  <div className="p-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800">
                    <div className="flex space-x-1 px-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                        </div>
                        <p className="text-gray-400">Snap a photo of your meal</p>
                        <p className="text-blue-400 font-medium mt-2">AI analyzes your nutrition intake</p>
                      </div>
                    </div>
                    <div className="mt-4 bg-gray-900 rounded-lg p-4">
                      <div className="h-4 w-2/3 bg-gray-800 rounded mb-2"></div>
                      <div className="h-4 w-1/2 bg-gray-800 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              CalorieSense combines cutting-edge AI with intuitive design to make nutritional tracking effortless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Bill Scan Technology</h3>
              <p className="text-gray-400">
                Simply snap a photo of your restaurant bill, and our AI will analyze the food items and provide detailed calorie information.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Nutrition Chat Assistant</h3>
              <p className="text-gray-400">
                Get personalized nutrition advice and answers to your diet questions from our intelligent chat assistant.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="w-14 h-14 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Manual Entry Option</h3>
              <p className="text-gray-400">
                Prefer to enter food items manually? Our intuitive interface makes it easy to log your meals and get detailed nutrition data.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="w-14 h-14 bg-red-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Detailed Analysis</h3>
              <p className="text-gray-400">
                Get comprehensive nutritional breakdowns including calories, macros, vitamins, and minerals for every meal.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="w-14 h-14 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Customizable Goals</h3>
              <p className="text-gray-400">
                Set personalized nutrition goals and track your progress with visual charts and helpful insights.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Storage</h3>
              <p className="text-gray-400">
                Your nutrition data is securely stored and accessible anytime, anywhere, with enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div id="testimonials" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied CalorieSense users who have transformed their nutrition habits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197.485-.184a6.68 6.68 0 00.408-.176l.3-.147c.309-.147.256-.457-.053-.53a4.49 4.49 0 00-.348-.09l-.42-.05c-.148-.036-.297-.077-.445-.144-.145-.066-.282-.161-.455-.246a7.686 7.686 0 01-.63-.324 2.687 2.687 0 01-.289-.22c-.103-.09-.072-.315.044-.335l.198-.036c.13-.018.263-.033.396-.033.27 0 .534.047.79.118.33.095.654.224.972.37.159.076.302.175.43.313.024.03.058.045.061.089l.003.036c0 .011-.007.022-.008.034-.009.082-.04.161-.075.233-.036.075-.075.146-.123.22-.068.089-.053.197-.04.296.013.103.03.204.05.307.024.104.052.208.077.312.024.105.04.21.069.315.035.121.097.233.129.353a1.126 1.126 0 01.034.728c-.039.154-.114.301-.182.452l-.49.116c-.337.091-.678.133-1.022.133C7.406 10 6.954 10 6.5 10zm9.981-8.253a.75.75 0 00-.482.944l3.244 12.5a.75.75 0 101.462-.38l-3.243-12.5a.75.75 0 00-.981-.564zM3.5 15c.223 0 .437-.034.65-.065-.069.232-.14.468-.254.68-.114.308-.292.575-.469.844-.148.291-.409.488-.601.737-.201.242-.475.403-.692.604-.213.21-.492.315-.714.463-.232.133-.434.28-.65.35l-.539.222c-.301.123-.473.195-.474.197l-.485.184a6.683 6.683 0 00-.408.176l-.3.147c-.309.147-.256.457.053.53.072.02.184.053.348.09l.42.05c.148.036.297.077.445.144.145.066.282.161.455.246a7.687 7.687 0 01.63.324l.05.036a2.69 2.69 0 01.239.184c.103.09.072.315-.044.335l-.198.036a2.76 2.76 0 01-.396.033 2.982 2.982 0 01-.79-.118 5.322 5.322 0 01-.972-.37 1.487 1.487 0 01-.43-.313c-.024-.03-.058-.045-.061-.089-.003-.012-.003-.024-.003-.036 0-.011.007-.022.008-.034.009-.082.04-.161.075-.233.036-.075.075-.146.123-.22.068-.089.053-.197.04-.296a7.55 7.55 0 01-.05-.307c-.024-.104-.052-.208-.077-.312a6.116 6.116 0 01-.069-.315 2.446 2.446 0 00-.129-.353 1.12 1.12 0 01-.034-.728c.039-.154.114-.301.182-.452l.49-.116c.337-.091.678-.133 1.022-.133.344 0 .796 0 1.25 0z"></path>
                </svg>
              </div>
              <div className="mb-6">
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-400 mb-6">
                "CalorieSense has completely changed how I track my nutrition. The bill scanning feature is like magic - I just snap a photo at a restaurant and get all the nutritional info instantly!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">JD</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">Fitness Enthusiast</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197.485-.184a6.68 6.68 0 00.408-.176l.3-.147c.309-.147.256-.457-.053-.53a4.49 4.49 0 00-.348-.09l-.42-.05c-.148-.036-.297-.077-.445-.144-.145-.066-.282-.161-.455-.246a7.686 7.686 0 01-.63-.324 2.687 2.687 0 01-.289-.22c-.103-.09-.072-.315.044-.335l.198-.036c.13-.018.263-.033.396-.033.27 0 .534.047.79.118.33.095.654.224.972.37.159.076.302.175.43.313.024.03.058.045.061.089l.003.036c0 .011-.007.022-.008.034-.009.082-.04.161-.075.233-.036.075-.075.146-.123.22-.068.089-.053.197-.04.296.013.103.03.204.05.307.024.104.052.208.077.312.024.105.04.21.069.315.035.121.097.233.129.353a1.126 1.126 0 01.034.728c-.039.154-.114.301-.182.452l-.49.116c-.337.091-.678.133-1.022.133C7.406 10 6.954 10 6.5 10zm9.981-8.253a.75.75 0 00-.482.944l3.244 12.5a.75.75 0 101.462-.38l-3.243-12.5a.75.75 0 00-.981-.564zM3.5 15c.223 0 .437-.034.65-.065-.069.232-.14.468-.254.68-.114.308-.292.575-.469.844-.148.291-.409.488-.601.737-.201.242-.475.403-.692.604-.213.21-.492.315-.714.463-.232.133-.434.28-.65.35l-.539.222c-.301.123-.473.195-.474.197l-.485.184a6.683 6.683 0 00-.408.176l-.3.147c-.309.147-.256.457.053.53.072.02.184.053.348.09l.42.05c.148.036.297.077.445.144.145.066.282.161.455.246a7.687 7.687 0 01.63.324l.05.036a2.69 2.69 0 01.239.184c.103.09.072.315-.044.335l-.198.036a2.76 2.76 0 01-.396.033 2.982 2.982 0 01-.79-.118 5.322 5.322 0 01-.972-.37 1.487 1.487 0 01-.43-.313c-.024-.03-.058-.045-.061-.089-.003-.012-.003-.024-.003-.036 0-.011.007-.022.008-.034.009-.082.04-.161.075-.233.036-.075.075-.146.123-.22.068-.089.053-.197.04-.296a7.55 7.55 0 01-.05-.307c-.024-.104-.052-.208-.077-.312a6.116 6.116 0 01-.069-.315 2.446 2.446 0 00-.129-.353 1.12 1.12 0 01-.034-.728c.039-.154.114-.301.182-.452l.49-.116c.337-.091.678-.133 1.022-.133.344 0 .796 0 1.25 0z"></path>
                </svg>
              </div>
              <div className="mb-6">
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-400 mb-6">
                "As a nutritionist, I recommend CalorieSense to all my clients. The detailed analysis provides much more than just calories - it breaks down macros, vitamins, and minerals in an easy-to-understand format."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">SS</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Smith</p>
                  <p className="text-sm text-gray-500">Certified Nutritionist</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197.485-.184a6.68 6.68 0 00.408-.176l.3-.147c.309-.147.256-.457-.053-.53a4.49 4.49 0 00-.348-.09l-.42-.05c-.148-.036-.297-.077-.445-.144-.145-.066-.282-.161-.455-.246a7.686 7.686 0 01-.63-.324 2.687 2.687 0 01-.289-.22c-.103-.09-.072-.315.044-.335l.198-.036c.13-.018.263-.033.396-.033.27 0 .534.047.79.118.33.095.654.224.972.37.159.076.302.175.43.313.024.03.058.045.061.089l.003.036c0 .011-.007.022-.008.034-.009.082-.04.161-.075.233-.036.075-.075.146-.123.22-.068.089-.053.197-.04.296.013.103.03.204.05.307.024.104.052.208.077.312.024.105.04.21.069.315.035.121.097.233.129.353a1.126 1.126 0 01.034.728c-.039.154-.114.301-.182.452l-.49.116c-.337.091-.678.133-1.022.133C7.406 10 6.954 10 6.5 10zm9.981-8.253a.75.75 0 00-.482.944l3.244 12.5a.75.75 0 101.462-.38l-3.243-12.5a.75.75 0 00-.981-.564zM3.5 15c.223 0 .437-.034.65-.065-.069.232-.14.468-.254.68-.114.308-.292.575-.469.844-.148.291-.409.488-.601.737-.201.242-.475.403-.692.604-.213.21-.492.315-.714.463-.232.133-.434.28-.65.35l-.539.222c-.301.123-.473.195-.474.197l-.485.184a6.683 6.683 0 00-.408.176l-.3.147c-.309.147-.256.457.053.53.072.02.184.053.348.09l.42.05c.148.036.297.077.445.144.145.066.282.161.455.246a7.687 7.687 0 01.63.324l.05.036a2.69 2.69 0 01.239.184c.103.09.072.315-.044.335l-.198.036a2.76 2.76 0 01-.396.033 2.982 2.982 0 01-.79-.118 5.322 5.322 0 01-.972-.37 1.487 1.487 0 01-.43-.313c-.024-.03-.058-.045-.061-.089-.003-.012-.003-.024-.003-.036 0-.011.007-.022.008-.034.009-.082.04-.161.075-.233.036-.075.075-.146.123-.22.068-.089.053-.197.04-.296a7.55 7.55 0 01-.05-.307c-.024-.104-.052-.208-.077-.312a6.116 6.116 0 01-.069-.315 2.446 2.446 0 00-.129-.353 1.12 1.12 0 01-.034-.728c.039-.154.114-.301.182-.452l.49-.116c.337-.091.678-.133 1.022-.133.344 0 .796 0 1.25 0z"></path>
                </svg>
              </div>
              <div className="mb-6">
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-400 mb-6">
                "I've lost 20 pounds since I started using CalorieSense six months ago. The AI chat assistant has been like having a personal nutritionist in my pocket. Worth every penny!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">ML</span>
                </div>
                <div>
                  <p className="font-medium">Mike Lee</p>
                  <p className="text-sm text-gray-500">Software Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div id="demo" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See CalorieSense in Action</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Watch how easy it is to track your nutrition with our innovative app.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50 transform -rotate-2"></div>
              <div className="relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                <div className="aspect-w-16 aspect-h-9 w-full bg-gray-900 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <p className="text-xl text-gray-300 mb-4">Demo Video</p>
                     <p className="text-gray-400 max-w-lg mx-auto">
                      Click to watch how CalorieSense analyzes your food and provides detailed nutrition information in seconds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
<footer className="bg-gray-900 border-t border-gray-800">
  <div className="container mx-auto px-6 py-12">
    {/* Footer Main Content */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Brand Column */}
      <div className="md:col-span-1">
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-white">CalorieSense</span>
        </div>
        <p className="text-gray-400 mb-6">
          Your AI nutrition assistant that makes healthy eating simple and personalized.
        </p>
        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Quick Links Column */}
      <div className="md:col-span-1">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
          <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
          <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
          <li><a href="#demo" className="text-gray-400 hover:text-white transition-colors">Demo</a></li>
          <li><a href="#download" className="text-gray-400 hover:text-white transition-colors">Download</a></li>
        </ul>
      </div>
      
      {/* Support Column */}
      <div className="md:col-span-1">
        <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
        </ul>
      </div>
      
      {/* Newsletter Column */}
      <div className="md:col-span-1">
        <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
        <p className="text-gray-400 mb-4">Get the latest news and updates about CalorieSense.</p>
        <form className="space-y-2">
          <div>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    
    {/* Footer Bottom */}
    <div className="border-t border-gray-800 mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} CalorieSense. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </div>
</footer>
      
      </div>
      
  )}
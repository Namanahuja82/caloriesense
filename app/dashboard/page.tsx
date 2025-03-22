"use client";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [calorieData, setCalorieData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // New state for manual entry
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');
  const [manualEntryItems, setManualEntryItems] = useState<Array<{name: string, quantity: string}>>([
    { name: '', quantity: '' }
  ]);
  const [manualEntryLoading, setManualEntryLoading] = useState(false);

  const supabase = createClient(); // Initialize Supabase

  // Auto-scroll to bottom of chat when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("File selected:", event.target.files[0]);
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
  
    setLoading(true);
  
    // Fetch authenticated user ID from Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
  
    if (error || !user) {
      console.error("User not authenticated", error);
      alert("You need to be logged in!");
      setLoading(false);
      return;
    }
  
  
  
    const formData = new FormData();
    formData.append("billImage", file);
    formData.append("userId", user.id);
  
    try {
      const response = await fetch("/api/calorie", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        setCalorieData(data.calories);
      } else {
        alert("Error processing bill: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Handle manual entry form changes
  const handleManualItemChange = (index: number, field: 'name' | 'quantity', value: string) => {
    const updatedItems = [...manualEntryItems];
    updatedItems[index][field] = value;
    setManualEntryItems(updatedItems);
  };

  // Add a new empty food item row
  const addFoodItem = () => {
    setManualEntryItems([...manualEntryItems, { name: '', quantity: '' }]);
  };

  // Remove a food item row
  const removeFoodItem = (index: number) => {
    if (manualEntryItems.length > 1) {
      const updatedItems = [...manualEntryItems];
      updatedItems.splice(index, 1);
      setManualEntryItems(updatedItems);
    }
  };

  // Submit manual entry form
  const handleManualSubmit = async () => {
    // Validate that at least one item has a name
    if (!manualEntryItems.some(item => item.name.trim() !== '')) {
      alert("Please enter at least one food item");
      return;
    }

    setManualEntryLoading(true);

    // Filter out empty items
    const validItems = manualEntryItems.filter(item => item.name.trim() !== '');

    try {
      // Fetch authenticated user ID from Supabase
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      
      if (error || !user) {
        console.error("User not authenticated", error);
        alert("You need to be logged in!");
        setManualEntryLoading(false);
        return;
      }

      // Send to API
      const response = await fetch("/api/manual-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodItems: validItems,
          userId: user.id
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCalorieData(data.calories);
        // Reset form with one empty row after successful submission
        setManualEntryItems([{ name: '', quantity: '' }]);
      } else {
        alert("Error processing food items: " + data.error);
      }
    } catch (error) {
      console.error("Manual entry error:", error);
      alert("Something went wrong!");
    } finally {
      setManualEntryLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return;
    
    setChatLoading(true);
    
    // Add user message to chat history
    setChatHistory([...chatHistory, {type: 'user', message: chatMessage}]);
    
    try {
      // Fetch authenticated user ID from Supabase
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      
      if (error || !user) {
        console.error("User not authenticated", error);
        alert("You need to be logged in to chat!");
        setChatLoading(false);
        return;
      }
      
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: chatMessage,
          userId: user.id
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Add AI response to chat history
        setChatHistory(prev => [...prev, {type: 'ai', message: data.response}]);
      } else {
        alert("Error sending message: " + data.error);
        setChatHistory(prev => [...prev, {type: 'ai', message: "Sorry, I couldn't process your message."}]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory(prev => [...prev, {type: 'ai', message: "Sorry, something went wrong."}]);
    } finally {
      setChatLoading(false);
      setChatMessage(""); // Clear input field
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">CalorieSense</h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setChatOpen(!chatOpen)}
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
              <span>{chatOpen ? "Close Chat" : "Nutrition Chat"}</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-5 flex">
        {/* Upload/Analysis Section */}
        <div className={`flex flex-col items-center justify-center ${chatOpen ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">Calorie Analysis</h1>
            
            {/* Tab navigation */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-2 font-medium text-sm ${
                  activeTab === 'upload' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('upload')}
              >
                Upload Bill
              </button>
              <button
                className={`flex-1 py-2 font-medium text-sm ${
                  activeTab === 'manual' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('manual')}
              >
                Manual Entry
              </button>
            </div>
            
            {/* Upload bill tab content */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <p className="text-center text-gray-600">Upload your restaurant bill to analyze calorie content</p>
                
                <div className="flex flex-col items-center justify-center w-full">
                  <label 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                    </div>
                    <input 
                      id="dropzone-file" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </label>
                  
                  {file && (
                    <div className="mt-3 text-sm text-gray-600">
                      Selected: {file.name}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleUpload}
                  disabled={!file || loading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md disabled:bg-gray-300 disabled:shadow-none transition-colors duration-200"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Upload & Analyze"
                  )}
                </button>
              </div>
            )}
            
            {/* Manual entry tab content */}
            {activeTab === 'manual' && (
              <div className="space-y-4">
                <p className="text-center text-gray-600">Enter your food items to calculate calories</p>
                
                <div className="space-y-3">
                  {manualEntryItems.map((item, index) => (
                    <div key={index} className="flex space-x-2 items-center">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleManualItemChange(index, 'name', e.target.value)}
                          placeholder="Food item (e.g., Chicken Caesar Salad)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="w-24">
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) => handleManualItemChange(index, 'quantity', e.target.value)}
                          placeholder="Qty"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => removeFoodItem(index)}
                        disabled={manualEntryItems.length <= 1}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200 disabled:text-gray-300"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={addFoodItem}
                    className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Food Item
                  </button>
                </div>
                
                <button
                  onClick={handleManualSubmit}
                  disabled={manualEntryLoading || manualEntryItems.every(item => item.name.trim() === '')}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md disabled:bg-gray-300 disabled:shadow-none transition-colors duration-200"
                >
                  {manualEntryLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Analyze Nutrition"
                  )}
                </button>
              </div>
            )}
          </div>

          {calorieData && (
            <div className="w-full max-w-md mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <h2 className="text-xl font-bold">Calorie Breakdown</h2>
              </div>
              <div className="p-4">
                <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded border border-gray-200 max-h-96 overflow-y-auto">
                  {calorieData}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Section */}
        {chatOpen && (
          <div className="w-1/2 h-[calc(100vh-5rem)] flex flex-col px-4">
            <div className="bg-white rounded-xl shadow-lg flex-1 flex flex-col overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <h2 className="text-xl font-bold">Nutrition Chat Assistant</h2>
              </div>
              
              <div 
                ref={chatContainerRef}
                className="flex-1 p-4 overflow-y-auto"
              >
                {chatHistory.length === 0 ? (
                  <div className="text-center text-gray-500 my-8">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    <p>Start chatting with your nutrition assistant!</p>
                    <p className="text-sm mt-2">Ask about your meal's nutritional value, diet advice, or healthy alternatives.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chatHistory.map((chat, index) => (
                      <div 
                        key={index} 
                        className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                            chat.type === 'user' 
                              ? 'bg-blue-600 text-white rounded-br-none' 
                              : 'bg-gray-200 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{chat.message}</p>
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
                          <div className="flex space-x-2 items-center">
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="border-t p-4">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendChatMessage();
                  }}
                  className="flex space-x-2"
                >
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask about nutrition advice..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={chatLoading}
                  />
                  <button
                    type="submit"
                    disabled={!chatMessage.trim() || chatLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:bg-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
'use client'
import React from "react";
import { useState, useEffect } from "react";
import AddWeeksModal from "./addWeeksModal";

const SideBar = ({session, onWeekSelect}) => {
  const [mealWeeks, setMealWeeks] = useState(session.user.mealWeeks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedWeek, setIsSelectedWeek] = useState(null);
  const [isAddWeeksModalOpen, setIsAddWeeksModalOpen] = useState(false);
  console.log("this is the meals", mealWeeks)
  // Synchroniser l'état local avec la session quand elle change
  useEffect(() => {
    setMealWeeks(session.user.mealWeeks);
  }, [session.user.mealWeeks]);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenAddWeeksModal = () => {
    setIsAddWeeksModalOpen(!isAddWeeksModalOpen);
  };

  const handleWeekSelect = (weekId) => {
    setIsSelectedWeek(weekId);
    onWeekSelect(weekId);
    // Fermer automatiquement la sidebar sur mobile
    if (window.innerWidth < 768) {
      setIsModalOpen(false);
    }
  };

  const updateMealWeeks = (newWeek) => {
    setMealWeeks(prevWeeks => [...prevWeeks, newWeek]);
  };

  return (
    <>
      <button 
        onClick={handleOpenModal} 
        className=" absolute ml-4 mt-3 p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        aria-label="Menu"
      >
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
      {isModalOpen && (
        <>
          {/* Overlay pour fermer la sidebar en cliquant à l'extérieur */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Sidebar content */}
          <div className="fixed mt-3 ml-4 w-72 bg-white dark:bg-gray-900 left-0 max-h-[calc(100vh-5rem)] overflow-y-auto z-20 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center p-4 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Mes Semaines</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="p-4">
              <button 
                onClick={handleOpenAddWeeksModal} 
                className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              >
                Ajouter une semaine
              </button>

              <div className="mt-4 space-y-2">
                {mealWeeks.map((week) => (
                  <button 
                    key={week.id}
                    onClick={() => handleWeekSelect(week.id)}
                    className={`w-full px-4 py-3 text-left rounded-lg transition-colors ${
                      isSelectedWeek === week.id 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {week.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {isAddWeeksModalOpen && (
        <AddWeeksModal 
          session={session} 
          isAddWeeksModalOpen={isAddWeeksModalOpen} 
          setIsAddWeeksModalOpen={setIsAddWeeksModalOpen}
          onWeekAdded={updateMealWeeks}
        />
      )}
    </>
  );
};

export default SideBar;

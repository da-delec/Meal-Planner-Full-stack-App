'use client'
import React, { useState } from 'react'

const MealDayForm = ({ day, onClose, onSave }) => {
    const [meals, setMeals] = useState({
        breakfast: day.breakfast || '',
        lunch: day.lunch || '',
        dinner: day.dinner || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(day.id, meals);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-40">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-[90%] max-w-2xl shadow-xl border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Modifier les repas
                    </h3>
                    <button 
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Petit déjeuner
                            </label>
                            <textarea
                                value={meals.breakfast}
                                onChange={(e) => setMeals(prev => ({ ...prev, breakfast: e.target.value }))}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-shadow"
                                rows="3"
                                placeholder="Décrivez le petit déjeuner..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Déjeuner
                            </label>
                            <textarea
                                value={meals.lunch}
                                onChange={(e) => setMeals(prev => ({ ...prev, lunch: e.target.value }))}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-shadow"
                                rows="3"
                                placeholder="Décrivez le déjeuner..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Dîner
                            </label>
                            <textarea
                                value={meals.dinner}
                                onChange={(e) => setMeals(prev => ({ ...prev, dinner: e.target.value }))}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-shadow"
                                rows="3"
                                placeholder="Décrivez le dîner..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MealDayForm;
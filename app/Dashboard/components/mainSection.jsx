'use client'
import React, { useState } from 'react'
import MealDayForm from './MealDayForm'
import { updateMeals } from '../actions/updateMeals'
import { useRouter } from 'next/navigation'

const MainSection = ({ session, selectedWeekId }) => {
    const selectedWeek = session.user.mealWeeks.find(week => week.id === selectedWeekId)
    const [editingDay, setEditingDay] = useState(null)
    const router = useRouter()

    const handleSaveMeals = async (dayId, meals) => {
        const result = await updateMeals(dayId, meals)
        if (result.success) {
            router.refresh()
            setEditingDay(null)
        } else {
            alert(result.error)
        }
    }

    const handlePrint = () => {
        // Créer une nouvelle fenêtre pour l'impression
        const printWindow = window.open('', '_blank');
        
        // Créer le contenu HTML à imprimer
        const content = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${selectedWeek.name}</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        line-height: 1.5;
                        margin: 0;
                        padding: 20px;
                    }
                    .week-title {
                        font-size: 24px;
                        font-weight: 300;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .day {
                        margin-bottom: 30px;
                        page-break-inside: avoid;
                    }
                    .day-title {
                        font-size: 18px;
                        font-weight: 500;
                        margin-bottom: 15px;
                        color: #1a1a1a;
                    }
                    .meals {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 20px;
                    }
                    .meal {
                        background: #f5f5f5;
                        padding: 15px;
                        border-radius: 8px;
                    }
                    .meal-title {
                        font-size: 14px;
                        font-weight: 500;
                        color: #666;
                        margin-bottom: 8px;
                    }
                    .meal-content {
                        font-size: 14px;
                        color: #333;
                    }
                    @media print {
                        body {
                            padding: 0;
                        }
                        .meal {
                            background: #fff;
                            border: 1px solid #eee;
                        }
                    }
                </style>
            </head>
            <body>
                <h1 class="week-title">${selectedWeek.name}</h1>
                ${selectedWeek.days
                    .sort((a, b) => {
                        const order = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
                        return order.indexOf(a.dayOfWeek) - order.indexOf(b.dayOfWeek);
                    })
                    .map(day => `
                        <div class="day">
                            <h2 class="day-title">${translateDay(day.dayOfWeek)}</h2>
                            <div class="meals">
                                <div class="meal">
                                    <div class="meal-title">Petit déjeuner</div>
                                    <div class="meal-content">${day.breakfast || '—'}</div>
                                </div>
                                <div class="meal">
                                    <div class="meal-title">Déjeuner</div>
                                    <div class="meal-content">${day.lunch || '—'}</div>
                                </div>
                                <div class="meal">
                                    <div class="meal-title">Dîner</div>
                                    <div class="meal-content">${day.dinner || '—'}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
            </body>
            </html>
        `;
        
        // Écrire le contenu dans la nouvelle fenêtre
        printWindow.document.write(content);
        printWindow.document.close();
        
        // Attendre que le contenu soit chargé avant d'imprimer
        printWindow.onload = () => {
            printWindow.print();
            printWindow.onafterprint = () => {
                printWindow.close();
            };
        };
    };

    const translateDay = (day) => {
        const translations = {
            'MONDAY': 'Lundi',
            'TUESDAY': 'Mardi',
            'WEDNESDAY': 'Mercredi',
            'THURSDAY': 'Jeudi',
            'FRIDAY': 'Vendredi',
            'SATURDAY': 'Samedi',
            'SUNDAY': 'Dimanche'
        }
        return translations[day]
    }
    
    if (!selectedWeek) {
        return (
            <div className='flex-1 bg-white overflow-auto p-8 dark:bg-gray-900'>
                <div className="text-center text-gray-400 mt-20">
                    <p className="text-xl font-light">Sélectionnez une semaine pour voir vos repas</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex-1 bg-white dark:bg-gray-900 overflow-auto px-8 py-6'>
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-3xl font-light text-gray-900 dark:text-white">{selectedWeek.name}</h2>
                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Imprimer
                    </button>
                </div>

                <div className="space-y-6">
                    {selectedWeek.days.sort((a, b) => {
                        const order = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
                        return order.indexOf(a.dayOfWeek) - order.indexOf(b.dayOfWeek)
                    }).map(day => (
                        <div key={day.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 transition-all hover:shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{translateDay(day.dayOfWeek)}</h3>
                                <button 
                                    onClick={() => setEditingDay(day)}
                                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                    Modifier
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Petit déjeuner</h4>
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{day.breakfast || '—'}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Déjeuner</h4>
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{day.lunch || '—'}</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dîner</h4>
                                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{day.dinner || '—'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {editingDay && (
                <MealDayForm 
                    day={editingDay}
                    onClose={() => setEditingDay(null)}
                    onSave={handleSaveMeals}
                />
            )}
        </div>
    )
}

export default MainSection

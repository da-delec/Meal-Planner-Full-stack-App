'use client'
import React from 'react'

const PrintableWeek = ({ week }) => {
    const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
    const sortedDays = week.days.sort((a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek))

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

    return (
        <div className="print-container p-8 bg-white">
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-container, .print-container * {
                        visibility: visible;
                    }
                    .print-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 210mm;
                        height: 297mm;
                        margin: 0;
                        padding: 20mm;
                        font-size: 12pt;
                    }
                    .no-break {
                        break-inside: avoid;
                    }
                }
            `}</style>

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">{week.name}</h1>
                <p className="text-gray-600">Menu de la semaine</p>
            </div>

            <div className="space-y-6">
                {sortedDays.map(day => (
                    <div key={day.id} className="no-break border-b pb-4 mb-4">
                        <h2 className="text-xl font-bold mb-4">{translateDay(day.dayOfWeek)}</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <h3 className="font-semibold mb-2">Petit déjeuner</h3>
                                <p className="whitespace-pre-wrap text-sm">{day.breakfast || '-'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Déjeuner</h3>
                                <p className="whitespace-pre-wrap text-sm">{day.lunch || '-'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Dîner</h3>
                                <p className="whitespace-pre-wrap text-sm">{day.dinner || '-'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PrintableWeek 
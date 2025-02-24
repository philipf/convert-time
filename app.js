// Import functions from timeFormat module
import { validateTimeValue, hoursToMinutes, weeklyToDaily, formatMinutes } from './timeFormat.js';

// Constants for conversion types
const CONVERSION_TYPES = {
    HOURS_PER_WEEK: 'hours_per_week',
    MINUTES_PER_WEEK: 'minutes_per_week',
    HOURS_PER_DAY: 'hours_per_day',
    MINUTES_PER_DAY: 'minutes_per_day'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Resource Planning Converter initialized');
    
    // Get all input elements
    const inputs = {
        hoursPerWeek: document.getElementById('hoursPerWeek'),
        minutesPerWeek: document.getElementById('minutesPerWeek'),
        hoursPerDay: document.getElementById('hoursPerDay'),
        minutesPerDay: document.getElementById('minutesPerDay')
    };

    // Get all error elements
    const errors = {
        hoursPerWeek: document.getElementById('hoursPerWeekError'),
        minutesPerWeek: document.getElementById('minutesPerWeekError'),
        hoursPerDay: document.getElementById('hoursPerDayError'),
        minutesPerDay: document.getElementById('minutesPerDayError')
    };

    const resultDisplay = document.getElementById('resultDisplay');

    // Add input event listeners
    Object.entries(inputs).forEach(([key, input]) => {
        input.addEventListener('input', (e) => handleInput(e, key));
    });

    // Handle input changes
    function handleInput(event, inputType) {
        // Clear other inputs
        Object.entries(inputs).forEach(([key, input]) => {
            if (key !== inputType) {
                input.value = '';
                hideError(errors[key]);
                input.classList.remove('invalid-input');
            }
        });

        const value = event.target.value;
        
        try {
            if (value === '') {
                resultDisplay.textContent = 'HH:MM';
                hideError(errors[inputType]);
                return;
            }

            const numValue = parseFloat(value);
            
            // Validate input
            try {
                validateTimeValue(numValue, inputType.includes('minutes') ? 'minutes' : 'hours');
            } catch (error) {
                showError(errors[inputType], error.message);
                event.target.classList.add('invalid-input');
                resultDisplay.textContent = 'HH:MM';
                return;
            }

            // Clear any previous errors
            hideError(errors[inputType]);
            event.target.classList.remove('invalid-input');

            // Convert to daily HH:MM format
            const result = convertToResourceGuruFormat(numValue, inputType);
            resultDisplay.textContent = result;

        } catch (error) {
            console.error('Conversion error:', error);
            showError(errors[inputType], 'Invalid input');
            event.target.classList.add('invalid-input');
            resultDisplay.textContent = 'HH:MM';
        }
    }

    // Helper function to show error message
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    // Helper function to hide error message
    function hideError(errorElement) {
        errorElement.classList.add('hidden');
    }
});

// Convert input to ResourceGuru format (HH:MM)
function convertToResourceGuruFormat(value, type) {
    let minutes;

    switch (type) {
        case 'hoursPerWeek':
            minutes = weeklyToDaily(hoursToMinutes(value));
            break;
        case 'minutesPerWeek':
            minutes = weeklyToDaily(value);
            break;
        case 'hoursPerDay':
            minutes = hoursToMinutes(value);
            break;
        case 'minutesPerDay':
            minutes = value;
            break;
        default:
            throw new Error('Invalid conversion type');
    }

    return formatMinutes(minutes);
}
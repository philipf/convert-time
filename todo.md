# ResourceGuru Conversion Tool - TODO Checklist

## 1. Project Setup
- [x] Create project repository
- [x] Set up file structure:
  - [x] `index.html`
  - [x] `styles.css` (with Tailwind CSS integrated)
  - [x] `app.js` or `app.ts`
  - [x] `README.md`
- [x] Configure Tailwind CSS for responsive design
- [x] Write a brief project overview in the README

## 2. Basic HTML Structure & Styling
- [x] Build `index.html` with:
  - [x] Header or title
  - [x] Four input fields for:
    - [x] Hours per week
    - [x] Hours per day
    - [x] Minutes per week
    - [x] Minutes per day
  - [x] Dedicated display area for conversion result ("HH:MM")
  - [x] Inline areas for error messages adjacent to each input field
- [x] Link `styles.css` in `index.html`
- [x] Ensure responsiveness with Tailwind CSS classes

## 3. Conversion Module (Core Logic)
- [x] Create conversion module in `app.js`/`app.ts`:
  - [x] Function to parse input and detect format
  - [x] Function to validate numeric input (non-negative, within bounds)
  - [x] Function to convert weekly values to daily values (divide by 5)
  - [x] Function to convert hours to minutes when needed
  - [x] Function to format minutes into "HH:MM" (including rounding)
- [x] Write unit tests (or assertions) for:
  - [x] Validating different input formats
  - [x] Correct arithmetic conversion
  - [x] Edge cases (empty strings, invalid characters, out-of-bound values)

## 4. Real-Time Conversion & Input Validation
- [x] In `app.js`/`app.ts`, attach `input` event listeners to all fields:
  - [x] Retrieve current value on each keystroke
  - [x] Call conversion module functions for validation and conversion
  - [x] Dynamically update conversion result display area
  - [x] Display error messages inline if input is invalid
- [x] Ensure conversion logic runs only for valid input

## 5. Integration: Combine UI with Conversion Module
- [x] Verify integration of HTML, CSS, and JavaScript:
  - [x] Confirm that UI loads with Tailwind styling
  - [x] Ensure conversion logic triggers on input events
  - [x] Check that conversion results and error messages display correctly
- [x] Conduct end-to-end testing with:
  - [x] Various valid inputs across all supported formats
  - [x] Invalid input cases to ensure error handling
- [x] Refactor code to remove any orphaned functions or unused elements

## 6. Testing and Final Refinements
- [x] Expand unit tests to cover:
  - [x] Decimal inputs and rounding behavior
  - [x] Partially entered values and extreme cases
- [x] Perform integration tests:
  - [x] Simulate user input scenarios for dynamic updates and error messaging
  - [x] Validate UI responsiveness on different device sizes
- [x] Conduct code review:
  - [x] Ensure all functions are well-documented and modular
  - [x] Remove any redundant or orphaned code
- [x] Implement accessibility improvements:
  - [x] Add ARIA labels and roles where needed
  - [x] Verify that error messages are accessible

## 7. Final Review and Documentation
- [x] Update `README.md` with:
  - [x] Detailed project overview and installation instructions
  - [x] Description of supported input formats and conversion logic
  - [x] Instructions for running tests and building the project (if applicable)
- [x] Add inline comments and documentation in the code
- [x] Prepare a changelog or summary of iterative steps taken
- [x] Confirm that the project is ready for static hosting (GitHub Pages, Netlify, etc.)

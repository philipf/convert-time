# Prompt 1 – Project Blueprint & Setup

Overview:
We are building a static website that converts various resource planning inputs into a single daily "HH:MM" format suitable for ResourceGuru. The site will support four input formats (hours/minutes per week or per day), perform real-time conversion, and validate input data. The technology stack includes HTML, JavaScript (or TypeScript), and Tailwind CSS for styling.

Tasks:
1. Set up the project repository with a basic file structure:
   - index.html
   - styles.css (with Tailwind CSS integrated)
   - app.js (or app.ts if using TypeScript)
2. Configure Tailwind CSS for responsive design.
3. Write a brief README.md describing the project.

Goal:
This initial setup should allow us to serve a basic static page that we can later enhance with conversion logic and dynamic behavior.


# Prompt 2 – Create the Basic HTML Structure & Styling

Overview:
Develop the static HTML structure for the conversion tool. Include placeholders for:
- Input fields for each supported format (hours/minutes per week/day)
- A display area for the conversion result (formatted as "HH:MM")
- Error message sections for input validation feedback

Tasks:
1. Build an index.html file with:
   - A header or title.
   - Four clearly labeled input fields (one for each supported format).
   - A result display area.
   - Dedicated areas (or inline elements) for error messages near each input.
2. Link the Tailwind CSS file (styles.css) and include a minimal Tailwind configuration.
3. Ensure the HTML structure is responsive (using Tailwind classes).

Goal:
The static page should display a well-organized form where the user can input values. No JavaScript behavior is required yet.


# Prompt 3 – Implement the Conversion Module (Core Logic)

Overview:
Develop a JavaScript (or TypeScript) module responsible for:
- Parsing input strings to determine the format (hours/minutes, weekly/daily)
- Validating that the numeric component is correct and in bounds
- Converting weekly values to daily values (divide by 5)
- Converting hours to minutes when needed
- Formatting the resulting daily value as "HH:MM"

Tasks:
1. Create functions for:
   - Parsing and detecting the input format.
   - Validating the numeric value (ensuring it is a number, not negative, etc.).
   - Converting the value to daily minutes.
   - Formatting minutes into "HH:MM" (rounding as needed).
2. Write unit tests (using your preferred testing framework or simple assertions) for:
   - Each input format
   - Edge cases like empty strings, invalid characters, and values exceeding limits.

Goal:
This module should be fully tested in isolation so that each function behaves as expected before integrating it with the UI.


# Prompt 4 – Wire Up Real-Time Conversion & Input Validation

Overview:
Integrate the conversion module with the HTML form. This involves:
- Adding event listeners to the input fields.
- Validating user input in real time.
- Displaying conversion results immediately in the result display area.
- Showing error messages inline if the input is invalid.

Tasks:
1. In your main app.js (or app.ts), attach `input` event listeners to all fields.
2. On each event:
   - Retrieve the current value.
   - Use the conversion module to validate and convert the input.
   - Update the conversion result area dynamically.
   - If an error is detected, display an appropriate error message adjacent to the input field.
3. Ensure the conversion function is only called if the input passes validation.

Goal:
This prompt results in a fully interactive form that gives immediate feedback. Users should see the conversion result change as they type, and errors should be clearly communicated.


# Prompt 5 – Integration: Combine UI with Conversion Module

Overview:
Ensure that the HTML, CSS, and JavaScript components work together seamlessly. This prompt focuses on tying all components together and performing end-to-end testing.

Tasks:
1. Review the file structure: index.html, styles.css, and app.js.
2. Verify that:
   - The page loads with all UI components styled by Tailwind CSS.
   - The conversion logic triggers on input events.
   - Errors and conversion results display correctly.
3. Conduct integration testing:
   - Test various valid and invalid inputs across all supported formats.
   - Verify that there are no orphaned functions or UI elements.
4. Refactor if necessary to ensure clarity, modularity, and ease of maintenance.

Goal:
The project should now be fully integrated and demonstrate smooth, real-time conversion behavior with proper validation and user feedback.


# Prompt 6 – Testing and Final Refinements

Overview:
Now that the core functionality is in place, focus on ensuring robustness and adherence to best practices through thorough testing and final refinements.

Tasks:
1. Expand your unit tests:
   - Cover edge cases like decimal inputs, partially entered values, and extreme values.
   - Test the conversion logic’s accuracy (e.g., rounding behavior, format correctness).
2. Perform integration tests:
   - Simulate user input scenarios to ensure dynamic updates and error messages work as expected.
   - Validate the responsiveness across different device sizes.
3. Code review and refactoring:
   - Ensure all functions are well-documented and modular.
   - Remove any orphaned or unused code.
4. Accessibility improvements:
   - Add ARIA labels and roles where necessary.
   - Verify that error messages are accessible.

Goal:
This final phase ensures that the code is well-tested, maintainable, and meets user experience and accessibility standards.


# Prompt 7 – Final Review and Documentation

Overview:
Prepare the project for handoff or deployment by ensuring all documentation is complete and the project meets all specified requirements.

Tasks:
1. Update the README.md file with:
   - A project overview and installation instructions.
   - Descriptions of the input formats and conversion logic.
   - Instructions for running tests and building the project (if applicable).
2. Ensure that all code is commented, highlighting key functions and design decisions.
3. Prepare a changelog or summary of the iterative steps taken.
4. Validate that the project can be hosted as a static website (e.g., on GitHub Pages or Netlify).

Goal:
The project should now be fully documented and ready for deployment, ensuring that future developers can understand and extend the work.



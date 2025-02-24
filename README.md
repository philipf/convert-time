# Resource Planning Converter

A static web application that converts various resource planning time formats into ResourceGuru's HH:MM format.

## Features

- Converts multiple time input formats:
  - Hours per week (e.g., "40 hours/week", "40h/w")
  - Minutes per week (e.g., "2400 minutes/week", "2400m/w")
  - Hours per day (e.g., "8 hours/day", "8h/d")
  - Minutes per day (e.g., "480 minutes/day", "480m/d")
- Real-time conversion
- Input validation with error handling
- Responsive design using Tailwind CSS
- Comprehensive test suite

## Technology Stack

- TypeScript
- HTML5
- JavaScript (compiled from TypeScript)
- Tailwind CSS (via CDN)
- Jest (for testing)

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the TypeScript files:
   ```bash
   npm run build
   ```
4. Open `index.html` in your web browser

For development with auto-rebuilding:
```bash
npm run dev
```

## Input Format Specifications

The converter accepts the following input patterns:
- Weekly hours: `<number> hours/week`, `<number>h/w`, `<number>hrs per week`
- Weekly minutes: `<number> minutes/week`, `<number>m/w`, `<number>mins per week`
- Daily hours: `<number> hours/day`, `<number>h/d`, `<number>hrs per day`
- Daily minutes: `<number> minutes/day`, `<number>m/d`, `<number>mins per day`

Numbers can include decimals (e.g., "7.5 hours/day").

### Conversion Logic

1. Input is parsed using regular expressions to extract the numeric value and determine the format
2. Values are validated:
   - Must be non-negative
   - When converted to hours, must not exceed 168 (hours in a week)
3. All values are converted to minutes internally
4. Weekly values are converted to daily by dividing by 5 (working days)
5. Final result is formatted as "HH:MM"

## Testing

Run the test suite:
```bash
npm test
```

Tests cover:
- Input parsing
- Time unit conversions
- Input validation
- Format handling
- Edge cases

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # Custom styles
├── app.js             # Browser-side application logic
├── src/
│   ├── timeFormat.ts  # Core conversion logic
│   └── timeFormat.test.ts  # Test suite
├── tsconfig.json      # TypeScript configuration
├── jest.config.js     # Jest configuration
└── package.json       # Project dependencies and scripts
```

## Deployment

This project can be deployed as a static website on any web hosting platform:

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the following files to your web server:
   - index.html
   - styles.css
   - app.js (compiled from TypeScript)
   - timeFormat.js (compiled from TypeScript)

Compatible with platforms like:
- GitHub Pages
- Netlify
- Vercel
- Any static file server

## Development

The project uses TypeScript for type safety and better development experience. The TypeScript files are compiled to JavaScript using the TypeScript compiler (tsc).

Key development commands:
- `npm run build`: Compile TypeScript files
- `npm run dev`: Watch mode - recompile on changes
- `npm test`: Run test suite
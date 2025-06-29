# JavaScript Trading App

A modern trading orderbook application with buy/sell functionality, animations, and comprehensive testing.

## 📁 Project Structure

```
js_project_list_app/
├── src/                    # Main application code
│   ├── index.html         # Main HTML file
│   ├── app.js            # Core JavaScript logic
│   ├── styles.css        # Styling and animations
│   └── data.json         # Sample trading data
├── tests/                 # Test files
│   ├── app.test.js       # Jest unit tests
│   ├── jest.setup.js     # Jest configuration
│   ├── test-runner.html  # Browser test runner
│   └── TEST_README.md    # Testing documentation
├── package.json          # Project configuration
└── README.md            # This file
```

## 🚀 Quick Start

### Development Server
```bash
# Start local server (from project root)
npm run start
```

Then open: `http://localhost:8000`

### Testing
```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests with file watching
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## ✨ Features

### Core Functionality
- **Buy/Sell Orders** - Click buttons to add new orders
- **Real-time Updates** - New orders appear at the top
- **API Simulation** - Mock POST requests with error handling
- **Data Persistence** - Orders are managed in memory

### UI/UX
- **Smooth Animations** - Fade-in effects for new orders
- **Modern Design** - Dark theme with color-coded elements
- **Responsive Layout** - Centered container with flexbox
- **Visual Feedback** - Active button states and hover effects
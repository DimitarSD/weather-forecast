# Getting Started

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/DimitarSD/weather-forecast.git
   cd weather-forecast
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

## Running the Application

1. Create a `.env` file in the root directory and add the OpenWeatherMap API key from the email:

   ```env
   REACT_APP_API_KEY=your_api_key_here
   ```

2. Start the development server:

   ```sh
   npm start
   ```

3. Open the browser and navigate to `http://localhost:3000`.

## Building the Application

To build the application for production, run:

```sh
npm run build
```

The build artifacts will be stored in the `build/` directory.

https://weather-forecast-three-delta.vercel.app/

## Running Tests

To run the tests use:

```sh
npm test
```

## Live Deployed Version

https://weather-forecast-three-delta.vercel.app/

## Future Improvements

The following features and improvements could be implemented:

- **Enhanced Error Handling**: Error handling for API requests and geolocation
- **Unit Tests Coverage**: Increase unit test coverage for all components and custom hooks.
- **Caching**: Implement caching for API responses to reduce load times and API usage.

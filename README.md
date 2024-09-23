# Weather Forecast Application

This is a weather forecasting application that allows users to search for a city and view the current weather conditions, including temperature, weather description, and a 5-day forecast. Users can toggle between Fahrenheit and Celsius units.

## Features

- Search for a city and view real-time weather data.
- Toggle between Fahrenheit and Celsius units.
- Display weather forecast for the next 5 days.
- Handle API errors and display appropriate error messages.
- Responsive UI design that adapts to various screen sizes.

## Live Demo

You can view the live application [Weather Peek](https://weather-peek.netlify.app/).


## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- Vite (for development server)
- An OpenWeatherMap API Key

### How to Get Your OpenWeatherMap API Key

1. Go to the [OpenWeatherMap website](https://openweathermap.org/).
2. Sign up for a free account or log in if you already have one.
3. After logging in, navigate to the API keys section in your account settings.
4. Copy the default API key provided or generate a new one.
5. Paste the API key into your `.env` file as follows:
   VITE_WEATHER_API_KEY=your_api_key_here

### Steps to Run the Project Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bharti147/WeatherInfo.git

2. **Navigate to the project directory:**
    cd WeatherInfo

3. **Install the dependencies:**
    npm install

4. **Create a .env file in the root of the project and add your OpenWeatherMap API key::**
    VITE_WEATHER_API_KEY=your_api_key_here

5. **Start the development server:**
    npm run dev

6. **Open your browser and visit http://localhost:5173 to view the application.**


## Usage
- Type a city name in the search bar.
- Suggestions will appear based on the input.
- Click on a suggestion to select the city.
- The application will display weather details for the selected city.

## Contributing
  Contributions are welcome! If you have suggestions for improvements or features, feel free to create an issue or submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For inquiries, please contact [bhartisahani406@gmail.com]

## Acknowledgments
OpenWeatherMap API for weather data.


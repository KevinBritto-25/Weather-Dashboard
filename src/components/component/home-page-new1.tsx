"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DropletIcon, GaugeIcon, SunIcon, WindIcon } from "@/components/icons";
import Link from "next/link";
import "tailwindcss/tailwind.css";

export function HomePageNew1() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [temperatureColor, setTemperatureColor] = useState(
    "linear-gradient(to left, #e1ec43, #e1ee5d, #e1f173, #e2f287, #e3f49a, #e2f49b, #e2f59c, #e1f59d, #def48c, #daf27a, #d7f166, #d4ef51)"
  );
  const [isHovered, setIsHovered] = useState(false);

  const fetchWeatherData = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=658c8c3b574b425da95172321240909&q=${city}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setWeather(data);

      const temperature = data?.current?.temp_c || 0;

      let gradient = "";
      if (temperature < 10) {
        gradient = "linear-gradient(to right, #60a5fa, #1e40af)";
      } else if (temperature < 20) {
        gradient = "linear-gradient(to right, #34d399, #065f46)";
      } else if (temperature < 30) {
        gradient = "linear-gradient(to right, #fbbf24, #b45309)";
      } else {
        gradient = "linear-gradient(to right, #f87171, #7f1d1d)";
      }

      setTemperatureColor(gradient);
      document.documentElement.style.setProperty(
        "--temperature-gradient",
        gradient
      );
      document.body.style.background = gradient;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <main
      className={`container min-h-screen w-full mono-font no-scroll bg-black ${
        isHovered ? "blurred" : ""
      }`}
    >
      {/* Header */}
      <header
        className="fixed top-0 left-0 w-full text-primary-foreground items-center bg-opacity-75 py-6 px-8 shadow-lg z-50 non-hover-glowing-button"
        style={{ background: temperatureColor }}
      >
        <h1 className="text-2xl font-extrabold mono-font">Weather Dashboard</h1>
        <br />
        <div className="relative w-full flex items-center justify-left">
          <div className="relative group">
            <button className="mr-auto text-sm font-bold px-4 py-2 rounded-md shadow transition-colors duration-300">
              Contact Us
            </button>

            <div
              className="w-48 rounded-md flex-col dropdown-menu absolute hidden group-hover:flex text-primary-foreground"
              style={{ background: temperatureColor }}
            >
              <ul className="py-1">
                <li>
                  <Link
                    href="mailto:brittokevin.04@gmail.com"
                    className="block px-4 py-2 hover:bg-gray-100 hover-glowing-button"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Email
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+1234567890" /* Temporary number */
                    className="block px-4 py-2 hover:bg-gray-100 hover-glowing-button"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Contact Number
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://wa.me/9284281752"
                    className="block px-4 py-2 hover:bg-gray-100 hover-glowing-button"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Whatsapp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 flex space-x-4 p-4">
          <Link
            href="https://instagram.com/kev_x_25"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/instagram.png" /* Ensure correct path to your image */
              alt="Instagram"
              className="w-10 h-10 hover:opacity-80"
            />
          </Link>
          <Link
            href="https://twitter.com/KevinBritt47414"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/twitter.png" /* Ensure correct path to your image */
              alt="Twitter"
              className="w-10 h-10 hover:opacity-80"
            />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-10 px-4">
        {/* Search Input */}
        <div
          className="max-w-lg w-full p-8 rounded-lg shadow-lg glowing-button"
          style={{ background: temperatureColor }}
        >
          <div className="relative flex items-center w-full">
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              className="pl-10 pr-4 py-2 rounded-md bg-muted text-black font-extrabold w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <br />

          {/* Weather Info Section */}
          {weather && (
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-4">
                <img
                  src="/weather.png" /* Ensure correct path to your image */
                  alt="Weather Icon"
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <div className="text-4xl font-bold text-black">
                    {weather.current?.temp_c || "N/A"}°C
                  </div>
                  <div className="text-lg text-black">
                    {weather.current?.condition?.text || "N/A"}
                  </div>
                </div>
              </div>

              <div className="text-right text-black">
                <div className="text-lg md:text-xl font-bold">
                  {weather.location?.name || "N/A"}
                </div>
                <div>
                  <time dateTime={weather.current?.last_updated}>
                    {new Date(
                      weather.current?.last_updated
                    ).toLocaleTimeString()}
                  </time>
                </div>
              </div>
            </div>
          )}

          {/* Weather Stats */}
          {weather && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-muted text-black p-4 rounded-md flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">Humidity</div>
                  <div className="text-2xl font-bold">
                    {weather?.current?.humidity || "N/A"}%
                  </div>
                </div>
                <DropletIcon className="w-8 h-8" />
              </Card>

              <Card className="bg-muted text-black p-4 rounded-md flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">Wind</div>
                  <div className="text-2xl font-bold">
                    {weather?.current?.wind_kph || "N/A"} kph
                  </div>
                </div>
                <WindIcon className="w-8 h-8" />
              </Card>

              <Card className="bg-muted text-black p-4 rounded-md flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">Pressure</div>
                  <div className="text-2xl font-bold">
                    {weather?.current?.pressure_mb || "N/A"} mb
                  </div>
                </div>
                <GaugeIcon className="w-8 h-8" />
              </Card>

              <Card className="bg-muted text-black p-4 rounded-md flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold">UV Index</div>
                  <div className="text-2xl font-bold">
                    {weather?.current?.uv || "N/A"}
                  </div>
                </div>
                <SunIcon className="w-8 h-8" />
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

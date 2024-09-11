"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DropletIcon, GaugeIcon, SunIcon, WindIcon } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import "tailwindcss/tailwind.css";

// Define an interface for weather data
interface WeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    humidity: number;
    wind_kph: number;
    pressure_mb: number;
    uv: number;
    last_updated: string;
  };
  location: {
    name: string;
  };
}

export function HomePageNew1() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [temperatureColor, setTemperatureColor] = useState(
    "linear-gradient(to left, #e1ec43, #e1ee5d, #e1f173, #e2f287, #e3f49a, #e2f49b, #e2f59c, #e1f59d, #def48c, #daf27a, #d7f166, #d4ef51)"
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchWeatherData = useCallback(async () => {
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
      document.body.style.background = gradient;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [city]);

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city, fetchWeatherData]);

  useEffect(() => {
    const container = containerRef.current;
    const handleMouseEnter = () => {
      if (container) container.classList.add("blurred");
    };
    const handleMouseLeave = () => {
      if (container) container.classList.remove("blurred");
    };

    const buttons = document.querySelectorAll(".hover-glowing-button");
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    });

    // Clean up event listeners on unmount
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-black" ref={containerRef}>
      {/* Header */}
      <header
        className="fixed top-0 left-0 w-full text-primary-foreground bg-opacity-75 py-4 md:py-6 px-4 lg:px-8 shadow-lg z-50"
        style={{ background: temperatureColor }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold mono-font">
            Weather Dashboard
          </h1>
          <div className="relative flex items-center space-x-4">
            <div className="relative group">
              <button className="text-xs md:text-sm font-bold px-3 md:px-4 py-1 md:py-2 rounded-md shadow transition-colors duration-300">
                Contact Us
              </button>
              <div
                className="w-36 md:w-48 rounded-md flex-col dropdown-menu absolute hidden group-hover:flex text-primary-foreground"
                style={{ background: temperatureColor }}
              >
                <ul className="py-1">
                  <li>
                    <Link
                      href="mailto:brittokevin.04@gmail.com"
                      className="block px-3 md:px-4 py-2 hover:bg-gray-100 hover-glowing-button"
                    >
                      Email
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="tel:+1234567890" /* Temporary number */
                      className="block px-3 md:px-4 py-2 hover:bg-gray-100 hover-glowing-button"
                    >
                      Contact Number
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://wa.me/9284281752"
                      className="block px-3 md:px-4 py-2 hover:bg-gray-100 hover-glowing-button"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Whatsapp
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex space-x-2 md:space-x-4">
              <Link
                href="https://instagram.com/kev_x_25"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="./instagram.png"
                  alt="Instagram"
                  width={30}
                  height={30}
                  className="hover:opacity-70"
                />
              </Link>
              <Link
                href="https://twitter.com/KevinBritt47414"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="./twitter.png"
                  alt="Twitter"
                  width={30}
                  height={30}
                  className="hover:opacity-70"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="pt-20 pb-10 px-4 lg:px-8">
        {/* Search Input */}
        <div
          className="max-w-lg mx-auto p-4 md:p-6 lg:p-8 rounded-lg shadow-lg"
          style={{ background: temperatureColor }}
        >
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="pl-10 pr-4 py-2 rounded-md bg-muted text-black font-extrabold w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <br />

          {/* Weather Info Section */}
          {weather && (
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
              <div className="flex items-center space-x-4">
                <Image
                  src="./weather.png"
                  alt="Weather Icon"
                  width={60}
                  height={60}
                  className="object-cover"
                />
                <div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                    {weather.current?.temp_c || "N/A"}°C
                  </div>
                  <div className="text-base md:text-lg lg:text-xl text-black">
                    {weather.current?.condition?.text || "N/A"}
                  </div>
                </div>
              </div>

              <div className="text-right text-black">
                <div className="text-base md:text-lg lg:text-xl font-bold">
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
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-muted text-black p-4 rounded-md flex justify-between items-center">
                <div>
                  <div className="text-sm md:text-base lg:text-lg font-bold">
                    Humidity
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                    {weather?.current?.humidity || "N/A"}%
                  </div>
                </div>
                <DropletIcon className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10" />
              </Card>

              <Card className="bg-muted text-black p-4 rounded-md flex justify-between items-center">
                <div>
                  <div className="text-sm md:text-base lg:text-lg font-bold">
                    Wind
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                    {weather?.current?.wind_kph || "N/A"} kph
                  </div>
                </div>
                <WindIcon className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10" />
              </Card>

              <Card className="bg-muted text-black p-4 rounded-md flex justify-between items-center">
                <div>
                  <div className="text-sm md:text-base lg:text-lg font-bold">
                    Pressure
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                    {weather?.current?.pressure_mb || "N/A"} mb
                  </div>
                </div>
                <GaugeIcon className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10" />
              </Card>

              <Card className="bg-muted text-black p-4 rounded-md flex justify-between items-center">
                <div>
                  <div className="text-sm md:text-base lg:text-lg font-bold">
                    UV Index
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                    {weather?.current?.uv || "N/A"}
                  </div>
                </div>
                <SunIcon className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10" />
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

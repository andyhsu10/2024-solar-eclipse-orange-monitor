'use client';

import {
    BarElement, CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { getData } from '@/lib/api';
import { pad } from '@/lib/utils';
import { AllEnvDataResponse } from '@/types/backend.schema';
import { faDroplet, faTemperatureHalf, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@headlessui/react';

type Data = {
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  unixTimestamp: number;
};

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const toFahrenheit = (celsius: number) => {
  return Number(Number(1.8 * celsius + 32).toFixed(2));
};

export default function Home() {
  const [envData, setEnvData] = useState<Data[]>([]);
  const [latestTemperature, setLatestTemperature] = useState<number | undefined>(undefined);
  const [latestHumidity, setLatestHumidity] = useState<number | undefined>(undefined);
  const [latestPressure, setLatestPressure] = useState<number | undefined>(undefined);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | undefined>(undefined);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [dataInterval, setDataInterval] = useState<NodeJS.Timeout | null>(null);

  const fetchData = () => {
    getData()
      .then((result: AllEnvDataResponse) => {
        const mappedData = result.data.map((d) => {
          const time = new Date(d.ts);

          // Format the date and time parts
          const month = time.getMonth() + 1; // getMonth() returns 0-11
          const day = time.getDate();
          const hours = pad(time.getHours());
          const minutes = pad(time.getMinutes());
          const seconds = pad(time.getSeconds());

          // Build the formatted string
          const formattedString = `${month}/${day} ${hours}:${minutes}:${seconds}`;

          return {
            timestamp: formattedString,
            temperature: d.t,
            humidity: d.h,
            pressure: d.p,
            unixTimestamp: d.ts,
          };
        });
        const lastData = mappedData.at(-1);

        setEnvData(mappedData);
        setLatestTemperature(lastData?.temperature);
        setLatestHumidity(lastData?.humidity);
        setLatestPressure(lastData?.pressure);
        setLastUpdatedAt(lastData?.timestamp);
        setIsExpired(lastData ? new Date().getDate() - lastData.unixTimestamp > 60 * 1000 : true);
      })
      .catch((error) => {
        if (dataInterval) {
          clearInterval(dataInterval);
          setDataInterval(null);
        }
        setIsExpired(true);
        console.error(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 2 * 1000);
    setDataInterval(interval);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-16 lg:p-24">
      <div className="z-10 flex min-h-[36rem] w-full max-w-6xl flex-col gap-8 md:flex-row">
        <div className="flex flex-col gap-5 pt-2 md:basis-1/4">
          <div className="-mb-2 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <span className="font-sans text-xl font-medium">°C</span>
              <Switch
                checked={!isCelsius}
                onChange={() => setIsCelsius(!isCelsius)}
                className={`${!isCelsius ? 'bg-[#ff6384]' : 'bg-stone-400'}
          relative inline-flex h-[1.5rem] w-[2.75rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${!isCelsius ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[1.25rem] w-[1.25rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <span className="font-sans text-xl font-medium">°F</span>
            </div>
          </div>

          <div className="flex max-h-[8rem] flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg border border-gray-300 p-2">
            <FontAwesomeIcon icon={faTemperatureHalf} className="text-4xl text-[#ff6384]" fixedWidth />
            <p className="font-sans text-3xl font-semibold tracking-wide">
              {latestTemperature
                ? `${isCelsius ? latestTemperature : toFahrenheit(latestTemperature)} ${isCelsius ? '°C' : '°F'}`
                : 'N/A'}
            </p>
          </div>

          <div className="flex max-h-[8rem] flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg border border-gray-300 p-2">
            <FontAwesomeIcon icon={faDroplet} className="text-4xl text-[#35a2eb]" fixedWidth />
            <p className="font-sans text-3xl font-semibold tracking-wide">
              {latestHumidity ? `${latestHumidity} %` : 'N/A'}
            </p>
          </div>

          <div className="flex max-h-[8rem] flex-1 items-center justify-center gap-2 overflow-hidden rounded-lg border border-gray-300 p-2">
            <FontAwesomeIcon icon={faWind} className="text-4xl text-green-500" fixedWidth />
            <p className="font-sans text-3xl font-semibold tracking-wide">
              {latestPressure ? `${latestPressure} hPa` : 'N/A'}
            </p>
          </div>
          <p
            className={`-mt-3 text-center font-sans text-sm md:text-left ${isExpired ? 'text-red-600' : 'text-gray-500'}`}
          >
            Updated at: {lastUpdatedAt ?? 'N/A'}
          </p>
        </div>

        <div className="flex h-full flex-col gap-6 md:basis-3/4">
          <div className="flex-1">
            <Line
              data={{
                labels: envData.map((d) => d.timestamp),
                datasets: [
                  {
                    label: `Temperature (${isCelsius ? '°C' : '°F'})`,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    data: envData.map((d) => {
                      if (isCelsius) return d.temperature;

                      return toFahrenheit(d.temperature);
                    }),
                    yAxisID: 'y',
                  },
                  {
                    label: 'Humidity (%)',
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    data: envData.map((d) => d.humidity),
                    yAxisID: 'y1',
                  },
                ],
              }}
              options={{
                animation: { duration: 0 },
                responsive: true,
                interaction: {
                  mode: 'index' as const,
                  intersect: false,
                },
                plugins: {
                  title: {
                    display: true,
                    text: '',
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                    ticks: { maxTicksLimit: 6 },
                  },
                  y: {
                    type: 'linear' as const,
                    display: true,
                    position: 'left' as const,
                  },
                  y1: {
                    type: 'linear' as const,
                    display: true,
                    position: 'right' as const,
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                },
                elements: {
                  line: {
                    cubicInterpolationMode: 'monotone',
                  },
                  point: {
                    radius: 1,
                    hoverRadius: 2.5,
                  },
                },
              }}
            />
          </div>

          <div className="flex-1">
            <Line
              data={{
                labels: envData.map((d) => d.timestamp),
                datasets: [
                  {
                    label: 'Atmospheric pressure (hPa)',
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.5)',
                    data: envData.map((d) => d.pressure),
                    yAxisID: 'y',
                  },
                ],
              }}
              options={{
                animation: { duration: 0 },
                responsive: true,
                interaction: {
                  mode: 'index' as const,
                  intersect: false,
                },
                plugins: {
                  title: {
                    display: true,
                    text: '',
                  },
                },
                scales: {
                  x: {
                    grid: {
                      drawOnChartArea: false,
                    },
                    ticks: { maxTicksLimit: 6 },
                  },
                  y: {
                    type: 'linear' as const,
                    display: true,
                    position: 'left' as const,
                  },
                },
                elements: {
                  line: {
                    cubicInterpolationMode: 'monotone',
                  },
                  point: {
                    radius: 1,
                    hoverRadius: 2.5,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

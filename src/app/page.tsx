'use client';

import { BarElement, CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { getData } from '@/lib/api';
import { AllEnvDataResponse } from '@/types/backend.schema';
import { faDroplet, faTemperatureHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const toFahrenheit = (celsius: number) => {
  return Number(Number(1.8 * celsius + 32).toFixed(2));
};

export default function Home() {
  const [envData, setEnvData] = useState<{ timestamp: string; temperature: number; humidity: number }[]>([]);
  const [latestTemperature, setLatestTemperature] = useState<number | undefined>(undefined);
  const [latestHumidity, setLatestHumidity] = useState<number | undefined>(undefined);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | undefined>(undefined);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  useEffect(() => {
    setInterval(() => {
      getData()
        .then((result: AllEnvDataResponse) => {
          console.log(result);
          const mappedData = result.data.map((d) => {
            const time = new Date(d.unix_timestamp);

            // Leading zero helper function
            const pad = (number: number) => number.toString().padStart(2, '0');

            // Format the date and time parts
            const month = time.getMonth() + 1; // getMonth() returns 0-11
            const day = time.getDate();
            const hours = pad(time.getHours());
            const minutes = pad(time.getMinutes());
            const seconds = pad(time.getSeconds());

            // Build the formatted string
            const formattedString = `${month}/${day} ${hours}:${minutes}:${seconds}`;

            return { timestamp: formattedString, temperature: d.temperature, humidity: d.humidity };
          });
          const lastData = mappedData.at(-1);

          setEnvData(mappedData);
          setLatestTemperature(lastData?.temperature);
          setLatestHumidity(lastData?.humidity);
          setLastUpdatedAt(lastData?.timestamp);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 flex min-h-[28rem] w-full max-w-6xl flex-col gap-6 md:flex-row">
        <div className="flex flex-col gap-4 pt-2 md:basis-1/4">
          <div className="-mb-3">
            <button className="button mb-2 rounded bg-blue-500 p-2 text-white" onClick={() => setIsCelsius(!isCelsius)}>
              C 🉑 F
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 p-2">
            <FontAwesomeIcon icon={faTemperatureHalf} className="text-5xl text-[#ff6384]" fixedWidth />
            <p className="font-sans text-4xl font-semibold tracking-wide">
              {latestTemperature
                ? `${isCelsius ? latestTemperature : toFahrenheit(latestTemperature)} ${isCelsius ? '°C' : '°F'}`
                : 'N/A'}
            </p>
          </div>

          <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 p-2">
            <FontAwesomeIcon icon={faDroplet} className="text-5xl text-[#35a2eb]" fixedWidth />
            <p className="font-sans text-4xl font-semibold tracking-wide">
              {latestHumidity ? `${latestHumidity} %` : 'N/A'}
            </p>
          </div>
          <p className="-mt-3 font-sans text-sm text-gray-500">Updated at: {lastUpdatedAt ?? 'N/A'}</p>
        </div>

        <div className="h-full md:basis-3/4">
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
      </div>
    </main>
  );
}

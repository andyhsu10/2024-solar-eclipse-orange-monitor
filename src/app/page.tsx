'use client';

import {
    BarElement, CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { getData } from '@/lib/api';
import { AllEnvDataResponse } from '@/types/backend.schema';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

export default function Home() {
  const [envData, setEnvData] = useState<{ timestamp: string; temperature: number; humidity: number }[]>([]);
  const [latestTemperature, setLatestTemperature] = useState<number | undefined>(undefined);
  const [latestHumidity, setLatestHumidity] = useState<number | undefined>(undefined);
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  useEffect(() => {
    setInterval(() => {
      getData()
        .then((result: { data: AllEnvDataResponse }) => {
          const mappedData = result.data.data.map((d) => {
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
          setEnvData(mappedData);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 flex min-h-[28rem] w-full max-w-6xl flex-col items-center justify-between gap-4 font-mono text-sm md:flex-row">
        <div className="basis-1/4"></div>
        <div className="h-full basis-3/4">
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

                    return Number(1.8 * d.temperature + 32).toFixed(2);
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
              responsive: true,
              interaction: {
                mode: 'index' as const,
                intersect: false,
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Chart.js Line Chart - Multi Axis',
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

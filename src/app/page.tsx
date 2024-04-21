'use client';

import 'moment-timezone';

import { BarElement, CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

import { ENVIRONMENT_DATA } from '@/constants/data';
import { faClock, faDownload, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@headlessui/react';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const toFahrenheit = (celsius: number) => {
  return Number(Number(1.8 * celsius + 32).toFixed(2));
};

export default function DataPage() {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 py-10 md:px-16 lg:px-24">
      <div className="flex min-h-[36rem] w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col items-center gap-1 text-gray-700">
          <p className="inline-flex items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot} className="max-h-4" fixedWidth />
            Location: Archey Creek Park, Clinton, AR, USA (35°35'51.2"N 92°27'16.6"W)
          </p>

          <p className="inline-flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="max-h-4" fixedWidth />
            Time Duration (UTC -5): 2024-04-08 12:52:28 ~ 2024-04-08 15:18:58
          </p>

          <p className="inline-flex items-center gap-2">
            <FontAwesomeIcon icon={faDownload} className="max-h-4" fixedWidth />

            <Link
              href={'raw_data.json'}
              className="hover:text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              locale={false}
            >
              raw_data.json
            </Link>

            <Link
              href={'raw_data.csv'}
              className="hover:text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              locale={false}
            >
              raw_data.csv
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center">
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

        <div className="flex-1">
          <Line
            data={{
              labels: ENVIRONMENT_DATA.map((d) => moment(d.timestamp).tz('America/Chicago').format('M/D HH:mm:ss')),
              datasets: [
                {
                  label: `Temperature (${isCelsius ? '°C' : '°F'})`,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  data: ENVIRONMENT_DATA.map((d) => {
                    if (isCelsius) return d.temperature;

                    return toFahrenheit(d.temperature);
                  }),
                  yAxisID: 'y',
                },
                {
                  label: 'Humidity (%)',
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  data: ENVIRONMENT_DATA.map((d) => d.humidity),
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
                  ticks: { maxTicksLimit: 7 },
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
              labels: ENVIRONMENT_DATA.map((d) => moment(d.timestamp).tz('America/Chicago').format('M/D HH:mm:ss')),
              datasets: [
                {
                  label: 'Atmospheric pressure (hPa)',
                  borderColor: 'rgb(34, 197, 94)',
                  backgroundColor: 'rgba(34, 197, 94, 0.5)',
                  data: ENVIRONMENT_DATA.map((d) => d.pressure),
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
                  ticks: { maxTicksLimit: 7 },
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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-700 rtl:text-right">
            <thead className="bg-gray-50 text-xs">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  TIME (UTC -5)
                </th>
                <th scope="col" className="px-6 py-3">
                  TEMPERATURE (°C)
                </th>
                <th scope="col" className="px-6 py-3">
                  HUMIDITY (%)
                </th>
                <th scope="col" className="px-6 py-3">
                  ATMOSPHERIC PRESSURE (hPa)
                </th>
              </tr>
            </thead>

            <tbody>
              {ENVIRONMENT_DATA.map((data, index) => {
                return (
                  <tr
                    className={`${index < ENVIRONMENT_DATA.length - 1 ? 'border-b' : ''} border-gray-300 bg-white hover:bg-gray-50`}
                    key={`data-${index}`}
                  >
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {moment(data.timestamp).tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss')}
                    </td>
                    <td className="px-6 py-4">{data.temperature}</td>
                    <td className="px-6 py-4">{data.humidity}</td>
                    <td className="px-6 py-4">{data.pressure}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

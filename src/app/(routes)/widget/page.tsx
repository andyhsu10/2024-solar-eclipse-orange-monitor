'use client';

import 'moment-timezone';

import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { getLatestData } from '@/lib/api';
import { pad } from '@/lib/utils';
import { LatestEnvDataResponse } from '@/types/backend.schema';
import { faDroplet, faTemperatureHalf, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Data = {
  temperature: number;
  humidity: number;
  pressure: number;
  unixTimestamp: number;
};

type Phase = {
  name: string;
  unixTimestamp: number;
};

type Countdown = {
  seconds: number;
  minutes: number;
  hours: number;
};

const phases: Phase[] = [
  { name: '初虧', unixTimestamp: 1712597017000 },
  { name: '食既', unixTimestamp: 1712601656000 },
  { name: '食甚', unixTimestamp: 1712601787000 },
  { name: '生光', unixTimestamp: 1712601918000 },
  { name: '復圓', unixTimestamp: 1712606593000 },
];

function Widget() {
  const searchParams = useSearchParams();
  const reverse = Boolean(searchParams.get('reverse'));

  const [envData, setEnvData] = useState<Data | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [currentPhase, setCurrentPhase] = useState<Phase | undefined>(undefined);
  const [phaseCountdown, setPhaseCountdown] = useState<Countdown>({ seconds: 0, minutes: 0, hours: 0 });
  const [utcOffset, setUtcOffset] = useState<number>(-5);

  const fetchLatestData = () => {
    getLatestData()
      .then((result: LatestEnvDataResponse) => {
        const data = result.data;

        if (data) {
          setEnvData({
            unixTimestamp: data.ts,
            temperature: data.t,
            humidity: data.h,
            pressure: data.p,
          });
        }

        setTimeout(fetchLatestData, 15 * 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateCurrentTimeAndPhase = () => {
    const now = new Date();
    setCurrentTime(now);

    // Find the next phase
    const nextPhase = phases.find((phase) => phase.unixTimestamp > now.getTime());
    setCurrentPhase(nextPhase);

    if (nextPhase) {
      const difference = Math.floor((nextPhase.unixTimestamp - now.getTime()) / 1000);

      // Convert milliseconds into hours, minutes, and seconds
      let seconds = difference;
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      seconds = seconds % 60;
      minutes = minutes % 60;

      setPhaseCountdown({ hours, minutes, seconds });
    }
  };

  useEffect(() => {
    fetchLatestData();

    const timePhaseInterval = setInterval(() => {
      updateCurrentTimeAndPhase();
    }, 400);

    // Set UTC Offset
    setUtcOffset(moment().tz('America/Chicago').utcOffset() / 60);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(timePhaseInterval);
    };
  }, []);

  return (
    <main className="flex h-screen w-screen items-center justify-center p-4">
      <div
        className={`h-52 w-72 overflow-hidden rounded-2xl border border-gray-300 bg-gray-300 p-4 font-mono text-xl ${reverse ? 'text-white' : 'text-black'}`}
      >
        <p className="font-sans font-bold">2024 北美日全食</p>
        <p>
          {moment(currentTime).tz('America/Chicago').format('HH:mm:ss')} (
          <span className="inline-flex gap-2">
            UTC
            <span>
              {utcOffset >= 0 ? '+' : ''}
              {utcOffset}
            </span>
          </span>
          )
        </p>
        <p>
          {currentPhase ? (
            <>
              <span className="font-sans">{currentPhase.name}</span>{' '}
              <span>
                +{pad(phaseCountdown.hours)}:{pad(phaseCountdown.minutes)}:{pad(phaseCountdown.seconds)}
              </span>
            </>
          ) : (
            <>
              {currentTime.getTime() > (phases.at(-1)?.unixTimestamp ?? 0) ? (
                <>
                  <span className="font-sans">復圓</span>
                  {' +00:00:00'}
                </>
              ) : (
                'N/A +00:00:00'
              )}
            </>
          )}
        </p>

        <div className="mt-2">
          <p className="flex items-center gap-2">
            <FontAwesomeIcon icon={faTemperatureHalf} className="text-[#ff6384]" fixedWidth />
            {envData ? (
              <span className="inline-flex gap-1">
                {envData.temperature}
                <span>°C</span>
              </span>
            ) : (
              'N/A'
            )}
          </p>
          <p className="flex items-center gap-2">
            <FontAwesomeIcon icon={faDroplet} className="text-[#35a2eb]" fixedWidth />
            {envData ? (
              <span className="inline-flex gap-1">
                {envData.humidity}
                <span>%</span>
              </span>
            ) : (
              'N/A'
            )}
          </p>
          <p className="flex items-center gap-2">
            <FontAwesomeIcon icon={faWind} className="text-green-500" fixedWidth />
            {envData ? (
              <span className="inline-flex gap-1">
                {envData.pressure}
                <span>hPa</span>
              </span>
            ) : (
              'N/A'
            )}
          </p>
        </div>
      </div>
    </main>
  );
}

export default function WidgetPage() {
  return (
    <Suspense>
      <Widget />
    </Suspense>
  );
}

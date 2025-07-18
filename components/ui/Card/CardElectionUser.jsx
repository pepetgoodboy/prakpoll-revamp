import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/id';
import Image from 'next/image';
import { IoCalendarOutline } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import ButtonHero from '../Button/ButtonHero';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function CardElectionUser({ election }) {
  const timeNow = dayjs().tz('Asia/Jakarta');

  const checkVoteTime = (election) => {
    const start = dayjs(election.startDate).tz('Asia/Jakarta');
    const end = dayjs(election.endDate).tz('Asia/Jakarta');
    return timeNow.isBefore(start) || timeNow.isAfter(end);
  };
  const getTime = (date) => {
    return dayjs(date)
      .tz('Asia/Jakarta')
      .locale('id')
      .format('DD MMMM YYYY HH.mm');
  };
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="bg-indigo-100 h-48 flex">
        {election.candidates.length > 0 ? (
          election.candidates.map((candidate, index) => (
            <div key={index} className="w-full relative">
              <Image
                src={candidate.image}
                alt={candidate.name}
                priority
                width={400}
                height={200}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 33vw, 33vw"
                quality={60}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                <p className="text-white text-xs font-medium text-center">
                  {candidate.name || 'Unknown'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full relative">
            <Image
              src="/placeholder-image.jpg" // default image
              alt="No Candidates"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {election.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-4">
          <IoCalendarOutline className="w-4 h-4 mr-2 text-indigo-500" />
          <p className="text-sm">
            {getTime(election.startDate)} - {getTime(election.endDate)}
          </p>
        </div>

        <div className="mb-5 space-y-1 flex-grow">
          {election.candidates.map((candidate, index) => (
            <div key={index} className="flex items-center">
              <FiUser className="w-4 h-4 mr-2 text-indigo-500" />
              <p className="text-sm text-gray-600">
                Kandidat {index + 1}:{' '}
                <span className="font-medium">{candidate.name}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <div data-testid="vote-button">
            <ButtonHero
              href={`/dashboard/user/pemilihan/vote/${election.id}`}
              text="Vote Sekarang"
              disabled={checkVoteTime(election)}
              variant="white"
              textColor="secondary"
              className="w-full border border-secondary"
            />
          </div>
          <div data-testid="result-button">
            <ButtonHero
              href={`/dashboard/user/pemilihan/${election.id}`}
              text="Lihat Hasil"
              variant="secondary"
              textColor="white"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

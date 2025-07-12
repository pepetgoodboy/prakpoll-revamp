import Image from 'next/image';
import ButtonHero from '@/components/ui/Button/ButtonHero';
import { IoCalendarOutline } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';

export default function CardElection({
  electionId,
  candidates,
  title,
  startDate,
  endDate,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex bg-indigo-100 h-48">
        {candidates.map((candidate, index) => (
          <div key={index} className={`w-full relative`}>
            <Image
              src={candidate.image}
              alt={candidate.name}
              width={400}
              height={200}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 33vw, 33vw"
              quality={60}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
              <p className="text-white text-xs font-medium text-center">
                {candidate.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>

        <div className="flex items-center text-gray-600 mb-4">
          <IoCalendarOutline className="w-4 h-4 mr-2 text-indigo-500" />
          <p className="text-sm">
            {startDate} - {endDate}
          </p>
        </div>

        <div className="mb-5 space-y-1">
          {candidates.map((candidate, index) => (
            <div key={index} className="flex items-center">
              <FiUser className="w-4 h-4 mr-2 text-indigo-500" />
              <p className="text-sm text-gray-600">
                Kandidat {index + 1}:{' '}
                <span className="font-medium">{candidate.name}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <ButtonHero
            href={`/dashboard/user/pemilihan/vote/${electionId}`}
            text="Pilih Sekarang"
            variant="white"
            textColor="secondary"
            className="border border-indigo-600 w-full hover:bg-indigo-50"
          />
          <ButtonHero
            href={`/dashboard/user/pemilihan/${electionId}`}
            text="Lihat Hasil"
            variant="secondary"
            textColor="white"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

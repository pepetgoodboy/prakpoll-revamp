import Link from 'next/link';
import React from 'react';
import { LuUserRoundCog } from 'react-icons/lu';
import { MdOutlineHowToVote, MdOutlineSpaceDashboard } from 'react-icons/md';
import { PiUsersFourLight } from 'react-icons/pi';
import FormLogout from '@/components/ui/Form/FormLogout';

export default function SidebarLink({ user, pathname, onClick = () => {} }) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href={user.role === 'Admin' ? '/dashboard/admin' : '/dashboard/user'}
        onClick={onClick}
        className={
          `flex gap-4 items-center px-6 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 ease-in` +
          (pathname === '/dashboard/admin' || pathname === '/dashboard/user'
            ? ' bg-secondary text-white'
            : 'bg-white text-gray-500')
        }
      >
        <MdOutlineSpaceDashboard className="w-7 h-7" />
        <span className="text-lg">Dashboard</span>
      </Link>
      {user.role === 'Admin' && (
        <div data-testid="link-users">
          <Link
            href="/dashboard/admin/users"
            onClick={onClick}
            className={
              `flex gap-4 items-center px-6 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 ease-in` +
              (pathname === '/dashboard/admin/users'
                ? ' bg-secondary text-white'
                : 'bg-white text-gray-500')
            }
          >
            <PiUsersFourLight className="w-7 h-7" />
            <span className="text-lg">Users</span>
          </Link>
        </div>
      )}
      <div data-testid="link-pemilihan">
        <Link
          href={
            user.role === 'Admin'
              ? '/dashboard/admin/pemilihan'
              : '/dashboard/user/pemilihan'
          }
          onClick={onClick}
          className={
            `flex gap-4 items-center px-6 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 ease-in ` +
            ((user.role === 'Admin' &&
              pathname.startsWith('/dashboard/admin/pemilihan')) ||
            (user.role === 'User' &&
              pathname.startsWith('/dashboard/user/pemilihan'))
              ? 'bg-secondary text-white'
              : 'bg-white text-gray-500')
          }
        >
          <MdOutlineHowToVote className="w-7 h-7" />
          <span className="text-lg">Pemilihan</span>
        </Link>
      </div>
      {user.role === 'User' && (
        <Link
          data-testid="link-profile"
          href="/dashboard/user/profil"
          onClick={onClick}
          className={
            `flex gap-4 items-center px-6 py-3 rounded-xl hover:bg-secondary hover:text-white transition-all duration-200 ease-in ` +
            (pathname === '/dashboard/user/profil'
              ? 'bg-secondary text-white'
              : 'bg-white text-gray-500')
          }
        >
          <LuUserRoundCog className="w-7 h-7" />
          <span className="text-lg">Profil</span>
        </Link>
      )}
      <FormLogout />
    </div>
  );
}

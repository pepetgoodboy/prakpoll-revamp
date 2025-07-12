import FormEditProfile from '@/components/ui/Form/FormEditProfile';

export default async function DashboardProfilUsers() {
  return (
    <div className="px-6 lg:px-8 lg:py-8 w-full">
      <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
          Profil
        </h1>
        <FormEditProfile />
      </div>
    </div>
  );
}

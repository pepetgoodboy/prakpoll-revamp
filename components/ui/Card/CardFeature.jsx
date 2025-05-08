export default function CardFeature({ icon: Icon, title, description }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 border border-gray-300 rounded-lg bg-secondary/5">
      <div className="flex flex-col gap-4">
        <Icon className="text-3xl text-secondary font-medium p-1 bg-secondary/20 rounded-lg" />
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

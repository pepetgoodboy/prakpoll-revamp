import Spinner from "@/components/ui/Spinner/Spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Spinner variant="secondary" />
    </div>
  );
}

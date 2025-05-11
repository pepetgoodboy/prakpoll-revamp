import { useUserStore } from "@/store/userStore";

export default function PaginationUsers({ handlePageChange, totalPages }) {
  const { currentPage } = useUserStore();
  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-600">
        Halaman {currentPage} dari {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-white bg-secondary hover:bg-secondary/90 cursor-pointer rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-white bg-secondary hover:bg-secondary/90 cursor-pointer rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

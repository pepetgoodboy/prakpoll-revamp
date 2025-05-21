import { useUserStore } from "@/store/userStore";

export default function SearchInputUsers() {
  const { search, setSearch, setCurrentPage } = useUserStore();
  return (
    <input
      type="text"
      name="search"
      placeholder="Cari user berdasarkan nama..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
      className="p-3 rounded-lg border border-gray-200 w-full outline-none focus:border-2 focus:border-secondary/70"
    />
  );
}

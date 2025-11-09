import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useProductStore } from "../store/useProductStore";
import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";
export default function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <Navbar />
      <h1 className="mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justidy-between items-center mb-8">
          <button className="btn btn-primary">
            <PlusCircleIcon className="size-5 mr-2" />
            Add Product
          </button>

          <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
            <RefreshCwIcon className="size-5" />
          </button>
        </div>

        {error && <div className="alert alert-error mb-8"> {error}</div>}

        {loading ? (
          <div className="flex justidy-center items-center h-64">
            <div className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols3 gap-6"></div>
        )}
      </h1>
    </div>
  );
}

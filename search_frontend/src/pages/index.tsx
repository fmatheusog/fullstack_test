import { ProductCard } from "../components/ProductCard";
import { ProductList } from "../components/ProductList";
import { Filters } from "@/interfaces/filters.interface";
import { Product } from "@/interfaces/product.interface";
import axiosInstance from "@/util/axios";
import { FunctionComponent, useState } from "react";

const Home: FunctionComponent = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchString, setSearchString] = useState("");
  const [source, setSource] = useState("all");

  const fetchProducts = async (payload: Filters): Promise<void> => {
    setProducts([]);
    setLoading(true);

    const { data } = await axiosInstance.post("products", payload);
    setProducts(data.data);

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 min-h-screen">
      <header className="fixed top-0 left-0 right-0 p-12 h-16 bg-gray-900">
        <nav className="flex justify-center">
          <div className="mx-4">
            <select
              className="bg-gray-400 rounded w-40 hover:bg-gray-400 p-1"
              onChange={(event) => setSource(event.target.value)}
              value={source}
            >
              <option value="all">Todas</option>
              <option value="ml">Mercado Livre</option>
              <option value="buscape">Buscapé</option>
            </select>
          </div>
          <div className="mx-4">
            <select
              className="bg-gray-400 rounded w-40 hover:bg-gray-400 p-1"
              onChange={(event) => setCategory(event.target.value)}
              value={category}
            >
              <option disabled value="">
                Categorias
              </option>
              <option value="geladeira">Geladeira</option>
              <option value="tv">TV</option>
              <option value="celular">Celular</option>
            </select>
          </div>
          <div className="mx-4">
            <input
              className="bg-gray-200 w-48 rounded p-1"
              onChange={(event) => setSearchString(event.target.value)}
              placeholder="buscar produtos"
              type="text"
              value={searchString}
            />
          </div>
          <div className="mx-4">
            <button
              className="bg-gray-500 w-32 rounded-full p-1"
              onClick={() => fetchProducts({ source, category, searchString })}
              type="button"
            >
              Buscar
            </button>
          </div>
        </nav>
      </header>
      <main className="mt-24">
        <div className="flex justify-center">
          {loading ? "Carregando" : null}
          {products ? (
            <ProductList>
              {products.map((p) => (
                <ProductCard
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  source={p.source}
                  url={p.url}
                  key={p.url}
                />
              ))}
            </ProductList>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default Home;

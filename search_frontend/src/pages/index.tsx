import { useState } from 'react';

const Home = () => {
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [searchString, setSearchString] = useState('');

  return (
    <div className="h-screen bg-gray-800">
        <div className="fixed top-0 left-0 right-0 p-12">
          <nav>
            <ul className="flex justify-center">
              <li className="mx-4">
                <select
                  className="bg-gray-400 rounded w-40 hover:bg-gray-400 p-1"
                  onChange={(event) => setSource(event.target.value)}
                  value={source}
                >
                  <option selected value="all">Todas</option>
                  <option value="mercado_livre">Mercado Livre</option>
                  <option value="buscape">Buscapé</option>
                </select>
              </li>
              <li className="mx-4">
              <select
                className="bg-gray-400 rounded w-40 hover:bg-gray-400 p-1"
                onChange={(event) => setCategory(event.target.value)}
                value={category}
              >
                  <option disabled selected value="">Categorias</option>
                  <option value="geladeira">Geladeira</option>
                  <option value="tv">TV</option>
                  <option value="celular">Celular</option>
                </select>
              </li>
              <li className="mx-4">
                <input
                  className="bg-gray-200 w-48 rounded p-1"
                  onChange={(event) => setSearchString(event.target.value)}
                  placeholder="search products"
                  type="text"
                  value={searchString}
                />
              </li>
              <li className="mx-4">
                <button
                  className="bg-gray-500 w-32 rounded-full p-1"
                  type="button"
                >
                  Buscar
                </button>
              </li>
            </ul>
          </nav>
        </div>
    </div>    
  )
}

export default Home;

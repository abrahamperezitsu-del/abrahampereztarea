import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductList() {
  // Los 3 estados obligatorios
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Ocurrió un error inesperado al cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Array vacío para que solo se ejecute al montar el componente

  // Renderizado condicional según el estado
  if (loading) {
    return <div className="status-message loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="status-message error">Error: {error}</div>;
  }

  return (
    <div className="product-list-wrapper">
      <h1 className="list-title">Catálogo de Productos</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id} // Requisito técnico obligatorio
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
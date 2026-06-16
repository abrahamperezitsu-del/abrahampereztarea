import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  // 1. Definición de los 3 estados obligatorios
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect para disparar el fetch al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error('No se pudo conectar con el servidor');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Ocurrió un error inesperado');
      } finally {
        // Finaliza el estado de carga tanto si fue exitoso como si falló
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Array de dependencias vacío = solo se ejecuta al montar

  // 3. Renderizado condicional según el estado
  if (loading) {
    return <div className="status-message">Cargando productos...</div>;
  }

  if (error) {
    return <div className="status-message error-message">Error: {error}</div>;
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} // Requisito crucial para que React optimice el renderizado
          title={product.title}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default ProductList;
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Mi Tienda Virtual</h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
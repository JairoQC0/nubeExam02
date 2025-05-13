import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import RutaPrivada from './components/RutaPrivada';
import { CarritoProvider } from './context/CarritoContext';

function App() {
  return (
    <CarritoProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/productos"
          element={
            <RutaPrivada>
              <Productos />
            </RutaPrivada>
          }
        />
        <Route
          path="/carrito"
          element={
            <RutaPrivada>
              <Carrito />
            </RutaPrivada>
          }
        />
      </Routes>
    </CarritoProvider>
  );
}

export default App;

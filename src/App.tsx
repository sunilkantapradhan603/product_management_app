import "./App.css";
import ProductContext from "./context/ProductContext";
import ProductPage from "./pages/product/ProductPage";

function App() {
  return (
    <ProductContext>
      <ProductPage />
    </ProductContext>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {



const [products, setProducts] = useState([]);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
  (async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get('/api/products');
      console.log(response.data);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  })();
}, []);


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>

      <div>
        <h1 className="text-bold" >The Souled Store</h1>
      </div>

     {/* search bar */}
      <div>
        <input className="" type="text" placeholder="Search products here"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

     
      {loading && (<h1>Loading.....</h1>)}
      {error && (<h1>Something went wrong.</h1>)}

      <div>
      { (searchQuery ? filteredProducts : products).map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <img width={70} src={product.image} alt="" />
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
        </div>
      ))}
    </div>
      
    </>
  );
}

export default App;


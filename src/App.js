import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const url = `https://dummyjson.com/recipes/search?q=${input}`;
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [cache, setCache] = useState({});
  async function fetchData() {
    try {
      const response = await fetch(url);
      const fetchedData = await response.json();
      setData(fetchedData.recipes || []);
      setCache((prev) => ({ ...prev, [input]: fetchedData.recipes }));
    } catch (error) {
      console.log("something went wrong", error);
    }
  }

  useEffect(() => {
    if (!input.trim()) return;
    const timer = setTimeout(() => {
      if (cache[input]) {
        setData(cache[input]);
      } else {
        fetchData();
      }
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return (
    <div className="App">
      <h1>Autocomplete</h1>
      <div style={{ width: "500px", margin: "auto" }}>
        <input
          style={{ width: "100%" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setOpen(true)}
          // onBlur={() => setOpen(false)}
        />
        {data.length > 0 && open ? (
          <div style={{ textAlign: "left", border: "1px solid black" }}>
            {data?.map((item) => (
              <p
                id="item"
                index={item.id}
                onClick={() => {
                  setInput(item.name);
                }}
              >
                {item.name}
              </p>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

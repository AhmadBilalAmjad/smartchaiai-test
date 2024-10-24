import React, { useState, useEffect, useMemo } from 'react';

// I have used fetch api to fetch data from the api, alternatively we can use axios to fetch data from the api But as example is with fetch api, I have used fetch api
// We can use TypeScript to type the data, but as example is without TypeScript, I have not used TypeScript

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/items', {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    // Cleanup function to abort fetch on component unmount
    return () => controller.abort();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter items..."
      />
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        ) : (
          <li>No items found</li>
        )}
      </ul>
    </div>
  );
};

export default ItemList;

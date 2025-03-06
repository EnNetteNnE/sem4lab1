import React, { useEffect, useState } from "react";

const CipherList = ({ onSelect, onLogout }) => {
  const [ciphers, setCiphers] = useState([]);
  const [newCipher, setNewCipher] = useState('');

  const fetchCiphers = async () => {
      const response = await fetch('http://127.0.0.1:5000/ciphers', {
        method: 'GET',
      });
      const data = await response.json();
      setCiphers(data);
      console.log(data)
    };
    

  useEffect(() => {
    fetchCiphers();
  }, []);


  const handleAddCipher = async () => {
    if (newCipher.length > 0 && newCipher.length < 30) {
      await fetch('http://127.0.0.1:5000/ciphers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCipher }),
      });
      setNewCipher('');
      fetchCiphers();
    } else {
      alert('Шифр должен содержать от 1 до 30 символов.');
    }
  };

  const handleDeleteCipher = async (name) => {
    await fetch('http://127.0.0.1:5000/ciphers', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    fetchCiphers();
  };


  return (
    <div>
      <h2>Список шифров</h2>
      <button onClick={onLogout}>Logout</button>
      <ul>
        {ciphers.map(cipher => (
          <li key={cipher[0]}>
            <button onClick={() => onSelect(cipher[0])}>{cipher[0]}</button>
            <button onClick={() => handleDeleteCipher(cipher[0])}>✖️</button>
          </li>
        ))}
      </ul>
      <input type="text" value={newCipher} onChange={e => setNewCipher(e.target.value)} />
      <button onClick={handleAddCipher}>+</button>
    </div>
  );
};

export default CipherList;

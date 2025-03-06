import React, { useEffect, useState } from "react";

const CipherDetail = ({ name, onBack }) => {
  const [cipher, setCipher] = useState(null);
  const [description, setDescription] = useState('');

  const fetchCipher = async () => {
      const response = await fetch('http://127.0.0.1:5000/cipher/'+name,  {
        method: 'GET',
      });
      const data = await response.json();
      setCipher(data);
      setDescription(data.description);
      console.log(data)
    };

  useEffect(() => { 
    fetchCipher();
  }, []);

  const handleUpdateDescription = async () => {
    await fetch('http://127.0.0.1:5000/ciphers', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, description: description }),
    });
    fetchCipher();
    alert('Описание обновлено!');
  };

  if (!cipher) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>{name}</h1>
      <h3>{cipher.description}</h3>
      <p>Изменить или добавить описание шифра:</p>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <br/>
      <button onClick={handleUpdateDescription}>Сохранить</button>
      <br/>
      <button onClick={onBack}>Back to list</button>
    </div>
  );
};

export default CipherDetail;

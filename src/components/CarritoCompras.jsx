import React, { useState } from 'react';

function CarritoCompras() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Card 1', content: 'Content for Card 1' },
    { id: 2, title: 'Card 2', content: 'Content for Card 2' },
    { id: 3, title: 'Card 3', content: 'Content for Card 3' }
  ]);

  const addCard = (newCardInfo) => {
    const newCard = {
      id: cards.length + 1,
      title: newCardInfo.title,
      content: newCardInfo.content
    };
    setCards([...cards, newCard]);
  };

  return (
    <div>
      <div className="card-list">
        {cards.map(card => (
          <div key={card.id} className="card">
            <h2>{card.title}</h2>
            <p>{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarritoCompras;
import React, { useState } from 'react';
import './index.css';

function App() {
  // State for managing the list of todo items
  const [items, setItems] = useState([]);
  // State for managing the input field value
  const [inputValue, setInputValue] = useState('');

  // Function to handle adding a new todo item
  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      // Split the input value by commas and trim each item
      const newItems = inputValue.split(',').map(item => item.trim());

      // Check if any of the items already exist in the list
      const existingItems = newItems.filter(item => items.includes(item));
      if (existingItems.length > 0) {
        alert('Okeola, You don add this item already: ' + existingItems.join(', '));
      } else {
        // Add each new item to the list
        setItems(prevItems => [...prevItems, ...newItems]);
      }

      setInputValue('');
    }
  };

  // Function to handle deleting a todo item
  const handleDeleteItem = (index) => {
    if (window.confirm('Okeola, Please confirm if you don finish with the item?')) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    }
  };

  // Function to handle input field key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="todo-container">
      <h1>Daily Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Hey! Okeola Wetin you wan add today"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress} // Call handleKeyPress function on key press
        />
        <button onClick={handleAddItem}>Add</button>
      </div>
      <ul className="todo-list">
        {items.map((item, index) => (
          <li key={index}>
            {index + 1}. {item} - {getDayOfWeek()} at {getTime()}
            <button onClick={() => handleDeleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Function to get the day of the week
function getDayOfWeek() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  return days[date.getDay()];
}

// Function to get the current time
function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}

export default App;

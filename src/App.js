import React, { useState, useEffect } from 'react';

function App() {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newTodos, setNewTodos] = useState('');
  const [searchTodo, setSearchTodo] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Something is wrong');
        }
        const result = await response.json();
        setTodo(result);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const addData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTodo, body: newTodos })
      });

      if (!response.ok) {
        throw new Error('Something is wrong');
      }

      const result = await response.json();
      setTodo(prevTodo => [...prevTodo, result]);
      setNewTodo('');
      setNewTodos('');
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Something is wrong');
      }

      setTodo(prevTodo => prevTodo.filter(item => item.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const filterData = todo.filter(post => post.title.toLowerCase().includes(searchTodo.toLocaleLowerCase()));

  return (
    <>
      <input type='text' value={searchTodo} onChange={(e) => setSearchTodo(e.target.value)} placeholder="Search Todo" />
      <ul>
        {filterData.map((todos, index) => (
          <li key={index}>
            <h3>{todos.title}</h3>
            <p>{todos.body}</p>
            <button onClick={() => deleteData(todos.id)}>Delete</button>
            {/* Add edit functionality here */}
            {/* <button onClick={() => editData(todos.id)}>Edit</button> */}
          </li>
        ))}
      </ul>
      <div>
        <h2>Add Todo</h2>
        <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Todo Title" />
        <input type='text' value={newTodos} onChange={(e) => setNewTodos(e.target.value)} placeholder="Todo Description" />

        <button onClick={addData}>Add Todo</button>
      </div>
    </>
  );
}

export default App;



// import React, { useState } from 'react';

// const App = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {
//       username: '',
//       email: '',
//       password: '',
//     };

//     if (formData.username.trim() === '') {
//       newErrors.username = 'Username is required';
//       isValid = false;
//     }

//     if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Invalid email address';
//       isValid = false;
//     }

//     if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters long';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Form submitted:', formData);
//     } else {
//       console.log('Form has errors');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           value={formData.username}
//           onChange={handleInputChange}
//         />
//         {errors.username && <span className="error">{errors.username}</span>}
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//         />
//         {errors.email && <span className="error">{errors.email}</span>}
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleInputChange}
//         />
//         {errors.password && <span className="error">{errors.password}</span>}
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default App;


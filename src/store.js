// src/store/store.js

export const initialStore = () => {
 
  const saved = localStorage.getItem("store");
  if (saved) {
    return JSON.parse(saved); 
  }

 
  return {
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null }
    ],
    people: [],
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "add_task": {
      const { id, color } = action.payload;
      const newStore = {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        )
      };
      localStorage.setItem("store", JSON.stringify(newStore)); 
      return newStore;
    }

    case "get_people": {
      const { people } = action.payload;
      const newStore = { ...store, people };
      localStorage.setItem("store", JSON.stringify(newStore)); 
      return newStore;
    }

    case "add_favorite": {
      const newStore = {
        ...store,
        favorites: [...store.favorites, action.payload.item]
      };
      localStorage.setItem("store", JSON.stringify(newStore)); 
      return newStore;
    }

    case "remove_favorite": {
      const { index } = action.payload;
      const newStore = {
        ...store,
        favorites: store.favorites.filter((_, i) => i !== index)
      };
      localStorage.setItem("store", JSON.stringify(newStore)); 
      return newStore;
    }

    default:
      throw Error("Unknown action.");
  }
}
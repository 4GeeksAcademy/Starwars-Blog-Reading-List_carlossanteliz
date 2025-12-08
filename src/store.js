export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    people: [],
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case "get_people":
      const { people } = action.payload
      return {
        ...store, people
      };

    case "add_favorite":
      return {
        ...store, favorites: [...store.favorites, action.payload.item]
      };

    case "remove_favorite":
      const { index } = action.payload;
      return {
        ...store,
        favorites: store.favorites.filter((_, i) => i !== index)
      };




    default:
      throw Error('Unknown action.');
  }
}

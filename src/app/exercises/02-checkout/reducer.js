import { produce } from 'immer';

function saveItems(items) {
  window.localStorage.setItem('items', JSON.stringify(items));
}

function reducer(state, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'add-item': {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );

        if (itemIndex !== -1) {
          draftState.items[itemIndex].quantity += 1;
          saveItems(draftState.items);
          return;
        }

        draftState.items.push({
          ...action.item,
          quantity: 1,
        });

        saveItems(draftState.items);
        return;
      }

      case 'delete-item': {
        const itemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );

        draftState.items.splice(itemIndex, 1);

        saveItems(draftState.items);
        return;
      }
      case 'load-items': {
        const savedItems = window.localStorage.getItem('items');

        if (!savedItems) {
          return;
        }

        draftState.items.push(...JSON.parse(savedItems));
        draftState.loading = false;
        return;
      }
    }
  });
}

export default reducer;

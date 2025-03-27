import { createSlice } from "@reduxjs/toolkit";

const initialMainMenuSlice = {
    items: [],
    changed: false
}

const addSubItemRecursive = (items, parentItemId, newSubItem) => {
    return items.map(item => {
        if (item.id === parentItemId) {
            return {...item, children: [...item.children || [], newSubItem]}
        }

        if (item.children) {
            return {...item, children: addSubItemRecursive(item.children, parentItemId, newSubItem)}
        }

        return item;
    })
}

const removeItemRecursive = (items, idToRemove) => {
    return items
        .map(item => {
            if (item.id === idToRemove) {
                return null; // Remove this element
            }
            if (item.children) {
                item.children = removeItemRecursive(item.children, idToRemove);
            }
            return item;
        })
        .filter(Boolean); // Remove deleted elements (null)
};

const editItemRecursive = (items, itemToEdit) => {
    return items.map( item => {
        if (item.id === itemToEdit.id) {
            return {...item, ...itemToEdit}
        }

        if (item.children) {
            return {... item, children: editItemRecursive(item.children, itemToEdit)};
        }

        return item;
    })
}

const changeItemIndexRecursive = (items, arrayToEdit, fromIndex, toIndex) => {
    if (JSON.stringify(items) === JSON.stringify(arrayToEdit)) {
        return swapItems(items, fromIndex, toIndex);
    }

    return items.map(item => {
        if (item.children) {
            return {
                ...item,
                children: changeItemIndexRecursive(item.children, arrayToEdit, fromIndex, toIndex)
            };
        }
        return item;
    });
}

function swapItems(arr, fromIndex, toIndex) {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= arr.length || toIndex >= arr.length) {
        console.error("Invalid indices");
        return arr;
    }
    const newArr = [...arr]; // Copy the array so as not to mutate the original
    [newArr[fromIndex], newArr[toIndex]] = [newArr[toIndex], newArr[fromIndex]];
    return newArr;
}

const mainMenuSlice = createSlice({
    name: 'mainMenu',
    initialState: initialMainMenuSlice,
    reducers: {
        addMenuItem(state, action) {
            state.items.push(action.payload);
            state.changed = true;
        },
        addMenuSubItem(state, action) {
            const parentItemId = action.payload.parentItemId;
            const newSubItem = action.payload.newSubItem;
            state.items = addSubItemRecursive(state.items, parentItemId, newSubItem);
            state.changed = true;
        },
        replaceMenuItems(state, action) {
            state.items = action.payload;
            state.changed = true;
        },
        removeMenuItem(state, action) {
            const idToRemove = action.payload.id;
            state.items = removeItemRecursive(state.items, idToRemove);
            state.changed = true;
        },
        editMenuItem(state, action) {
            const itemToEdit = action.payload;
            state.items = editItemRecursive(state.items, itemToEdit);
            state.changed = true;
        },
        changeItemIndex(state, action) {
            state.items = changeItemIndexRecursive(state.items, action.payload.arrayToEdit, action.payload.fromIndex, action.payload.toIndex);
            state.changed = true;
        }
    }
});

export default mainMenuSlice;
export const mainMenuSliceActions = mainMenuSlice.actions
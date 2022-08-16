//Establish DOM variables
const grocerySubmit = document.getElementById("addGrocery");
const list = document.getElementById("list");
const clearButton = document.getElementById("clear");

//Instantiate default state value
const intitialState = {
  groceries: [],
};

//Establish reducer, take initial state value and action as args
const groceryReducer = (state = intitialState.groceries, action) => {
  switch (action.type) {
    //use spread operator to add entire array of list
    case "grocery/add":
      return [
        ...state,
        {
          text: action.text,
        },
      ];
    //return empty array
    case "grocery/clear":
      return [];
    default:
      return state;
  }
};

//Create store
const store = Redux.createStore(groceryReducer);

//Actions
const clearList = () => {
  document.getElementById("newItem").value = "";
  store.dispatch({ type: "grocery/clear" });
  console.log(store.getState());
};

const newGrocery = (e) => {
  e.preventDefault();
  let groceryText = document.getElementById("newItem").value;
  store.dispatch({
    type: "grocery/add",
    text: groceryText,
  });
  document.getElementById("newItem").value = "";
  console.log(store.getState());
};

//Event listeners
grocerySubmit.addEventListener("click", (e) => {
  newGrocery(e);
});
clearButton.addEventListener("click", clearList);

//Render data
const renderList = (state) => {
  //check for previous element existing and remove so no duplicates
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  state.forEach((grocery) => {
    //generate list element for each
    let li = document.createElement("li");

    //append li to list element
    list.appendChild(li);

    //populate li w/ grocery item
    li.textContent = grocery.text;
  });
};

const render = () => {
  const state = store.getState();
  renderList(state);
};

store.subscribe(render);

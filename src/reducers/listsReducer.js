import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 6;

const initialState = [
	{
		title: "Last Episode",
		id: `list-${0}`,
		cards: [
			{
				id: `card-${0}`,
				text: "we created a static list and a static card"
			},
			{
				id: `card-${1}`,
				text: "we used a mix between material UI React and styled components"
			},
			{
				id: `card-${2}`,
				text: "we will also make some little changes I forgot in the last episode"
			}
		]
	},
{
		title: "This Episode",
		id: `list-${1}`,
		cards: [
			{
				id: `card-${3}`,
				text: "we will create our first reducer"
			},
			{
				id: `card-${4}`,
				text: "and render many cards on our list with static data"
			},
			{
				id: `card-${5}`,
				text: "we will also make some little changes I forgot in the last episode"
			},
			{
				id: `card-${6}`,
				text: "we will also make some little changes I forgot in the last episode"
			}
		]
	}

];

const listsReducer = (state = initialState, action) => {
	switch (action.type) {

		case CONSTANTS.ADD_LIST:
			const newList = {
				title: action.payload,
				id: `list-${listID}`,
				cards: []
				
			};
			listID += 1;
			return [...state, newList];

		case CONSTANTS.ADD_CARD: 
		{
				const newCard = {
					text: action.payload.text,
					id: `card-${cardID}`
				};
				cardID += 1;

				console.log("action received", action);

				const newState = state.map(list => {
					if (list.id === action.payload.listID) {
						return {
							...list, 
							cards: [...list.cards, newCard]
						};
					} else {
						return list;
					}
				});
			return newState;
		 }


				case CONSTANTS.DRAG_HAPPENED:

				const {
					droppableIdStart,
					droppableIdEnd,
					droppableIndexStart,
					droppableIndexEnd,
					draggableId,
					type
				} = action.payload;
					const newState = [...state];

					// dragging lists aroud - the listOrderReducer should handle this

					if(type === "list") {
						const list = newState.splice(droppableIndexStart, 1);
						newState.splice(droppableIndexEnd, 0, ...list);
						return newState;
					}

					// in the same list
					if(droppableIdStart === droppableIdEnd) {
						const list = state.find(list => droppableIdStart === list.id);
						const card = list.cards.splice(droppableIndexStart, 1);
						list.cards.splice(droppableIndexEnd, 0, ...card);
					}


					// other list

					if(droppableIdStart !== droppableIdEnd) {
						// find the list where drag happened 
						const listStart = state.find(list => droppableIdStart === list.id)

						// pull out the card from this place
						const card = listStart.cards.splice(droppableIndexStart, 1);

						// find the list where the drag ended
						const listEnd = state.find(list => droppableIdEnd === list.id);

						// put the card in the new list
						listEnd.cards.splice(droppableIndexEnd, 0, ...card);
						return {
				          ...state,
				          [droppableIdStart]: listStart,
				          [droppableIdEnd]: listEnd
        				};

					}

					

		default:
			return state;
	}
	
};

export default listsReducer;
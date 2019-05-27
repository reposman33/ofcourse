import produce from "immer";
import { TOGGLE_PREVIEW_MODE, LOGIN_SUCCESS } from "../actions";

const initialState = { previewMode: false, isLoggedIn: false };

const reducer = produce((draft, action) => {
	switch (action.type) {
		case TOGGLE_PREVIEW_MODE:
			draft.previewMode = !draft.previewMode;
			return;
		case LOGIN_SUCCESS:
			draft.loading = false;
			draft.isLoggedIn = action.payload[0].token.length > 0;
			draft.user = action.payload[0];
			return;

		default:
			return draft;
	}
}, initialState);

export default reducer;

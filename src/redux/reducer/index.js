import * as redux from "redux";

import ThemeToggleReducer from "./ThemeToggler";
import LoginReducer from "./LoginReducer";
import MenuTogglerReducer from "./MenuToggler";

const rootReducer = redux.combineReducers({
	theme: ThemeToggleReducer,
	user: LoginReducer,
	menu: MenuTogglerReducer
});

export default rootReducer;
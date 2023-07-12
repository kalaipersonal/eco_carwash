let initialState = {
	is_open: false,
	is_nav_menu_shown: false,
};

const MenuTogglerReducer = (state = initialState, action) => {
	switch (action.type) {
		case "TOGGLE_MENU":
			return Object.assign({}, state, {
				is_open: !state.is_open
			})
		case "NAV_MENU":
			return Object.assign({}, state, {
				is_nav_menu_shown: !state.is_nav_menu_shown
			})
		default:
			return state;
	}
}
export default MenuTogglerReducer;
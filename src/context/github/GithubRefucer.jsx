const GithubReducer = (state, action) => {

    switch (action.type) {

        case "LOADING_SCREEN":
            return {
                ...state,
                isLoading: true
            }



        case "SEARCH_USERS":
            return {
                ...state,
                users: action.payload,
                isLoading: false
            }
        case "GET_USER" :
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }


        default:
            return state
    }


}

export default GithubReducer
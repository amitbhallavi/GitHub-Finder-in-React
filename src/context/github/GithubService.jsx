export const searchUsers = async (searchQuery) => {
    const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`)
    const data = await response.json();
    return data.items
}
export const  fetchUser = async (id) => {
    const response = await fetch(`https://api.github.com/users/${id}`)
    const data = await response.json()
    return data ;
}



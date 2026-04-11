export let themeValue = {
    modernTheme: {
        font: 'Poppins',
        bgColor: 'bg-blue-400',
        color: 'black'
    },
    classicTheme: {
        font: 'Poppins',
        bgColor: 'bg-blue-900',
        color: 'white'
    },
    neonTheme: {
        font: 'Space Grotesk',
        bgColor: 'bg-blue-600',
        color: 'white'
    },
}

export const ThemeReducer = (state, action) => {
    switch (action.type) {
        case "MODERN_THEME":
            return { ...state, theme: themeValue.modernTheme }
        case "CLASSIC_THEME":
            return { ...state, theme: themeValue.classicTheme }
        case "NEON_THEME":
            return { ...state, theme: themeValue.neonTheme }
        default:
            return state
    }
}
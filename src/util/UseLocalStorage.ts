export const SESSION_KEY = 'SESSION_KEY'
export const USER_ID_KEY = 'USER_ID_KEY'
export default function UseLocalStorage(): [
    (key: string) => string | null,
    (key: string, value: string) => void,
] {
    const getLocal = (key: string): string | null => {
        return localStorage.getItem(key)
    }
    const saveLocal = (key: string, value: string): void => {
        localStorage.setItem(key, value)
    }

    return [getLocal, saveLocal]
}

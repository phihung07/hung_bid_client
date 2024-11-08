export const UseLoading = (is_loading: boolean) => {
    const display = is_loading ? 'block' : 'none'
    const element = document.getElementById('client_loading')
    if (!element) {
        return
    }
    element.style.display = display
}

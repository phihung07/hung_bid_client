export const ClientLoading = () => {
    return (
        <div
            className="bg-load"
            id="client_loading"
            style={{ display: 'none', zIndex: 9999999 }}
        >
            <div className="load">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

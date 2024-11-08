export interface ImgPreviewType {
    url: string
}
export const ImgPreview: React.FC<ImgPreviewType> = ({ url }) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img src={url} className="card-img-top" alt="preview" />
        </div>
    )
}

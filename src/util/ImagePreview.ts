import { ChangeEvent } from 'react'

export const ImagePreview = (
    e: ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void,
    NotcontainFile: () => void
) => {
    if (e.target.files?.length) {
        const url = window.URL.createObjectURL(e.target.files[0])
        callback(url)
    } else {
        NotcontainFile()
    }
}

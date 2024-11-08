import { IconButton } from '@mui/material'
import { Category } from '../../../interface'
import { PenIC, TrashIC } from '../../../assets/icon'

type CateItemType = {
    cate: Category
    OnEdit: (cate: Category) => void
    OnDelete: (cate_id: string) => void
}
export const CateItem: React.FC<CateItemType> = ({
    cate,
    OnDelete,
    OnEdit,
}) => {
    const create_at_date = new Date(cate.createdAt)
    const create_at_str = [
        create_at_date.getDate(),
        create_at_date.getMonth() + 1,
        create_at_date.getFullYear(),
    ].join('/')
    return (
        <tr className="tb1">
            <td>{cate.name}</td>
            <td>{create_at_str}</td>
            <td>
                <IconButton
                    onClick={() => OnEdit(cate)}
                    color="info"
                    style={{ marginRight: '1rem' }}
                >
                    <PenIC />
                </IconButton>
                <IconButton onClick={() => OnDelete(cate._id)} color="error">
                    <TrashIC />
                </IconButton>
            </td>
        </tr>
    )
}

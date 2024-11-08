import default_avatar from '../../../assets/image/profile.svg'
import { Bid } from '../../../interface'
type BidderItemType = {
    bid: Bid
    count: number
}
export const BidderItem: React.FC<BidderItemType> = ({ bid, count }) => {
    const date = new Date(bid.createdAt)
    const avatar =
        bid.user.avatar.url == 'default' ? default_avatar : bid.user.avatar.url
    return (
        <tr className={count % 2 == 0 ? 'tb1' : 'tb2'}>
            <td className="tdfirst d-flex align-items-center">
                <div className="icon">
                    <img
                        src={avatar}
                        alt="t-img"
                        style={{
                            width: '4rem',
                            height: '4rem',
                            borderRadius: '50%',
                        }}
                    />
                </div>
                <span>{bid.user.full_name}</span>
            </td>
            <td>
                {[date.getDate(), date.getMonth() + 1, date.getFullYear()].join(
                    '-'
                )}
            </td>
            <td>
                {date.getHours()}:{date.getMinutes()}
            </td>
            <td style={{ color: 'var(--secoundary-color)' }}>
                <strong>${bid.price}</strong>
            </td>
        </tr>
    )
}

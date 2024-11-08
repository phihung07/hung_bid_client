import ChildrenPros from '../interface/ChildrenPros.ts'
import { UseLocalStorage } from '../util'
import { SESSION_KEY } from '../util/UseLocalStorage.ts'
import { NotFoundPage } from '../page/common'

export const PrivateRoute: React.FC<ChildrenPros> = ({ children }) => {
    const [getLocal] = UseLocalStorage()
    const token = getLocal(SESSION_KEY)
    if (!token) {
        return <NotFoundPage />
    }
    return children
}

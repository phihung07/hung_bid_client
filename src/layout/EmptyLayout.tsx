import ChildrenPros from '../interface/ChildrenPros'
export const EmptyLayout: React.FC<ChildrenPros> = ({
    children,
}: ChildrenPros) => {
    return <div>{children}</div>
}

import { useOrderById } from '@/actions/hooks/orders/useOrderById'
import { ApiLoader } from '@/components/library/loading';
import EditableOrder from './EditableOrder';

export default function SelectedVenta({ selectedOrder }: { selectedOrder: string }) {


    const { data: order , isPending, isError } = useOrderById(selectedOrder)

    if (isPending) return (<div className='flex justify-center items-center'>
        <ApiLoader isPending />
    </div>)
    if (isError) return <h2>Ocurrió un error, intente más tarde...</h2>;


    if (order) return (
        <div>
            <EditableOrder
                order={order}
                onSave={(updatedOrder) => console.log(updatedOrder)} />

        </div>
    )
}

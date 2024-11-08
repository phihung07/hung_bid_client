import Swal from 'sweetalert2'

export const ShowSuccessDialog = () => {
    Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success',
    })
}

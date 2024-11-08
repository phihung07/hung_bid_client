import Swal, { SweetAlertResult } from 'sweetalert2'

export const ShowConfirmDeleteDialog = async (): Promise<SweetAlertResult> => {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4934d3',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    })
}

import Swal from "sweetalert2";

// This is a very basic composable module
export function useFlash() {
    function flash(iconType, title, message) {
        Swal.fire({
            icon: iconType,
            title: title,
            text: message
        });
    }

    return { flash };
}
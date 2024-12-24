import Swal from "sweetalert2";

// Fungsi untuk menampilkan alert
export function showAlert(props) {
  const { title, text, iconType = "success", timer = 3000, didClose } = props;

  const icon = {
    success: "https://cdn-icons-png.flaticon.com/512/845/845646.png",
    error: "https://cdn-icons-png.flaticon.com/128/463/463612.png",
  };

  Swal.fire({
    title: title,
    text: text,
    imageUrl: icon[iconType],
    imageWidth: 100,
    imageHeight: 100,
    timer: timer,
    showConfirmButton: false,
    didClose: () => {
      if (didClose) {
        didClose(); // Panggil didClose yang dipassing ke dalam fungsi
      }
    },
  });
}

/**
 * Menjalankan inisialisasi antarmuka setelah seluruh elemen DOM selesai dimuat.
 * Meliputi penanganan notifikasi flash (toast), konfirmasi penghapusan data via SweetAlert2, 
 * serta inisialisasi plugin DataTables pada tabel pendaftar.
 *
 * @listens DOMContentLoaded
 * @fires Swal.fire - Menampilkan notifikasi toast sukses atau dialog konfirmasi hapus.
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
  // Notifikasi flash (toast)
  const flash = document.getElementById("flash");
  if (flash) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: flash.dataset.pesan,
      showConfirmButton: false,
      timer: 3000,
    });
  }
  
  // Konfirmasi hapus
  document.querySelectorAll(".form-hapus").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      Swal.fire({
        title: "Hapus data?",
        text: `Data ${form.dataset.nama} akan dihapus permanen.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
      }).then((hasil) => {
        if (hasil.isConfirmed) form.submit();
      });
    });
  });

  // DataTables (Lab 4)
  const tabel = document.getElementById("tabelPendaftar");
  if (tabel && window.jQuery) {
    window.jQuery(tabel).DataTable({
      pageLength: 10,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.8/i18n/id.json",
      },
      columnDefs: [{ orderable: false, targets: -1 }],
    });
  }

     /**Elemen tabel yang akan diubah menjadi DataTables Kelas.
   */
  const tabelkelas = document.getElementById('tabelKelas');
  
  if (tabelkelas && window.jQuery) {
    /**
     * Konfigurasi DataTables bahasa Indonesia.
     * @global
     * @type {Object}
     */
    const dtConfig = {
      pageLength: 10,
      language: { url: 'https://cdn.datatables.net/plug-ins/1.13.8/i18n/id.json' },
      columnDefs: [{ orderable: false, targets: -1 }] 
    };
    
    window.jQuery(tabelkelas).DataTable(dtConfig);
  }
});
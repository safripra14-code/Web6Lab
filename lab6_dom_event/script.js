/* =====================================================
   Praktikum 6 — JavaScript DOM dan Event Handling
   Syafri Prayogo / 312510500
   (script dihubungkan dengan atribut defer agar DOM siap)
   ===================================================== */

/* =====================================================
   Latihan 1 — Mengubah teks dengan DOM
   ===================================================== */
function latihan1() {
    const judul = document.getElementById("judul");
    const pesan = document.getElementById("pesan");
    judul.textContent = "Belajar JavaScript DOM";
    pesan.textContent = "Konten berhasil diubah oleh JavaScript.";
}
latihan1(); // dijalankan saat halaman dimuat
document.getElementById("tombolL1").addEventListener("click", latihan1);

/* =====================================================
   Latihan 2 — Event click
   ===================================================== */
const tombolAksi = document.getElementById("tombolAksi");
tombolAksi.addEventListener("click", function () {
    const pesan = document.getElementById("pesan");
    pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString();
});

/* =====================================================
   Latihan 3 — Mengubah kelas dan gaya CSS
   ===================================================== */
const tombolGaya = document.getElementById("tombolGaya");
const teksGaya = document.getElementById("teksGaya");
tombolGaya.addEventListener("click", function () {
    teksGaya.classList.toggle("highlight");
    teksGaya.classList.toggle("teks-besar");
});

/* =====================================================
   Latihan 4 — Event input dan penghitung karakter
   ===================================================== */
const namaInput = document.getElementById("namaInput");
const jumlahKarakter = document.getElementById("jumlahKarakter");
namaInput.addEventListener("input", function () {
    jumlahKarakter.textContent = namaInput.value.length;
});

/* =====================================================
   Latihan 5 — Validasi form pendaftaran
   ===================================================== */
const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const usiaInput = document.getElementById("usia").value;
    const usia = Number(usiaInput);
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nama === "") {
        setPesan(pesanForm, "Nama wajib diisi.", "bad");
    } else if (!polaEmail.test(email)) {
        setPesan(pesanForm, "Masukkan email yang valid.", "bad");
    } else if (usiaInput === "" || !Number.isInteger(usia) || usia < 17 || usia > 100) {
        setPesan(pesanForm, "Usia harus berupa bilangan bulat 17-100.", "bad");
    } else {
        setPesan(pesanForm, "Validasi berhasil. Form siap diproses.", "ok");
        form.reset();
    }
});

function setPesan(el, teks, tipe) {
    el.textContent = teks;
    el.className = "out " + tipe;
}

/* =====================================================
   Latihan 6 — Daftar tugas (To-do List)
   + Eksperimen E1: tombol hapus item
   ===================================================== */
const inputTugas = document.getElementById("inputTugas");
const tambahTugas = document.getElementById("tambahTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanTugas = document.getElementById("pesanTugas");

tambahTugas.addEventListener("click", function () {
    const teks = inputTugas.value.trim();
    if (teks === "") {
        setPesan(pesanTugas, "Tulis tugas terlebih dahulu.", "warn");
        return;
    }

    const item = document.createElement("li");
    const label = document.createElement("span");
    const selesai = document.createElement("button");
    const hapus = document.createElement("button");

    label.textContent = teks + " ";

    selesai.type = "button";
    selesai.textContent = "Tandai selesai";
    selesai.className = "btn-mini";
    selesai.addEventListener("click", function () {
        item.classList.toggle("selesai");
        selesai.textContent = item.classList.contains("selesai")
            ? "Batalkan selesai" : "Tandai selesai";
    });

    // Eksperimen E1 — tombol hapus satu item
    hapus.type = "button";
    hapus.textContent = "Hapus";
    hapus.className = "btn-mini btn-danger";
    hapus.addEventListener("click", function () {
        daftarTugas.removeChild(item);
        setPesan(pesanTugas, "Satu tugas dihapus.", "warn");
    });

    item.append(label, selesai, hapus);
    daftarTugas.appendChild(item);
    inputTugas.value = "";
    setPesan(pesanTugas, "Tugas ditambahkan.", "ok");
    inputTugas.focus();
});

/* =====================================================
   Mini Project — Form Pendaftaran Workshop
   Fungsi interaktif: (1) penghitung karakter alasan,
   (2) event change dropdown sesi, (3) validasi submit,
   (4) reset form.
   ===================================================== */
const formWorkshop = document.getElementById("formWorkshop");
const pesanWorkshop = document.getElementById("pesanWorkshop");
const wSesi = document.getElementById("wSesi");
const infoSesi = document.getElementById("infoSesi");
const wAlasan = document.getElementById("wAlasan");
const wHitung = document.getElementById("wHitung");

// (1) penghitung karakter alasan (event input)
wAlasan.addEventListener("input", function () {
    wHitung.textContent = wAlasan.value.length;
});

// (2) event change pada dropdown sesi (Eksperimen E3)
wSesi.addEventListener("change", function () {
    infoSesi.textContent = wSesi.value === ""
        ? "Belum ada sesi dipilih."
        : "Sesi dipilih: " + wSesi.value;
});

// (3) validasi submit — nama minimal 3 karakter (Eksperimen E2)
formWorkshop.addEventListener("submit", function (event) {
    event.preventDefault();
    const nama = document.getElementById("wNama").value.trim();
    const email = document.getElementById("wEmail").value.trim();
    const sesi = wSesi.value;
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nama.length < 3) {
        setPesan(pesanWorkshop, "Nama minimal 3 karakter.", "bad");
    } else if (!polaEmail.test(email)) {
        setPesan(pesanWorkshop, "Masukkan email yang valid.", "bad");
    } else if (sesi === "") {
        setPesan(pesanWorkshop, "Silakan pilih sesi workshop.", "bad");
    } else {
        setPesan(pesanWorkshop,
            "Pendaftaran berhasil! " + nama + " terdaftar pada sesi " + sesi + ".", "ok");
    }
});

// (4) reset form
document.getElementById("wReset").addEventListener("click", function () {
    setPesan(pesanWorkshop, "", "");
    infoSesi.textContent = "Belum ada sesi dipilih.";
    wHitung.textContent = "0";
});

/* =====================================================
   Eksperimen E4 — Tombol sembunyikan/tampilkan paragraf
   ===================================================== */
const tombolToggle = document.getElementById("tombolToggle");
const paragrafToggle = document.getElementById("paragrafToggle");
tombolToggle.addEventListener("click", function () {
    paragrafToggle.classList.toggle("hidden");
});

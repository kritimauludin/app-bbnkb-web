// 850000000
var bbnkb = $('#bbnkb'); 
var biayaBbnkb = $('#biaya-bbnkb');
var mutasiKendaraan = $('#mutasi-kendaraan');
var tipeKendaraan = $('#tipe-kendaraan');
var jenisKendaraan = $('#jenis-kendaraan');

var biayaMutasi = $('#biaya-mutasi');
var swdkllj = $('#swdkllj');
var adminStnk = $('#admin-stnk');
var biayaPajak = $('#biaya-pajak');

var biayaPendaftaran = $('#biaya-pendaftaran');
var penerbitanStnk = $('#penerbitan-stnk');
var penerbitanBpkb = $('#penerbitan-bpkb');
var penerbitanTnkb = $('#penerbitan-tnkb');

var biayaCekFisik = $('#biaya-cek-fisik');
var totalTelatPajak = $('#total-telat-pajak');

var estimasiTotal = $('#estimasi-total');

var estimasiTotalBiaya = 0;
var estimasiTambahPajak = 0;

function mutasiValidasi() {
    if(mutasiKendaraan.val() == "ya"){
        if(tipeKendaraan.val() == "motor"){
            biayaMutasi.val(150000)

            calculateWithJenis()
        }else if(tipeKendaraan.val() == "mobil") {
            biayaMutasi.val(250000)

            calculateWithJenis()
        }
    }else if(mutasiKendaraan.val() == "tidak") {
        biayaMutasi.val(0)
    }else{
        console.log('Input '+mutasiKendaraan.val()+' not valid');
    }

}

function calculateWithTipe(){
    if(tipeKendaraan.val() == "motor"){
        swdkllj.val(35000)
        adminStnk.val(50000)
        biayaPendaftaran.val(100000)
        penerbitanStnk.val(50000)
        penerbitanBpkb.val(225000)
        penerbitanTnkb.val(30000)
        biayaCekFisik.val(25000)

        mutasiValidasi()
        calculateWithJenis()
    } else if(tipeKendaraan.val() == "mobil") {
        swdkllj.val(143000)
        adminStnk.val(50000)
        biayaPendaftaran.val(100000)
        penerbitanStnk.val(200000)
        penerbitanBpkb.val(375000)
        penerbitanTnkb.val(100000)
        biayaCekFisik.val(25000)
        
        mutasiValidasi()
        calculateWithJenis()
    } else{
        console.log('Input '+tipeKendaraan.val()+' not valid');
    }
}

function calculateWithJenis(){
    // console.log(bbnkb.val());
    if(bbnkb.val() != "") {
        if(jenisKendaraan.val() == "baru"){
            nilaiBbnkb = bbnkb.val() * 0.125;
            nilaiPajak = bbnkb.val() * 0.02;

            biayaBbnkb.val(nilaiBbnkb)
            biayaPajak.val(nilaiPajak)
            
            estimasiTotalBiaya =  Number(biayaBbnkb.val()) + Number(biayaMutasi.val()) + Number(swdkllj.val()) + Number(adminStnk.val()) + 
                Number(biayaPendaftaran.val()) + Number(penerbitanStnk.val()) + Number(penerbitanBpkb.val()) + Number(penerbitanTnkb.val()) + 
                Number(biayaCekFisik.val()) + Number(biayaPajak.val());
            estimasiTotal.text('Rp. '+ number_format(estimasiTotalBiaya, 0, ',', ' ') )
        } else if(jenisKendaraan.val() == "bekas"){
            nilaiBbnkb = bbnkb.val() * 0.01;
            nilaiPajak = bbnkb.val() * 0.02;
            
            biayaBbnkb.val(nilaiBbnkb)
            biayaPajak.val(nilaiPajak)

            estimasiTotalBiaya =  Number(biayaBbnkb.val()) + Number(biayaMutasi.val()) + Number(swdkllj.val()) + Number(adminStnk.val()) + 
                Number(biayaPendaftaran.val()) + Number(penerbitanStnk.val()) + Number(penerbitanBpkb.val()) + Number(penerbitanTnkb.val()) + 
                Number(biayaCekFisik.val()) + Number(biayaPajak.val());
            estimasiTotal.text('Rp. '+ number_format(estimasiTotalBiaya, 0, ',', ' ') )
        }else{
            console.log('Input '+jenisKendaraan.val()+' not valid');
        }
    } else {
        alert('Isi harga beli kendaraan terlebih dahulu');
    }
}

function addPajakTelat(){
    estimasiTambahPajak = Number(totalTelatPajak.val()) + Number(estimasiTotalBiaya);

    estimasiTotal.text('Rp. '+ number_format(estimasiTambahPajak, 0, ',', ' ') )
}

function number_format (number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
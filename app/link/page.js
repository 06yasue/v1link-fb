'use client';
import { useState } from 'react';

export default function LinkGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copyLabel, setCopyLabel] = useState('COPY');

  // Fungsi untuk menghasilkan kode acak 8 karakter (Huruf Besar & Angka)
  const _generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const _createLink = async () => {
    setIsLoading(true);
    setGeneratedUrl(''); // Sembunyikan area copy saat proses baru dimulai
    
    const fake_link = document.getElementById('fake_link').value;
    const offer_link = document.getElementById('offer_link').value;

    // Jika input kosong, hentikan proses tanpa memunculkan alert JS
    if(!fake_link || !offer_link) {
      setIsLoading(false);
      return; 
    }

    const short_code = _generateCode();

    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ short_code, fake_link, offer_link })
    });

    if (res.ok) {
      // Ambil domain asal otomatis (contoh: https://v1link-fb.vercel.app) lalu gabungkan kode acak
      const finalUrl = window.location.origin + '/' + short_code;
      setGeneratedUrl(finalUrl);
      document.getElementById('form-link').reset();
    }
    
    setIsLoading(false);
  };

  const _copyUrl = () => {
    const copyText = document.getElementById('result_url');
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Untuk dukungan di perangkat mobile
    navigator.clipboard.writeText(copyText.value);
    
    setCopyLabel('DISALIN!');
    setTimeout(() => setCopyLabel('COPY'), 2000);
  };

  return (
    <div className="row">
      <div className="trim-box">
        <div className="trim-box-header">
          <h3 style={{ margin: 0 }}>
            <i className="material-icons" style={{ verticalAlign: 'bottom' }}>link</i> Buat Short Link Baru
          </h3>
        </div>
        
        <form id="form-link" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Fake Link (Target Bot)</label>
            <input type="text" id="fake_link" className="form-control" placeholder="Contoh: youtube.com/watch?v=xxx" />
            <p className="help-block" style={{ fontSize: '12px' }}>Cukup domain.com tanpa https atau www</p>
          </div>
          <div className="form-group">
            <label>Offer Link (Target Manusia)</label>
            <input type="text" id="offer_link" className="form-control" placeholder="Contoh: offeranda.com/aff" />
            <p className="help-block" style={{ fontSize: '12px' }}>Cukup domain.com tanpa https atau www</p>
          </div>
          
          <button type="button" className="btn btn-primary btn-block" onClick={_createLink} disabled={isLoading}>
            {isLoading ? 'MEMPROSES...' : 'BUAT LINK'}
          </button>
        </form>

        {/* Area Hasil & Tombol Copy (Hanya Muncul Jika Berhasil) */}
        {generatedUrl && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: '4px' }}>
            <p style={{ margin: '0 0 10px 0', color: '#2e7d32', fontWeight: 'bold' }}>
              <i className="material-icons" style={{ fontSize: '18px', verticalAlign: 'text-bottom' }}>check_circle</i> Link Berhasil Dibuat!
            </p>
            <div className="input-group">
              <input type="text" id="result_url" className="form-control" value={generatedUrl} readOnly style={{ backgroundColor: '#fff', cursor: 'text' }} />
              <span className="input-group-btn">
                <button className="btn btn-success" type="button" onClick={_copyUrl}>
                  {copyLabel}
                </button>
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

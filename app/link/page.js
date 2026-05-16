'use client';
import { useState } from 'react';

export default function LinkGenerator() {
  const [status, setStatus] = useState('');

  const _createLink = async () => {
    setStatus('Loading...');
    const short_code = document.getElementById('short_code').value;
    const fake_link = document.getElementById('fake_link').value;
    const offer_link = document.getElementById('offer_link').value;

    if(!short_code || !fake_link || !offer_link) {
      setStatus('Semua kolom wajib diisi!');
      return;
    }

    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ short_code, fake_link, offer_link })
    });

    const data = await res.json();
    if (res.ok) {
      setStatus('Sukses! Link berhasil dibuat.');
      document.getElementById('form-link').reset();
    } else {
      setStatus('Gagal: ' + data.error);
    }
  };

  return (
    <div className="row">
      <div className="trim-box">
        <div className="trim-box-header">
          <h3 style={{ margin: 0 }}><i className="material-icons" style={{ verticalAlign: 'bottom' }}>link</i> Buat Short Link Baru</h3>
        </div>
        <form id="form-link" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Short Code (Custom)</label>
            <input type="text" id="short_code" className="form-control" placeholder="Contoh: promo123" />
          </div>
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
          <button type="button" className="btn btn-primary btn-block" onClick={_createLink}>
            BUAT LINK
          </button>
        </form>
        {status && <div className="alert alert-info" style={{ marginTop: '20px' }}>{status}</div>}
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LinkGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copyLabel, setCopyLabel] = useState('COPY');

    const _generateCode = () => {
    // Tambahkan abcdefghijklmnopqrstuvwxyz di sini
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };


  const _createLink = async () => {
    setIsLoading(true);
    setGeneratedUrl(''); 
    
    const fake_link = document.getElementById('fake_link').value;
    const offer_link = document.getElementById('offer_link').value;

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
      const finalUrl = window.location.origin + '/' + short_code;
      setGeneratedUrl(finalUrl);
      document.getElementById('form-link').reset();
    }
    
    setIsLoading(false);
  };

  const _copyUrl = () => {
    const copyText = document.getElementById('result_url');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    
    setCopyLabel('DISALIN!');
    setTimeout(() => setCopyLabel('COPY'), 2000);
  };

  return (
    <>
      <Navbar />
      
      {/* Container utama dengan jarak atas agar tidak tertutup Navbar */}
      <div className="container" style={{ marginTop: '90px', minHeight: '75vh' }}>
        <div className="row">
          
          {/* Grid: Full di HP (xs-12), ukuran sedang di tengah pada Desktop (md-8) */}
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            
            {/* Box Klasik Bootstrap 3 (Panel Default) */}
            <div className="panel panel-default" style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              
              <div className="panel-heading" style={{ backgroundColor: '#f8f8f8', padding: '15px 20px' }}>
                <h3 className="panel-title" style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                  <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '8px', color: '#337ab7', fontSize: '20px' }}>link</i> 
                  Buat Short Link Baru
                </h3>
              </div>
              
              <div className="panel-body" style={{ padding: '25px 20px' }}>
                <form id="form-link" onSubmit={(e) => e.preventDefault()}>
                  
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: '600', color: '#555' }}>Fake Link (Target Bot)</label>
                    {/* Menggunakan input-lg agar form lebih besar dan nyaman diklik di HP */}
                    <input type="text" id="fake_link" className="form-control input-lg" placeholder="Contoh: youtube.com/watch?v=xxx" />
                    <p className="help-block" style={{ fontSize: '12.5px', marginTop: '5px' }}>
                      Isi dengan domain.com tanpa https atau www
                    </p>
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '25px' }}>
                    <label style={{ fontWeight: '600', color: '#555' }}>Offer Link (Target Manusia)</label>
                    <input type="text" id="offer_link" className="form-control input-lg" placeholder="Contoh: offeranda.com/aff" />
                    <p className="help-block" style={{ fontSize: '12.5px', marginTop: '5px' }}>
                      Isi dengan domain.com tanpa https atau www
                    </p>
                  </div>
                  
                  <button type="button" className="btn btn-primary btn-lg btn-block" style={{ fontWeight: 'bold', letterSpacing: '0.5px' }} onClick={_createLink} disabled={isLoading}>
                    {isLoading ? 'MEMPROSES...' : 'BUAT LINK SEKARANG'}
                  </button>
                </form>

                {/* Area Hasil Datar (Tanpa box berlapis) */}
                {generatedUrl && (
                  <div style={{ marginTop: '30px', borderTop: '1px dashed #ddd', paddingTop: '20px' }}>
                    <label className="text-success" style={{ display: 'block', marginBottom: '10px', fontSize: '15px' }}>
                      <i className="material-icons" style={{ fontSize: '16px', verticalAlign: 'text-bottom' }}>check_circle</i> Link Berhasil Dibuat!
                    </label>
                    <div className="input-group input-group-lg">
                      <input type="text" id="result_url" className="form-control" value={generatedUrl} readOnly style={{ backgroundColor: '#fff', cursor: 'text', color: '#337ab7', fontWeight: 'bold' }} />
                      <span className="input-group-btn">
                        <button className="btn btn-success" type="button" onClick={_copyUrl} style={{ minWidth: '100px', fontWeight: 'bold' }}>
                          {copyLabel}
                        </button>
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

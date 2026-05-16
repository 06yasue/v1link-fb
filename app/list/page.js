'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ListPage() {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch Data dari API
  const fetchLinks = async () => {
    setIsLoading(true);
    const res = await fetch('/api/links');
    if (res.ok) {
      const data = await res.json();
      setLinks(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Hitung Statistik
  const totalLinks = links.length;
  const totalPengunjung = links.reduce((sum, link) => sum + link.click_count, 0);
  const totalPages = Math.ceil(totalLinks / itemsPerPage) || 1;

  // Potong array data berdasarkan halaman aktif
  const currentData = links.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Aksi Copy
  const _copyLink = (shortcode) => {
    const finalUrl = window.location.origin + '/' + shortcode;
    navigator.clipboard.writeText(finalUrl);
    alert('Link disalin: ' + finalUrl);
  };

  // Aksi Edit (Hanya Offer Link)
  const _editOffer = async (id, currentOffer) => {
    const newOffer = window.prompt("Ubah Offer Link (Cukup domain.com tanpa https/www):", currentOffer);
    if (newOffer && newOffer !== currentOffer) {
      const res = await fetch('/api/links', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, offer_link: newOffer })
      });
      if (res.ok) fetchLinks(); // Refresh data otomatis
    }
  };

  // Aksi Hapus
  const _deleteLink = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus data ini secara permanen?")) {
      const res = await fetch('/api/links', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) fetchLinks(); // Refresh data otomatis
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="container" style={{ marginTop: '90px', minHeight: '75vh' }}>
        
        {/* 4 KOTAK STATISTIK (Menarik & Responsif) */}
        <div className="row">
          <div className="col-xs-6 col-md-3">
            <div className="panel panel-info" style={{ borderRadius: '4px' }}>
              <div className="panel-heading text-center"><strong>Total Link</strong></div>
              <div className="panel-body text-center">
                <h2 style={{ margin: 0, color: '#31708f' }}>{totalLinks}</h2>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-md-3">
            <div className="panel panel-warning" style={{ borderRadius: '4px' }}>
              <div className="panel-heading text-center"><strong>Link Fake</strong></div>
              <div className="panel-body text-center">
                <h2 style={{ margin: 0, color: '#8a6d3b' }}>{totalLinks}</h2>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-md-3">
            <div className="panel panel-success" style={{ borderRadius: '4px' }}>
              <div className="panel-heading text-center"><strong>Link Offer</strong></div>
              <div className="panel-body text-center">
                <h2 style={{ margin: 0, color: '#3c763d' }}>{totalLinks}</h2>
              </div>
            </div>
          </div>
          <div className="col-xs-6 col-md-3">
            <div className="panel panel-danger" style={{ borderRadius: '4px' }}>
              <div className="panel-heading text-center"><strong>Pengunjung</strong></div>
              <div className="panel-body text-center">
                <h2 style={{ margin: 0, color: '#a94442' }}>{totalPengunjung}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* AREA TABEL LIST LINK */}
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default" style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div className="panel-heading" style={{ backgroundColor: '#f8f8f8', padding: '15px' }}>
                <h3 className="panel-title" style={{ fontWeight: 'bold', color: '#333' }}>
                  <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px', fontSize: '18px' }}>list_alt</i> Data Tautan
                </h3>
              </div>
              
              <div className="panel-body" style={{ padding: 0 }}>
                {isLoading ? (
                  <div className="text-center" style={{ padding: '40px' }}>Memuat data...</div>
                ) : (
                  <>
                    {/* table-responsive agar bisa digeser di HP */}
                    <div className="table-responsive">
                      <table className="table table-hover table-striped" style={{ margin: 0 }}>
                        <thead>
                          <tr>
                            <th style={{ minWidth: '100px' }}>Shortcode</th>
                            <th style={{ minWidth: '200px' }}>Target Database</th>
                            <th className="text-center" style={{ minWidth: '100px' }}>Pengunjung</th>
                            <th className="text-center" style={{ minWidth: '180px' }}>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentData.map((item) => (
                            <tr key={item.id}>
                              <td style={{ verticalAlign: 'middle' }}>
                                <strong>{item.short_code}</strong>
                              </td>
                              <td>
                                {/* Tampilan Fake Link dengan Icon */}
                                <div style={{ fontSize: '12px', color: '#777', marginBottom: '4px' }}>
                                  <i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '3px', color: '#d9534f' }}>smart_toy</i> 
                                  [Fake] {item.fake_link}
                                </div>
                                {/* Tampilan Offer Link dengan Icon */}
                                <div style={{ fontSize: '13px', color: '#337ab7', fontWeight: 'bold' }}>
                                  <i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '3px', color: '#5cb85c' }}>person</i> 
                                  [Offer] {item.offer_link}
                                </div>
                              </td>
                              <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                <span className="badge" style={{ backgroundColor: '#5cb85c', fontSize: '13px', padding: '6px 10px' }}>
                                  {item.click_count}
                                </span>
                              </td>
                              <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                {/* Tombol Aksi Klasik Bootstrap 3 */}
                                <div className="btn-group">
                                  <button onClick={() => _copyLink(item.short_code)} className="btn btn-primary btn-sm" title="Copy Link">
                                    <i className="material-icons" style={{ fontSize: '16px' }}>content_copy</i>
                                  </button>
                                  <button onClick={() => _editOffer(item.id, item.offer_link)} className="btn btn-warning btn-sm" title="Edit Offer Link">
                                    <i className="material-icons" style={{ fontSize: '16px' }}>edit</i>
                                  </button>
                                  <button onClick={() => _deleteLink(item.id)} className="btn btn-danger btn-sm" title="Hapus Permanen">
                                    <i className="material-icons" style={{ fontSize: '16px' }}>delete</i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {currentData.length === 0 && (
                            <tr><td colSpan="4" className="text-center" style={{ padding: '20px' }}>Belum ada link yang dibuat.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* AREA PAGINATION (Sesuai Permintaan) */}
                    <div style={{ padding: '15px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', backgroundColor: '#fdfdfd' }}>
                      <button 
                        className="btn btn-default btn-sm" 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                        disabled={currentPage === 1}
                        style={{ fontWeight: 'bold' }}
                      >
                        Prev
                      </button>
                      
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        {currentPage} / {totalPages}
                      </span>
                      
                      <button 
                        className="btn btn-default btn-sm" 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                        disabled={currentPage === totalPages}
                        style={{ fontWeight: 'bold' }}
                      >
                        Next
                      </button>
                    </div>

                  </>
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

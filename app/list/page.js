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

  // State untuk Notifikasi & Modal Custom (Pengganti Alert JS)
  const [toastMsg, setToastMsg] = useState('');
  const [modalType, setModalType] = useState(null); // 'delete' atau 'edit'
  const [activeData, setActiveData] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');

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

  // Format Tanggal
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Kalkulasi Pagination
  const totalLinks = links.length;
  const totalPengunjung = links.reduce((sum, link) => sum + link.click_count, 0);
  const totalPages = Math.ceil(totalLinks / itemsPerPage) || 1;
  const currentData = links.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Aksi Copy dengan Toast Custom
  const _copyLink = (shortcode) => {
    const finalUrl = window.location.origin + '/' + shortcode;
    navigator.clipboard.writeText(finalUrl);
    setToastMsg(`Link disalin: ${finalUrl}`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Fungsi Pembuka Modal
  const openEditModal = (item) => {
    setActiveData(item);
    setEditInputValue(item.offer_link);
    setModalType('edit');
  };

  const openDeleteModal = (item) => {
    setActiveData(item);
    setModalType('delete');
  };

  // Eksekusi API (Benar-benar mengubah/menghapus dari Database Turso)
  const confirmEdit = async () => {
    setModalType(null);
    if (editInputValue && editInputValue !== activeData.offer_link) {
      const res = await fetch('/api/links', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: activeData.id, offer_link: editInputValue })
      });
      if (res.ok) {
        setToastMsg('Offer Link berhasil diperbarui!');
        setTimeout(() => setToastMsg(''), 3000);
        fetchLinks();
      }
    }
  };

  const confirmDelete = async () => {
    setModalType(null);
    const res = await fetch('/api/links', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: activeData.id })
    });
    if (res.ok) {
      setToastMsg('Data berhasil dihapus permanen dari Database!');
      setTimeout(() => setToastMsg(''), 3000);
      fetchLinks();
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="container" style={{ marginTop: '90px', minHeight: '75vh', position: 'relative' }}>
        
        {/* Notifikasi Toast Custom (Muncul di atas) */}
        {toastMsg && (
          <div className="alert alert-success text-center" style={{ position: 'fixed', top: '70px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontWeight: 'bold' }}>
            <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>check_circle</i>
            {toastMsg}
          </div>
        )}

        {/* 4 KOTAK STATISTIK */}
        <div className="row">
          <div className="col-xs-6 col-md-3">
            <div className="panel panel-info">
              <div className="panel-heading text-center"><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>link</i> <strong>Total Link</strong></div>
              <div className="panel-body text-center"><h2 style={{ margin: 0, color: '#31708f' }}>{totalLinks}</h2></div>
            </div>
          </div>
          <div className="col-xs-6 col-md-3">
            <div className="panel panel-warning">
              <div className="panel-heading text-center"><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>smart_toy</i> <strong>Link Fake</strong></div>
              <div className="panel-body text-center"><h2 style={{ margin: 0, color: '#8a6d3b' }}>{totalLinks}</h2></div>
            </div>
          </div>
          <div className="col-xs-6 col-md-3">
            <div className="panel panel-success">
              <div className="panel-heading text-center"><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>person</i> <strong>Link Offer</strong></div>
              <div className="panel-body text-center"><h2 style={{ margin: 0, color: '#3c763d' }}>{totalLinks}</h2></div>
            </div>
          </div>
          <div className="col-xs-6 col-md-3">
            <div className="panel panel-danger">
              <div className="panel-heading text-center"><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>visibility</i> <strong>Pengunjung</strong></div>
              <div className="panel-body text-center"><h2 style={{ margin: 0, color: '#a94442' }}>{totalPengunjung}</h2></div>
            </div>
          </div>
        </div>

        {/* AREA TABEL */}
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default" style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div className="panel-heading" style={{ backgroundColor: '#f8f8f8', padding: '15px' }}>
                <h3 className="panel-title" style={{ fontWeight: 'bold', color: '#333' }}>
                  <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px', fontSize: '18px' }}>list_alt</i> Manajemen Data Tautan
                </h3>
              </div>
              
              <div className="panel-body" style={{ padding: 0 }}>
                {isLoading ? (
                  <div className="text-center" style={{ padding: '40px' }}><i className="material-icons" style={{ fontSize: '32px', color: '#ccc' }}>hourglass_empty</i><br/>Memuat data...</div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table table-hover table-striped" style={{ margin: 0 }}>
                        <thead>
                          <tr>
                            <th style={{ minWidth: '110px' }}><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>tag</i> Shortcode</th>
                            <th style={{ minWidth: '220px' }}><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>dns</i> Target Database</th>
                            <th className="text-center" style={{ minWidth: '100px' }}><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>bar_chart</i> Klik</th>
                            <th className="text-center" style={{ minWidth: '100px' }}><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>calendar_today</i> Dibuat</th>
                            <th className="text-center" style={{ minWidth: '160px' }}><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>settings</i> Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentData.map((item) => (
                            <tr key={item.id}>
                              <td style={{ verticalAlign: 'middle' }}>
                                <span className="label label-primary" style={{ fontSize: '12px', padding: '4px 8px' }}>{item.short_code}</span>
                              </td>
                              <td>
                                <div style={{ fontSize: '12.5px', color: '#777', marginBottom: '5px' }}>
                                  <i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'text-bottom', marginRight: '4px', color: '#d9534f' }}>smart_toy</i> 
                                  <strong>Fake:</strong> {item.fake_link}
                                </div>
                                <div style={{ fontSize: '13px', color: '#337ab7' }}>
                                  <i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'text-bottom', marginRight: '4px', color: '#5cb85c' }}>person</i> 
                                  <strong>Offer:</strong> {item.offer_link}
                                </div>
                              </td>
                              <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                <span className="badge" style={{ backgroundColor: '#5cb85c', fontSize: '13px', padding: '5px 10px' }}>{item.click_count}</span>
                              </td>
                              <td className="text-center" style={{ verticalAlign: 'middle', fontSize: '12.5px', color: '#666' }}>
                                {formatDate(item.created_at)}
                              </td>
                              <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                <div className="btn-group">
                                  <button onClick={() => _copyLink(item.short_code)} className="btn btn-info btn-sm" title="Copy Link"><i className="material-icons" style={{ fontSize: '16px' }}>content_copy</i></button>
                                  <button onClick={() => openEditModal(item)} className="btn btn-warning btn-sm" title="Edit Offer Link"><i className="material-icons" style={{ fontSize: '16px' }}>edit</i></button>
                                  <button onClick={() => openDeleteModal(item)} className="btn btn-danger btn-sm" title="Hapus Permanen"><i className="material-icons" style={{ fontSize: '16px' }}>delete</i></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {currentData.length === 0 && (
                            <tr><td colSpan="5" className="text-center" style={{ padding: '30px' }}>Belum ada link.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* PAGINATION */}
                    <div style={{ padding: '15px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', backgroundColor: '#fdfdfd' }}>
                      <button className="btn btn-default btn-sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ fontWeight: 'bold' }}>Prev</button>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>{currentPage} / {totalPages}</span>
                      <button className="btn btn-default btn-sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ fontWeight: 'bold' }}>Next</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL EDIT (Tanpa jQuery, Murni React & CSS Bootstrap 3) */}
      {modalType === 'edit' && (
        <div className="modal fade in" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)', overflowY: 'auto' }}>
          <div className="modal-dialog" style={{ marginTop: '100px' }}>
            <div className="modal-content" style={{ borderRadius: '4px' }}>
              <div className="modal-header" style={{ backgroundColor: '#fcf8e3', borderBottom: '1px solid #faebcc' }}>
                <h4 className="modal-title" style={{ color: '#8a6d3b', fontWeight: 'bold' }}>
                  <i className="material-icons" style={{ verticalAlign: 'text-bottom' }}>edit</i> Edit Offer Link
                </h4>
              </div>
              <div className="modal-body">
                <p>Mengubah target khusus untuk pengunjung manusia pada shortcode <strong>{activeData.short_code}</strong></p>
                <input 
                  type="text" 
                  className="form-control input-lg" 
                  value={editInputValue} 
                  onChange={(e) => setEditInputValue(e.target.value)} 
                />
              </div>
              <div className="modal-footer" style={{ borderTop: 'none' }}>
                <button type="button" className="btn btn-default" onClick={() => setModalType(null)}>Batal</button>
                <button type="button" className="btn btn-warning" onClick={confirmEdit}>Simpan Perubahan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DELETE */}
      {modalType === 'delete' && (
        <div className="modal fade in" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)', overflowY: 'auto' }}>
          <div className="modal-dialog" style={{ marginTop: '100px' }}>
            <div className="modal-content" style={{ borderRadius: '4px' }}>
              <div className="modal-header" style={{ backgroundColor: '#f2dede', borderBottom: '1px solid #ebccd1' }}>
                <h4 className="modal-title" style={{ color: '#a94442', fontWeight: 'bold' }}>
                  <i className="material-icons" style={{ verticalAlign: 'text-bottom' }}>warning</i> Konfirmasi Penghapusan
                </h4>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: '16px' }}>Apakah Anda yakin ingin menghapus tautan <strong>{activeData.short_code}</strong>?</p>
                <p className="text-danger" style={{ fontSize: '13px' }}>Tindakan ini akan menghapus data secara permanen dari Database Turso.</p>
              </div>
              <div className="modal-footer" style={{ borderTop: 'none' }}>
                <button type="button" className="btn btn-default" onClick={() => setModalType(null)}>Batal</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Ya, Hapus Permanen</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

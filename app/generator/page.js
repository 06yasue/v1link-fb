'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import ViralCard from '@/components/ViralCard';

export default function GeneratorPage() {
  // State untuk melacak template mana yang dipilih ('video' atau 'viral')
  const [activeTemplate, setActiveTemplate] = useState('');
  
  // State untuk menyimpan data input form
  const [formData, setFormData] = useState({
    profileName: 'Account Name',
    caption: 'Your viral post caption or video title goes here...',
    viewsCount: '1.2M Views',
    timeStamp: '12 hours ago',
    likeCount: '89K Likes',
    profileImg: '',
    mainImg: ''
  });

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Fungsi untuk menangani upload gambar (Profile & Main)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const targetId = e.target.id;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [targetId]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="container" style={{ marginTop: '90px', minHeight: '75vh' }}>
        
        {/* STEP 1: PEMILIHAN TEMPLATE (Wajib Dipilih Dulu) */}
        <div className="row text-center" style={{ marginBottom: '40px' }}>
          <div className="col-xs-12">
            <h3><i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>layers</i> Choose Your Template</h3>
            <p className="text-muted">Select a layout before configuring your image.</p>
            <div className="btn-group btn-group-lg" style={{ marginTop: '15px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
              <button 
                className={`btn ${activeTemplate === 'video' ? 'btn-danger' : 'btn-default'}`}
                onClick={() => setActiveTemplate('video')}
              >
                <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '5px' }}>play_circle</i>
                FAKE VIDEO
              </button>
              <button 
                className={`btn ${activeTemplate === 'viral' ? 'btn-success' : 'btn-default'}`}
                onClick={() => setActiveTemplate('viral')}
              >
                <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '5px' }}>camera</i>
                VIRAL POST
              </button>
            </div>
          </div>
        </div>

        {/* STEP 2: CONFIGURATION & PREVIEW (Hanya muncul jika template sudah dipilih) */}
        {activeTemplate && (
          <div className="row">
            
            {/* AREA FORM INPUT (Kiri) */}
            <div className="col-xs-12 col-md-6" style={{ marginBottom: '30px' }}>
              <div className="panel panel-default" style={{ borderRadius: '6px' }}>
                <div className="panel-heading" style={{ backgroundColor: '#fdfdfd' }}>
                  <h3 className="panel-title" style={{ fontWeight: 'bold' }}>
                    <i className="material-icons" style={{ verticalAlign: 'text-bottom', fontSize: '18px' }}>build</i> Configure Details
                  </h3>
                </div>
                <div className="panel-body" style={{ padding: '20px' }}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    
                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>account_circle</i> Profile Image</label>
                      <input type="file" id="profileImg" className="form-control" accept="image/*" onChange={handleImageUpload} />
                    </div>

                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>image</i> Main Content Image</label>
                      <input type="file" id="mainImg" className="form-control" accept="image/*" onChange={handleImageUpload} />
                    </div>

                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}>Account Name</label>
                      <input type="text" id="profileName" className="form-control input-lg" value={formData.profileName} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}>
                        {activeTemplate === 'video' ? 'Video Title' : 'Post Caption'}
                      </label>
                      <textarea id="caption" className="form-control" rows="3" value={formData.caption} onChange={handleInputChange} style={{ resize: 'none' }}></textarea>
                    </div>

                    {/* Input dinamis berdasarkan template */}
                    {activeTemplate === 'video' ? (
                      <div className="row">
                        <div className="col-xs-6">
                          <div className="form-group">
                            <label>Views Count</label>
                            <input type="text" id="viewsCount" className="form-control" value={formData.viewsCount} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <div className="form-group">
                            <label>Timestamp</label>
                            <input type="text" id="timeStamp" className="form-control" value={formData.timeStamp} onChange={handleInputChange} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div className="col-xs-6">
                          <div className="form-group">
                            <label>Like Count</label>
                            <input type="text" id="likeCount" className="form-control" value={formData.likeCount} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <div className="form-group">
                            <label>Timestamp</label>
                            <input type="text" id="timeStamp" className="form-control" value={formData.timeStamp} onChange={handleInputChange} />
                          </div>
                        </div>
                      </div>
                    )}

                  </form>
                </div>
              </div>
            </div>

            {/* AREA LIVE PREVIEW & DOWNLOAD (Kanan) */}
            <div className="col-xs-12 col-md-6">
              <div className="panel panel-default" style={{ borderRadius: '6px' }}>
                <div className="panel-heading" style={{ backgroundColor: '#fdfdfd' }}>
                  <h3 className="panel-title" style={{ fontWeight: 'bold' }}>
                    <i className="material-icons" style={{ verticalAlign: 'text-bottom', fontSize: '18px' }}>visibility</i> Live Preview (526x526)
                  </h3>
                </div>
                <div className="panel-body text-center" style={{ padding: '25px', backgroundColor: '#fcfcfc' }}>
                  
                  {/* Komponen Preview Berdasarkan Template yang Dipilih */}
                  {activeTemplate === 'video' && <VideoCard formData={formData} />}
                  {activeTemplate === 'viral' && <ViralCard formData={formData} />}

                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

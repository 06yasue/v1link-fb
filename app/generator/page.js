'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoImage from '@/components/VideoImage';
import ViralPostCollage from '@/components/ViralPostCollage';

export default function GeneratorPage() {
  const [activeTemplate, setActiveTemplate] = useState('');
  
  const [formData, setFormData] = useState({
    timeStamp: '12 hours ago',
    plusCountText: '+9', // Default untuk kolase
    contentImgs: [] // Array untuk menyimpan hingga 5 gambar
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Fungsi untuk menangani upload gambar (Profile & Main)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const targetId = e.target.id; // profileImg, contentImg1, contentImg2, dst.
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (targetId === 'profileImg') {
          setFormData(prev => ({ ...prev, profileImg: reader.result }));
        } else {
          // Menangani upload 5 gambar kolase ke dalam array
          const slotIndex = parseInt(targetId.replace('contentImg', '')) - 1;
          const newContentImgs = [...formData.contentImgs];
          newContentImgs[slotIndex] = reader.result;
          setFormData(prev => ({ ...prev, contentImgs: newContentImgs }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="container" style={{ marginTop: '90px', minHeight: '75vh' }}>
        
        {/* STEP 1: PEMILIHAN TEMPLATE */}
        <div className="row text-center" style={{ marginBottom: '40px' }}>
          <div className="col-xs-12">
            <h3><i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px', color: '#337ab7' }}>burst_mode</i> Choose Image Style</h3>
            <p className="text-muted">Select a template to generate your 526x526 pixel image.</p>
            <div className="btn-group btn-group-lg" style={{ marginTop: '15px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
              <button className={`btn ${activeTemplate === 'video' ? 'btn-danger' : 'btn-default'}`} onClick={() => setActiveTemplate('video')}>
                <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '5px' }}>play_circle</i> FAKE VIDEO
              </button>
              <button className={`btn ${activeTemplate === 'viral' ? 'btn-success' : 'btn-default'}`} onClick={() => setActiveTemplate('viral')}>
                <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '5px' }}>grid_on</i> VIRAL COLLAGE
              </button>
            </div>
          </div>
        </div>

        {/* STEP 2: CONFIGURATION & PREVIEW */}
        {activeTemplate && (
          <div className="row">
            
            {/* AREA FORM INPUT (Dinamis Berdasarkan Template) */}
            <div className="col-xs-12 col-md-6" style={{ marginBottom: '30px' }}>
              <div className="panel panel-default" style={{ borderRadius: '6px' }}>
                <div className="panel-heading" style={{ backgroundColor: '#fdfdfd' }}>
                  <h3 className="panel-title" style={{ fontWeight: 'bold' }}>
                    <i className="material-icons" style={{ verticalAlign: 'text-bottom', fontSize: '18px' }}>build</i> Image Details
                  </h3>
                </div>
                <div className="panel-body" style={{ padding: '20px' }}>
                  <form onSubmit={(e) => e.preventDefault()}>

                    {/* DYNAMIC CONTENT IMAGE UPLOAD */}
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 'bold' }}><i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle' }}>image</i> Content Image Upload</label>
                      
                      {activeTemplate === 'video' ? (
                        // 1 SLOT UNTUK FAKE VIDEO
                        <input type="file" id="contentImg1" className="form-control" accept="image/*" onChange={handleImageUpload} />
                      ) : (
                        // 5 SLOTS UNTUK VIRAL COLLAGE
                        <div className="row" style={{ marginTop: '10px' }}>
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="col-xs-6 col-sm-4" style={{ marginBottom: '15px' }}>
                              <label style={{ fontSize: '11px', color: '#777', display: 'block' }}>Slot {i+1} {i===0 && '(Large)'}</label>
                              <input type="file" id={`contentImg${i+1}`} className="form-control" accept="image/*" style={{ fontSize: '11px', padding: '6px' }} onChange={handleImageUpload} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <hr />

                    {/* DYNAMIC FIELDS */}
                    {activeTemplate === 'viral' && (
                      <div className="form-group">
                        <label style={{ fontWeight: 'bold' }}>Plus Count Text</label>
                        <input type="text" id="plusCountText" className="form-control input-lg" value={formData.plusCountText} onChange={handleInputChange} placeholder="Contoh: +9 or +2" />
                      </div>
                    )}

                  </form>
                </div>
              </div>
            </div>

            {/* AREA LIVE PREVIEW & DOWNLOAD */}
            <div className="col-xs-12 col-md-6">
              <div className="panel panel-default" style={{ borderRadius: '6px' }}>
                <div className="panel-heading" style={{ backgroundColor: '#fdfdfd' }}>
                  <h3 className="panel-title" style={{ fontWeight: 'bold' }}>
                    <i className="material-icons" style={{ verticalAlign: 'text-bottom', fontSize: '18px' }}>visibility</i> Live Preview (526x526)
                  </h3>
                </div>
                <div className="panel-body text-center" style={{ padding: '25px', backgroundColor: '#fcfcfc' }}>
                  
                  {/* Komponen Preview Berdasarkan Template yang Dipilih */}
                  {activeTemplate === 'video' && (
                    <VideoImage contentImg={formData.contentImgs[0]} />
                  )}
                  {activeTemplate === 'viral' && (
                    <ViralPostCollage contentImgs={formData.contentImgs} plusCountText={formData.plusCountText} />
                  )}

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

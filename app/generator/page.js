'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoImage from '@/components/VideoImage';
import ViralPostCollage from '@/components/ViralPostCollage';

export default function GeneratorPage() {
  const [activeTemplate, setActiveTemplate] = useState('');
  const [formData, setFormData] = useState({
    plusCountText: '+9',
    contentImgs: []
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const targetId = e.target.id; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const slotIndex = parseInt(targetId.replace('contentImg', '')) - 1;
        const newContentImgs = [...formData.contentImgs];
        newContentImgs[slotIndex] = reader.result;
        setFormData(prev => ({ ...prev, contentImgs: newContentImgs }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="container" style={{ marginTop: '90px', minHeight: '75vh' }}>
        
        <div className="row text-center" style={{ marginBottom: '40px' }}>
          <div className="col-xs-12">
            <h3><i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px', color: '#337ab7' }}>burst_mode</i> Choose Image Style</h3>
            <div className="btn-group btn-group-lg" style={{ marginTop: '15px' }}>
              <button className={`btn ${activeTemplate === 'video' ? 'btn-danger' : 'btn-default'}`} onClick={() => setActiveTemplate('video')}>
                <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '5px' }}>play_circle</i> FAKE VIDEO
              </button>
              <button className={`btn ${activeTemplate === 'viral' ? 'btn-success' : 'btn-default'}`} onClick={() => setActiveTemplate('viral')}>
                <i className="material-icons" style={{ verticalAlign: 'middle', marginRight: '5px' }}>grid_on</i> VIRAL COLLAGE
              </button>
            </div>
          </div>
        </div>

        {activeTemplate && (
          <div className="row">
            
            {/* AREA FORM */}
            <div className="col-xs-12 col-md-5" style={{ marginBottom: '30px' }}>
              <div className="panel panel-default">
                <div className="panel-heading"><h3 className="panel-title" style={{ fontWeight: 'bold' }}>Image Details</h3></div>
                <div className="panel-body">
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold' }}>Content Image Upload</label>
                    {activeTemplate === 'video' ? (
                      <input type="file" id="contentImg1" className="form-control" accept="image/*" onChange={handleImageUpload} />
                    ) : (
                      <div className="row" style={{ marginTop: '10px' }}>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="col-xs-6" style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '11px', color: '#777' }}>Slot {i+1} {i===0 && '(Large)'}</label>
                            <input type="file" id={`contentImg${i+1}`} className="form-control" accept="image/*" style={{ fontSize: '11px', padding: '6px' }} onChange={handleImageUpload} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {activeTemplate === 'viral' && (
                    <div className="form-group">
                      <label style={{ fontWeight: 'bold' }}>Plus Count Text</label>
                      <input type="text" id="plusCountText" className="form-control" value={formData.plusCountText} onChange={handleInputChange} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AREA PREVIEW (Gak ada efek iframe, bakal nampil langsung secara utuh) */}
            <div className="col-xs-12 col-md-7">
              <div className="panel panel-default">
                <div className="panel-heading"><h3 className="panel-title" style={{ fontWeight: 'bold' }}>Live Preview</h3></div>
                <div className="panel-body text-center" style={{ backgroundColor: '#fcfcfc', overflowX: 'hidden' }}>
                  {activeTemplate === 'video' && <VideoImage contentImg={formData.contentImgs[0]} />}
                  {activeTemplate === 'viral' && <ViralPostCollage contentImgs={formData.contentImgs} plusCountText={formData.plusCountText} />}
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

import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function VideoCard({ formData }) {
  const cardRef = useRef(null);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const blob = await toBlob(cardRef.current, {
        canvasWidth: 526, 
        canvasHeight: 526,
        style: { transform: 'scale(1)', transformOrigin: 'top left' } 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `V1LINK_video_${Math.floor(Math.random() * 10000)}.png`;
      link.href = url;
      link.click();
      window.URL.revokeObjectURL(url); 
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  return (
    <>
      <div 
        ref={cardRef} 
        style={{ 
          width: '526px', 
          height: '526px', 
          background: '#fff', 
          margin: '0 auto', 
          overflow: 'hidden', 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        {/* Gambar Utama (Video Frame) */}
        <div style={{ flex: '1 1 auto', position: 'relative', background: '#000', overflow: 'hidden' }}>
          {formData.mainImg && (
            <img src={formData.mainImg} alt="Main Content" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
          {/* Tombol Play Besar di Tengah */}
          <i className="material-icons" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '80px', color: 'rgba(255,255,255,0.8)', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>play_circle</i>
        </div> {/* <--- INI BAGIAN YANG ERROR SEBELUMNYA, SUDAH DIPERBAIKI */}

        {/* Info Detail Video di Bawah */}
        <div style={{ padding: '15px 20px', backgroundColor: '#fff', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {formData.profileImg ? (
              <img src={formData.profileImg} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px', objectFit: 'cover', border: '1px solid #eee' }} />
            ) : (
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px', backgroundColor: '#e9e9e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="material-icons" style={{ color: '#aaa' }}>person</i>
              </div>
            )}
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#333', display: 'flex', alignItems: 'center' }}>
                {formData.profileName}
                <i className="material-icons" style={{ fontSize: '14px', color: '#337ab7', marginLeft: '4px' }}>verified</i>
              </div>
              <div style={{ fontSize: '13px', color: '#777' }}>{formData.timeStamp}</div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6', height: '4.8em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
            {formData.caption}
          </p>
          <p className="text-muted" style={{ margin: '8px 0 0 0', fontSize: '13px' }}>
            <i className="material-icons" style={{ fontSize: '14px', verticalAlign: 'middle', marginRight: '3px' }}>assessment</i>
            <strong>{formData.viewsCount}</strong>
          </p>
        </div>
      </div>

      <button 
        type="button" 
        className="btn btn-primary btn-lg" 
        style={{ marginTop: '25px', fontWeight: 'bold', width: '100%', maxWidth: '526px' }} 
        onClick={_downloadImage}
      >
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i>
        DOWNLOAD FAKE VIDEO
      </button>
    </>
  );
}

import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function ViralCard({ formData }) {
  const cardRef = useRef(null);

  // Fungsi download gambar murni di browser (Sama seperti VideoCard)
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
      // Format nama file sedikit berbeda agar mudah dibedakan
      link.download = `V1LINK_viral_${Math.floor(Math.random() * 10000)}.png`;
      link.href = url;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  return (
    <>
      {/* AREA CAPTURE GAMBAR (Strict 526x526 pixel) */}
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
        {/* Header Postingan (Profil & Nama di Atas) */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #f5f5f5' }}>
          {formData.profileImg ? (
            <img src={formData.profileImg} alt="Profile" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', marginRight: '12px', border: '1px solid #eee' }} />
          ) : (
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', marginRight: '12px', backgroundColor: '#e9e9e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="material-icons" style={{ color: '#aaa' }}>person</i>
            </div>
          )}
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#333', display: 'flex', alignItems: 'center' }}>
              {formData.profileName}
              <i className="material-icons" style={{ fontSize: '14px', color: '#337ab7', marginLeft: '4px' }}>verified</i>
            </div>
            <div style={{ fontSize: '12.5px', color: '#888' }}>{formData.timeStamp} • Public</div>
          </div>
          <i className="material-icons" style={{ color: '#ccc' }}>more_horiz</i>
        </div>

        {/* Gambar Utama (Main Content di Tengah) */}
        <div style={{ flex: '1 1 auto', position: 'relative', backgroundColor: '#fafafa', overflow: 'hidden' }}>
          {formData.mainImg ? (
            <img src={formData.mainImg} alt="Main Content" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="material-icons" style={{ fontSize: '64px', color: '#ddd' }}>image</i>
            </div>
          )}
        </div>

        {/* Footer Postingan (Like & Caption di Bawah) */}
        <div style={{ padding: '15px 20px', backgroundColor: '#fff', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ebedf0', padding: '4px 8px', borderRadius: '20px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#337ab7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '5px' }}>
                <i className="material-icons" style={{ fontSize: '12px', color: '#fff' }}>thumb_up</i>
              </div>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#d9534f', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px', marginLeft: '-8px', border: '1px solid #fff' }}>
                <i className="material-icons" style={{ fontSize: '12px', color: '#fff' }}>favorite</i>
              </div>
              <span style={{ fontSize: '13.5px', color: '#555', fontWeight: 'bold' }}>{formData.likeCount}</span>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '14.5px', color: '#333', lineHeight: '1.5', height: '3em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            <strong>{formData.profileName}</strong> {formData.caption}
          </p>
        </div>
      </div>

      {/* TOMBOL DOWNLOAD */}
      <button 
        type="button" 
        className="btn btn-success btn-lg" 
        style={{ marginTop: '25px', fontWeight: 'bold', width: '100%', maxWidth: '526px' }} 
        onClick={_downloadImage}
      >
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i>
        DOWNLOAD VIRAL POST (526x526)
      </button>
    </>
  );
}

export default function NotFound() {
  return (
    <div className="row">
      <div className="col-md-12 text-center">
        <div className="trim-box" style={{ marginTop: '100px', borderTop: '4px solid #d9534f' }}>
          <i className="material-icons" style={{ fontSize: '64px', color: '#d9534f' }}>error_outline</i>
          <h2 style={{ color: '#d9534f' }}>404 - Tidak Ditemukan</h2>
          <p>Tautan yang Anda cari tidak tersedia atau sudah dihapus.</p>
          <a href="/" className="btn btn-default" style={{ marginTop: '15px' }}>Kembali ke Home</a>
        </div>
      </div>
    </div>
  );
}

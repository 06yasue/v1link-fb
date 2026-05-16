export default function Footer() {
  return (
    <footer style={{ padding: '30px 0', borderTop: '1px solid #eee', marginTop: '40px', background: '#fff' }}>
      <div className="container text-center">
        <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>
          &copy; {new Date().getFullYear()} <strong>V1LINK FB</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

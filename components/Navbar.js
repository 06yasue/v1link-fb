'use client';
import { useState } from 'react';

export default function Navbar() {
  // State untuk menyimpan status menu terbuka (true) atau tertutup (false)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-default navbar-fixed-top" style={{ 
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)', 
      border: 'none', 
      borderBottom: '3px solid #337ab7', // GARIS WARNA TIPIS DI BAWAH NAVBAR (Biru Khas Bootstrap)
      background: '#fff' 
    }}>
      <div className="container">
        <div className="navbar-header">
          {/* Tombol diganti menggunakan onClick bawaan React */}
          <button 
            type="button" 
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{ border: 'none', background: 'transparent' }}
          >
            <span className="icon-bar" style={{ backgroundColor: '#337ab7' }}></span>
            <span className="icon-bar" style={{ backgroundColor: '#337ab7' }}></span>
            <span className="icon-bar" style={{ backgroundColor: '#337ab7' }}></span>
          </button>
          
          <a className="navbar-brand" href="/" style={{ fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center' }}>
            <i className="material-icons" style={{ marginRight: '8px', color: '#337ab7' }}>bolt</i> V1LINK
          </a>
        </div>

        {/* Jika isOpen bernilai true, kelas 'in' akan otomatis ditambahkan agar menu muncul di HP */}
        <div className={`collapse navbar-collapse ${isOpen ? 'in' : ''}`} id="navbar-menu">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/link" onClick={() => setIsOpen(false)}><i className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '5px' }}>add_link</i> Buat Link</a></li>
            <li><a href="/list" onClick={() => setIsOpen(false)}><i className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '5px' }}>analytics</i> Statistik</a></li>
            <li><a href="/generator" onClick={() => setIsOpen(false)}><i className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '5px' }}>images</i> Buat Images</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

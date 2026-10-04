import React from 'react';

const Newsletter = () => (
	<div style={{ background: 'rgba(212,175,55,0.1)', color: '#d4af37', padding: '24px', borderRadius: '8px', textAlign: 'center', margin: '0 16px' }}>
		<h2 style={{ color: '#d4af37', marginBottom: '8px' }}>Newsletter</h2>
		<p>Stay updated with the latest placement news and job postings.</p>
		<input type="email" placeholder="Your email" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d4af37', marginRight: '8px' }} />
		<button style={{ background: '#d4af37', color: '#1a1a1a', padding: '8px 16px', borderRadius: '4px', border: 'none' }}>Subscribe</button>
	</div>
);

export default Newsletter;

import React from 'react';

const Newsletter = () => (
	<div style={{ background: 'rgba(255,255,255,0.1)', color: '#800000', padding: '24px', borderRadius: '8px', textAlign: 'center', margin: '0 16px' }}>
		<h2 style={{ color: '#800000', marginBottom: '8px' }}>Newsletter</h2>
		<p>Stay updated with the latest placement news and job postings.</p>
		<input type="email" placeholder="Your email" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #800000', marginRight: '8px' }} />
		<button style={{ background: '#800000', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none' }}>Subscribe</button>
	</div>
);

export default Newsletter;

import './TrustBar.css';

const companies = ['Google', 'Microsoft', 'Amazon', 'Shopify', 'Spotify', 'Adobe'];

export default function TrustBar() {
    return (
        <div className="trust-bar" aria-label="Learners from top companies">
            <span className="trust-bar__label">Learners from top companies:</span>
            <div className="trust-bar__logos">
                {companies.map((c) => (
                    <span key={c} className="trust-bar__logo">{c}</span>
                ))}
            </div>
        </div>
    );
}

import { Mail } from "lucide-react";
import "./Newsletter.css";

export default function Newsletter() {
  return (
    <main className="newsletter-page">
      <section className="newsletter-shell">
        <div className="newsletter-card">
          <div className="newsletter-overlay" />

          <div className="newsletter-content">
            <Mail className="newsletter-icon" size={34} style={{color:'white'}}/>

            <h2 className="newsletter-title">
              Subscribe to our <span>knowledge newsletter</span>
            </h2>

            <p className="newsletter-description">
              Get updates on new courses, academic events, and exclusive offers.
            </p>

            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>

            <p className="newsletter-note">
              We commit to not sending any spam emails.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

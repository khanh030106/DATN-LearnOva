import { Smartphone, Verified, Headset } from "lucide-react";
import "./Features.css";

export default function Features() {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-card">
          <div className="features-content">
            <h2 className="features-title">
              Outstanding Features
            </h2>

            <div className="features-list">
              <FeatureItem
                icon={Smartphone}
                title="Learn anytime, anywhere"
                desc="Optimized across all devices, helping you maintain a flexible learning journey wherever you are."
              />
              <FeatureItem
                icon={Verified}
                title="Trusted certification"
                desc="Complete courses and earn highly valued digital certificates within the community."
              />
              <FeatureItem
                icon={Headset}
                title="24/7 Support"
                desc="Our team of experts is always ready to answer your questions through our online system."
              />
            </div>
          </div>

          <div className="features-media">
            <div className="features-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000"
                className="features-image"
                alt="Working"
              />
              <div className="features-image-overlay" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon: Icon, title, desc }) {
  return (
    <div className="feature-item">
      <div className="feature-item-icon">
        <Icon size={26} />
      </div>
      <div className="feature-item-body">
        <h4 className="feature-item-title">{title}</h4>
        <p className="feature-item-desc">{desc}</p>
      </div>
    </div>
  );
}

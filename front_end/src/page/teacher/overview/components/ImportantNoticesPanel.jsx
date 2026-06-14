import { Gift, Megaphone } from "lucide-react";
import PanelHeader from "./PanelHeader.jsx";

const getNoticeIcon = (tone) => (tone === "gold" ? Megaphone : Gift);

const ImportantNoticesPanel = ({ notifications, qaUrl }) => {
  return (
    <section className="teacher-panel">
      <PanelHeader actionLabel="View all" href={qaUrl} title="Important Notices" />
      <div className="teacher-notification-list">
        {notifications.map((item) => {
          const Icon = getNoticeIcon(item.tone);

          return (
            <article key={item.title} className="teacher-notification">
              <span className={`teacher-notification__icon teacher-notification__icon--${item.tone}`}>
                <Icon size={20} />
              </span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
              <time>{item.time}</time>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ImportantNoticesPanel;

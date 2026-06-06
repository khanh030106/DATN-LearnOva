import Header from "./Header.jsx";
import UserLoggedHeader from "./UserLoggedHeader.jsx";
import "./HeaderPreviewPage.css";

const HeaderPreviewPage = () => {
  return (
    <div className="header-preview-page">
      <section className="header-preview-section header-preview-section--guest">
        <div className="header-preview-label">
          <span>Header cũ - chưa đăng nhập</span>
        </div>
        <Header />
      </section>

      <section className="header-preview-section">
        <div className="header-preview-label">
          <span>Header mới - sau đăng nhập</span>
        </div>
        <UserLoggedHeader />
      </section>
    </div>
  );
};

export default HeaderPreviewPage;

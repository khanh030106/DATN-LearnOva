import HomeBannerImg from "../../../assets/home/HomeBanner.jpg";
import "./Banner.css";

const HomeBanner = () => {
    return (
        <section className="home-banner">
            <div className="home-banner__bg">
                <img
                    src={HomeBannerImg}
                    alt="Banner background"
                    className="home-banner__img"
                />

                <div className="home-banner__overlay" />
                <div className="home-banner__bottom-fade" />
            </div>

            <div className="home-banner__content">
                <h1 className="home-banner__title">
                    Begin your journey of knowledge discovery.
                </h1>

                <p className="home-banner__subtitle">
                    Experience modern education with interactive technology,
                    connecting you to knowledge from
                    <br />
                    leading experts.
                </p>

                <div className="home-banner__actions">
                    <button className="home-banner__btn-primary">
                        Start learning now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HomeBanner;
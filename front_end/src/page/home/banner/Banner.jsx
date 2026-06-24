import { useEffect, useState } from "react";
import HomeBannerImg from "../../../assets/home/HomeBanner.jpg";
import "./Banner.css";
import Header from "../../../component/header/user_header/Header.jsx";
import { t } from "../../../util/i18n.js";
import { getLanguage, LANG_EVENT } from "../../../util/language.js";

const HomeBanner = () => {
    const [lang, setLang] = useState(getLanguage());

    useEffect(() => {
        const onLangChange = (e) => setLang(e?.detail?.lang || getLanguage());
        window.addEventListener(LANG_EVENT, onLangChange);
        return () => window.removeEventListener(LANG_EVENT, onLangChange);
    }, []);

    return (
        <section className="home-banner" data-lang={lang}>
            <div className="home-banner__header">
                <Header />
            </div>

            <div className="home-banner__bg">

                <img
                    src={HomeBannerImg}
                    alt="Banner background"
                    className="home-banner__img"
                    loading="eager"
                    fetchPriority="high"
                />
                <div className="home-banner__overlay" />
                <div className="home-banner__bottom-fade" />
            </div>

            <div className="home-banner__content">
                <h1 className="home-banner__title">
                    {t('begin_your_journey_of')} <em>{t('knowledge_discovery')}</em>
                </h1>

                <p className="home-banner__subtitle">
                    {t('home_banner_description')}
                </p>

                <div className="home-banner__actions">
                    <button className="home-banner__btn-primary">
                        {t('start_learning_now')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HomeBanner;
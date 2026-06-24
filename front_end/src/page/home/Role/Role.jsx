import {
    School,
    History,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

import "./Roles.css";
import { t } from "../../../util/i18n.js";
import { useEffect, useState } from "react";
import { getLanguage, LANG_EVENT } from "../../../util/language.js";

const roles = [
    {
        titleKey: "role_student_title",
        descKey: "role_student_desc",
        icon: School,
        linkKey: "role_student_link",
    },
    {
        titleKey: "role_instructor_title",
        descKey: "role_instructor_desc",
        icon: History,
        linkKey: "role_instructor_link",
    },
    {
        titleKey: "role_admin_title",
        descKey: "role_admin_desc",
        icon: ShieldCheck,
        linkKey: "role_admin_link",
    },
];

const Roles = ({ onSelectRole }) => {
    const [lang, setLang] = useState(getLanguage());

    useEffect(() => {
        const onLangChange = (e) => {
            console.log("Language change event received:", e?.detail?.lang);
            setLang(e?.detail?.lang || getLanguage());
        };
        window.addEventListener(LANG_EVENT, onLangChange);
        return () => window.removeEventListener(LANG_EVENT, onLangChange);
    }, []);

    return (
        <section className="roles-section">
            <div className="roles-header">
                        <h2>{t('roles_header_title')}</h2>

                        <p>
                            {t('roles_header_subtitle')}
                        </p>
            </div>

            <div className="roles-grid">
                {roles.map((role, i) => (
                    <div
                        key={i}
                        onClick={() => onSelectRole?.(role.title)}
                        className="role-card"
                    >
                        <div className="role-icon">
                            <role.icon size={24} />
                        </div>

                        <h3>{t(role.titleKey)}</h3>

                        <p>{t(role.descKey)}</p>

                        <button className="role-btn">
                            {t(role.linkKey)}
                            <ArrowRight size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Roles;
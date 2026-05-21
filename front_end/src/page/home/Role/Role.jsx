import { motion } from 'framer-motion';
import {
    School,
    History,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

import "./Roles.css";

const roles = [
    {
        title: "Học viên",
        desc: "Truy cập hàng ngàn khóa học chất lượng cao...",
        icon: School,
        color: "blue",
        link: "Tìm hiểu thêm",
    },
    {
        title: "Giảng viên",
        desc: "Xây dựng thương hiệu cá nhân...",
        icon: History,
        color: "orange",
        link: "Trở thành giảng viên",
    },
    {
        title: "Quản trị viên",
        desc: "Quản lý hiệu quả đào tạo nội bộ...",
        icon: ShieldCheck,
        color: "indigo",
        link: "Giải pháp doanh nghiệp",
    },
];

const Roles = ({ onSelectRole }) => {

    return (
        <section className="roles-section">

            <div className="roles-header">
                <h2>Cùng bạn vươn xa</h2>

                <p>
                    Chọn vai trò của bạn để khám phá các tính năng
                    chuyên biệt được thiết kế riêng.
                </p>
            </div>

            <div className="roles-grid">

                {roles.map((role, i) => (

                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                        }}
                        onClick={() => onSelectRole?.(role.title)}
                        className="role-card"
                    >

                        <div className={`role-icon ${role.color}`}>
                            <role.icon size={24} />
                        </div>

                        <h3>{role.title}</h3>

                        <p>{role.desc}</p>

                        <button className="role-btn">
                            {role.link}
                            <ArrowRight size={16} />
                        </button>

                    </motion.div>

                ))}

            </div>

        </section>
    );
}

export default Roles;
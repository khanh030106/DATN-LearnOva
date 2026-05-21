import { motion } from "framer-motion";
import { Code, LineChart } from "lucide-react";

import "./Path.css";

const paths = [
    {
        title: "Fullstack Developer",
        duration: "6 - 8 tháng • 24 khóa học",
        icon: Code,
        color: "blue",

        steps: [
            {
                t: "Nhập môn Web & HTML/CSS",
                d: "Nắm vững cấu trúc web và tư duy thiết kế giao diện hiện đại.",
            },
            {
                t: "JavaScript & ReactJS nâng cao",
                d: "Xử lý logic phức tạp và xây dựng ứng dụng Single Page Application.",
            },
            {
                t: "Backend với Node.js & Database",
                d: "Xây dựng hệ thống API mạnh mẽ và quản trị cơ sở dữ liệu.",
            },
        ],
    },

    {
        title: "Data Scientist",
        duration: "8 - 10 tháng • 30 khóa học",
        icon: LineChart,
        color: "brown",

        steps: [
            {
                t: "Toán xác suất & Python cơ bản",
                d: "Nền tảng toán học và lập trình cho phân tích dữ liệu.",
            },
            {
                t: "Khai phá dữ liệu & SQL",
                d: "Kỹ năng truy vấn và làm sạch các tập dữ liệu lớn.",
            },
            {
                t: "Machine Learning & AI",
                d: "Xây dựng các mô hình dự báo và ứng dụng trí tuệ nhân tạo.",
            },
        ],
    },
];

const LearningPaths = () => {

    return (
        <section className="learning-section">

            <div className="learning-container">

                <div className="learning-header">

                    <h2>Lộ trình học tập bài bản</h2>

                    <p>
                        Chúng tôi thiết kế lộ trình từ con số 0 đến khi thành thạo,
                        giúp bạn tự tin bước vào thị trường lao động.
                    </p>

                </div>

                <div className="learning-grid">

                    {paths.map((path, i) => (

                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1,
                                delay: i * 0.15,
                            }}
                            className={`learning-card ${path.color}`}
                        >

                            <div className="learning-top">

                                <div className="learning-icon">
                                    <path.icon size={28} />
                                </div>

                                <div>

                                    <h3>{path.title}</h3>

                                    <span>{path.duration}</span>

                                </div>

                            </div>

                            <div className="learning-steps">

                                {path.steps.map((step, si) => (

                                    <motion.div
                                        key={si}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.3 + si * 0.15,
                                        }}
                                        className="step-item"
                                    >

                                        <div className={`step-number ${path.color}`}>
                                            {si + 1}
                                        </div>

                                        <div>

                                            <h4>{step.t}</h4>

                                            <p>{step.d}</p>

                                        </div>

                                    </motion.div>

                                ))}

                            </div>

                            <button className={`learning-btn ${path.color}`}>
                                Xem chi tiết khóa học
                            </button>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default LearningPaths;
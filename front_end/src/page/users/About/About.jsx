import React from 'react';
import './About.css';
import { Award, Target, Globe, Users, ChevronRight } from 'lucide-react';
import aboutVideo from '../../../assets/instructors/video/about.mp4'
import LearnovaAI from "../../home/AI/AI.jsx";

function AboutView() {
    return (
        <div className="about-main-container">
            {/* NHÚNG GOOGLE FONT TRỰC TIẾP ĐỂ TRÁNH LỖI PHÔNG CHỮ TIẾNG VIỆT */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

            {/* Hero Section */}
            <section className="about-hero-section">
                <div className="about-hero-video-wrapper">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="about-hero-video"
                    >
                        <source src={aboutVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="about-hero-overlay-gradient"></div>
                    <div className="about-hero-overlay-multiply"></div>
                </div>

                <div className="about-hero-content">

                    <h1 className="about-font-serif-premium about-hero-title">
                        Vision <br className="hidden md:block" /> <span className="about-text-italic-gold">to shape</span> the future
                    </h1>
                    <p className="about-hero-desc">
                        LearnOva is not just a learning platform, but a community passionate about knowledge, where each individual is empowered to unlock and fully develop their potential.
                    </p>
                </div>

                <div className="about-scroll-indicator">

                </div>
            </section>

            {/* Intro Context */}
            <section className="about-section-padding">
                <div style={{ position: 'absolute', top: '-10rem', left: '-10rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(255,125,0,0.05)', borderRadius: '50%', filter: 'blur(64px)', pointerEvents: 'none' }}></div>

                <div className="about-grid-layout">
                    <div className="about-content-side">
                        <h2 className="about-font-serif-premium about-section-title">
                            Journey of <br /> <span className="about-text-orange">knowledge</span> and <span className="about-text-italic-gold">aspiration</span>
                        </h2>

                        <div className="about-text-body-light about-content-space">
                            <p>
                                Founded in 2020, LearnOva was born from a simple question: How can we bring elite education closer to everyone? We understand that in the digital age, knowledge is not lacking—the real gap is the absence of a structured learning path and dedicated mentors.
                            </p>
                            <p>
                                With the philosophy of "Learning to Empower", LearnOva focuses on building training programs that not only provide skills but also cultivate thinking. We believe that when someone understands the “why”, they will always find the “how”.
                            </p>
                            <p>
                                Over the past 4 years, we have accompanied more than 50,000 learners, helping them transform their careers and expand their worldview through carefully designed courses created by a team of leading experts.
                            </p>
                        </div>
                    </div>
                    <div className="about-image-wrapper">
                        <div className="about-blur-bg-effect"></div>
                        <img
                            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
                            alt="Community"
                            className="about-premium-img"
                        />
                        <div className="about-floating-badge">
                            <div className="about-font-serif-premium about-badge-num">50k+</div>
                            <div className="about-badge-text">Trusted by learners</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="about-section-padding about-values-section">
                <div style={{ position: 'absolute', bottom: '-10rem', right: '-10rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(255,161,7,0.05)', borderRadius: '50%', filter: 'blur(64px)', pointerEvents: 'none' }}></div>

                <div className="about-section-header-center">
                    <span className="about-section-subtitle-tag">Core Values</span>
                    <h2 className="about-font-serif-premium about-section-title" style={{ margin: 0 }}>
                        Our Guiding Principles
                    </h2>
                </div>

                <div className="about-values-grid">
                    {[
                        {
                            icon: <Award style={{ color: 'var(--about-orange)', transition: 'colors 0.5s' }} size={32} />,
                            title: "Excellence in Quality",
                            desc: "Every course is carefully reviewed by industry experts and outstanding instructors before reaching our learners."
                        },
                        {
                            icon: <Target style={{ color: 'var(--about-orange)', transition: 'colors 0.5s' }} size={32} />,
                            title: "Practical & Applicable",
                            desc: "We eliminate unnecessary theory and focus on knowledge that can be immediately applied to work and everyday life."
                        },
                        {
                            icon: <Users style={{ color: 'var(--about-orange)', transition: 'colors 0.5s' }} size={32} />,
                            title: "Connected Community",
                            desc: "Learning is never a lonely journey at LearnOva. We foster an ecosystem where learners can connect, collaborate, and support one another."
                        }
                    ].map((val, i) => (
                        <div key={i} className="about-value-card">
                            <div className="about-icon-box">
                                {val.icon}
                            </div>
                            <h3 className="about-font-serif-premium about-value-card-title">{val.title}</h3>
                            <p className="about-text-body-light" style={{ margin: 0 }}>{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-section-padding about-mission-section">
                <div className="about-mission-globe-bg">
                    <Globe size={800} />
                </div>

                <div className="about-grid-layout">
                    <div className="about-mission-content-side">
                        <h2
                            className="about-font-serif-premium about-section-title"
                            style={{ color: '#ffa107' }}
                        >
                            Our mission is to transform <span className="about-text-italic-gold">the way the world learns</span>
                        </h2>

                        <div
                            className="about-text-body-light about-content-space"
                            style={{ color: '#ffa107' }}
                        >
                            <p>
                                At LearnOva, we do more than offer courses. We are building a foundation for the sustainable growth and development of every individual.
                            </p>

                            <p>
                                Our mission is to bridge the gap between academic education and real-world industry needs while creating a lifelong learning environment for everyone.
                            </p>

                            <div className="about-stats-row">
                                <div>
                                    <div
                                        className="about-font-serif-premium about-badge-num"
                                        style={{
                                            fontSize: '2.5rem',
                                            fontWeight: '600',
                                            color: '#ffa107'
                                        }}
                                    >
                                        100+
                                    </div>
                                    <div
                                        className="about-badge-text"
                                        style={{ color: '#ffa107' }}
                                    >
                                        Advanced Courses
                                    </div>
                                </div>

                                <div>
                                    <div
                                        className="about-font-serif-premium about-badge-num"
                                        style={{
                                            fontSize: '2.5rem',
                                            fontWeight: '600',
                                            color: '#ffa107'
                                        }}
                                    >
                                        200+
                                    </div>
                                    <div
                                        className="about-badge-text"
                                        style={{ color: '#ffa107' }}
                                    >
                                        Expert Instructors
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-image-wrapper">
                        <div className="about-premium-img-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200"
                                alt="Mission"
                                className="about-mission-img-raw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-section-padding">
                <div className="about-cta-box">
                    <div style={{ position: 'absolute', top: '-6rem', left: '-6rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(255,125,0,0.05)', borderRadius: '50%', filter: 'blur(64px)', pointerEvents: 'none' }}></div>
                    <div style={{ position: 'absolute', bottom: '-6rem', right: '-6rem', width: '24rem', height: '24rem', backgroundColor: 'rgba(250,228,170,0.1)', borderRadius: '50%', filter: 'blur(64px)', pointerEvents: 'none' }}></div>

                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <h2 className="about-font-serif-premium about-section-title">
                            Are you ready to <br /> <span style={{ color: '#ffaa16' }}>write the next chapter</span> of your story?
                        </h2>

                        <p className="about-text-body-light about-cta-desc">
                            Start your learning journey with LearnOva today and join us in shaping your future.
                        </p>

                        <div className="about-btn-container">
                            <button className="about-btn-primary">
                                Explore Courses
                                <ChevronRight size={16} />
                            </button>

                            <button className="about-btn-secondary">
                                Contact an Advisor
                            </button>
                        </div>
                    </div>
                </div>
                <div className="chatbot-fixed">
                    <LearnovaAI />
                </div>
            </section>
        </div>
    );
} export default AboutView
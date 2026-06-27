import { useState } from 'react';
import './HeroSplit.css';

export default function HeroSplit() {
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            window.location.href = `/courses?q=${encodeURIComponent(search.trim())}`;
        }
    };

    return (
        <section className="hero">
            <div className="hero__glow hero__glow--1" aria-hidden="true" />
            <div className="hero__glow hero__glow--2" aria-hidden="true" />

            <div className="hero__inner">
                {/* ── Left column ── */}
                <div className="hero__left">
                    <div className="hero__badge">
                        <span className="hero__badge-dot" aria-hidden="true" />
                        50,000+ courses available now
                    </div>

                    <h1 className="hero__headline">
                        Learn any skill.<br />
                        <span className="hero__gradient-text">Land your dream</span><br />
                        career.
                    </h1>

                    <p className="hero__copy">
                        Join 10 million learners worldwide. Expert-led courses in tech,
                        design, business — start today.
                    </p>

                    <form className="hero__search" onSubmit={handleSearch} role="search">
                        <input
                            type="text"
                            className="hero__search-input"
                            placeholder='Try "Python", "UX Design", "Excel"...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search courses"
                        />
                        <button type="submit" className="hero__search-btn">
                            Search courses
                        </button>
                    </form>

                    <div className="hero__stats" aria-label="Platform statistics">
                        <div className="hero__stat">
                            <strong>10M+</strong>
                            <span>Active learners</span>
                        </div>
                        <div className="hero__stat-divider" aria-hidden="true" />
                        <div className="hero__stat">
                            <strong>50K+</strong>
                            <span>Courses</span>
                        </div>
                        <div className="hero__stat-divider" aria-hidden="true" />
                        <div className="hero__stat">
                            <strong>★ 4.8</strong>
                            <span>Avg. rating</span>
                        </div>
                    </div>
                </div>

                {/* ── Right column — floating UI ── */}
                <div className="hero__right" aria-hidden="true">
                    <div className="hero__card">
                        <div className="hero__card-thumb">
                            <div className="hero__card-play">
                                <div className="hero__play-triangle" />
                            </div>
                            <div className="hero__card-category">WEB DEVELOPMENT</div>
                        </div>
                        <div className="hero__card-body">
                            <p className="hero__card-title">Complete Web Development Bootcamp 2024</p>
                            <p className="hero__card-meta">by Sarah Chen · 62 hours · 142K students</p>
                            <div className="hero__card-progress-track">
                                <div className="hero__card-progress-fill" />
                            </div>
                            <div className="hero__card-progress-row">
                                <span>65% complete</span>
                                <span className="hero__card-rating">★ 4.8</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero__badge-live">
                        <div className="hero__badge-live-num">2,400+</div>
                        <div className="hero__badge-live-label">Learning right now</div>
                    </div>

                    <div className="hero__badge-cert">
                        <div className="hero__badge-cert-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1.8"/>
                                <path d="M7 10.5L9.5 13L13 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <p className="hero__badge-cert-title">Certificate Earned!</p>
                            <p className="hero__badge-cert-sub">Web Development Pro</p>
                        </div>
                    </div>

                    <div className="hero__pill">
                        <div className="hero__pill-thumb" />
                        <div>
                            <p className="hero__pill-title">Python for Data Science</p>
                            <p className="hero__pill-sub">98K students enrolled</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

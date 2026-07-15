import { useEffect, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";

import { getLessonSummaryApi, generateLessonSummaryApi } from "../../../../api/SummaryApi";

import "./SummaryTab.css";

function renderInlineBold(text) {
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
}

function parseSummary(raw) {
    const lines = raw.split("\n").map((l) => l.trimEnd()).filter((l) => l.trim() !== "");

    const intro = [];
    const items = [];
    let currentItem = null;

    for (const line of lines) {
        const trimmed = line.trim();
        const indent = line.length - line.trimStart().length;
        const isBullet = trimmed.startsWith("* ") || trimmed.startsWith("- ");

        if (isBullet) {
            const text = trimmed.replace(/^[*-]\s+/, "");
            if (indent >= 2 && currentItem) {
                currentItem.children.push(text);
            } else {
                currentItem = { text, children: [] };
                items.push(currentItem);
            }
        } else if (items.length === 0) {
            intro.push(trimmed);
        }
    }

    return { intro: intro.join(" "), items };
}

function SummaryTab({ lessonId }) {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!lessonId) return;

        setSummary(null);
        setError("");

        const loadSummary = async () => {
            try {
                const data = await getLessonSummaryApi(lessonId);
                setSummary(data.content);
            } catch (e) {
                if (e.response?.status !== 404) {
                    console.log(e);
                }
            }
        };

        loadSummary();
    }, [lessonId]);

    const handleGenerate = async () => {
        if (!lessonId) return;

        setLoading(true);
        setError("");

        try {
            const data = await generateLessonSummaryApi(lessonId);
            setSummary(data.content);
        } catch (e) {
            console.log(e);
            setError(e.response?.data?.message || "Failed to generate summary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (summary) {
        const { intro, items } = parseSummary(summary);

        return (
            <div className="summary-content">
                <div className="summary-card">
                    <div className="summary-card-header">
                        <span className="summary-badge">
                            <FaRegLightbulb />
                        </span>
                        <h4>Lesson Summary</h4>
                    </div>

                    {intro && <p className="summary-intro">{renderInlineBold(intro)}</p>}

                    <ul className="summary-list">
                        {items.map((item, i) => (
                            <li key={i}>
                                <div className="summary-list-item">
                                    <span className="summary-dot" />
                                    <span>{renderInlineBold(item.text)}</span>
                                </div>

                                {item.children.length > 0 && (
                                    <ul className="summary-sublist">
                                        {item.children.map((child, j) => (
                                            <li key={j} className="summary-list-item">
                                                <span className="summary-dot" />
                                                <span>{renderInlineBold(child)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="summary-content">
            <div className="summary-empty">
                <p>Get a quick AI-generated recap of the key points in this lesson.</p>

                <button
                    className="summary-generate-btn"
                    onClick={handleGenerate}
                    disabled={!lessonId || loading}
                >
                    {loading ? "Generating..." : "Summarize knowledge"}
                </button>

                {error && <p className="summary-error">{error}</p>}
            </div>
        </div>
    );
}

export default SummaryTab;

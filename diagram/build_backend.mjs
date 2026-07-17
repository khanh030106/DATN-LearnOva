// LearnOva Backend architecture (Spring Boot) — type "pipeline" (layered request flow, LR).
// Source: back_end/src/main/java/com/example/back_end (controller/service/repository/security/config/scheduler).
import { writeFileSync } from "node:fs";
import { Diagram } from "../../../drawio-ai-kit/src/builder.mjs";
import { stage, band, endpoint, ossBox, icon, phantom, renderTree } from "../../../drawio-ai-kit/src/layout-engine.mjs";

const d = new Diagram("pipeline");

const security = stage("sec", 0, "Security & Gateway", [
  ossBox("secbox", "CorsConfig\nJwtAuthenticationFilter\n(access/refresh cookie)\nOAuth2SuccessHandler\nRateLimitInterceptor"),
]);

const controllers = stage("ctl", 1, "Controllers", [
  ossBox("pubctl", "Public API\nAuth · User · Course · Lesson\nEnrollment · Payment · Review\nSearch · Upload · Notification\nCertificate · Hls"),
  ossBox("adminctl", "Admin API\nCategory · Dashboard · Instructor\nPayout · Revenue · Tag\nTeacherApplication · Voucher"),
  ossBox("teacherctl", "Teacher API\nAnnouncement · Course · Lesson\nPromotion · Revenue · Analytics\nStudent · Review · Profile"),
]);

const services = stage("svc", 2, "Services", [
  ossBox("bizsvc", "Business services\n(1:1 per controller domain)"),
  ossBox("searchsvc", "SearchService /\nCourseIndexService"),
  ossBox("aiclient", "AiServiceClient (RestClient)"),
  ossBox("scheduler", "Scheduler jobs\nCleanupRefreshToken\nHlsJobStatus · NotificationCleanup"),
]);

const repos = stage("repo", 3, "Repositories", [
  ossBox("jpa", "Spring Data JPA repositories"),
  ossBox("essearch", "CourseSearchRepository\n(Elasticsearch)"),
]);

const data = stage("data", 4, "Data stores", [
  icon("pg", "postgres", "PostgreSQL\n(Flyway migrations)"),
  icon("es", "elasticsearch", "Elasticsearch\n(CourseDocument)"),
]);

const xcut = band("xcut", "External integrations (cross-cutting)", [
  ossBox("oauthprov", "Google / Facebook\nOAuth2 providers"),
  ossBox("aiservice", "ai-service (FastAPI)\n/summarize · /generate-quiz\n-> Gemini API"),
  icon("s3", "s3", "S3 (storage)"),
  icon("cf", "cloudfront", "CloudFront\n(signed URLs)"),
  icon("mc", "elemental_mediaconvert", "MediaConvert (HLS)"),
  ossBox("payos", "PayOS\n(payment gateway)"),
]);

const tree = phantom("root", "", { dir: "col", gap: 30, header: 0, pad: 10 }, [
  phantom("pipe", "", { dir: "row", gap: 50, align: "top", header: 0 }, [
    endpoint("client", "FRONTEND /\nAPI CLIENTS"),
    security,
    controllers,
    services,
    repos,
    data,
  ]),
  xcut,
]);

renderTree(d, tree, [40, 80]);
d.title("LearnOva — Backend architecture (Spring Boot)");

d.link("client", "secbox", "HTTPS + cookie", { flow: true });
d.link("secbox", "pubctl", "", { flow: true });
d.link("secbox", "adminctl", "", { role: "fanout" });
d.link("secbox", "teacherctl", "", { role: "fanout" });
d.link("pubctl", "bizsvc", "", { flow: true });
d.link("adminctl", "bizsvc", "", { role: "fanout" });
d.link("teacherctl", "bizsvc", "", { role: "fanout" });
d.link("bizsvc", "searchsvc", "", { role: "fanout" });
d.link("bizsvc", "jpa", "", { flow: true });
d.link("searchsvc", "essearch", "");
d.link("jpa", "pg", "", { flow: true });
d.link("essearch", "es", "");
d.link("bizsvc", "aiclient", "", { role: "fanout" });
d.link("aiclient", "aiservice", "HTTP\nAI_SERVICE_URL", { dash: true });
d.link("bizsvc", "s3", "presigned upload/read", { dash: true });
d.link("bizsvc", "cf", "signed URL", { dash: true });
d.link("bizsvc", "payos", "checkout / webhook", { dash: true });
d.link("secbox", "oauthprov", "", { dash: true });
d.link("scheduler", "jpa", "", { dash: true });

const res = d.validate();
console.log("VALIDATE:", JSON.stringify({ ok: res.ok, errors: res.errors, warnings: res.warnings, advice: res.audit.advice }));
writeFileSync(new URL("./learnova_backend_architecture.drawio", import.meta.url), d.mxfile("LearnOva — Backend architecture"));

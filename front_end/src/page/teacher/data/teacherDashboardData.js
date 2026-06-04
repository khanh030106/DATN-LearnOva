import courseImageOne from "../../../assets/course/course-1.jpg";
import courseImageTwo from "../../../assets/course/course-2.jpg";
import courseImageThree from "../../../assets/course/course-3.jpg";
import teacherAvatar from "../../../assets/instructors/instructor-1.jpg";
import studentAvatarOne from "../../../assets/instructors/instructor-3.jpg";
import studentAvatarTwo from "../../../assets/instructors/instructor-4.jpg";

export const teacherProfile = {
  name: "Alex Morgan",
  role: "Senior Instructor",
  avatar: teacherAvatar,
};

export const metrics = [
  {
    label: "Total Students",
    value: "1,284",
    note: "+12% vs last month",
    tone: "blue",
    chart: "bar",
  },
  {
    label: "Avg. Rating",
    value: "4.92",
    note: "Top 1% instructor",
    tone: "gold",
    chart: "line",
  },
  {
    label: "Revenue",
    value: "42.5M",
    suffix: "VND",
    note: "+8.4% vs last month",
    tone: "blue",
    chart: "bar",
  },
  {
    label: "Completion",
    value: "76.2%",
    note: "+4% vs last month",
    tone: "gold",
    chart: "line",
  },
];

export const courses = [
  {
    id: 1,
    title: "Eastern Philosophy: From Taoism to Buddhism",
    slug: "eastern-philosophy-taoism-buddhism",
    description:
      "A guided academic course on the core schools, practices, and historical influence of Eastern philosophy.",
    language: "en",
    requirements: ["Basic reading habit", "Interest in humanities", "Notebook for weekly reflections"],
    whatYouLearn: [
      "Compare Taoism, Buddhism, and Confucian thought",
      "Apply philosophical ideas to modern decision-making",
      "Build structured arguments from primary texts",
    ],
    basePrice: 49.99,
    level: "Intermediate",
    category: "Philosophy",
    categories: ["Philosophy", "Humanities"],
    tags: ["Taoism", "Buddhism", "Ethics"],
    students: "842 students",
    rating: "4.9",
    status: "Best Seller",
    courseStatus: "PUBLISHED",
    isDeleted: false,
    revenue: "18.6M",
    displayRevenue: "$12,500",
    modules: 24,
    createdAgo: "2 days ago",
    completion: "82%",
    image: courseImageOne,
    thumbnailUrl: courseImageOne,
    publishedAt: "2024-10-12",
    updatedAt: "2026-05-18",
    sections: [
      {
        id: 101,
        title: "Foundations of Eastern Thought",
        sectionOrder: 1,
        isDeleted: false,
        lessons: [
          {
            id: 1001,
            title: "What is Tao?",
            lessonOrder: 1,
            durationSeconds: 1080,
            type: "Video",
            isPreview: true,
            isDeleted: false,
          },
          {
            id: 1002,
            title: "Buddhist Views on Suffering",
            lessonOrder: 2,
            durationSeconds: 1260,
            type: "Document",
            isPreview: false,
            isDeleted: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Academic Research Skills and Critical Thinking",
    slug: "academic-research-critical-thinking",
    description:
      "A practical course for designing research questions, evaluating evidence, and writing stronger academic arguments.",
    language: "en",
    requirements: ["A draft research topic", "Basic academic writing experience"],
    whatYouLearn: [
      "Build strong research questions",
      "Evaluate evidence quality",
      "Write clearer academic arguments",
    ],
    basePrice: 59.99,
    level: "Advanced",
    category: "Academic",
    categories: ["Academic", "Research"],
    tags: ["Research", "Critical Thinking", "Writing"],
    students: "435 students",
    rating: "4.7",
    status: "Updated",
    courseStatus: "DRAFT",
    isDeleted: false,
    revenue: "12.3M",
    displayRevenue: "$8,750",
    modules: 18,
    createdAgo: "5 days ago",
    completion: "74%",
    image: courseImageTwo,
    thumbnailUrl: courseImageTwo,
    publishedAt: "",
    updatedAt: "2026-05-22",
    sections: [
      {
        id: 201,
        title: "Research Design",
        sectionOrder: 1,
        isDeleted: false,
        lessons: [
          {
            id: 2001,
            title: "From Topic to Research Question",
            lessonOrder: 1,
            durationSeconds: 960,
            type: "Video",
            isPreview: true,
            isDeleted: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "History of Human Civilization: Ancient to Modern",
    slug: "history-human-civilization-ancient-modern",
    description:
      "A broad historical survey connecting ancient societies, institutions, cultural exchange, and modern transformation.",
    language: "en",
    requirements: ["Introductory history knowledge"],
    whatYouLearn: [
      "Identify major civilizational shifts",
      "Connect institutions across historical periods",
      "Analyze continuity and change over time",
    ],
    basePrice: 39.99,
    level: "Beginner",
    category: "History",
    categories: ["History", "Culture"],
    tags: ["Civilization", "Ancient History", "Modern History"],
    students: "1,120 students",
    rating: "4.8",
    status: "Long Term",
    courseStatus: "ARCHIVED",
    isDeleted: false,
    revenue: "11.6M",
    displayRevenue: "$6,920",
    modules: 21,
    createdAgo: "1 week ago",
    completion: "71%",
    image: courseImageThree,
    thumbnailUrl: courseImageThree,
    publishedAt: "2024-08-04",
    updatedAt: "2026-04-30",
    sections: [
      {
        id: 301,
        title: "Ancient Societies",
        sectionOrder: 1,
        isDeleted: false,
        lessons: [
          {
            id: 3001,
            title: "Agriculture and Early Cities",
            lessonOrder: 1,
            durationSeconds: 1320,
            type: "Video",
            isPreview: true,
            isDeleted: false,
          },
        ],
      },
    ],
  },
];

export const notifications = [
  {
    title: "Grading deadline",
    detail: "2 days left for \"Eastern Philosophy\"",
    time: "2 hours ago",
    tone: "gold",
  },
  {
    title: "New promotion program",
    detail: "Join the 30% tuition discount campaign for May.",
    time: "1 day ago",
    tone: "navy",
  },
];

export const questions = [
  {
    student: "Mia Harper",
    course: "Eastern Philosophy",
    time: "12 minutes ago",
    question: "How can I apply the concept of 'wu wei' to modern project management?",
    avatar: studentAvatarOne,
  },
  {
    student: "Olivia Chen",
    course: "Research Skills",
    time: "38 minutes ago",
    question: "How should I present my research hypothesis more rigorously?",
    avatar: studentAvatarTwo,
  },
];

export const promotions = [
  {
    title: "Academic Month",
    detail: "30% off research and critical-thinking course bundles.",
    status: "Active",
  },
  {
    title: "New Student Bundle",
    detail: "Reward students with a voucher after their first completed quiz.",
    status: "Upcoming",
  },
];

export const students = [
  { name: "Mia Harper", course: "Eastern Philosophy", progress: "88%" },
  { name: "Olivia Chen", course: "Research Skills", progress: "74%" },
  { name: "Noah Bennett", course: "History of Civilization", progress: "69%" },
];

export const analytics = [
  { label: "Retention Rate", value: "88%" },
  { label: "Course Engagement", value: "74%" },
  { label: "Quiz Completion", value: "91%" },
];

/**
 * StudentHub UET - Advanced Student Support Features
 * P1: Career Guidance & Academic Roadmap
 * P2: Student Support AI Chatbot Assistant
 * P3: Clubs, Research Labs & Organizational Directory
 * P4: Career Mentorship & Alumni Network
 */
(function() {
  console.log("%c[StudentHub Features] Initializing Student Support Features...", "color: #00477f; font-weight: bold; font-size: 13px;");

  // Helper to safely obtain React & JSX runtime
  function getRuntime() {
    const React = window.React || window.__UET_REACT?.React;
    const jsxRuntime = window.jsxRuntime || window.__UET_REACT?.jsxRuntime;
    return { React, jsxRuntime };
  }

  // Common SVG Icons
  const Icons = {
    Career: (d) => d.jsxs("svg", { className: "fill-current text-primary drop-shadow-sm", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
      d.jsx("path", { d: "M12 2L2 7L12 12L22 7L12 2Z", fill: "currentColor" }),
      d.jsx("path", { d: "M2 17L12 22L22 17", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
      d.jsx("path", { d: "M2 12L12 17L22 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
    ]}),
    Chatbot: (d) => d.jsxs("svg", { className: "fill-current text-primary drop-shadow-sm", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
      d.jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8 9.5C8 8.67 8.67 8 9.5 8C10.33 8 11 8.67 11 9.5C11 10.33 10.33 11 9.5 11C8.67 11 8 10.33 8 9.5ZM16 16H8V14.5C8 13.5 10 13 12 13C14 13 16 13.5 16 14.5V16ZM14.5 11C13.67 11 13 10.33 13 9.5C13 8.67 13.67 8 14.5 8C15.33 8 16 8.67 16 9.5C16 10.33 15.33 11 14.5 11Z", fill: "currentColor" })
    ]}),
    Org: (d) => d.jsxs("svg", { className: "fill-current text-primary drop-shadow-sm", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
      d.jsx("path", { d: "M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z", fill: "currentColor" })
    ]}),
    Mentor: (d) => d.jsxs("svg", { className: "fill-current text-primary drop-shadow-sm", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
      d.jsx("path", { d: "M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z", fill: "currentColor" })
    ]})
  };

  // Provide extra navigation items for Sidebar (v)
  window.__EXTRA_NAV_ITEMS = function(d) {
    return [
      {
        id: "career-guidance",
        title: "Định hướng nghề nghiệp",
        path: "/career-guidance",
        icon: Icons.Career(d),
        roles: [],
        children: []
      },
      {
        id: "student-assistant",
        title: "Trợ lý sinh viên",
        path: "/student-assistant",
        icon: Icons.Chatbot(d),
        roles: [],
        children: []
      },
      {
        id: "organizations",
        title: "Câu lạc bộ & Phòng TN",
        path: "/organizations",
        icon: Icons.Org(d),
        roles: [],
        children: []
      },
      {
        id: "mentorship",
        title: "Cố vấn nghề nghiệp",
        path: "/mentorship",
        icon: Icons.Mentor(d),
        roles: [],
        children: []
      }
    ];
  };

  // Provide extra routes for router (Xnn)
  window.__EXTRA_ROUTES = function(ls, vo, Ss, Ji, d, k) {
    return [
      ls("/career-guidance", createCareerGuidancePage(Ss, Ji, d, k), "Định hướng nghề nghiệp", vo),
      ls("/student-assistant", createStudentAssistantPage(Ss, Ji, d, k), "Trợ lý sinh viên", vo),
      ls("/organizations", createOrganizationsPage(Ss, Ji, d, k), "Câu lạc bộ & Phòng thí nghiệm", vo),
      ls("/mentorship", createMentorshipPage(Ss, Ji, d, k), "Cố vấn nghề nghiệp", vo)
    ];
  };

  // -------------------------------------------------------------------------
  // Feature P1: Career Guidance Page Component
  // -------------------------------------------------------------------------
  function createCareerGuidancePage(Ss, Ji, d, k) {
  return function CareerGuidancePage() {
    const [activeTab, setActiveTab] = k.useState("overview"); // overview | explore | quiz | result | roadmap
    const [roles, setRoles] = k.useState([]);
    const [loading, setLoading] = k.useState(true);
    const [searchQuery, setSearchQuery] = k.useState("");
    const [selectedCategory, setSelectedCategory] = k.useState("all");
    const [selectedRole, setSelectedRole] = k.useState(null);
    const [compareRoleA, setCompareRoleA] = k.useState(null);
    const [compareRoleB, setCompareRoleB] = k.useState(null);
    const [showCompareModal, setShowCompareModal] = k.useState(false);

    // Quiz State
    const [quizConfig, setQuizConfig] = k.useState(null);
    const [quizAnswers, setQuizAnswers] = k.useState({});
    const [currentQuizGroup, setCurrentQuizGroup] = k.useState(0);
    const [submittingQuiz, setSubmittingQuiz] = k.useState(false);
    const [quizResult, setQuizResult] = k.useState(null);
    const [showAllRecommendations, setShowAllRecommendations] = k.useState(false);
    const [quizValidationWarning, setQuizValidationWarning] = k.useState("");

    // Roadmap State
    const [assessmentRoleId, setAssessmentRoleId] = k.useState("");
    const [ratings, setRatings] = k.useState({});
    const [roadmapStages, setRoadmapStages] = k.useState([]);
    const [roadmapSaved, setRoadmapSaved] = k.useState(false);
    const [savingRoadmap, setSavingRoadmap] = k.useState(false);

    // Load initial data
    k.useEffect(() => {
      // Load Roles
      fetch("/api/career/roles")
        .then(r => r.json())
        .then(data => {
          if (data.code === 200 && data.data) {
            setRoles(data.data);
            if (data.data.length > 0) setAssessmentRoleId(data.data[0].id);
          }
        })
        .catch(e => console.error("Error loading career roles:", e))
        .finally(() => setLoading(false));

      // Load Quiz Config
      fetch("/api/career/quiz/config")
        .then(r => r.json())
        .then(data => {
          if (data.code === 200 && data.data) {
            setQuizConfig(data.data);
          }
        })
        .catch(e => console.error("Error loading quiz config:", e));

      // Load Latest Quiz Result
      fetch("/api/career/quiz/latest")
        .then(r => r.json())
        .then(data => {
          if (data.code === 200 && data.data) {
            setQuizResult(data.data);
          }
        })
        .catch(e => console.error("Error loading latest quiz:", e));

      // Restore Draft Answers from localStorage if available
      try {
        const draft = localStorage.getItem("uet_career_quiz_draft");
        if (draft) {
          const parsed = JSON.parse(draft);
          if (parsed && typeof parsed === "object") {
            setQuizAnswers(parsed);
          }
        }
      } catch (e) {}
    }, []);

    // Filtered Roles
    const filteredRoles = roles.filter(r => {
      const matchesCat = selectedCategory === "all" || r.category === selectedCategory;
      const matchesQuery = !searchQuery || (r.title + " " + r.description).toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });

    const categories = ["all", ...new Set(roles.map(r => r.category))];

    // Handle Quiz Answer Change
    const handleQuizAnswer = (questionId, value) => {
      const updated = { ...quizAnswers, [questionId]: Number(value) };
      setQuizAnswers(updated);
      setQuizValidationWarning("");
      try {
        localStorage.setItem("uet_career_quiz_draft", JSON.stringify(updated));
      } catch (e) {}
    };

    // Submit Quiz
    const handleSubmitQuiz = () => {
      const questions = quizConfig ? quizConfig.questions : [];
      const totalQ = questions.length || 20;
      const answeredKeys = Object.keys(quizAnswers).filter(k => quizAnswers[k] >= 1 && quizAnswers[k] <= 10);

      if (answeredKeys.length < totalQ) {
        const missing = questions.filter(q => !quizAnswers[q.id]);
        setQuizValidationWarning(`⚠️ Bạn còn ${missing.length} câu chưa hoàn thành (${missing.map(m => m.order).join(", ")}). Vui lòng trả lời đầy đủ để nhận được kết quả tư vấn chính xác nhất.`);
        return;
      }

      setSubmittingQuiz(true);
      fetch("/api/career/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: quizAnswers })
      })
        .then(r => r.json())
        .then(res => {
          if (res.code === 200 && res.data) {
            setQuizResult(res.data);
            setActiveTab("result");
            try {
              localStorage.removeItem("uet_career_quiz_draft");
            } catch (e) {}
          } else {
            alert("Lỗi khi nộp bài: " + (res.message || "Không xác định"));
          }
        })
        .catch(err => alert("Lỗi kết nối máy chủ: " + err.message))
        .finally(() => setSubmittingQuiz(false));
    };

    // Retake Quiz
    const handleRetakeQuiz = () => {
      if (confirm("Bạn có chắc chắn muốn làm lại bài đánh giá? Các câu trả lời trước đó sẽ được làm mới.")) {
        setQuizAnswers({});
        setCurrentQuizGroup(0);
        setQuizValidationWarning("");
        try {
          localStorage.removeItem("uet_career_quiz_draft");
        } catch (e) {}
        setActiveTab("quiz");
      }
    };

    // Open CTĐT Program Route
    const handleOpenProgram = (route) => {
      const targetUrl = route || "/information/program";
      try {
        window.history.pushState({}, "", targetUrl);
        window.dispatchEvent(new PopStateEvent("popstate"));
      } catch (e) {
        window.location.href = targetUrl;
      }
    };

    // Gap Analysis & Roadmap helper
    const currentAssessmentRole = roles.find(r => r.id === assessmentRoleId);
    const generateGapAnalysis = () => {
      if (!currentAssessmentRole) return {};
      const gaps = {};
      currentAssessmentRole.requiredSkills.forEach(s => {
        const current = ratings[s.name] || 1;
        const target = s.level === "Nâng cao" ? 4 : 3;
        gaps[s.name] = { current, target, gap: Math.max(0, target - current) };
      });
      return gaps;
    };

    const generateRoadmap = () => {
      if (!currentAssessmentRole) return;
      const gaps = generateGapAnalysis();
      const stages = [
        {
          stage: 1,
          title: "Giai đoạn 1: Nền tảng Học thuật & Tư duy Cốt lõi",
          duration: "Học kỳ 1 - 3 (Năm 1 & đầu Năm 2)",
          description: "Trang bị toán học, cấu trúc dữ liệu và giải thuật, tư duy lập trình căn bản theo chuẩn đào tạo UET.",
          courses: currentAssessmentRole.courseMappings.filter(c => c.relevance === "Cốt lõi").slice(0, 2),
          skills: currentAssessmentRole.requiredSkills.slice(0, 2).map(s => s.name),
          status: "IN_PROGRESS"
        },
        {
          stage: 2,
          title: "Giai đoạn 2: Phát triển Kỹ năng Chuyên ngành",
          duration: "Học kỳ 4 - 5 (Năm 2 & Năm 3)",
          description: "Chinh phục các môn chuyên ngành bắt buộc, làm bài tập lớn thực tế và rèn luyện kỹ năng làm việc nhóm.",
          courses: currentAssessmentRole.courseMappings.slice(2, 4),
          skills: currentAssessmentRole.requiredSkills.slice(2, 4).map(s => s.name),
          status: "PLANNED"
        },
        {
          stage: 3,
          title: "Giai đoạn 3: Bù đắp Lỗ hổng Kỹ năng (Skill Gaps) & Thực chiến",
          duration: "Học kỳ 6 - 7 (Năm 3 & Năm 4)",
          description: "Tập trung nâng cao các kỹ năng còn thiếu hụt dựa trên kết quả tự đánh giá; tham gia Lab nghiên cứu hoặc dự án Open-Source.",
          courses: currentAssessmentRole.courseMappings.filter(c => c.relevance === "Bổ trợ"),
          skills: Object.entries(gaps).filter(([_, v]) => v.gap > 0).map(([k]) => k),
          status: "PLANNED"
        },
        {
          stage: 4,
          title: "Giai đoạn 4: Thực tập Doanh nghiệp & Đồ án Tốt nghiệp",
          duration: "Học kỳ 8 (Năm 4)",
          description: "Thực tập toàn thời gian tại doanh nghiệp đối tác, hoàn thiện đồ án tốt nghiệp và chuẩn bị hồ sơ ứng tuyển chính thức.",
          courses: [{ courseCode: "INT4000", courseName: "Khóa luận tốt nghiệp / Đồ án CNTT", relevance: "Cốt lõi", reason: "Minh chứng năng lực tốt nghiệp kỹ sư/cử nhân." }],
          skills: ["Phỏng vấn kỹ thuật", "CV chuyên nghiệp", "Thuyết trình đồ án"],
          status: "UPCOMING"
        }
      ];
      setRoadmapStages(stages);
      setActiveTab("roadmap");
    };

    const saveRoadmap = () => {
      setSavingRoadmap(true);
      fetch("/api/career/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleId: currentAssessmentRole?.id || "se-fullstack",
          roleTitle: currentAssessmentRole?.title || "Kỹ sư Phần mềm",
          stages: roadmapStages,
          notes: "Lộ trình học tập cá nhân hóa tạo từ StudentHub UET"
        })
      })
        .then(r => r.json())
        .then(res => {
          if (res.code === 200) {
            setRoadmapSaved(true);
            alert("🎉 Đã lưu lộ trình học tập vào cơ sở dữ liệu!");
          }
        })
        .catch(e => alert("Lỗi khi lưu lộ trình: " + e.message))
        .finally(() => setSavingRoadmap(false));
    };

    // Active questions for current quiz group
    const groups = quizConfig ? quizConfig.groups : [];
    const questions = quizConfig ? quizConfig.questions : [];
    const currentGroupObj = groups[currentQuizGroup] || groups[0];
    const currentGroupQuestions = currentGroupObj ? questions.filter(q => q.groupId === currentGroupObj.id) : [];

    const totalAnswered = Object.keys(quizAnswers).filter(k => quizAnswers[k] >= 1 && quizAnswers[k] <= 10).length;
    const progressPercent = Math.min(100, Math.round((totalAnswered / (questions.length || 20)) * 100));

    // Radar Chart SVG points calculation for 5 groups
    const renderRadarChart = (scores) => {
      const gOrder = ["group1", "group2", "group3", "group4", "group5"];
      const gLabels = ["Sở thích", "Năng lực", "Kinh nghiệm", "Mục tiêu", "Sẵn sàng"];
      const cx = 130;
      const cy = 130;
      const r = 90;

      const getCoord = (angleDeg, value) => {
        const rad = (angleDeg - 90) * (Math.PI / 180);
        const dist = (value / 10) * r;
        return [cx + dist * Math.cos(rad), cy + dist * Math.sin(rad)];
      };

      const axes = gOrder.map((gid, i) => {
        const angle = i * 72;
        const [x, y] = getCoord(angle, 10);
        const [lx, ly] = getCoord(angle, 11.5);
        return { gid, label: gLabels[i], angle, x, y, lx, ly };
      });

      const polyPoints = gOrder.map((gid, i) => {
        const score = scores[gid] || 5;
        const [px, py] = getCoord(i * 72, score);
        return `${px},${py}`;
      }).join(" ");

      return d.jsxs("svg", {
        className: "w-full max-w-[280px] h-auto mx-auto drop-shadow-sm",
        viewBox: "0 0 260 260",
        children: [
          // Background concentric circles
          [2, 4, 6, 8, 10].map(level => {
            const rad = (level / 10) * r;
            return d.jsx("circle", {
              key: level,
              cx: cx,
              cy: cy,
              r: rad,
              fill: "none",
              stroke: "#e2e8f0",
              strokeDasharray: level === 10 ? "none" : "2,2",
              strokeWidth: "1"
            });
          }),
          // Axes
          axes.map((ax, idx) => d.jsxs(d.Fragment, {
            key: idx,
            children: [
              d.jsx("line", {
                x1: cx,
                y1: cy,
                x2: ax.x,
                y2: ax.y,
                stroke: "#cbd5e1",
                strokeWidth: "1"
              }),
              d.jsx("text", {
                x: ax.lx,
                y: ax.ly,
                textAnchor: "middle",
                dominantBaseline: "central",
                className: "text-[10px] font-bold fill-slate-700",
                children: ax.label
              })
            ]
          })),
          // Filled polygon
          d.jsx("polygon", {
            points: polyPoints,
            fill: "rgba(59, 130, 246, 0.28)",
            stroke: "#2563eb",
            strokeWidth: "2.5"
          }),
          // Vertex dots
          gOrder.map((gid, i) => {
            const score = scores[gid] || 5;
            const [px, py] = getCoord(i * 72, score);
            return d.jsx("circle", {
              key: gid,
              cx: px,
              cy: py,
              r: "4",
              fill: "#1d4ed8",
              stroke: "#ffffff",
              strokeWidth: "1.5"
            });
          })
        ]
      });
    };

    return d.jsxs(Ss, {
      children: [
        d.jsx(Ji, { pageName: "Hướng nghiệp" }),
        d.jsxs("div", {
          className: "space-y-6",
          children: [
            // Sub-Navigation Tabs matching prompt screenshot
            d.jsxs("div", {
              className: "flex border-b border-stroke bg-white px-3 sm:px-6 rounded-2xl shadow-sm gap-1 sm:gap-2 overflow-x-auto",
              children: [
                { id: "overview", label: "Tổng quan", icon: "🏠" },
                { id: "explore", label: "Khám phá nghề", icon: "🧭" },
                { id: "quiz", label: "Bài đánh giá", icon: "📝" },
                { id: "result", label: "Kết quả", icon: "📊" },
                { id: "roadmap", label: "Lộ trình & Cơ hội", icon: "🗺️" }
              ].map(tab => d.jsxs("button", {
                key: tab.id,
                onClick: () => setActiveTab(tab.id),
                className: `flex items-center gap-2 py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-800"}`,
                children: [
                  d.jsx("span", { children: tab.icon }),
                  d.jsx("span", { children: tab.label }),
                  tab.id === "quiz" && totalAnswered > 0 && d.jsx("span", { className: "rounded-full bg-blue-100 text-primary text-[10px] px-1.5 py-0.2 font-bold", children: `${totalAnswered}/20` }),
                  tab.id === "result" && quizResult && d.jsx("span", { className: "rounded-full bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 font-bold", children: "Có kết quả" })
                ]
              }))
            }),

            // -------------------------------------------------------------
            // TAB 1: OVERVIEW (Tổng quan - Exactly matching user image)
            // -------------------------------------------------------------
            activeTab === "overview" && d.jsxs("div", {
              className: "space-y-6",
              children: [
                // Banner matching reference image
                d.jsxs("div", {
                  className: "relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-900 p-8 text-white shadow-xl min-h-[220px] flex flex-col justify-between",
                  children: [
                    d.jsxs("div", {
                      className: "relative z-10 max-w-xl space-y-3",
                      children: [
                        d.jsx("span", {
                          className: "inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-100 backdrop-blur-md",
                          children: "CÙNG UET ĐỊNH HƯỚNG TƯƠNG LAI"
                        }),
                        d.jsx("h2", {
                          className: "text-3xl sm:text-4xl font-extrabold tracking-tight text-white",
                          children: "Hướng nghiệp"
                        }),
                        d.jsxs("div", {
                          className: "text-sm sm:text-base text-blue-100 font-medium leading-relaxed",
                          children: [
                            d.jsx("div", { children: "Khám phá tiềm năng của bạn. StudentHUB" }),
                            d.jsx("div", { className: "text-blue-200 text-xs sm:text-sm mt-0.5", children: "Tìm hướng đi phù hợp với sở thích, năng lực và mục tiêu." })
                          ]
                        }),
                        d.jsx("div", {
                          className: "pt-2",
                          children: d.jsxs("button", {
                            onClick: () => setActiveTab("quiz"),
                            className: "inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-blue-900 shadow-lg hover:bg-blue-50 hover:shadow-xl transition duration-200",
                            children: [
                              d.jsx("span", { children: "Khám phá bản thân" }),
                              d.jsx("span", { children: "→" })
                            ]
                          })
                        })
                      ]
                    }),

                    // Right Graphic Accent
                    d.jsxs("div", {
                      className: "absolute right-0 top-0 bottom-0 w-1/2 hidden md:flex items-center justify-end pr-8 pointer-events-none opacity-90",
                      children: [
                        d.jsxs("div", {
                          className: "grid grid-cols-2 gap-3 transform rotate-3 scale-95",
                          children: [
                            d.jsxs("div", {
                              className: "space-y-3",
                              children: [
                                d.jsxs("div", {
                                  className: "rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/20 shadow-lg text-center",
                                  children: [
                                    d.jsx("div", { className: "text-2xl", children: "🔬" }),
                                    d.jsx("div", { className: "text-xs font-bold mt-1 text-white", children: "Nghiên cứu Lab" }),
                                    d.jsx("div", { className: "text-[10px] text-blue-200", children: "10 PTN Trọng điểm" })
                                  ]
                                }),
                                d.jsxs("div", {
                                  className: "rounded-2xl bg-white/15 backdrop-blur-md p-4 border border-white/20 shadow-lg text-center",
                                  children: [
                                    d.jsx("div", { className: "text-2xl", children: "💼" }),
                                    d.jsx("div", { className: "text-xs font-bold mt-1 text-white", children: "Job Fair 2025" }),
                                    d.jsx("div", { className: "text-[10px] text-blue-200", children: "Doanh nghiệp CNTT" })
                                  ]
                                })
                              ]
                            }),
                            d.jsxs("div", {
                              className: "space-y-3 pt-6",
                              children: [
                                d.jsxs("div", {
                                  className: "rounded-2xl bg-white/15 backdrop-blur-md p-4 border border-white/20 shadow-lg text-center",
                                  children: [
                                    d.jsx("div", { className: "text-2xl", children: "🧠" }),
                                    d.jsx("div", { className: "text-xs font-bold mt-1 text-white", children: "AI & Full-stack" }),
                                    d.jsx("div", { className: "text-[10px] text-blue-200", children: "Chuẩn đầu ra UET" })
                                  ]
                                }),
                                d.jsxs("div", {
                                  className: "rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/20 shadow-lg text-center",
                                  children: [
                                    d.jsx("div", { className: "text-2xl", children: "🎓" }),
                                    d.jsx("div", { className: "text-xs font-bold mt-1 text-white", children: "Khung CTĐT" }),
                                    d.jsx("div", { className: "text-[10px] text-blue-200", children: "Khoa CNTT - UET" })
                                  ]
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }),

                // 4 Action Cards matching reference image
                d.jsxs("div", {
                  className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                  children: [
                    // Card 1
                    d.jsxs("div", {
                      className: "flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-stroke hover:shadow-md hover:border-primary/40 transition duration-200",
                      children: [
                        d.jsxs("div", {
                          className: "space-y-3",
                          children: [
                            d.jsx("div", {
                              className: "flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-primary",
                              children: "📋"
                            }),
                            d.jsx("h3", { className: "text-base font-bold text-gray-900", children: "Làm bài đánh giá" }),
                            d.jsx("p", { className: "text-xs text-gray-600 leading-relaxed", children: "Tìm hiểu sở thích, kỹ năng và mục tiêu của bạn qua 20 tiêu chí chuẩn hóa." })
                          ]
                        }),
                        d.jsx("div", {
                          className: "mt-6 pt-4 border-t border-gray-100",
                          children: d.jsxs("button", {
                            onClick: () => setActiveTab("quiz"),
                            className: "w-full rounded-xl bg-primary py-2.5 text-center text-xs font-bold text-white shadow hover:bg-opacity-90 transition",
                            children: [
                              d.jsx("span", { children: "Bắt đầu" }),
                              d.jsx("span", { className: "ml-1.5", children: "→" })
                            ]
                          })
                        })
                      ]
                    }),

                    // Card 2
                    d.jsxs("div", {
                      className: "flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-stroke hover:shadow-md hover:border-primary/40 transition duration-200",
                      children: [
                        d.jsxs("div", {
                          className: "space-y-3",
                          children: [
                            d.jsx("div", {
                              className: "flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl text-emerald-600",
                              children: "📊"
                            }),
                            d.jsx("h3", { className: "text-base font-bold text-gray-900", children: "Xem kết quả gợi ý" }),
                            d.jsx("p", { className: "text-xs text-gray-600 leading-relaxed", children: "Khám phá các nghề nghiệp phù hợp, phân tích thế mạnh và lý do gợi ý." })
                          ]
                        }),
                        d.jsx("div", {
                          className: "mt-6 pt-4 border-t border-gray-100",
                          children: d.jsxs("button", {
                            onClick: () => {
                              if (quizResult) setActiveTab("result");
                              else setActiveTab("quiz");
                            },
                            className: "w-full rounded-xl bg-emerald-50 border border-emerald-200 py-2.5 text-center text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition",
                            children: [
                              d.jsx("span", { children: quizResult ? "Xem kết quả" : "Làm bài trước" }),
                              d.jsx("span", { className: "ml-1.5", children: "→" })
                            ]
                          })
                        })
                      ]
                    }),

                    // Card 3
                    d.jsxs("div", {
                      className: "flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-stroke hover:shadow-md hover:border-primary/40 transition duration-200",
                      children: [
                        d.jsxs("div", {
                          className: "space-y-3",
                          children: [
                            d.jsx("div", {
                              className: "flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl text-indigo-600",
                              children: "🗺️"
                            }),
                            d.jsx("h3", { className: "text-base font-bold text-gray-900", children: "Lộ trình phát triển" }),
                            d.jsx("p", { className: "text-xs text-gray-600 leading-relaxed", children: "Kết nối kỹ năng với học phần UET và theo dõi tiến độ từng học kỳ." })
                          ]
                        }),
                        d.jsx("div", {
                          className: "mt-6 pt-4 border-t border-gray-100",
                          children: d.jsxs("button", {
                            onClick: () => {
                              if (roadmapStages.length === 0) generateRoadmap();
                              setActiveTab("roadmap");
                            },
                            className: "w-full rounded-xl bg-indigo-50 border border-indigo-200 py-2.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition",
                            children: [
                              d.jsx("span", { children: "Khám phá" }),
                              d.jsx("span", { className: "ml-1.5", children: "→" })
                            ]
                          })
                        })
                      ]
                    }),

                    // Card 4
                    d.jsxs("div", {
                      className: "flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-stroke hover:shadow-md hover:border-primary/40 transition duration-200",
                      children: [
                        d.jsxs("div", {
                          className: "space-y-3",
                          children: [
                            d.jsx("div", {
                              className: "flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl text-amber-600",
                              children: "💼"
                            }),
                            d.jsx("h3", { className: "text-base font-bold text-gray-900", children: "Cơ hội việc làm" }),
                            d.jsx("p", { className: "text-xs text-gray-600 leading-relaxed", children: "Tìm hiểu vị trí việc làm và thực tập tại các đối tác công nghệ lớn." })
                          ]
                        }),
                        d.jsx("div", {
                          className: "mt-6 pt-4 border-t border-gray-100",
                          children: d.jsxs("button", {
                            onClick: () => setActiveTab("explore"),
                            className: "w-full rounded-xl bg-amber-50 border border-amber-200 py-2.5 text-center text-xs font-bold text-amber-800 hover:bg-amber-100 transition",
                            children: [
                              d.jsx("span", { children: "Tìm hiểu cơ hội" }),
                              d.jsx("span", { className: "ml-1.5", children: "→" })
                            ]
                          })
                        })
                      ]
                    })
                  ]
                })
              ]
            }),

            // -------------------------------------------------------------
            // TAB 2: CAREER QUIZ (20 câu hỏi - 5 nhóm tiêu chí)
            // -------------------------------------------------------------
            activeTab === "quiz" && d.jsxs("div", {
              className: "space-y-6",
              children: [
                // Quiz Header Card
                d.jsxs("div", {
                  className: "rounded-2xl bg-white p-6 shadow-sm border border-stroke space-y-4",
                  children: [
                    d.jsxs("div", {
                      className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4",
                      children: [
                        d.jsxs("div", {
                          className: "space-y-1",
                          children: [
                            d.jsx("span", { className: "rounded-full bg-blue-100 text-primary text-xs font-bold px-3 py-0.5", children: "Bài đánh giá định hướng nghề nghiệp" }),
                            d.jsx("h3", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: "Khám phá định hướng nghề nghiệp" }),
                            d.jsx("p", { className: "text-xs text-gray-500 max-w-2xl", children: "Khảo sát gồm 20 câu hỏi đánh giá theo đúng 5 nhóm tiêu chí: Sở thích, Năng lực, Kinh nghiệm, Mục tiêu cá nhân và Yêu cầu công việc." })
                          ]
                        }),
                        d.jsxs("div", {
                          className: "flex flex-wrap items-center gap-2",
                          children: [
                            d.jsx("span", { className: "rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700", children: "⏱️ Thời lượng: ~10 - 15 phút" }),
                            d.jsxs("span", { className: "rounded-lg bg-emerald-50 text-emerald-800 px-3 py-1.5 text-xs font-bold border border-emerald-200", children: ["Đã làm: ", totalAnswered, " / 20 câu"] })
                          ]
                        })
                      ]
                    }),

                    // Stepper for 5 Groups
                    d.jsx("div", {
                      className: "grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1",
                      children: groups.map((g, idx) => {
                        const gQuestions = questions.filter(q => q.groupId === g.id);
                        const gAnswered = gQuestions.filter(q => quizAnswers[q.id]).length;
                        const isCurrent = currentQuizGroup === idx;
                        const isComplete = gAnswered === gQuestions.length && gQuestions.length > 0;
                        return d.jsxs("button", {
                          key: g.id,
                          onClick: () => setCurrentQuizGroup(idx),
                          className: `p-3 rounded-xl border text-left transition duration-150 ${isCurrent ? "border-primary bg-blue-50/60 shadow-sm" : isComplete ? "border-emerald-200 bg-emerald-50/40" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`,
                          children: [
                            d.jsxs("div", {
                              className: "flex items-center justify-between text-xs",
                              children: [
                                d.jsxs("span", { className: "font-bold text-gray-700", children: [g.icon, " ", g.shortName] }),
                                d.jsx("span", { className: `text-[11px] font-bold ${isComplete ? "text-emerald-700" : "text-gray-400"}`, children: isComplete ? "✓" : `${gAnswered}/4` })
                              ]
                            }),
                            d.jsx("div", { className: "mt-1.5 text-[10px] text-gray-500 truncate", children: g.name })
                          ]
                        });
                      })
                    }),

                    // Progress Bar
                    d.jsxs("div", {
                      className: "space-y-1.5 pt-2",
                      children: [
                        d.jsxs("div", {
                          className: "flex justify-between text-xs text-gray-600 font-semibold",
                          children: [
                            d.jsxs("span", { children: ["Tiến độ hoàn thành: ", progressPercent, "%"] }),
                            d.jsxs("span", { children: [totalAnswered, " / 20 câu đã trả lời"] })
                          ]
                        }),
                        d.jsx("div", {
                          className: "h-2.5 w-full rounded-full bg-gray-100 overflow-hidden",
                          children: d.jsx("div", {
                            className: "h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300",
                            style: { width: `${progressPercent}%` }
                          })
                        })
                      ]
                    })
                  ]
                }),

                // Validation Warning if missing
                quizValidationWarning && d.jsxs("div", {
                  className: "rounded-xl bg-amber-50 border border-amber-300 p-4 text-xs text-amber-900 font-medium flex items-center justify-between gap-3 shadow-sm",
                  children: [
                    d.jsx("span", { children: quizValidationWarning }),
                    d.jsx("button", {
                      onClick: () => setQuizValidationWarning(""),
                      className: "text-amber-700 font-bold hover:text-amber-900",
                      children: "✕"
                    })
                  ]
                }),

                // Current Group Header
                currentGroupObj && d.jsxs("div", {
                  className: "rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-1.5",
                  children: [
                    d.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        d.jsx("span", { className: "text-xl", children: currentGroupObj.icon }),
                        d.jsxs("h4", { className: "text-base font-bold text-gray-900", children: [`Nhóm ${currentQuizGroup + 1}: `, currentGroupObj.name] })
                      ]
                    }),
                    d.jsx("p", { className: "text-xs text-gray-600", children: currentGroupObj.description }),
                    d.jsxs("div", { className: "mt-1 text-[11px] font-semibold text-primary", children: ["📌 Hướng dẫn chấm điểm: ", currentGroupObj.scaleLabel] })
                  ]
                }),

                // Questions List for this Group
                d.jsx("div", {
                  className: "space-y-4",
                  children: currentGroupQuestions.map((q) => {
                    const currentVal = quizAnswers[q.id];
                    return d.jsxs("div", {
                      key: q.id,
                      className: `rounded-2xl bg-white p-6 shadow-sm border transition duration-200 space-y-4 ${currentVal ? "border-primary/40 bg-blue-50/10" : "border-stroke"}`,
                      children: [
                        // Question Header
                        d.jsxs("div", {
                          className: "flex items-start justify-between gap-3",
                          children: [
                            d.jsxs("div", {
                              className: "space-y-1",
                              children: [
                                d.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    d.jsx("span", { className: "rounded-md bg-blue-100 text-primary text-xs font-bold px-2 py-0.5", children: `Câu ${q.order}/20` }),
                                    d.jsx("h5", { className: "text-sm font-bold text-gray-900", children: q.title })
                                  ]
                                }),
                                d.jsx("p", { className: "text-sm text-gray-800 font-medium leading-relaxed", children: q.prompt }),
                                q.hint && d.jsxs("p", { className: "text-xs text-gray-500 italic", children: ["💡 ", q.hint] })
                              ]
                            }),
                            currentVal && d.jsxs("span", {
                              className: "shrink-0 rounded-full bg-blue-600 text-white text-xs font-bold px-3 py-1 shadow-sm",
                              children: [`${currentVal}`, "/10"]
                            })
                          ]
                        }),

                        // 1 - 10 Likert Buttons
                        d.jsxs("div", {
                          className: "space-y-2 pt-2",
                          children: [
                            d.jsx("div", {
                              className: "grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2",
                              children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => d.jsx("button", {
                                key: val,
                                type: "button",
                                onClick: () => handleQuizAnswer(q.id, val),
                                className: `py-2.5 sm:py-3 rounded-xl text-xs font-bold transition duration-150 border flex flex-col items-center justify-center ${
                                  currentVal === val
                                    ? "bg-primary text-white border-primary shadow-md scale-105"
                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                                }`,
                                children: val
                              }))
                            }),
                            // Likert Scale Labels
                            d.jsxs("div", {
                              className: "flex justify-between text-[11px] text-gray-500 px-1 pt-1 font-medium",
                              children: [
                                d.jsx("span", { children: "1: Hoàn toàn không phù hợp / Chưa biết" }),
                                d.jsx("span", { className: "hidden sm:inline", children: "5: Mức độ cơ bản" }),
                                d.jsx("span", { children: "10: Rất cao / Rất phù hợp" })
                              ]
                            })
                          ]
                        })
                      ]
                    });
                  })
                }),

                // Stepper Footer Navigation
                d.jsxs("div", {
                  className: "flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm border border-stroke",
                  children: [
                    d.jsx("div", {
                      className: "text-xs text-gray-500",
                      children: totalAnswered === 20 ? "🎉 Bạn đã trả lời đủ 20 câu hỏi! Hãy nhấn 'Hoàn thành đánh giá' bên dưới." : `Đã hoàn thành ${totalAnswered}/20 câu.`
                    }),
                    d.jsxs("div", {
                      className: "flex items-center gap-2 w-full sm:w-auto",
                      children: [
                        currentQuizGroup > 0 && d.jsx("button", {
                          onClick: () => setCurrentQuizGroup(prev => Math.max(0, prev - 1)),
                          className: "flex-1 sm:flex-initial rounded-xl border border-stroke bg-white px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition",
                          children: "← Nhóm trước"
                        }),
                        currentQuizGroup < groups.length - 1 && d.jsx("button", {
                          onClick: () => setCurrentQuizGroup(prev => Math.min(groups.length - 1, prev + 1)),
                          className: "flex-1 sm:flex-initial rounded-xl bg-gray-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-black transition",
                          children: "Nhóm tiếp theo →"
                        }),
                        d.jsx("button", {
                          onClick: handleSubmitQuiz,
                          disabled: submittingQuiz,
                          className: "flex-1 sm:flex-initial rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-2.5 text-xs font-bold text-white shadow hover:opacity-90 transition disabled:opacity-50",
                          children: submittingQuiz ? "Đang chấm điểm..." : "🎯 Hoàn thành đánh giá & Xem kết quả"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),

            // -------------------------------------------------------------
            // TAB 3: QUIZ RESULTS DASHBOARD (KẾT QUẢ ĐÁNH GIÁ)
            // -------------------------------------------------------------
            activeTab === "result" && d.jsxs("div", {
              className: "space-y-6",
              children: [
                !quizResult ? d.jsxs("div", {
                  className: "rounded-2xl bg-white p-12 text-center text-gray-500 border border-stroke space-y-4",
                  children: [
                    d.jsx("div", { className: "text-5xl", children: "📝" }),
                    d.jsx("h3", { className: "text-lg font-bold text-gray-800", children: "Bạn chưa hoàn thành bài đánh giá nào" }),
                    d.jsx("p", { className: "text-xs text-gray-500 max-w-md mx-auto", children: "Hãy dành khoảng 10-15 phút làm bài trắc nghiệm 20 câu để nhận được biểu đồ điểm 5 nhóm tiêu chí và các gợi ý nghề nghiệp CNTT phù hợp." }),
                    d.jsx("button", {
                      onClick: () => setActiveTab("quiz"),
                      className: "rounded-xl bg-primary px-6 py-3 text-xs font-bold text-white shadow hover:bg-opacity-90 transition",
                      children: "Bắt đầu làm bài đánh giá ngay →"
                    })
                  ]
                }) :
                d.jsxs(d.Fragment, {
                  children: [
                    // Result Overview Header
                    d.jsxs("div", {
                      className: "rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 p-6 text-white shadow-lg space-y-3",
                      children: [
                        d.jsxs("div", {
                          className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/20 pb-3",
                          children: [
                            d.jsxs("div", {
                              children: [
                                d.jsx("span", { className: "rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm", children: "Báo cáo tư vấn hướng nghiệp UET" }),
                                d.jsx("h2", { className: "mt-1.5 text-2xl font-extrabold text-white sm:text-3xl", children: "Kết quả định hướng nghề nghiệp" })
                              ]
                            }),
                            d.jsxs("div", {
                              className: "flex items-center gap-2",
                              children: [
                                d.jsxs("span", { className: "rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100", children: ["📅 Ngày thực hiện: ", quizResult.createdAt || "Hôm nay"] }),
                                d.jsx("button", {
                                  onClick: handleRetakeQuiz,
                                  className: "rounded-lg bg-white/20 hover:bg-white/30 px-3 py-1.5 text-xs font-bold text-white transition",
                                  children: "🔄 Làm lại bài"
                                })
                              ]
                            })
                          ]
                        }),
                        d.jsx("p", { className: "text-sm text-blue-100 leading-relaxed max-w-3xl", children: quizResult.summary }),
                        d.jsxs("div", {
                          className: "rounded-xl bg-white/10 p-3 text-xs text-blue-200 flex items-start gap-2",
                          children: [
                            d.jsx("span", { children: "ℹ️" }),
                            d.jsx("span", { children: "Lưu ý quan trọng: Kết quả trên là công cụ tư vấn định hướng tham khảo dựa trên dữ liệu tự đánh giá của sinh viên, không phải là bài kiểm tra năng lực chuyên môn chính thức hay kết luận tuyệt đối về nghề nghiệp tương lai." })
                          ]
                        })
                      ]
                    }),

                    // 5 Groups Score Breakdown (Radar Chart + Progress Bars)
                    d.jsxs("div", {
                      className: "grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl bg-white p-6 shadow-sm border border-stroke",
                      children: [
                        // Left: Radar Chart (5 cols)
                        d.jsxs("div", {
                          className: "lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-6",
                          children: [
                            d.jsxs("div", {
                              children: [
                                d.jsx("h4", { className: "text-base font-bold text-gray-900", children: "Biểu đồ Phân tích 5 Nhóm Tiêu chí" }),
                                d.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Đánh giá mức độ hài hòa giữa sở thích, năng lực và khả năng thích ứng." })
                              ]
                            }),
                            d.jsx("div", {
                              className: "py-4",
                              children: renderRadarChart(quizResult.groupScores || {})
                            }),
                            d.jsxs("div", {
                              className: "text-center text-xs text-gray-500",
                              children: ["Thang điểm chuẩn hóa 1.0 - 10.0 cho từng nhóm tiêu chí."]
                            })
                          ]
                        }),

                        // Right: Group Detail Bars (7 cols)
                        d.jsxs("div", {
                          className: "lg:col-span-7 space-y-4",
                          children: [
                            d.jsx("h4", { className: "text-base font-bold text-gray-900", children: "Chi tiết Điểm theo từng Nhóm" }),
                            [
                              { id: "group1", name: "1. Sở thích và lĩnh vực quan tâm", desc: "Mức độ say mê và hứng thú với các lĩnh vực CNTT." },
                              { id: "group2", name: "2. Năng lực và kiến thức chuyên môn", desc: "Nền tảng thuật toán, toán học, cơ sở dữ liệu và hệ điều hành." },
                              { id: "group3", name: "3. Kỹ năng và kinh nghiệm thực tế", desc: "Thành thạo công cụ, làm đồ án/dự án và khả năng debug." },
                              { id: "group4", name: "4. Mục tiêu và định hướng cá nhân", desc: "Mong muốn gắn bó lâu dài và phát triển sự nghiệp chuyên sâu." },
                              { id: "group5", name: "5. Xu hướng nghề nghiệp & Yêu cầu công việc", desc: "Khả năng tự học, đáp ứng quy trình dự án và áp lực công việc." }
                            ].map(g => {
                              const score = (quizResult.groupScores && quizResult.groupScores[g.id]) || 5.0;
                              const percent = Math.min(100, Math.round((score / 10) * 100));
                              const ratingBadge = score >= 8.0 ? { label: "Rất cao", color: "bg-emerald-50 text-emerald-700 border-emerald-200" } :
                                score >= 6.5 ? { label: "Khá", color: "bg-blue-50 text-blue-700 border-blue-200" } :
                                score >= 5.0 ? { label: "Trung bình", color: "bg-amber-50 text-amber-700 border-amber-200" } :
                                { label: "Cần cải thiện", color: "bg-red-50 text-red-700 border-red-200" };
                              return d.jsxs("div", {
                                key: g.id,
                                className: "space-y-1.5 p-3 rounded-xl bg-gray-50 border border-gray-100",
                                children: [
                                  d.jsxs("div", {
                                    className: "flex justify-between items-center text-xs",
                                    children: [
                                      d.jsx("span", { className: "font-bold text-gray-800", children: g.name }),
                                      d.jsxs("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          d.jsx("span", { className: `rounded px-2 py-0.5 text-[10px] font-bold border ${ratingBadge.color}`, children: ratingBadge.label }),
                                          d.jsxs("span", { className: "font-mono font-bold text-primary text-sm", children: [score.toFixed(1), "/10"] })
                                        ]
                                      })
                                    ]
                                  }),
                                  d.jsx("p", { className: "text-[11px] text-gray-500", children: g.desc }),
                                  d.jsx("div", {
                                    className: "h-2 w-full rounded-full bg-gray-200 overflow-hidden",
                                    children: d.jsx("div", {
                                      className: "h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300",
                                      style: { width: `${percent}%` }
                                    })
                                  })
                                ]
                              });
                            })
                          ]
                        })
                      ]
                    }),

                    // Ranked Recommendations
                    d.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        d.jsxs("div", {
                          className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                          children: [
                            d.jsxs("div", {
                              children: [
                                d.jsx("h3", { className: "text-xl font-bold text-gray-900", children: "Top Các Hướng Nghề Nghiệp Gợi Ý Phù Hợp Nhất" }),
                                d.jsx("p", { className: "text-xs text-gray-500", children: "Được xếp hạng giảm dần dựa trên ma trận đối chiếu mức độ quan tâm và năng lực sẵn sàng." })
                              ]
                            }),
                            d.jsx("button", {
                              onClick: () => setShowAllRecommendations(prev => !prev),
                              className: "rounded-xl border border-stroke bg-white px-4 py-2 text-xs font-bold text-primary hover:bg-primary/5 transition",
                              children: showAllRecommendations ? "Thu gọn về Top 3" : "Xem toàn bộ 8 hướng nghề nghiệp"
                            })
                          ]
                        }),

                        // Cards Grid
                        d.jsx("div", {
                          className: "space-y-5",
                          children: (quizResult.recommendations || []).slice(0, showAllRecommendations ? 8 : 3).map((rec) => {
                            const rank = rec.rank || 1;
                            const isTop1 = rank === 1;
                            const isTop2 = rank === 2;
                            const isTop3 = rank === 3;
                            return d.jsxs("div", {
                              key: rec.id,
                              className: `rounded-2xl bg-white p-6 shadow-sm border transition duration-200 space-y-5 ${
                                isTop1 ? "border-amber-300 ring-2 ring-amber-100 shadow-md" :
                                isTop2 ? "border-slate-300 shadow-sm" :
                                isTop3 ? "border-orange-200" : "border-stroke"
                              }`,
                              children: [
                                // Card Top Row
                                d.jsxs("div", {
                                  className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-4",
                                  children: [
                                    d.jsxs("div", {
                                      className: "flex items-start gap-3",
                                      children: [
                                        d.jsx("div", {
                                          className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm shadow ${
                                            isTop1 ? "bg-amber-500 text-white" :
                                            isTop2 ? "bg-slate-400 text-white" :
                                            isTop3 ? "bg-amber-700 text-white" : "bg-gray-100 text-gray-700"
                                          }`,
                                          children: isTop1 ? "🥇 #1" : isTop2 ? "🥈 #2" : isTop3 ? "🥉 #3" : `#${rank}`
                                        }),
                                        d.jsxs("div", {
                                          children: [
                                            d.jsxs("div", {
                                              className: "flex items-center gap-2",
                                              children: [
                                                d.jsx("span", { className: "rounded bg-blue-100 text-primary text-[10px] font-bold px-2 py-0.5", children: rec.category }),
                                                d.jsx("span", { className: "text-xs text-gray-500", children: rec.department })
                                              ]
                                            }),
                                            d.jsx("h4", { className: "mt-1 text-lg font-bold text-gray-900", children: rec.title })
                                          ]
                                        })
                                      ]
                                    }),

                                    // Match Score & MANDATORY CTĐT Button
                                    d.jsxs("div", {
                                      className: "flex flex-wrap items-center gap-3 shrink-0",
                                      children: [
                                        // Score Pill
                                        d.jsxs("div", {
                                          className: "rounded-xl bg-blue-50 border border-blue-200 px-3.5 py-2 text-right",
                                          children: [
                                            d.jsx("div", { className: "text-[10px] text-gray-500 font-semibold uppercase", children: "Điểm phù hợp" }),
                                            d.jsxs("div", { className: "text-lg font-extrabold text-primary font-mono", children: [rec.matchScore ? rec.matchScore.toFixed(1) : "—", "/10"] })
                                          ]
                                        }),

                                        // MANDATORY ACTION BUTTON: Xem chương trình đào tạo
                                        d.jsxs("button", {
                                          onClick: () => handleOpenProgram(rec.programRoute),
                                          className: "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-indigo-800 transition duration-200",
                                          title: "Mở khung chương trình đào tạo và học phần liên quan",
                                          children: [
                                            d.jsx("span", { children: "📖" }),
                                            d.jsx("span", { children: "Xem chương trình đào tạo" }),
                                            d.jsx("span", { children: "→" })
                                          ]
                                        })
                                      ]
                                    })
                                  ]
                                }),

                                // Middle: Description & Breakdown
                                d.jsxs("div", {
                                  className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs",
                                  children: [
                                    d.jsxs("div", {
                                      className: "md:col-span-2 space-y-2",
                                      children: [
                                        d.jsx("p", { className: "text-gray-700 leading-relaxed", children: rec.description }),
                                        rec.whyRecommended && d.jsxs("div", {
                                          className: "rounded-xl bg-slate-50 p-3 border border-slate-200/60 text-slate-700",
                                          children: [
                                            d.jsx("strong", { children: "💡 Yếu tố gợi ý: " }),
                                            rec.whyRecommended
                                          ]
                                        })
                                      ]
                                    }),
                                    d.jsxs("div", {
                                      className: "rounded-xl bg-gray-50 p-4 border border-gray-100 space-y-2",
                                      children: [
                                        d.jsx("span", { className: "text-[11px] font-bold text-gray-600 uppercase tracking-wide block", children: "Đánh giá chi tiết vai trò:" }),
                                        d.jsxs("div", {
                                          className: "flex justify-between py-1 border-b border-gray-200/60",
                                          children: [d.jsx("span", { className: "text-gray-500", children: "Mức độ quan tâm:" }), d.jsxs("span", { className: "font-bold text-primary font-mono", children: [rec.interest ? rec.interest.toFixed(1) : "—", "/10"] })]
                                        }),
                                        d.jsxs("div", {
                                          className: "flex justify-between py-1",
                                          children: [d.jsx("span", { className: "text-gray-500", children: "Mức độ sẵn sàng:" }), d.jsxs("span", { className: "font-bold text-indigo-700 font-mono", children: [rec.readiness ? rec.readiness.toFixed(1) : "—", "/10"] })]
                                        })
                                      ]
                                    })
                                  ]
                                }),

                                // Bottom: Strengths & Improvements & Relevant Courses
                                d.jsxs("div", {
                                  className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-3 border-t border-gray-100",
                                  children: [
                                    // Strengths
                                    d.jsxs("div", {
                                      className: "space-y-1.5",
                                      children: [
                                        d.jsx("h5", { className: "font-bold text-emerald-800 flex items-center gap-1.5", children: [d.jsx("span", { children: "✅" }), "Những điểm mạnh nổi bật:"] }),
                                        d.jsx("ul", {
                                          className: "space-y-1 pl-5 list-disc text-gray-600 text-[11px]",
                                          children: (rec.strengths || []).map((s, sIdx) => d.jsx("li", { key: sIdx, children: s }))
                                        })
                                      ]
                                    }),

                                    // Improvements
                                    d.jsxs("div", {
                                      className: "space-y-1.5",
                                      children: [
                                        d.jsx("h5", { className: "font-bold text-amber-800 flex items-center gap-1.5", children: [d.jsx("span", { children: "📈" }), "Kỹ năng nên phát triển thêm:"] }),
                                        d.jsx("ul", {
                                          className: "space-y-1 pl-5 list-disc text-gray-600 text-[11px]",
                                          children: (rec.improvements || []).map((imp, impIdx) => d.jsx("li", { key: impIdx, children: imp }))
                                        })
                                      ]
                                    })
                                  ]
                                }),

                                // Relevant Courses Tag Bar
                                rec.courses && rec.courses.length > 0 && d.jsxs("div", {
                                  className: "flex flex-wrap items-center gap-2 pt-2 text-xs",
                                  children: [
                                    d.jsx("span", { className: "text-gray-500 font-semibold", children: "Học phần UET cốt lõi:" }),
                                    rec.courses.map((c, cIdx) => d.jsxs("span", {
                                      key: cIdx,
                                      className: "rounded-md bg-blue-50 border border-blue-100 px-2.5 py-1 text-[11px] font-semibold text-primary",
                                      children: [d.jsx("strong", { children: c.code }), ": ", c.name]
                                    }))
                                  ]
                                })
                              ]
                            });
                          })
                        }),

                        // Bottom Actions
                        d.jsxs("div", {
                          className: "flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stroke",
                          children: [
                            d.jsx("button", {
                              onClick: () => setActiveTab("overview"),
                              className: "rounded-xl border border-stroke bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition",
                              children: "← Quay lại trang Hướng nghiệp"
                            }),
                            d.jsxs("div", {
                              className: "flex gap-3",
                              children: [
                                d.jsx("button", {
                                  onClick: handleRetakeQuiz,
                                  className: "rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-100 transition",
                                  children: "🔄 Làm lại bài đánh giá"
                                }),
                                d.jsx("button", {
                                  onClick: () => {
                                    if (roadmapStages.length === 0) generateRoadmap();
                                    setActiveTab("roadmap");
                                  },
                                  className: "rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-opacity-90 transition",
                                  children: "🗺️ Xây dựng lộ trình học tập từ kết quả này →"
                                })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),

            // -------------------------------------------------------------
            // TAB 4: CAREER EXPLORATION CATALOG (Khám phá nghề)
            // -------------------------------------------------------------
            activeTab === "explore" && d.jsxs("div", {
              className: "space-y-6",
              children: [
                // Search & Filter
                d.jsxs("div", {
                  className: "flex flex-col md:flex-row gap-4 items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-stroke",
                  children: [
                    d.jsxs("div", {
                      className: "relative w-full md:w-96",
                      children: [
                        d.jsx("input", {
                          type: "text",
                          value: searchQuery,
                          onChange: e => setSearchQuery(e.target.value),
                          placeholder: "Tìm kiếm vị trí nghề nghiệp, kỹ năng...",
                          className: "w-full rounded-lg border border-stroke bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:bg-white transition"
                        }),
                        d.jsx("span", { className: "absolute left-3 top-3 text-gray-400", children: "🔍" })
                      ]
                    }),
                    d.jsx("div", {
                      className: "flex flex-wrap gap-2 w-full md:w-auto",
                      children: categories.map(cat => d.jsx("button", {
                        key: cat,
                        onClick: () => setSelectedCategory(cat),
                        className: `rounded-lg px-3 py-1.5 text-xs font-semibold transition ${selectedCategory === cat ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
                        children: cat === "all" ? "Tất cả lĩnh vực" : cat
                      }))
                    })
                  ]
                }),

                // Compare Banner if selected
                (compareRoleA || compareRoleB) && d.jsxs("div", {
                  className: "flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-900 shadow-sm",
                  children: [
                    d.jsxs("div", {
                      className: "flex items-center gap-3",
                      children: [
                        d.jsx("span", { className: "text-2xl", children: "⚖️" }),
                        d.jsxs("div", {
                          children: [
                            d.jsx("div", { className: "font-semibold text-sm", children: "Chế độ so sánh nghề nghiệp:" }),
                            d.jsxs("div", { className: "text-xs text-amber-700", children: [compareRoleA ? compareRoleA.title : "(Chưa chọn vai trò 1)", " đối chiếu với ", compareRoleB ? compareRoleB.title : "(Chưa chọn vai trò 2)"] })
                          ]
                        })
                      ]
                    }),
                    d.jsxs("div", {
                      className: "flex gap-2",
                      children: [
                        d.jsx("button", {
                          disabled: !compareRoleA || !compareRoleB,
                          onClick: () => setShowCompareModal(true),
                          className: "rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-amber-700 disabled:opacity-50 transition",
                          children: "So sánh ngay"
                        }),
                        d.jsx("button", {
                          onClick: () => { setCompareRoleA(null); setCompareRoleB(null); },
                          className: "rounded-lg border border-amber-300 px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition",
                          children: "Xóa"
                        })
                      ]
                    })
                  ]
                }),

                // Roles Grid
                loading ? d.jsx("div", { className: "py-12 text-center text-gray-500", children: "Đang tải dữ liệu nghề nghiệp..." }) :
                filteredRoles.length === 0 ? d.jsx("div", { className: "rounded-xl bg-white p-8 text-center text-gray-500 border border-stroke", children: "Không tìm thấy vai trò nghề nghiệp phù hợp với bộ lọc." }) :
                d.jsx("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                  children: filteredRoles.map(role => d.jsxs("div", {
                    key: role.id,
                    className: "flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-stroke hover:shadow-md transition duration-200",
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsxs("div", {
                            className: "flex items-start justify-between gap-2",
                            children: [
                              d.jsx("span", { className: "rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700", children: role.category }),
                              d.jsx("button", {
                                onClick: () => {
                                  if (!compareRoleA) setCompareRoleA(role);
                                  else if (!compareRoleB && compareRoleA.id !== role.id) setCompareRoleB(role);
                                  else if (compareRoleA.id === role.id) setCompareRoleA(null);
                                  else if (compareRoleB?.id === role.id) setCompareRoleB(null);
                                  else setCompareRoleB(role);
                                },
                                className: `text-xs px-2 py-1 rounded border transition ${compareRoleA?.id === role.id || compareRoleB?.id === role.id ? "bg-amber-500 text-white border-amber-500" : "border-gray-200 text-gray-500 hover:border-gray-400"}`,
                                children: compareRoleA?.id === role.id || compareRoleB?.id === role.id ? "✓ Đang so sánh" : "+ So sánh"
                              })
                            ]
                          }),
                          d.jsx("h3", { className: "mt-3 text-lg font-bold text-gray-900 line-clamp-1", children: role.title }),
                          d.jsx("p", { className: "mt-2 text-xs text-gray-600 line-clamp-3 leading-relaxed", children: role.description }),
                          d.jsxs("div", {
                            className: "mt-4 space-y-1.5 rounded-lg bg-gray-50 p-3 text-xs",
                            children: [
                              d.jsxs("div", { className: "flex justify-between", children: [d.jsx("span", { className: "text-gray-500", children: "Mức thu nhập:" }), d.jsx("span", { className: "font-semibold text-emerald-600", children: role.salaryRange })] }),
                              d.jsxs("div", { className: "flex justify-between", children: [d.jsx("span", { className: "text-gray-500", children: "Nhu cầu thị trường:" }), d.jsx("span", { className: "font-semibold text-blue-600", children: role.marketDemand })] })
                            ]
                          })
                        ]
                      }),
                      d.jsxs("div", {
                        className: "mt-6 pt-4 border-t border-gray-100 flex gap-2",
                        children: [
                          d.jsx("button", {
                            onClick: () => setSelectedRole(role),
                            className: "flex-1 rounded-xl bg-primary/10 py-2 text-center text-xs font-bold text-primary hover:bg-primary hover:text-white transition",
                            children: "Xem chi tiết & Môn học"
                          }),
                          d.jsx("button", {
                            onClick: () => handleOpenProgram("/information/program"),
                            className: "rounded-xl border border-blue-200 bg-blue-50/50 px-3 py-2 text-xs font-bold text-primary hover:bg-blue-100 transition",
                            title: "Xem khung chương trình đào tạo",
                            children: "📖 CTĐT"
                          })
                        ]
                      })
                    ]
                  }))
                })
              ]
            }),

            // -------------------------------------------------------------
            // TAB 5: ROADMAP (Lộ trình phát triển & Kế hoạch học tập)
            // -------------------------------------------------------------
            activeTab === "roadmap" && d.jsxs("div", {
              className: "space-y-6",
              children: [
                d.jsxs("div", {
                  className: "flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm border border-stroke",
                  children: [
                    d.jsxs("div", {
                      children: [
                        d.jsxs("h3", { className: "text-base font-bold text-gray-900", children: ["Lộ trình Đề xuất cho: ", currentAssessmentRole?.title || "Kỹ sư Phần mềm"] }),
                        d.jsx("p", { className: "text-xs text-gray-500", children: "Được tổng hợp từ phân tích khoảng cách kỹ năng và chương trình đào tạo UET." })
                      ]
                    }),
                    d.jsxs("div", {
                      className: "flex gap-2",
                      children: [
                        d.jsx("button", {
                          onClick: saveRoadmap,
                          disabled: savingRoadmap,
                          className: "rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700 disabled:opacity-50 transition",
                          children: savingRoadmap ? "Đang lưu..." : "💾 Lưu lộ trình của tôi"
                        }),
                        d.jsx("button", {
                          onClick: () => handleOpenProgram("/information/program"),
                          className: "rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow hover:bg-opacity-90 transition",
                          children: "📖 Mở khung CTĐT"
                        })
                      ]
                    })
                  ]
                }),

                // Stages Timeline
                roadmapStages.length === 0 ? d.jsxs("div", {
                  className: "rounded-xl bg-white p-8 text-center text-gray-500 space-y-3",
                  children: [
                    d.jsx("p", { children: "Chưa có lộ trình cụ thể. Nhấn nút bên dưới để tạo lộ trình từ mục tiêu nghề nghiệp của bạn." }),
                    d.jsx("button", {
                      onClick: generateRoadmap,
                      className: "rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow",
                      children: "🚀 Sinh lộ trình ngay"
                    })
                  ]
                }) :
                d.jsx("div", {
                  className: "space-y-6",
                  children: roadmapStages.map((stage) => d.jsxs("div", {
                    key: stage.stage,
                    className: "relative rounded-2xl bg-white p-6 shadow-sm border border-stroke pl-8",
                    children: [
                      d.jsx("div", {
                        className: "absolute -left-3 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-white shadow-md text-sm",
                        children: stage.stage
                      }),
                      d.jsxs("div", {
                        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3",
                        children: [
                          d.jsx("h4", { className: "text-base font-bold text-gray-900", children: stage.title }),
                          d.jsx("span", { className: "rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700", children: stage.duration })
                        ]
                      }),
                      d.jsx("p", { className: "mt-3 text-xs text-gray-600 leading-relaxed", children: stage.description }),
                      d.jsxs("div", {
                        className: "mt-4 space-y-2",
                        children: [
                          d.jsx("div", { className: "text-xs font-bold text-gray-700 uppercase tracking-wide", children: "Môn học UET khuyến nghị:" }),
                          d.jsx("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                            children: stage.courses.map((c, cIdx) => d.jsxs("div", {
                              key: cIdx,
                              className: "rounded-xl bg-gray-50 p-3 border border-gray-100 flex flex-col justify-between",
                              children: [
                                d.jsxs("div", {
                                  className: "flex items-start justify-between gap-2",
                                  children: [
                                    d.jsxs("div", {
                                      children: [
                                        d.jsx("span", { className: "font-mono text-xs font-bold text-primary", children: c.courseCode }),
                                        d.jsx("h5", { className: "text-xs font-bold text-gray-800", children: c.courseName })
                                      ]
                                    }),
                                    d.jsx("span", { className: `rounded text-[10px] px-1.5 py-0.5 font-bold ${c.relevance === "Cốt lõi" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`, children: c.relevance })
                                  ]
                                }),
                                c.reason && d.jsxs("p", { className: "mt-2 text-[11px] text-gray-500 italic", children: ["💡 Lý do: ", c.reason] })
                              ]
                            }))
                          })
                        ]
                      })
                    ]
                  }))
                })
              ]
            }),

            // DETAIL MODAL FOR A SINGLE ROLE
            selectedRole && d.jsx("div", {
              className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
              children: d.jsxs("div", {
                className: "relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl space-y-5",
                children: [
                  d.jsxs("div", {
                    className: "flex items-start justify-between border-b pb-4",
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsx("span", { className: "rounded bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5", children: selectedRole.category }),
                          d.jsx("h3", { className: "mt-1 text-xl font-bold text-gray-900", children: selectedRole.title })
                        ]
                      }),
                      d.jsx("button", {
                        onClick: () => setSelectedRole(null),
                        className: "rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 text-xl font-bold",
                        children: "✕"
                      })
                    ]
                  }),
                  d.jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: selectedRole.description }),
                  // Course Mapping Table
                  d.jsxs("div", {
                    className: "space-y-2",
                    children: [
                      d.jsx("h4", { className: "text-sm font-bold text-gray-900 uppercase tracking-wide", children: "Quan hệ Nghề nghiệp - Môn học UET (Course Mapping):" }),
                      d.jsx("div", {
                        className: "overflow-x-auto rounded-xl border border-gray-200",
                        children: d.jsxs("table", {
                          className: "w-full text-left text-xs",
                          children: [
                            d.jsx("thead", {
                              className: "bg-gray-50 text-gray-600 border-b",
                              children: d.jsxs("tr", {
                                children: [
                                  d.jsx("th", { className: "p-3", children: "Mã môn" }),
                                  d.jsx("th", { className: "p-3", children: "Tên môn học" }),
                                  d.jsx("th", { className: "p-3", children: "Mức độ" }),
                                  d.jsx("th", { className: "p-3", children: "Lý do khuyến nghị" })
                                ]
                              })
                            }),
                            d.jsx("tbody", {
                              className: "divide-y divide-gray-100",
                              children: selectedRole.courseMappings.map((c, i) => d.jsxs("tr", {
                                key: i,
                                className: "hover:bg-gray-50",
                                children: [
                                  d.jsx("td", { className: "p-3 font-mono font-bold text-primary", children: c.courseCode }),
                                  d.jsx("td", { className: "p-3 font-semibold text-gray-900", children: c.courseName }),
                                  d.jsx("td", { className: "p-3", children: d.jsx("span", { className: `rounded px-2 py-0.5 font-bold ${c.relevance === "Cốt lõi" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`, children: c.relevance }) }),
                                  d.jsx("td", { className: "p-3 text-gray-600", children: c.reason })
                                ]
                              }))
                            })
                          ]
                        })
                      })
                    ]
                  }),
                  // Modal Footer with CTĐT button
                  d.jsxs("div", {
                    className: "flex justify-between items-center pt-4 border-t",
                    children: [
                      d.jsxs("button", {
                        onClick: () => {
                          setSelectedRole(null);
                          handleOpenProgram("/information/program");
                        },
                        className: "inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline",
                        children: [
                          d.jsx("span", { children: "📖" }),
                          d.jsx("span", { children: "Xem khung CTĐT chính thức" })
                        ]
                      }),
                      d.jsxs("div", {
                        className: "flex gap-2",
                        children: [
                          d.jsx("button", {
                            onClick: () => setSelectedRole(null),
                            className: "rounded-xl border border-stroke px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100",
                            children: "Đóng"
                          }),
                          d.jsx("button", {
                            onClick: () => {
                              setSelectedRole(null);
                              setActiveTab("quiz");
                            },
                            className: "rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white shadow hover:bg-opacity-90",
                            children: "🎯 Làm bài đánh giá định hướng"
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            }),

            // ROLE COMPARISON MODAL
            showCompareModal && compareRoleA && compareRoleB && d.jsx("div", {
              className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
              children: d.jsxs("div", {
                className: "relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl space-y-5",
                children: [
                  d.jsxs("div", {
                    className: "flex items-start justify-between border-b pb-4",
                    children: [
                      d.jsx("h3", { className: "text-xl font-bold text-gray-900", children: "Đối chiếu Trực tiếp 2 Vai trò Nghề nghiệp" }),
                      d.jsx("button", {
                        onClick: () => setShowCompareModal(false),
                        className: "rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 text-xl font-bold",
                        children: "✕"
                      })
                    ]
                  }),
                  d.jsxs("div", {
                    className: "grid grid-cols-2 gap-6",
                    children: [
                      // Role A
                      d.jsxs("div", {
                        className: "space-y-4 rounded-xl bg-blue-50/50 p-4 border border-blue-100",
                        children: [
                          d.jsx("h4", { className: "text-lg font-bold text-primary", children: compareRoleA.title }),
                          d.jsx("p", { className: "text-xs text-gray-600", children: compareRoleA.description }),
                          d.jsxs("div", {
                            className: "text-xs space-y-1 font-semibold",
                            children: [
                              d.jsxs("div", { children: ["Thu nhập: ", d.jsx("span", { className: "text-emerald-700", children: compareRoleA.salaryRange })] }),
                              d.jsxs("div", { children: ["Thị trường: ", d.jsx("span", { className: "text-blue-700", children: compareRoleA.marketDemand })] })
                            ]
                          })
                        ]
                      }),
                      // Role B
                      d.jsxs("div", {
                        className: "space-y-4 rounded-xl bg-purple-50/50 p-4 border border-purple-100",
                        children: [
                          d.jsx("h4", { className: "text-lg font-bold text-purple-900", children: compareRoleB.title }),
                          d.jsx("p", { className: "text-xs text-gray-600", children: compareRoleB.description }),
                          d.jsxs("div", {
                            className: "text-xs space-y-1 font-semibold",
                            children: [
                              d.jsxs("div", { children: ["Thu nhập: ", d.jsx("span", { className: "text-emerald-700", children: compareRoleB.salaryRange })] }),
                              d.jsxs("div", { children: ["Thị trường: ", d.jsx("span", { className: "text-purple-700", children: compareRoleB.marketDemand })] })
                            ]
                          })
                        ]
                      })
                    ]
                  }),
                  d.jsx("div", {
                    className: "flex justify-end pt-3 border-t",
                    children: d.jsx("button", {
                      onClick: () => setShowCompareModal(false),
                      className: "rounded-xl bg-gray-800 px-5 py-2 text-xs font-bold text-white shadow",
                      children: "Đóng bảng so sánh"
                    })
                  })
                ]
              })
            })
          ]
        })
      ]
    });
  };
}

  // Feature P2: AI Chatbot Assistant Page & Floating Widget Component
  // -------------------------------------------------------------------------
  function createStudentAssistantPage(Ss, Ji, d, k) {
    return function StudentAssistantPage() {
      const [messages, setMessages] = k.useState([
        {
          id: "welcome",
          sender: "assistant",
          content: "Xin chào bạn! Tôi là Trợ lý sinh viên AI của Trường Đại học Công nghệ (StudentHub UET). Tôi có thể giải đáp các thắc mắc về chuẩn đầu ra, điều kiện tốt nghiệp, quy trình học vụ, đăng ký học phần, học bổng doanh nghiệp, câu lạc bộ và các thông tin liên hệ chính thức tại trường. Bạn cần hỗ trợ điều gì hôm nay?",
          sources: [{ title: "Sổ tay Sinh viên UET", ref: "Quy chế Đào tạo ĐHQGHN", type: "verified" }],
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      const [inputMessage, setInputMessage] = k.useState("");
      const [loading, setLoading] = k.useState(false);
      const [conversationId, setConversationId] = k.useState(() => "conv_" + Date.now());
      const messagesEndRef = k.useRef(null);

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

      k.useEffect(() => {
        scrollToBottom();
      }, [messages, loading]);

      const sendMessage = (textToSend) => {
        const text = (textToSend || inputMessage).trim();
        if (!text || loading) return;

        const userMsg = {
          id: "msg_" + Date.now(),
          sender: "user",
          content: text,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputMessage("");
        setLoading(true);

        fetch("/api/chat/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId: conversationId,
            message: text
          })
        })
          .then(r => r.json())
          .then(data => {
            if (data.status === "success" && data.message) {
              setMessages(prev => [...prev, {
                id: "bot_" + Date.now(),
                sender: "assistant",
                content: data.message.content,
                sources: data.message.sources || [],
                createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }]);
            } else {
              const fallback = (window.__mockChatbot ? window.__mockChatbot(text) : null);
              if (fallback && fallback.message) {
                setMessages(prev => [...prev, {
                  id: "bot_" + Date.now(),
                  sender: "assistant",
                  content: fallback.message.content,
                  sources: fallback.message.sources || [],
                  createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
              } else {
                setMessages(prev => [...prev, {
                  id: "err_" + Date.now(),
                  sender: "assistant",
                  content: "⚠️ Đã có sự cố kết nối tới máy chủ giải đáp. Vui lòng thử lại sau.",
                  sources: [],
                  createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
              }
            }
          })
          .catch(err => {
            const fallback = (window.__mockChatbot ? window.__mockChatbot(text) : null);
            if (fallback && fallback.message) {
              setMessages(prev => [...prev, {
                id: "bot_" + Date.now(),
                sender: "assistant",
                content: fallback.message.content,
                sources: fallback.message.sources || [],
                createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }]);
            } else {
              setMessages(prev => [...prev, {
                id: "err_" + Date.now(),
                sender: "assistant",
                content: "❌ Không thể gửi tin nhắn: " + err.message,
                sources: [],
                createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }]);
            }
          })
          .finally(() => setLoading(false));
      };

      const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      };

      const startNewChat = () => {
        setConversationId("conv_" + Date.now());
        setMessages([
          {
            id: "welcome_" + Date.now(),
            sender: "assistant",
            content: "Đoạn hội thoại mới đã được tạo. Bạn hãy đặt câu hỏi để tôi hỗ trợ nhé!",
            sources: [],
            createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      };

      const suggestions = [
        "Điều kiện tốt nghiệp cử nhân CNTT?",
        "Quy trình đăng ký và rút học phần?",
        "Thủ tục xin cấp giấy xác nhận SV?",
        "Học bổng Toshiba & Mitsubishi xét thế nào?",
        "Thông tin các Câu lạc bộ học thuật UET?"
      ];

      return d.jsxs(Ss, {
        children: [
          d.jsx(Ji, { pageName: "Trợ lý sinh viên" }),
          d.jsxs("div", {
            className: "flex h-[calc(100vh-190px)] min-h-[500px] flex-col rounded-2xl bg-white shadow-sm border border-stroke overflow-hidden",
            children: [
              // Chat Header
              d.jsxs("div", {
                className: "flex items-center justify-between border-b border-stroke bg-gray-50 px-6 py-4",
                children: [
                  d.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [
                      d.jsx("div", {
                        className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-lg shadow-sm",
                        children: "🤖"
                      }),
                      d.jsxs("div", {
                        children: [
                          d.jsx("h3", { className: "text-sm font-bold text-gray-900", children: "Trợ lý Ảo Học vụ & Sinh viên UET" }),
                          d.jsx("span", { className: "flex items-center gap-1.5 text-xs text-emerald-600 font-medium", children: [d.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }), "Sẵn sàng hỗ trợ (Kho tri thức chuẩn UET)"] })
                        ]
                      })
                    ]
                  }),
                  d.jsx("button", {
                    onClick: startNewChat,
                    className: "rounded-xl border border-stroke bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-100 transition",
                    children: "+ Tạo đoạn chat mới"
                  })
                ]
              }),

              // Messages Scroll Container
              d.jsxs("div", {
                className: "flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40",
                children: [
                  messages.map(m => d.jsxs("div", {
                    key: m.id,
                    className: `flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`,
                    children: [
                      m.sender === "assistant" && d.jsx("div", {
                        className: "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-sm",
                        children: "UET"
                      }),
                      d.jsxs("div", {
                        className: `max-w-[80%] rounded-2xl p-4 shadow-sm text-xs leading-relaxed ${m.sender === "user" ? "bg-primary text-white rounded-tr-none" : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"}`,
                        children: [
                          d.jsx("div", { className: "whitespace-pre-wrap", children: m.content }),
                          // Sources badges
                          m.sources && m.sources.length > 0 && d.jsxs("div", {
                            className: "mt-3 pt-2.5 border-t border-gray-100/60 space-y-1",
                            children: [
                              d.jsx("div", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wider", children: "Nguồn tham khảo chính thức:" }),
                              d.jsx("div", {
                                className: "flex flex-wrap gap-1.5",
                                children: m.sources.map((s, idx) => d.jsxs("span", {
                                  key: idx,
                                  className: "inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700",
                                  children: [
                                    s.type === "verified" ? "🛡️ " : "📌 ",
                                    s.title,
                                    " (", s.ref, ")"
                                  ]
                                }))
                              })
                            ]
                          }),
                          d.jsx("div", {
                            className: `mt-1 text-[10px] text-right ${m.sender === "user" ? "text-blue-200" : "text-gray-400"}`,
                            children: m.createdAt
                          })
                        ]
                      })
                    ]
                  })),

                  // Typing Indicator
                  loading && d.jsxs("div", {
                    className: "flex gap-3 items-center text-xs text-gray-500",
                    children: [
                      d.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold", children: "UET" }),
                      d.jsxs("div", {
                        className: "flex gap-1.5 rounded-2xl bg-white p-4 shadow-sm border border-gray-100",
                        children: [
                          d.jsx("span", { className: "h-2 w-2 rounded-full bg-gray-400 animate-bounce" }),
                          d.jsx("span", { className: "h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" }),
                          d.jsx("span", { className: "h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" })
                        ]
                      })
                    ]
                  }),

                  d.jsx("div", { ref: messagesEndRef })
                ]
              }),

              // Quick Prompts Bar
              d.jsx("div", {
                className: "flex gap-2 overflow-x-auto px-6 py-2.5 bg-white border-t border-gray-100 no-scrollbar",
                children: suggestions.map((s, idx) => d.jsx("button", {
                  key: idx,
                  onClick: () => sendMessage(s),
                  className: "shrink-0 rounded-full border border-stroke bg-gray-50 px-3 py-1 text-xs text-gray-700 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition",
                  children: s
                }))
              }),

              // Input Box
              d.jsxs("div", {
                className: "border-t border-stroke bg-white p-4",
                children: [
                  d.jsxs("div", {
                    className: "flex gap-3 items-end rounded-xl border border-stroke bg-gray-50 p-2 focus-within:border-primary focus-within:bg-white transition",
                    children: [
                      d.jsx("textarea", {
                        rows: 2,
                        value: inputMessage,
                        onChange: e => setInputMessage(e.target.value),
                        onKeyDown: handleKeyDown,
                        maxLength: 1000,
                        placeholder: "Nhập câu hỏi của bạn tại đây... (Nhấn Enter để gửi, Shift+Enter xuống dòng)",
                        className: "flex-1 resize-none bg-transparent px-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                      }),
                      d.jsxs("div", {
                        className: "flex items-center gap-2 shrink-0 pb-1 pr-1",
                        children: [
                          d.jsxs("span", { className: "text-[10px] text-gray-400", children: [inputMessage.length, "/1000"] }),
                          d.jsx("button", {
                            onClick: () => sendMessage(),
                            disabled: !inputMessage.trim() || loading,
                            className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow hover:bg-opacity-90 disabled:opacity-40 transition",
                            children: "➤"
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });
    };
  }

  // -------------------------------------------------------------------------
  // Feature P3: Organizations & Laboratories Directory Page Component
  // -------------------------------------------------------------------------
  function createOrganizationsPage(Ss, Ji, d, k) {
  return function OrganizationsPage() {
    const [subTab, setSubTab] = k.useState("lecturers"); // lecturers | units
    const [lecturers, setLecturers] = k.useState([]);
    const [orgs, setOrgs] = k.useState([]);
    const [loadingLec, setLoadingLec] = k.useState(true);
    const [loadingOrgs, setLoadingOrgs] = k.useState(true);
    const [searchQuery, setSearchQuery] = k.useState("");
    const [selectedUnit, setSelectedUnit] = k.useState("all");
    const [selectedRank, setSelectedRank] = k.useState("all");
    const [currentPage, setCurrentPage] = k.useState(1);
    const [pageSize, setPageSize] = k.useState(15);
    const [selectedLecturer, setSelectedLecturer] = k.useState(null);
    const [selectedOrg, setSelectedOrg] = k.useState(null);

    // Fetch Lecturers
    k.useEffect(() => {
      fetch("/api/organizations/lecturers?limit=100")
        .then(r => r.json())
        .then(res => {
          if (res.code === 200 && res.data) {
            setLecturers(res.data);
          }
        })
        .catch(err => {
          console.warn("Could not load lecturers from API:", err);
        })
        .finally(() => setLoadingLec(false));
    }, []);

    // Fetch Organizations
    k.useEffect(() => {
      fetch("/api/organizations")
        .then(r => r.json())
        .then(res => {
          if (res.code === 200) setOrgs(res.data);
        })
        .catch(e => console.error("Error fetching organizations:", e))
        .finally(() => setLoadingOrgs(false));
    }, []);

    const toggleBookmark = (e, orgId) => {
      e.stopPropagation();
      fetch("/api/organizations/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId })
      })
        .then(r => r.json())
        .then(res => {
          if (res.code === 200) {
            setOrgs(prev => prev.map(o => o.id === orgId ? { ...o, isBookmarked: res.bookmarked } : o));
            if (selectedOrg?.id === orgId) {
              setSelectedOrg(prev => ({ ...prev, isBookmarked: res.bookmarked }));
            }
          }
        })
        .catch(err => alert("Lỗi khi lưu: " + err.message));
    };

    // Filter Lecturers
    const filteredLecturers = lecturers.filter(lec => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || (
        (lec.name && lec.name.toLowerCase().includes(q)) ||
        (lec.email && lec.email.toLowerCase().includes(q)) ||
        (lec.academicTitle && lec.academicTitle.toLowerCase().includes(q)) ||
        (lec.position && lec.position.toLowerCase().includes(q)) ||
        (lec.unitName && lec.unitName.toLowerCase().includes(q))
      );

      const matchUnit = selectedUnit === "all" || lec.unitId === selectedUnit;

      let matchRank = true;
      if (selectedRank === "gs_pgs") {
        matchRank = (lec.academicTitle || "").includes("GS") || (lec.academicTitle || "").includes("PGS");
      } else if (selectedRank === "ts") {
        matchRank = (lec.academicTitle || "").includes("TS") && !(lec.academicTitle || "").includes("PGS") && !(lec.academicTitle || "").includes("GS");
      } else if (selectedRank === "ths") {
        matchRank = (lec.academicTitle || "").includes("ThS");
      } else if (selectedRank === "other") {
        matchRank = !(lec.academicTitle || "").includes("TS") && !(lec.academicTitle || "").includes("GS") && !(lec.academicTitle || "").includes("ThS");
      }

      return matchSearch && matchUnit && matchRank;
    });

    // Pagination Calculation
    const totalPages = Math.ceil(filteredLecturers.length / pageSize) || 1;
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const startIndex = (safeCurrentPage - 1) * pageSize;
    const paginatedLecturers = filteredLecturers.slice(startIndex, startIndex + pageSize);

    // Filter Orgs
    const filteredOrgs = orgs.filter(o => {
      const matchSearch = !searchQuery || (o.name + " " + o.field + " " + o.summary).toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });

    // Unit options for filter dropdown
    const unitOptions = [
      { id: "all", label: "Tất cả đơn vị / Bộ môn" },
      { id: "bo-mon-cac-he-thong-thong-tin-2", label: "Bộ môn Các Hệ thống Thông tin" },
      { id: "bo-mon-cong-nghe-phan-mem", label: "Bộ môn Công nghệ Phần mềm" },
      { id: "bo-mon-khoa-hoc-may-tinh", label: "Bộ môn Khoa học Máy tính" },
      { id: "bo-mon-cac-phuong-phap-toan-trong-cong-nghe", label: "Bộ môn Khoa học và Kỹ thuật tính toán" },
      { id: "bo-mon-mang-va-truyen-thong-may-tinh", label: "Bộ môn Mạng và Truyền thông Máy tính" }
    ];

    return d.jsxs(Ss, {
      children: [
        d.jsx(Ji, { pageName: "Câu lạc bộ & Đơn vị đào tạo" }),
        d.jsxs("div", {
          className: "space-y-6",
          children: [
            // Header Banner
            d.jsxs("div", {
              className: "rounded-2xl bg-gradient-to-r from-teal-700 via-emerald-800 to-cyan-900 p-6 text-white shadow-lg",
              children: [
                d.jsx("span", {
                  className: "inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm",
                  children: "Cổng Thông Tin Đội Ngũ & Tổ Chức Khoa CNTT - UET"
                }),
                d.jsx("h2", {
                  className: "mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl",
                  children: "Danh bạ Giảng viên & Đơn vị Khoa CNTT"
                }),
                d.jsx("p", {
                  className: "mt-1 text-sm text-emerald-100 max-w-2xl",
                  children: "Tra cứu danh sách cán bộ, giảng viên các Bộ môn, thông tin liên hệ chính thức và mạng lưới các Phòng Thí nghiệm, Câu lạc bộ sinh viên UET."
                })
              ]
            }),

            // Top Navigation Tabs
            d.jsxs("div", {
              className: "flex border-b border-stroke bg-white px-4 rounded-xl shadow-sm gap-2",
              children: [
                d.jsxs("button", {
                  onClick: () => { setSubTab("lecturers"); setCurrentPage(1); },
                  className: `flex items-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition ${subTab === "lecturers" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`,
                  children: [
                    d.jsx("span", { children: "📋" }),
                    d.jsx("span", { children: "Danh sách Giảng viên (Bảng tra cứu)" }),
                    d.jsx("span", { className: "ml-1.5 rounded-full bg-blue-100 text-blue-800 text-xs px-2 py-0.5 font-bold", children: lecturers.length || 73 })
                  ]
                }),
                d.jsxs("button", {
                  onClick: () => { setSubTab("units"); setCurrentPage(1); },
                  className: `flex items-center gap-2 py-3 px-4 text-sm font-bold border-b-2 transition ${subTab === "units" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`,
                  children: [
                    d.jsx("span", { children: "🔬" }),
                    d.jsx("span", { children: "Phòng Thí nghiệm & Câu lạc bộ" }),
                    d.jsx("span", { className: "ml-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 font-bold", children: orgs.length || 22 })
                  ]
                })
              ]
            }),

            // -------------------------------------------------------------
            // SUBTAB 1: LECTURERS DATA TABLE
            // -------------------------------------------------------------
            subTab === "lecturers" && d.jsxs("div", {
              className: "space-y-4",
              children: [
                // Filter Controls Bar
                d.jsxs("div", {
                  className: "flex flex-col lg:flex-row gap-4 items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-stroke",
                  children: [
                    // Search box
                    d.jsxs("div", {
                      className: "relative w-full lg:w-80",
                      children: [
                        d.jsx("input", {
                          type: "text",
                          value: searchQuery,
                          onChange: e => { setSearchQuery(e.target.value); setCurrentPage(1); },
                          placeholder: "Tìm kiếm theo tên, email, học vị...",
                          className: "w-full rounded-lg border border-stroke bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:bg-white transition"
                        }),
                        d.jsx("span", { className: "absolute left-3 top-3 text-gray-400", children: "🔍" })
                      ]
                    }),

                    // Filter dropdowns
                    d.jsxs("div", {
                      className: "flex flex-wrap items-center gap-3 w-full lg:w-auto",
                      children: [
                        // Unit dropdown
                        d.jsx("select", {
                          value: selectedUnit,
                          onChange: e => { setSelectedUnit(e.target.value); setCurrentPage(1); },
                          className: "rounded-lg border border-stroke bg-gray-50 py-2 px-3 text-xs font-semibold text-gray-700 focus:border-primary focus:outline-none",
                          children: unitOptions.map(u => d.jsx("option", { key: u.id, value: u.id, children: u.label }))
                        }),

                        // Academic Rank dropdown
                        d.jsxs("select", {
                          value: selectedRank,
                          onChange: e => { setSelectedRank(e.target.value); setCurrentPage(1); },
                          className: "rounded-lg border border-stroke bg-gray-50 py-2 px-3 text-xs font-semibold text-gray-700 focus:border-primary focus:outline-none",
                          children: [
                            d.jsx("option", { value: "all", children: "Tất cả học hàm/học vị" }),
                            d.jsx("option", { value: "gs_pgs", children: "Giáo sư / PGS" }),
                            d.jsx("option", { value: "ts", children: "Tiến sĩ (TS)" }),
                            d.jsx("option", { value: "ths", children: "Thạc sĩ (ThS)" }),
                            d.jsx("option", { value: "other", children: "NCS / Kỹ sư / CN" })
                          ]
                        }),

                        // Page size selector
                        d.jsxs("select", {
                          value: pageSize,
                          onChange: e => { setPageSize(Number(e.target.value)); setCurrentPage(1); },
                          className: "rounded-lg border border-stroke bg-gray-50 py-2 px-3 text-xs font-semibold text-gray-700 focus:border-primary focus:outline-none",
                          children: [
                            d.jsx("option", { value: 10, children: "10 hàng / trang" }),
                            d.jsx("option", { value: 15, children: "15 hàng / trang" }),
                            d.jsx("option", { value: 25, children: "25 hàng / trang" }),
                            d.jsx("option", { value: 50, children: "50 hàng / trang" })
                          ]
                        }),

                        // Reset filter button
                        (searchQuery || selectedUnit !== "all" || selectedRank !== "all") && d.jsx("button", {
                          onClick: () => { setSearchQuery(""); setSelectedUnit("all"); setSelectedRank("all"); setCurrentPage(1); },
                          className: "rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition",
                          children: "✕ Xóa bộ lọc"
                        })
                      ]
                    })
                  ]
                }),

                // Data Table Container
                loadingLec ? d.jsx("div", {
                  className: "py-16 text-center text-gray-500 rounded-xl bg-white border border-stroke",
                  children: "Đang tải danh sách giảng viên..."
                }) :
                filteredLecturers.length === 0 ? d.jsxs("div", {
                  className: "rounded-xl bg-white p-12 text-center text-gray-500 border border-stroke space-y-3",
                  children: [
                    d.jsx("div", { className: "text-4xl", children: "🔍" }),
                    d.jsx("h4", { className: "text-base font-bold text-gray-800", children: "Không tìm thấy giảng viên phù hợp" }),
                    d.jsx("p", { className: "text-xs text-gray-500 max-w-md mx-auto", children: "Không có kết quả nào khớp với từ khóa tìm kiếm hoặc bộ lọc đơn vị hiện tại. Vui lòng thử tìm từ khóa khác." }),
                    d.jsx("button", {
                      onClick: () => { setSearchQuery(""); setSelectedUnit("all"); setSelectedRank("all"); },
                      className: "mt-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white shadow hover:bg-opacity-90",
                      children: "Đặt lại tất cả bộ lọc"
                    })
                  ]
                }) :
                d.jsxs("div", {
                  className: "overflow-hidden rounded-xl border border-stroke bg-white shadow-sm",
                  children: [
                    d.jsx("div", {
                      className: "overflow-x-auto",
                      children: d.jsxs("table", {
                        className: "w-full text-left text-xs",
                        children: [
                          d.jsx("thead", {
                            className: "bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px] font-bold border-b border-stroke",
                            children: d.jsxs("tr", {
                              children: [
                                d.jsx("th", { className: "py-3.5 px-4 text-center w-16", children: "STT" }),
                                d.jsx("th", { className: "py-3.5 px-4 min-w-[200px]", children: "Họ và tên" }),
                                d.jsx("th", { className: "py-3.5 px-4 min-w-[140px]", children: "Học hàm, học vị" }),
                                d.jsx("th", { className: "py-3.5 px-4 min-w-[220px]", children: "Đơn vị / Bộ môn" }),
                                d.jsx("th", { className: "py-3.5 px-4 min-w-[200px]", children: "Email" }),
                                d.jsx("th", { className: "py-3.5 px-4 min-w-[180px]", children: "Phòng làm việc" }),
                                d.jsx("th", { className: "py-3.5 px-4 text-center w-28", children: "Thao tác" })
                              ]
                            })
                          }),
                          d.jsx("tbody", {
                            className: "divide-y divide-gray-100",
                            children: paginatedLecturers.map((lec, idx) => {
                              const stt = startIndex + idx + 1;
                              const isNotable = lec.position && lec.position !== "Giảng viên" && lec.position !== "—";
                              return d.jsxs("tr", {
                                key: lec.id || idx,
                                className: "hover:bg-blue-50/40 transition duration-150",
                                children: [
                                  // STT
                                  d.jsx("td", {
                                    className: "py-3 px-4 text-center font-semibold text-gray-500",
                                    children: stt
                                  }),

                                  // Họ và tên
                                  d.jsxs("td", {
                                    className: "py-3 px-4 font-bold text-gray-900",
                                    children: [
                                      d.jsx("div", { children: lec.name }),
                                      isNotable && d.jsx("span", {
                                        className: "mt-0.5 inline-block rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] px-1.5 py-0.2 font-semibold",
                                        children: lec.position
                                      })
                                    ]
                                  }),

                                  // Học hàm, học vị
                                  d.jsx("td", {
                                    className: "py-3 px-4",
                                    children: lec.academicTitle && lec.academicTitle !== "—" ? d.jsx("span", {
                                      className: `inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                                        lec.academicTitle.includes("GS") ? "bg-purple-50 text-purple-700 border border-purple-200" :
                                        lec.academicTitle.includes("PGS") ? "bg-indigo-50 text-indigo-700 border border-indigo-200" :
                                        lec.academicTitle.includes("TS") ? "bg-blue-50 text-blue-700 border border-blue-200" :
                                        "bg-gray-100 text-gray-700"
                                      }`,
                                      children: lec.academicTitle
                                    }) : d.jsx("span", { className: "text-gray-400 font-medium", children: "—" })
                                  }),

                                  // Đơn vị
                                  d.jsx("td", {
                                    className: "py-3 px-4 font-medium text-gray-700",
                                    children: lec.unitName || "Khoa Công nghệ Thông tin"
                                  }),

                                  // Email
                                  d.jsx("td", {
                                    className: "py-3 px-4 font-mono text-xs",
                                    children: lec.email && lec.email !== "—" ? d.jsxs("a", {
                                      href: `mailto:${lec.email}`,
                                      className: "inline-flex items-center gap-1.5 text-primary hover:underline hover:text-blue-800 font-medium transition",
                                      children: [
                                        d.jsx("span", { children: "✉️" }),
                                        d.jsx("span", { children: lec.email })
                                      ]
                                    }) : d.jsx("span", { className: "text-gray-400 font-medium", children: "—" })
                                  }),

                                  // Phòng làm việc
                                  d.jsx("td", {
                                    className: "py-3 px-4 text-gray-600",
                                    children: lec.office || "Nhà E3, 144 Xuân Thủy"
                                  }),

                                  // Thao tác
                                  d.jsx("td", {
                                    className: "py-3 px-4 text-center",
                                    children: d.jsx("button", {
                                      onClick: () => setSelectedLecturer(lec),
                                      className: "rounded-lg bg-gray-100 hover:bg-primary hover:text-white px-2.5 py-1 text-xs font-semibold text-gray-700 transition",
                                      children: "Chi tiết"
                                    })
                                  })
                                ]
                              });
                            })
                          })
                        ]
                      })
                    }),

                    // Pagination Footer
                    d.jsxs("div", {
                      className: "flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stroke bg-slate-50 px-4 py-3 text-xs text-gray-600",
                      children: [
                        d.jsxs("div", {
                          children: [
                            "Hiển thị ",
                            d.jsx("strong", { children: filteredLecturers.length > 0 ? startIndex + 1 : 0 }),
                            " - ",
                            d.jsx("strong", { children: Math.min(startIndex + pageSize, filteredLecturers.length) }),
                            " trên tổng số ",
                            d.jsx("strong", { children: filteredLecturers.length }),
                            " giảng viên"
                          ]
                        }),
                        d.jsxs("div", {
                          className: "flex items-center gap-1",
                          children: [
                            d.jsx("button", {
                              disabled: safeCurrentPage <= 1,
                              onClick: () => setCurrentPage(1),
                              className: "rounded px-2.5 py-1 text-xs font-semibold border border-stroke bg-white hover:bg-gray-100 disabled:opacity-40 transition",
                              children: "«"
                            }),
                            d.jsx("button", {
                              disabled: safeCurrentPage <= 1,
                              onClick: () => setCurrentPage(prev => Math.max(1, prev - 1)),
                              className: "rounded px-2.5 py-1 text-xs font-semibold border border-stroke bg-white hover:bg-gray-100 disabled:opacity-40 transition",
                              children: "‹ Trước"
                            }),
                            Array.from({ length: totalPages }, (_, i) => i + 1)
                              .filter(p => p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 2)
                              .map((p, idx, arr) => {
                                const showEllipsisBefore = idx > 0 && p > arr[idx - 1] + 1;
                                return d.jsxs(d.Fragment, {
                                  key: p,
                                  children: [
                                    showEllipsisBefore && d.jsx("span", { className: "px-1.5 text-gray-400", children: "..." }),
                                    d.jsx("button", {
                                      onClick: () => setCurrentPage(p),
                                      className: `rounded px-3 py-1 text-xs font-semibold border transition ${safeCurrentPage === p ? "bg-primary text-white border-primary shadow-sm" : "border-stroke bg-white hover:bg-gray-100 text-gray-700"}`,
                                      children: p
                                    })
                                  ]
                                });
                              }),
                            d.jsx("button", {
                              disabled: safeCurrentPage >= totalPages,
                              onClick: () => setCurrentPage(prev => Math.min(totalPages, prev + 1)),
                              className: "rounded px-2.5 py-1 text-xs font-semibold border border-stroke bg-white hover:bg-gray-100 disabled:opacity-40 transition",
                              children: "Sau ›"
                            }),
                            d.jsx("button", {
                              disabled: safeCurrentPage >= totalPages,
                              onClick: () => setCurrentPage(totalPages),
                              className: "rounded px-2.5 py-1 text-xs font-semibold border border-stroke bg-white hover:bg-gray-100 disabled:opacity-40 transition",
                              children: "»"
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),

            // -------------------------------------------------------------
            // SUBTAB 2: RESEARCH LABS & CLUBS DIRECTORY
            // -------------------------------------------------------------
            subTab === "units" && d.jsxs("div", {
              className: "space-y-4",
              children: [
                loadingOrgs ? d.jsx("div", { className: "py-12 text-center text-gray-500", children: "Đang tải danh bạ đơn vị..." }) :
                d.jsx("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                  children: filteredOrgs.map(org => d.jsxs("div", {
                    key: org.id,
                    onClick: () => setSelectedOrg(org),
                    className: "cursor-pointer flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-stroke hover:shadow-md hover:border-primary/30 transition duration-200",
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsxs("div", {
                            className: "flex items-start justify-between gap-2",
                            children: [
                              d.jsx("span", {
                                className: `rounded-md px-2.5 py-0.5 text-xs font-semibold ${org.category === "club" ? "bg-purple-50 text-purple-700" : org.category === "lab" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}`,
                                children: org.category === "club" ? "Câu lạc bộ" : org.category === "lab" ? "Phòng Thí nghiệm" : "Khoa/Phòng"
                              }),
                              d.jsx("button", {
                                onClick: (e) => toggleBookmark(e, org.id),
                                className: `p-1 rounded-full text-base transition ${org.isBookmarked ? "text-red-500 scale-110" : "text-gray-300 hover:text-red-400"}`,
                                title: org.isBookmarked ? "Bỏ lưu" : "Lưu tổ chức",
                                children: org.isBookmarked ? "❤️" : "🤍"
                              })
                            ]
                          }),
                          d.jsx("h3", { className: "mt-3 text-base font-bold text-gray-900 line-clamp-1", children: org.name }),
                          d.jsx("div", { className: "text-xs font-medium text-emerald-600 mt-1", children: org.field }),
                          d.jsx("p", { className: "mt-2.5 text-xs text-gray-600 line-clamp-3 leading-relaxed", children: org.summary }),
                          d.jsxs("div", {
                            className: "mt-4 flex items-center justify-between text-xs pt-3 border-t border-gray-100",
                            children: [
                              d.jsx("span", { className: "text-gray-500", children: "Trạng thái:" }),
                              d.jsx("span", { className: "font-semibold text-primary", children: org.recruitmentStatus || "Đang hoạt động" })
                            ]
                          })
                        ]
                      }),
                      d.jsxs("div", {
                        className: "mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-primary font-bold",
                        children: [
                          d.jsx("span", { children: "Xem thông tin liên hệ" }),
                          d.jsx("span", { children: "→" })
                        ]
                      })
                    ]
                  }))
                })
              ]
            }),

            // LECTURER DETAIL MODAL
            selectedLecturer && d.jsx("div", {
              className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
              children: d.jsxs("div", {
                className: "relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl space-y-5",
                children: [
                  d.jsxs("div", {
                    className: "flex items-start justify-between border-b pb-4",
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsx("span", {
                            className: "rounded bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5",
                            children: selectedLecturer.academicTitle || "Cán bộ giảng viên"
                          }),
                          d.jsx("h3", { className: "mt-1.5 text-xl font-bold text-gray-900", children: selectedLecturer.name }),
                          d.jsx("div", { className: "text-xs text-gray-500 mt-0.5", children: selectedLecturer.unitName })
                        ]
                      }),
                      d.jsx("button", {
                        onClick: () => setSelectedLecturer(null),
                        className: "rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 text-xl font-bold",
                        children: "✕"
                      })
                    ]
                  }),

                  d.jsxs("div", {
                    className: "space-y-3 rounded-xl bg-gray-50 p-4 text-xs",
                    children: [
                      d.jsxs("div", {
                        className: "flex justify-between py-1 border-b border-gray-200/60",
                        children: [d.jsx("span", { className: "text-gray-500", children: "Chức vụ / Vị trí:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedLecturer.position || "Giảng viên" })]
                      }),
                      d.jsxs("div", {
                        className: "flex justify-between py-1 border-b border-gray-200/60",
                        children: [d.jsx("span", { className: "text-gray-500", children: "Đơn vị công tác:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedLecturer.unitName })]
                      }),
                      d.jsxs("div", {
                        className: "flex justify-between py-1 border-b border-gray-200/60",
                        children: [d.jsx("span", { className: "text-gray-500", children: "Phòng làm việc:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedLecturer.office || "Nhà E3, 144 Xuân Thủy" })]
                      }),
                      d.jsxs("div", {
                        className: "flex justify-between py-1",
                        children: [d.jsx("span", { className: "text-gray-500", children: "Điện thoại liên hệ:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedLecturer.phone || "(024) 3754 7813" })]
                      })
                    ]
                  }),

                  selectedLecturer.email && selectedLecturer.email !== "—" && d.jsxs("div", {
                    className: "pt-2",
                    children: [
                      d.jsx("span", { className: "text-xs font-bold text-gray-700 block mb-2", children: "Kênh liên lạc chính thức:" }),
                      d.jsxs("a", {
                        href: `mailto:${selectedLecturer.email}`,
                        className: "inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow hover:bg-opacity-90 transition",
                        children: [
                          d.jsx("span", { children: "✉️" }),
                          d.jsx("span", { children: `Gửi email tới ${selectedLecturer.email}` })
                        ]
                      })
                    ]
                  }),

                  d.jsx("div", {
                    className: "flex justify-end pt-3 border-t",
                    children: d.jsx("button", {
                      onClick: () => setSelectedLecturer(null),
                      className: "rounded-xl bg-gray-800 px-5 py-2 text-xs font-bold text-white shadow",
                      children: "Đóng"
                    })
                  })
                ]
              })
            }),

            // ORG DETAIL MODAL (CLB & Lab)
            selectedOrg && d.jsx("div", {
              className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
              children: d.jsxs("div", {
                className: "relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl space-y-5",
                children: [
                  d.jsxs("div", {
                    className: "flex items-start justify-between border-b pb-4",
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [
                              d.jsx("span", { className: "rounded bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5", children: selectedOrg.field }),
                              selectedOrg.verified && d.jsx("span", { className: "rounded bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5", children: "✓ Đã xác thực" })
                            ]
                          }),
                          d.jsx("h3", { className: "mt-1.5 text-xl font-bold text-gray-900", children: selectedOrg.name })
                        ]
                      }),
                      d.jsx("button", {
                        onClick: () => setSelectedOrg(null),
                        className: "rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 text-xl font-bold",
                        children: "✕"
                      })
                    ]
                  }),
                  d.jsx("p", { className: "text-sm text-gray-700 leading-relaxed", children: selectedOrg.description }),
                  d.jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl bg-gray-50 p-4 text-xs",
                    children: [
                      d.jsxs("div", { children: [d.jsx("span", { className: "text-gray-500 block", children: "Yêu cầu tham gia:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedOrg.requirements || "Không yêu cầu" })] }),
                      d.jsxs("div", { children: [d.jsx("span", { className: "text-gray-500 block", children: "Đợt tuyển sinh:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedOrg.recruitmentPeriod || "Theo thông báo" })] }),
                      d.jsxs("div", { children: [d.jsx("span", { className: "text-gray-500 block", children: "Người phụ trách / Liên hệ:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedOrg.contactPerson })] }),
                      d.jsxs("div", { children: [d.jsx("span", { className: "text-gray-500 block", children: "Địa điểm sinh hoạt:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedOrg.location })] })
                    ]
                  }),
                  d.jsxs("div", {
                    className: "space-y-2 pt-2",
                    children: [
                      d.jsx("h4", { className: "text-xs font-bold text-gray-700 uppercase tracking-wide", children: "Kênh liên lạc chính thức:" }),
                      d.jsxs("div", {
                        className: "flex flex-wrap gap-3",
                        children: [
                          selectedOrg.email && d.jsxs("a", {
                            href: `mailto:${selectedOrg.email}`,
                            className: "inline-flex items-center gap-1.5 rounded-lg border border-stroke bg-white px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/5 transition",
                            children: [d.jsx("span", { children: "✉️" }), selectedOrg.email]
                          }),
                          selectedOrg.website && d.jsxs("a", {
                            href: selectedOrg.website,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "inline-flex items-center gap-1.5 rounded-lg border border-stroke bg-white px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/5 transition",
                            children: [d.jsx("span", { children: "🌐" }), "Website chính thức"]
                          }),
                          selectedOrg.facebook && d.jsxs("a", {
                            href: selectedOrg.facebook,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "inline-flex items-center gap-1.5 rounded-lg border border-stroke bg-white px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 transition",
                            children: [d.jsx("span", { children: "👍" }), "Trang Facebook"]
                          })
                        ]
                      })
                    ]
                  }),
                  d.jsxs("div", {
                    className: "flex justify-between items-center pt-4 border-t",
                    children: [
                      d.jsxs("button", {
                        onClick: (e) => toggleBookmark(e, selectedOrg.id),
                        className: "flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-red-500 transition",
                        children: [d.jsx("span", { children: selectedOrg.isBookmarked ? "❤️ Đã lưu vào mục yêu thích" : "🤍 Lưu vào mục yêu thích" })]
                      }),
                      d.jsx("button", {
                        onClick: () => setSelectedOrg(null),
                        className: "rounded-xl bg-gray-800 px-5 py-2 text-xs font-bold text-white shadow",
                        children: "Đóng"
                      })
                    ]
                  })
                ]
              })
            })
          ]
        })
      ]
    });
  };
}

  // Feature P4: Mentorship & Alumni Connection Page Component
  // -------------------------------------------------------------------------
  function createMentorshipPage(Ss, Ji, d, k) {
    return function MentorshipPage() {
      const [activeTab, setActiveTab] = k.useState("mentors"); // mentors | requests
      const [mentors, setMentors] = k.useState([]);
      const [requests, setRequests] = k.useState([]);
      const [loading, setLoading] = k.useState(true);
      const [selectedMentor, setSelectedMentor] = k.useState(null);
      const [showRequestModal, setShowRequestModal] = k.useState(false);

      // Request Form State
      const [formTopic, setFormTopic] = k.useState("");
      const [formReason, setFormReason] = k.useState("");
      const [formPreferredTime, setFormPreferredTime] = k.useState("");
      const [formEmail, setFormEmail] = k.useState("nguyenvana.uet@gmail.com");
      const [submitting, setSubmitting] = k.useState(false);

      const fetchMentors = () => {
        fetch("/api/mentors")
          .then(r => r.json())
          .then(res => {
            if (res.code === 200) setMentors(res.data);
          })
          .catch(e => console.error("Error fetching mentors:", e));
      };

      const fetchRequests = () => {
        fetch("/api/mentorship-requests")
          .then(r => r.json())
          .then(res => {
            if (res.code === 200) setRequests(res.data);
          })
          .catch(e => console.error("Error fetching requests:", e))
          .finally(() => setLoading(false));
      };

      k.useEffect(() => {
        fetchMentors();
        fetchRequests();
      }, []);

      const openRequestModal = (mentor) => {
        setSelectedMentor(mentor);
        setFormTopic(mentor.topics[0] || "");
        setFormReason("");
        setFormPreferredTime(mentor.availability || "");
        setShowRequestModal(true);
      };

      const submitRequest = (e) => {
        e.preventDefault();
        if (!formTopic.trim() || !formReason.trim() || !formEmail.trim()) {
          alert("Vui lòng điền đầy đủ chủ đề, lý do tư vấn và email liên hệ!");
          return;
        }

        setSubmitting(true);
        fetch("/api/mentorship-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mentorId: selectedMentor.id,
            topic: formTopic,
            reason: formReason,
            preferredTime: formPreferredTime,
            contactEmail: formEmail
          })
        })
          .then(r => r.json())
          .then(res => {
            if (res.code === 200) {
              alert("🎉 " + res.message);
              setShowRequestModal(false);
              fetchRequests();
              setActiveTab("requests");
            } else {
              alert("Lỗi: " + res.message);
            }
          })
          .catch(err => alert("Lỗi gửi yêu cầu: " + err.message))
          .finally(() => setSubmitting(false));
      };

      const cancelRequest = (id) => {
        if (!confirm("Bạn có chắc chắn muốn hủy yêu cầu tư vấn này?")) return;
        fetch(`/api/mentorship-requests/${id}/cancel`, { method: "POST" })
          .then(r => r.json())
          .then(res => {
            if (res.code === 200) {
              alert("Đã hủy yêu cầu tư vấn.");
              fetchRequests();
            } else {
              alert("Lỗi: " + res.message);
            }
          })
          .catch(err => alert("Lỗi: " + err.message));
      };

      return d.jsxs(Ss, {
        children: [
          d.jsx(Ji, { pageName: "Cố vấn nghề nghiệp" }),
          d.jsxs("div", {
            className: "space-y-6",
            children: [
              // Banner
              d.jsxs("div", {
                className: "rounded-2xl bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-900 p-6 text-white shadow-lg",
                children: [
                  d.jsxs("div", {
                    className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsx("span", { className: "inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider", children: "Mạng lưới Cố vấn & Cựu sinh viên UET" }),
                          d.jsx("h2", { className: "mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl", children: "Kết nối Cố vấn Nghề nghiệp & Alumni" }),
                          d.jsx("p", { className: "mt-1 text-sm text-purple-100 max-w-2xl", children: "Nhận sự hướng dẫn 1-on-1 từ các anh chị cựu sinh viên và chuyên gia hàng đầu về định hướng sự nghiệp, phỏng vấn kỹ thuật và kinh nghiệm thực chiến." })
                        ]
                      }),
                      d.jsxs("div", {
                        className: "flex gap-2 shrink-0",
                        children: [
                          d.jsx("button", {
                            onClick: () => setActiveTab("mentors"),
                            className: `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${activeTab === "mentors" ? "bg-white text-purple-900 shadow-md" : "bg-white/10 text-white hover:bg-white/20"}`,
                            children: "1. Danh sách Cố vấn"
                          }),
                          d.jsxs("button", {
                            onClick: () => setActiveTab("requests"),
                            className: `rounded-xl px-4 py-2.5 text-sm font-semibold transition flex items-center gap-2 ${activeTab === "requests" ? "bg-white text-purple-900 shadow-md" : "bg-white/10 text-white hover:bg-white/20"}`,
                            children: [
                              "2. Yêu cầu của tôi",
                              requests.length > 0 && d.jsx("span", { className: "rounded-full bg-amber-400 text-purple-900 font-bold px-1.5 py-0.2 text-[11px]", children: requests.length })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),

              // Demonstration Notice Badge
              d.jsxs("div", {
                className: "rounded-xl bg-purple-50 border border-purple-200 p-3.5 text-xs text-purple-900 flex items-center gap-2",
                children: [
                  d.jsx("span", { className: "text-base", children: "💡" }),
                  d.jsx("span", { children: "Lưu ý minh họa: Danh bạ cố vấn bao gồm các hồ sơ cựu sinh viên tiêu biểu phục vụ minh chứng đồ án. Mọi yêu cầu tư vấn sẽ được lưu trữ và quản lý trực tiếp qua cơ sở dữ liệu hệ thống." })
                ]
              }),

              // TAB 1: MENTORS DIRECTORY
              activeTab === "mentors" && d.jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: mentors.map(m => d.jsxs("div", {
                  key: m.id,
                  className: "flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-stroke hover:shadow-md transition duration-200",
                  children: [
                    d.jsxs("div", {
                      className: "space-y-4",
                      children: [
                        d.jsxs("div", {
                          className: "flex items-start gap-4",
                          children: [
                            d.jsx("div", {
                              className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-bold text-xl shadow-md",
                              children: m.name.split(" ").slice(-1)[0][0]
                            }),
                            d.jsxs("div", {
                              className: "flex-1 min-w-0",
                              children: [
                                d.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    d.jsx("h3", { className: "text-base font-bold text-gray-900 truncate", children: m.name }),
                                    m.isSample && d.jsx("span", { className: "rounded bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5", children: "Minh họa" })
                                  ]
                                }),
                                d.jsx("p", { className: "text-xs font-semibold text-primary line-clamp-1", children: m.title }),
                                d.jsx("p", { className: "text-xs text-gray-500", children: m.company })
                              ]
                            })
                          ]
                        }),

                        d.jsx("p", { className: "text-xs text-gray-600 leading-relaxed line-clamp-3", children: m.bio }),

                        // Expertise Tags
                        d.jsx("div", {
                          className: "flex flex-wrap gap-1.5",
                          children: m.expertise.map((exp, idx) => d.jsx("span", {
                            key: idx,
                            className: "rounded bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5",
                            children: exp
                          }))
                        }),

                        // Availability
                        d.jsxs("div", {
                          className: "rounded-xl bg-gray-50 p-3 text-xs space-y-1",
                          children: [
                            d.jsxs("div", { className: "text-gray-500", children: ["📅 Thời gian tư vấn: ", d.jsx("span", { className: "font-semibold text-gray-800", children: m.availability })] }),
                            d.jsxs("div", { className: "text-gray-500", children: ["📍 Kênh tiếp nhận: ", d.jsx("span", { className: "font-semibold text-gray-800", children: m.contactChannel })] })
                          ]
                        })
                      ]
                    }),

                    d.jsx("div", {
                      className: "mt-6 pt-4 border-t border-gray-100",
                      children: d.jsx("button", {
                        onClick: () => openRequestModal(m),
                        className: "w-full rounded-xl bg-primary py-2.5 text-xs font-bold text-white shadow hover:bg-opacity-90 transition",
                        children: "📩 Đặt lịch / Gửi yêu cầu tư vấn"
                      })
                    })
                  ]
                }))
              }),

              // TAB 2: MY REQUESTS
              activeTab === "requests" && d.jsxs("div", {
                className: "space-y-4",
                children: [
                  requests.length === 0 ? d.jsx("div", { className: "rounded-2xl bg-white p-12 text-center text-gray-500 border border-stroke", children: "Bạn chưa gửi yêu cầu tư vấn nào. Hãy chọn cố vấn từ danh sách và gửi yêu cầu nhé!" }) :
                  d.jsx("div", {
                    className: "overflow-x-auto rounded-2xl bg-white shadow-sm border border-stroke",
                    children: d.jsxs("table", {
                      className: "w-full text-left text-xs",
                      children: [
                        d.jsx("thead", {
                          className: "bg-gray-50 text-gray-600 border-b",
                          children: d.jsxs("tr", {
                            children: [
                              d.jsx("th", { className: "p-4", children: "Mã YC" }),
                              d.jsx("th", { className: "p-4", children: "Cố vấn" }),
                              d.jsx("th", { className: "p-4", children: "Chủ đề tư vấn" }),
                              d.jsx("th", { className: "p-4", children: "Thời gian mong muốn" }),
                              d.jsx("th", { className: "p-4", children: "Trạng thái" }),
                              d.jsx("th", { className: "p-4", children: "Ngày gửi" }),
                              d.jsx("th", { className: "p-4 text-right", children: "Thao tác" })
                            ]
                          })
                        }),
                        d.jsx("tbody", {
                          className: "divide-y divide-gray-100",
                          children: requests.map(req => d.jsxs("tr", {
                            key: req.id,
                            className: "hover:bg-gray-50",
                            children: [
                              d.jsxs("td", { className: "p-4 font-mono font-bold text-gray-500", children: ["#", req.id] }),
                              d.jsx("td", { className: "p-4 font-bold text-gray-900", children: req.mentorName }),
                              d.jsxs("td", {
                                className: "p-4 max-w-xs",
                                children: [
                                  d.jsx("div", { className: "font-semibold text-gray-800", children: req.topic }),
                                  d.jsx("div", { className: "text-gray-500 line-clamp-1 italic", children: req.reason })
                                ]
                              }),
                              d.jsx("td", { className: "p-4 text-gray-600", children: req.preferredTime || "Linh hoạt" }),
                              d.jsx("td", {
                                className: "p-4",
                                children: d.jsx("span", {
                                  className: `rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                    req.status === "PENDING" ? "bg-amber-100 text-amber-800" :
                                    req.status === "ACCEPTED" ? "bg-emerald-100 text-emerald-800" :
                                    req.status === "CANCELLED" ? "bg-gray-100 text-gray-600" : "bg-red-100 text-red-800"
                                  }`,
                                  children: req.status === "PENDING" ? "Chờ phản hồi" :
                                            req.status === "ACCEPTED" ? "Đã chấp nhận" :
                                            req.status === "CANCELLED" ? "Đã hủy" : "Từ chối"
                                })
                              }),
                              d.jsx("td", { className: "p-4 text-gray-500", children: req.createdAt.split(" ")[0] }),
                              d.jsx("td", {
                                className: "p-4 text-right",
                                children: req.status === "PENDING" ? d.jsx("button", {
                                  onClick: () => cancelRequest(req.id),
                                  className: "rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 transition",
                                  children: "Hủy yêu cầu"
                                }) : d.jsx("span", { className: "text-gray-400 italic", children: "—" })
                              })
                            ]
                          }))
                        })
                      ]
                    })
                  })
                ]
              }),

              // REQUEST MODAL
              showRequestModal && selectedMentor && d.jsx("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
                children: d.jsxs("div", {
                  className: "relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl space-y-4",
                  children: [
                    d.jsxs("div", {
                      className: "flex items-start justify-between border-b pb-3",
                      children: [
                        d.jsxs("div", {
                          children: [
                            d.jsx("h3", { className: "text-lg font-bold text-gray-900", children: "Đăng ký Tư vấn 1-on-1" }),
                            d.jsxs("p", { className: "text-xs text-gray-500", children: ["Cố vấn: ", d.jsx("strong", { className: "text-primary", children: selectedMentor.name })] })
                          ]
                        }),
                        d.jsx("button", {
                          onClick: () => setShowRequestModal(false),
                          className: "rounded-lg p-1 text-gray-400 hover:bg-gray-100 text-xl font-bold",
                          children: "✕"
                        })
                      ]
                    }),

                    d.jsxs("form", {
                      onSubmit: submitRequest,
                      className: "space-y-4 text-xs",
                      children: [
                        d.jsxs("div", {
                          className: "space-y-1",
                          children: [
                            d.jsx("label", { className: "font-bold text-gray-700", children: "Chủ đề muốn tư vấn *" }),
                            d.jsx("select", {
                              value: formTopic,
                              onChange: e => setFormTopic(e.target.value),
                              className: "w-full rounded-lg border border-stroke p-2.5 text-xs focus:border-primary focus:outline-none",
                              children: selectedMentor.topics.map((t, idx) => d.jsx("option", { key: idx, value: t, children: t }))
                            })
                          ]
                        }),

                        d.jsxs("div", {
                          className: "space-y-1",
                          children: [
                            d.jsx("label", { className: "font-bold text-gray-700", children: "Mục đích & Nội dung cần tư vấn chi tiết *" }),
                            d.jsx("textarea", {
                              rows: 4,
                              value: formReason,
                              onChange: e => setFormReason(e.target.value),
                              placeholder: "Mô tả câu hỏi, khó khăn hiện tại hoặc mục tiêu bạn muốn đạt được sau buổi tư vấn...",
                              className: "w-full rounded-lg border border-stroke p-2.5 text-xs focus:border-primary focus:outline-none",
                              required: true
                            })
                          ]
                        }),

                        d.jsxs("div", {
                          className: "space-y-1",
                          children: [
                            d.jsx("label", { className: "font-bold text-gray-700", children: "Khung thời gian đề xuất" }),
                            d.jsx("input", {
                              type: "text",
                              value: formPreferredTime,
                              onChange: e => setFormPreferredTime(e.target.value),
                              placeholder: "VD: Tối thứ 7 hoặc Chiều Chủ Nhật",
                              className: "w-full rounded-lg border border-stroke p-2.5 text-xs focus:border-primary focus:outline-none"
                            })
                          ]
                        }),

                        d.jsxs("div", {
                          className: "space-y-1",
                          children: [
                            d.jsx("label", { className: "font-bold text-gray-700", children: "Email nhận thông báo kết nối *" }),
                            d.jsx("input", {
                              type: "email",
                              value: formEmail,
                              onChange: e => setFormEmail(e.target.value),
                              className: "w-full rounded-lg border border-stroke p-2.5 text-xs focus:border-primary focus:outline-none",
                              required: true
                            })
                          ]
                        }),

                        d.jsxs("div", {
                          className: "flex justify-end gap-3 pt-3 border-t",
                          children: [
                            d.jsx("button", {
                              type: "button",
                              onClick: () => setShowRequestModal(false),
                              className: "rounded-xl border border-stroke px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100",
                              children: "Hủy"
                            }),
                            d.jsx("button", {
                              type: "submit",
                              disabled: submitting,
                              className: "rounded-xl bg-primary px-5 py-2 font-bold text-white shadow hover:bg-opacity-90 disabled:opacity-50",
                              children: submitting ? "Đang gửi..." : "Gửi yêu cầu"
                            })
                          ]
                        })
                      ]
                    })
                  ]
                })
              })
            ]
          })
        ]
      });
    };
  }

  // -------------------------------------------------------------------------
  // Floating AI Chatbot Widget (Present on EVERY page in Layout Ss)
  // -------------------------------------------------------------------------
  window.__RENDER_FLOATING_CHAT = function(d, k) {
    return d.jsx(FloatingChatbotWidget, { d, k });
  };

  function FloatingChatbotWidget({ d, k }) {
    const [isOpen, setIsOpen] = k.useState(false);
    const [messages, setMessages] = k.useState([
      {
        id: "w1",
        sender: "assistant",
        content: "Chào bạn! Tôi là Trợ lý sinh viên UET. Bạn cần hỗ trợ nhanh điều gì về học vụ, học bổng hay thủ tục tại trường?",
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    const [input, setInput] = k.useState("");
    const [loading, setLoading] = k.useState(false);
    const endRef = k.useRef(null);

    k.useEffect(() => {
      if (isOpen) {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages, isOpen]);

    const sendQuick = (txt) => {
      const q = (txt || input).trim();
      if (!q || loading) return;

      setMessages(prev => [...prev, {
        id: "u_" + Date.now(),
        sender: "user",
        content: q,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setInput("");
      setLoading(true);

      fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q })
      })
        .then(r => r.json())
        .then(res => {
          if (res.status === "success" && res.message) {
            setMessages(prev => [...prev, {
              id: "b_" + Date.now(),
              sender: "assistant",
              content: res.message.content,
              sources: res.message.sources || [],
              createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          } else {
            const fallback = (window.__mockChatbot ? window.__mockChatbot(q) : null);
            if (fallback && fallback.message) {
              setMessages(prev => [...prev, {
                id: "b_" + Date.now(),
                sender: "assistant",
                content: fallback.message.content,
                sources: fallback.message.sources || [],
                createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }]);
            }
          }
        })
        .catch(err => {
          const fallback = (window.__mockChatbot ? window.__mockChatbot(q) : null);
          if (fallback && fallback.message) {
            setMessages(prev => [...prev, {
              id: "b_" + Date.now(),
              sender: "assistant",
              content: fallback.message.content,
              sources: fallback.message.sources || [],
              createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          } else {
            setMessages(prev => [...prev, {
              id: "err_" + Date.now(),
              sender: "assistant",
              content: "Lỗi kết nối: " + err.message,
              createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          }
        })
        .finally(() => setLoading(false));
    };

    return d.jsxs("div", {
      className: "fixed bottom-6 right-6 z-50 flex flex-col items-end",
      children: [
        // Chat Window Modal
        isOpen && d.jsxs("div", {
          className: "mb-3 flex h-[500px] w-96 max-w-[calc(100vw-32px)] flex-col rounded-2xl bg-white shadow-2xl border border-stroke overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-6",
          children: [
            // Window Header
            d.jsxs("div", {
              className: "flex items-center justify-between bg-primary p-4 text-white shadow-sm",
              children: [
                d.jsxs("div", {
                  className: "flex items-center gap-2.5",
                  children: [
                    d.jsx("span", { className: "text-xl", children: "🤖" }),
                    d.jsxs("div", {
                      children: [
                        d.jsx("div", { className: "text-sm font-bold", children: "Trợ lý Sinh viên UET" }),
                        d.jsx("div", { className: "text-[10px] text-blue-200", children: "Hỏi đáp học vụ & Hướng dẫn sinh viên" })
                      ]
                    })
                  ]
                }),
                d.jsx("button", {
                  onClick: () => setIsOpen(false),
                  className: "rounded-lg p-1 text-white/80 hover:bg-white/20 text-lg font-bold",
                  children: "✕"
                })
              ]
            }),

            // Messages Container
            d.jsxs("div", {
              className: "flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/60 text-xs",
              children: [
                messages.map(m => d.jsxs("div", {
                  key: m.id,
                  className: `flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`,
                  children: [
                    m.sender === "assistant" && d.jsx("div", {
                      className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold",
                      children: "UET"
                    }),
                    d.jsxs("div", {
                      className: `max-w-[85%] rounded-2xl p-3 shadow-sm ${m.sender === "user" ? "bg-primary text-white rounded-tr-none" : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"}`,
                      children: [
                        d.jsx("div", { className: "whitespace-pre-wrap leading-relaxed", children: m.content }),
                        m.sources && m.sources.length > 0 && d.jsxs("div", {
                          className: "mt-2 pt-1 border-t border-gray-100 text-[10px] text-blue-600 font-semibold",
                          children: ["Nguồn: ", m.sources[0].title]
                        })
                      ]
                    })
                  ]
                })),
                loading && d.jsx("div", { className: "text-xs text-gray-400 italic pl-8", children: "Trợ lý đang tra cứu dữ liệu..." }),
                d.jsx("div", { ref: endRef })
              ]
            }),

            // Quick Chips
            d.jsx("div", {
              className: "flex gap-1.5 overflow-x-auto p-2 bg-white border-t border-gray-100 no-scrollbar",
              children: ["Điều kiện tốt nghiệp?", "Học bổng doanh nghiệp?", "CLB Tin học UET?"].map((chip, idx) => d.jsx("button", {
                key: idx,
                onClick: () => sendQuick(chip),
                className: "shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-700 hover:bg-primary/10 hover:text-primary transition",
                children: chip
              }))
            }),

            // Input
            d.jsxs("div", {
              className: "flex gap-2 border-t border-stroke bg-white p-3",
              children: [
                d.jsx("input", {
                  type: "text",
                  value: input,
                  onChange: e => setInput(e.target.value),
                  onKeyDown: e => { if (e.key === "Enter") sendQuick(); },
                  placeholder: "Hỏi trợ lý UET...",
                  className: "flex-1 rounded-xl border border-stroke bg-gray-50 px-3 py-2 text-xs focus:border-primary focus:outline-none"
                }),
                d.jsx("button", {
                  onClick: () => sendQuick(),
                  disabled: !input.trim() || loading,
                  className: "rounded-xl bg-primary px-3 text-xs font-bold text-white shadow hover:bg-opacity-90 disabled:opacity-40",
                  children: "➤"
                })
              ]
            })
          ]
        }),

        // Trigger Button
        d.jsxs("button", {
          onClick: () => setIsOpen(prev => !prev),
          className: "group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300",
          title: "Trợ lý sinh viên UET AI",
          children: [
            d.jsx("span", { className: "text-2xl", children: "🤖" }),
            !isOpen && d.jsx("span", {
              className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white border-2 border-white",
              children: ""
            })
          ]
        })
      ]
    });
  }

  console.log("%c[StudentHub Features] Loaded successfully! Ready to inject into application.", "color: #059669; font-weight: bold;");
})();

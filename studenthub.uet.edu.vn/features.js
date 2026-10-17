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
      const [activeTab, setActiveTab] = k.useState("explore"); // explore | assessment | roadmap
      const [roles, setRoles] = k.useState([]);
      const [loading, setLoading] = k.useState(true);
      const [searchQuery, setSearchQuery] = k.useState("");
      const [selectedCategory, setSelectedCategory] = k.useState("all");
      const [selectedRole, setSelectedRole] = k.useState(null);
      const [compareRoleA, setCompareRoleA] = k.useState(null);
      const [compareRoleB, setCompareRoleB] = k.useState(null);
      const [showCompareModal, setShowCompareModal] = k.useState(false);

      // Assessment State
      const [assessmentRoleId, setAssessmentRoleId] = k.useState("");
      const [ratings, setRatings] = k.useState({});
      const [assessmentSaved, setAssessmentSaved] = k.useState(false);
      const [savingAssessment, setSavingAssessment] = k.useState(false);

      // Roadmap State
      const [roadmapStages, setRoadmapStages] = k.useState([]);
      const [roadmapSaved, setRoadmapSaved] = k.useState(false);
      const [savingRoadmap, setSavingRoadmap] = k.useState(false);

      // Fetch roles on load
      k.useEffect(() => {
        fetch("/api/career/roles")
          .then(r => r.json())
          .then(data => {
            if (data.code === 200) {
              setRoles(data.data);
              if (data.data.length > 0) {
                setAssessmentRoleId(data.data[0].id);
              }
            }
          })
          .catch(e => console.error("Error loading career roles:", e))
          .finally(() => setLoading(false));
      }, []);

      // Filtered Roles
      const filteredRoles = roles.filter(r => {
        const matchesCat = selectedCategory === "all" || r.category === selectedCategory;
        const matchesQuery = !searchQuery || (r.title + " " + r.description).toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesQuery;
      });

      // Categories
      const categories = ["all", ...new Set(roles.map(r => r.category))];

      // Handle Assessment Rating Change
      const handleRatingChange = (skillName, val) => {
        setRatings(prev => ({ ...prev, [skillName]: val }));
        setAssessmentSaved(false);
      };

      // Save Assessment
      const saveAssessment = () => {
        setSavingAssessment(true);
        fetch("/api/career/assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roleId: assessmentRoleId,
            ratings: ratings,
            gapAnalysis: generateGapAnalysis()
          })
        })
          .then(r => r.json())
          .then(res => {
            if (res.code === 200) {
              setAssessmentSaved(true);
              alert("✅ Đã lưu kết quả tự đánh giá kỹ năng thành công!");
            }
          })
          .catch(e => alert("Lỗi khi lưu đánh giá: " + e.message))
          .finally(() => setSavingAssessment(false));
      };

      // Generate Gap Analysis
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

      // Generate Roadmap based on Role and Gaps
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

      // Save Roadmap
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

      return d.jsxs(Ss, {
        children: [
          d.jsx(Ji, { pageName: "Định hướng nghề nghiệp" }),
          d.jsxs("div", {
            className: "space-y-6",
            children: [
              // Header Banner
              d.jsxs("div", {
                className: "rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-6 text-white shadow-lg",
                children: [
                  d.jsxs("div", {
                    className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
                    children: [
                      d.jsxs("div", {
                        children: [
                          d.jsx("span", { className: "inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm", children: "Cổng Hỗ trợ Học vụ & Hướng nghiệp UET" }),
                          d.jsx("h2", { className: "mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl", children: "Định hướng Nghề nghiệp & Lộ trình Học tập" }),
                          d.jsx("p", { className: "mt-1 text-sm text-blue-100 max-w-2xl", children: "Khám phá các vị trí việc làm trong ngành CNTT, đối sánh yêu cầu kỹ năng với môn học tại trường và xây dựng lộ trình học tập cá nhân hóa." })
                        ]
                      }),
                      d.jsxs("div", {
                        className: "flex gap-2 shrink-0",
                        children: [
                          d.jsx("button", {
                            onClick: () => setActiveTab("explore"),
                            className: `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${activeTab === "explore" ? "bg-white text-blue-900 shadow-md" : "bg-white/10 text-white hover:bg-white/20"}`,
                            children: "1. Khám phá nghề"
                          }),
                          d.jsx("button", {
                            onClick: () => setActiveTab("assessment"),
                            className: `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${activeTab === "assessment" ? "bg-white text-blue-900 shadow-md" : "bg-white/10 text-white hover:bg-white/20"}`,
                            children: "2. Tự đánh giá kỹ năng"
                          }),
                          d.jsx("button", {
                            onClick: () => {
                              if (roadmapStages.length === 0) generateRoadmap();
                              setActiveTab("roadmap");
                            },
                            className: `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${activeTab === "roadmap" ? "bg-white text-blue-900 shadow-md" : "bg-white/10 text-white hover:bg-white/20"}`,
                            children: "3. Lộ trình học tập"
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),

              // TAB 1: CAREER EXPLORATION
              activeTab === "explore" && d.jsxs("div", {
                className: "space-y-6",
                children: [
                  // Search & Category Filters
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

                  // Role Cards Grid
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

                            // Key Stats
                            d.jsxs("div", {
                              className: "mt-4 space-y-1.5 rounded-lg bg-gray-50 p-3 text-xs",
                              children: [
                                d.jsxs("div", { className: "flex justify-between", children: [d.jsx("span", { className: "text-gray-500", children: "Mức thu nhập:" }), d.jsx("span", { className: "font-semibold text-emerald-600", children: role.salaryRange })] }),
                                d.jsxs("div", { className: "flex justify-between", children: [d.jsx("span", { className: "text-gray-500", children: "Nhu cầu thị trường:" }), d.jsx("span", { className: "font-semibold text-blue-600", children: role.marketDemand })] })
                              ]
                            }),

                            // Required Skills Preview
                            d.jsxs("div", {
                              className: "mt-4",
                              children: [
                                d.jsx("div", { className: "text-xs font-semibold text-gray-700 mb-2", children: "Kỹ năng trọng tâm:" }),
                                d.jsx("div", {
                                  className: "flex flex-wrap gap-1.5",
                                  children: role.requiredSkills.slice(0, 3).map((sk, idx) => d.jsx("span", {
                                    key: idx,
                                    className: "rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700",
                                    children: sk.name
                                  }))
                                })
                              ]
                            })
                          ]
                        }),

                        // Action Buttons
                        d.jsxs("div", {
                          className: "mt-6 pt-4 border-t border-gray-100 flex gap-2",
                          children: [
                            d.jsx("button", {
                              onClick: () => setSelectedRole(role),
                              className: "flex-1 rounded-xl bg-primary/10 py-2 text-center text-xs font-bold text-primary hover:bg-primary hover:text-white transition",
                              children: "Xem môn học & Chi tiết"
                            }),
                            d.jsx("button", {
                              onClick: () => {
                                setAssessmentRoleId(role.id);
                                setActiveTab("assessment");
                              },
                              className: "rounded-xl bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition",
                              title: "Đánh giá kỹ năng cho vai trò này",
                              children: "🎯 Tự đánh giá"
                            })
                          ]
                        })
                      ]
                    }))
                  })
                ]
              }),

              // TAB 2: SKILLS SELF-ASSESSMENT
              activeTab === "assessment" && d.jsxs("div", {
                className: "space-y-6",
                children: [
                  d.jsxs("div", {
                    className: "rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed",
                    children: [
                      d.jsx("strong", { children: "⚠️ Lưu ý quan trọng: " }),
                      "Kết quả đánh giá dưới đây dựa trên nhận định cá nhân của sinh viên, nhằm mục đích xác định khoảng cách kỹ năng để xây dựng lộ trình học tập tối ưu. Kết quả này không thay thế cho các chứng chỉ năng lực hay đánh giá chính thức của nhà trường."
                    ]
                  }),

                  // Role selector for assessment
                  d.jsxs("div", {
                    className: "flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm border border-stroke",
                    children: [
                      d.jsxs("div", {
                        className: "flex items-center gap-3 w-full sm:w-auto",
                        children: [
                          d.jsx("span", { className: "text-sm font-bold text-gray-700 whitespace-nowrap", children: "Chọn mục tiêu nghề nghiệp:" }),
                          d.jsx("select", {
                            value: assessmentRoleId,
                            onChange: e => setAssessmentRoleId(e.target.value),
                            className: "rounded-lg border border-stroke bg-gray-50 py-2 px-3 text-sm font-semibold text-gray-800 focus:border-primary focus:outline-none",
                            children: roles.map(r => d.jsx("option", { key: r.id, value: r.id, children: r.title }))
                          })
                        ]
                      }),
                      d.jsxs("div", {
                        className: "flex gap-2 w-full sm:w-auto",
                        children: [
                          d.jsx("button", {
                            onClick: saveAssessment,
                            disabled: savingAssessment,
                            className: "flex-1 sm:flex-initial rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700 disabled:opacity-50 transition",
                            children: savingAssessment ? "Đang lưu..." : "💾 Lưu kết quả đánh giá"
                          }),
                          d.jsx("button", {
                            onClick: generateRoadmap,
                            className: "flex-1 sm:flex-initial rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow hover:bg-opacity-90 transition",
                            children: "🚀 Sinh lộ trình từ kết quả này"
                          })
                        ]
                      })
                    ]
                  }),

                  // Assessment Questions
                  currentAssessmentRole && d.jsxs("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                      // Questions Column
                      d.jsxs("div", {
                        className: "lg:col-span-2 space-y-4",
                        children: [
                          d.jsx("h3", { className: "text-base font-bold text-gray-900", children: "Đánh giá mức độ tự tin của bạn trên thang điểm 1 - 5:" }),
                          currentAssessmentRole.requiredSkills.map(sk => {
                            const val = ratings[sk.name] || 1;
                            return d.jsxs("div", {
                              key: sk.name,
                              className: "rounded-xl bg-white p-5 shadow-sm border border-stroke space-y-3",
                              children: [
                                d.jsxs("div", {
                                  className: "flex justify-between items-start",
                                  children: [
                                    d.jsxs("div", {
                                      children: [
                                        d.jsx("span", { className: "rounded bg-blue-100 text-blue-800 text-[11px] font-semibold px-2 py-0.5", children: sk.category }),
                                        d.jsx("h4", { className: "mt-1 text-sm font-bold text-gray-900", children: sk.name })
                                      ]
                                    }),
                                    d.jsxs("span", { className: "text-xs font-bold text-primary", children: ["Mức: ", val, "/5"] })
                                  ]
                                }),
                                d.jsx("div", {
                                  className: "grid grid-cols-5 gap-2",
                                  children: [1, 2, 3, 4, 5].map(score => d.jsxs("button", {
                                    key: score,
                                    type: "button",
                                    onClick: () => handleRatingChange(sk.name, score),
                                    className: `py-2 rounded-lg text-xs font-semibold border text-center transition ${val === score ? "bg-primary text-white border-primary shadow-sm" : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"}`,
                                    children: [
                                      d.jsx("div", { className: "font-bold", children: score }),
                                      d.jsx("div", { className: "text-[10px] opacity-80", children: score === 1 ? "Mới học" : score === 3 ? "Trung bình" : score === 5 ? "Thành thạo" : "" })
                                    ]
                                  }))
                                })
                              ]
                            });
                          })
                        ]
                      }),

                      // Live Gap Analysis Summary Box
                      d.jsxs("div", {
                        className: "rounded-2xl bg-white p-6 shadow-sm border border-stroke h-fit space-y-5 sticky top-24",
                        children: [
                          d.jsx("h4", { className: "text-base font-bold text-gray-900 border-b pb-3", children: "Phân tích Khoảng cách Kỹ năng" }),
                          d.jsx("div", {
                            className: "space-y-4",
                            children: currentAssessmentRole.requiredSkills.map(sk => {
                              const cur = ratings[sk.name] || 1;
                              const target = sk.level === "Nâng cao" ? 4 : 3;
                              const percent = Math.min(100, Math.round((cur / 5) * 100));
                              const isGap = cur < target;
                              return d.jsxs("div", {
                                key: sk.name,
                                className: "space-y-1",
                                children: [
                                  d.jsxs("div", {
                                    className: "flex justify-between text-xs font-medium",
                                    children: [
                                      d.jsx("span", { className: "text-gray-700 line-clamp-1", children: sk.name }),
                                      d.jsxs("span", { className: isGap ? "text-amber-600 font-bold" : "text-emerald-600 font-bold", children: [cur, " / ", target, " (Mục tiêu)"] })
                                    ]
                                  }),
                                  d.jsx("div", {
                                    className: "h-2 w-full rounded-full bg-gray-100 overflow-hidden",
                                    children: d.jsx("div", {
                                      className: `h-full rounded-full transition-all duration-300 ${isGap ? "bg-amber-500" : "bg-emerald-500"}`,
                                      style: { width: `${percent}%` }
                                    })
                                  })
                                ]
                              });
                            })
                          }),
                          d.jsx("button", {
                            onClick: generateRoadmap,
                            className: "w-full rounded-xl bg-primary py-3 text-xs font-bold text-white shadow hover:bg-opacity-90 transition",
                            children: "Tiếp tục: Tạo Lộ trình Học tập →"
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),

              // TAB 3: LEARNING ROADMAP
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
                            onClick: generateRoadmap,
                            className: "rounded-xl border border-stroke bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition",
                            children: "🔄 Tái tạo lộ trình"
                          })
                        ]
                      })
                    ]
                  }),

                  // Stages Timeline
                  roadmapStages.length === 0 ? d.jsx("div", { className: "rounded-xl bg-white p-8 text-center text-gray-500", children: "Chưa có lộ trình. Nhấn 'Tái tạo lộ trình' để bắt đầu." }) :
                  d.jsx("div", {
                    className: "space-y-6",
                    children: roadmapStages.map((stage, idx) => d.jsxs("div", {
                      key: stage.stage,
                      className: "relative rounded-2xl bg-white p-6 shadow-sm border border-stroke pl-8",
                      children: [
                        // Stage Number Badge
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

                        // Recommended Courses for this stage
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

                    // Responsibilities
                    d.jsxs("div", {
                      className: "space-y-2",
                      children: [
                        d.jsx("h4", { className: "text-sm font-bold text-gray-900 uppercase tracking-wide", children: "Trách nhiệm chuyên môn:" }),
                        d.jsx("ul", {
                          className: "list-disc pl-5 space-y-1 text-xs text-gray-600",
                          children: selectedRole.responsibilities.map((r, i) => d.jsx("li", { key: i, children: r }))
                        })
                      ]
                    }),

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
                                    d.jsx("th", { className: "p-3", children: "Mức độ liên quan" }),
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

                    // Modal Footer
                    d.jsxs("div", {
                      className: "flex justify-end gap-3 pt-4 border-t",
                      children: [
                        d.jsx("button", {
                          onClick: () => setSelectedRole(null),
                          className: "rounded-xl border border-stroke px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100",
                          children: "Đóng"
                        }),
                        d.jsx("button", {
                          onClick: () => {
                            setAssessmentRoleId(selectedRole.id);
                            setSelectedRole(null);
                            setActiveTab("assessment");
                          },
                          className: "rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white shadow hover:bg-opacity-90",
                          children: "🎯 Bắt đầu tự đánh giá kỹ năng nghề này"
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
                            }),
                            d.jsx("div", { className: "text-xs font-bold text-gray-800", children: "Kỹ năng cần có:" }),
                            d.jsx("ul", {
                              className: "list-disc pl-4 text-xs text-gray-600 space-y-1",
                              children: compareRoleA.requiredSkills.map((s, idx) => d.jsx("li", { key: idx, children: s.name }))
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
                            }),
                            d.jsx("div", { className: "text-xs font-bold text-gray-800", children: "Kỹ năng cần có:" }),
                            d.jsx("ul", {
                              className: "list-disc pl-4 text-xs text-gray-600 space-y-1",
                              children: compareRoleB.requiredSkills.map((s, idx) => d.jsx("li", { key: idx, children: s.name }))
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

  // -------------------------------------------------------------------------
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
      const [orgs, setOrgs] = k.useState([]);
      const [loading, setLoading] = k.useState(true);
      const [searchQuery, setSearchQuery] = k.useState("");
      const [selectedCategory, setSelectedCategory] = k.useState("all");
      const [selectedOrg, setSelectedOrg] = k.useState(null);

      const fetchOrgs = () => {
        fetch("/api/organizations")
          .then(r => r.json())
          .then(res => {
            if (res.code === 200) setOrgs(res.data);
          })
          .catch(e => console.error("Error fetching organizations:", e))
          .finally(() => setLoading(false));
      };

      k.useEffect(() => {
        fetchOrgs();
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

      const filteredOrgs = orgs.filter(o => {
        const matchesCategory = selectedCategory === "all" || o.category === selectedCategory;
        const matchesSearch = !searchQuery || (o.name + " " + o.field + " " + o.summary).toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      return d.jsxs(Ss, {
        children: [
          d.jsx(Ji, { pageName: "Câu lạc bộ & Phòng thí nghiệm" }),
          d.jsxs("div", {
            className: "space-y-6",
            children: [
              // Header
              d.jsxs("div", {
                className: "rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 p-6 text-white shadow-lg",
                children: [
                  d.jsx("span", { className: "inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider", children: "Cộng đồng & Nghiên cứu Khoa học UET" }),
                  d.jsx("h2", { className: "mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl", children: "Danh bạ Câu lạc bộ, Phòng Thí nghiệm & Đơn vị" }),
                  d.jsx("p", { className: "mt-1 text-sm text-emerald-100 max-w-2xl", children: "Khám phá các tổ chức sinh viên năng động, các lab nghiên cứu trọng điểm và thông tin liên hệ chính thức của các Khoa, Phòng chức năng." })
                ]
              }),

              // Filter & Search Controls
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
                        placeholder: "Tìm kiếm CLB, Lab, từ khóa nghiên cứu...",
                        className: "w-full rounded-lg border border-stroke bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:bg-white transition"
                      }),
                      d.jsx("span", { className: "absolute left-3 top-3 text-gray-400", children: "🔍" })
                    ]
                  }),
                  d.jsxs("div", {
                    className: "flex flex-wrap gap-2 w-full md:w-auto",
                    children: [
                      { id: "all", label: "Tất cả" },
                      { id: "club", label: "🎪 Câu lạc bộ" },
                      { id: "lab", label: "🔬 Phòng Thí nghiệm" },
                      { id: "department", label: "🏛️ Khoa & Phòng ban" }
                    ].map(tab => d.jsx("button", {
                      key: tab.id,
                      onClick: () => setSelectedCategory(tab.id),
                      className: `rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${selectedCategory === tab.id ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
                      children: tab.label
                    }))
                  })
                ]
              }),

              // Cards Grid
              loading ? d.jsx("div", { className: "py-12 text-center text-gray-500", children: "Đang tải danh bạ tổ chức..." }) :
              filteredOrgs.length === 0 ? d.jsx("div", { className: "rounded-xl bg-white p-8 text-center text-gray-500 border border-stroke", children: "Không tìm thấy tổ chức phù hợp với từ khóa." }) :
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

                        // Recruitment Status
                        d.jsxs("div", {
                          className: "mt-4 flex items-center justify-between text-xs pt-3 border-t border-gray-100",
                          children: [
                            d.jsx("span", { className: "text-gray-500", children: "Trạng thái:" }),
                            d.jsx("span", { className: "font-semibold text-primary", children: org.recruitmentStatus })
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
              }),

              // DETAIL MODAL
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

                    // Info Grid
                    d.jsxs("div", {
                      className: "grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl bg-gray-50 p-4 text-xs",
                      children: [
                        d.jsxs("div", { children: [d.jsx("span", { className: "text-gray-500 block", children: "Yêu cầu tham gia:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedOrg.requirements || "Không yêu cầu" })] }),
                        d.jsxs("div", { children: [d.jsx("span", { className: "text-gray-500 block", children: "Đợt tuyển sinh:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedOrg.recruitmentPeriod || "Theo thông báo" })] }),
                        d.jsxs("div", { children: [d.jsx("span", { className: "text-gray-500 block", children: "Người phụ trách / Liên hệ:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedOrg.contactPerson })] }),
                        d.jsxs("div", { children: [d.jsx("span", { className: "text-gray-500 block", children: "Địa điểm sinh hoạt:" }), d.jsx("span", { className: "font-semibold text-gray-800", children: selectedOrg.location })] })
                      ]
                    }),

                    // Official Links
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

                    // Modal Footer
                    d.jsxs("div", {
                      className: "flex justify-between items-center pt-4 border-t",
                      children: [
                        d.jsxs("button", {
                          onClick: (e) => toggleBookmark(e, selectedOrg.id),
                          className: "flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-red-500 transition",
                          children: [
                            d.jsx("span", { children: selectedOrg.isBookmarked ? "❤️ Đã lưu vào mục yêu thích" : "🤍 Lưu vào mục yêu thích" })
                          ]
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

  // -------------------------------------------------------------------------
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

/* Isolated career guidance UI. Uses the existing portal's React runtime and shell. */
(function () {
  "use strict";
  const VIEWS = new Set(["overview", "assessment", "results", "explore", "detail", "roadmap", "jobs"]);
  const LEVELS = ["Cơ bản", "Đang làm quen", "Trung bình", "Khá", "Thành thạo"];
  const PATHS = {
    arrow: ["M5 12h14", "m13 6 6 6-6 6"], back: ["M19 12H5", "m11 6-6 6 6 6"],
    check: ["m5 12 4 4L19 6"], close: ["m6 6 12 12", "M6 18 18 6"],
    chart: ["M5 20V12h3v8", "M11 20V8h3v12", "M17 20V3h3v17"],
    code: ["m8 6-6 6 6 6", "m16 6 6 6-6 6", "m14 3-4 18"],
    shield: ["M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7l-9-4Z", "m8 12 3 3 5-6"],
    design: ["M4 4h16v16H4Z", "m4 16 5-5 4 4 3-3 4 4"],
    server: ["M3 3h18v7H3Z", "M3 14h18v7H3Z", "M7 6h.01M7 17h.01M11 6h6M11 17h6"],
    trend: ["M4 20V4", "M4 20h16", "m7 14 5-5 4 3 5-8", "M17 4h4v4"],
    flask: ["M9 3h6M10 3v7L4 20h16l-6-10V3", "M8 14h8"],
    briefcase: ["M3 7h18v14H3Z", "M8 7V3h8v4", "M3 12h18", "M10 12v3h4v-3"],
    chip: ["M6 6h12v12H6Z", "M9 9h6v6H9Z", "M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"],
    clipboard: ["M8 5H4v17h16V5h-4", "M8 2h8v6H8Z", "M8 12h8M8 17h5"],
    map: ["m3 4 6-2 6 2 6-2v18l-6 2-6-2-6 2V4Z", "M9 2v18M15 4v18"],
    info: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 11v6M12 7h.01"],
    bookmark: ["M6 3h12v19l-6-4-6 4V3Z"], search: ["M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z", "m15 15 7 7"],
    location: ["M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z", "M15 10a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"],
    download: ["M12 3v12", "m7 10 5 5 5-5", "M4 17v4h16v-4"],
    compare: ["M8 3v18M16 3v18", "m4 7 4-4 4 4", "m12 17 4 4 4-4"],
  };
  function readRoute() {
    try {
      const [view, roleId = "", tab = "overview"] = window.location.hash.slice(1).split("/").map(decodeURIComponent);
      return { view: VIEWS.has(view) ? view : "overview", roleId, tab };
    } catch (_) { return { view: "overview", roleId: "", tab: "overview" }; }
  }
  async function api(path, body, signal) {
    const response = await fetch("/api/career/" + path, {
      ...(body === undefined ? {} : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }), signal,
    });
    let payload;
    try { payload = await response.json(); } catch (_) { throw new Error("Không đọc được dữ liệu Hướng nghiệp. Hãy chạy website bằng máy chủ Python của dự án."); }
    if (!response.ok || payload.code !== 200) throw new Error(payload.message || "Không thể tải dữ liệu. Vui lòng thử lại.");
    return payload.data;
  }
  function statuses(stages) {
    let active = false;
    return stages.map(stage => {
      const done = stage.items.filter(item => item.done).length;
      const status = done === stage.items.length && done > 0 ? "COMPLETED" : (!active ? "IN_PROGRESS" : "PLANNED");
      if (status === "IN_PROGRESS") active = true;
      return { ...stage, status, completedCount: done, totalCount: stage.items.length };
    });
  }

  window.__CREATE_CAREER_PAGE = function (Shell, Breadcrumb, d, React) {
    const h = (type, props, ...children) => {
      const { key, ...rest } = props || {};
      return d.jsx(type, { ...rest, ...(children.length ? { children: children.length === 1 ? children[0] : children } : {}) }, key);
    };
    const icon = (name, className = "") => h("svg", { className: "cg-icon " + className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true },
      (PATHS[name] || PATHS.chart).map((path, i) => h("path", { key: i, d: path })));
    const badgeIcon = (name, color = "blue") => h("span", { className: "cg-icon-box cg-color-" + color }, icon(name));
    const button = (text, onClick, kind = "secondary", props = {}) => h("button", { type: "button", className: "cg-btn cg-btn-" + kind, onClick, ...props }, text);
    const notice = text => h("div", { className: "cg-notice" }, icon("info"), h("p", null, text));

    function CompanyLogo({ job, color }) {
      const [failed, setFailed] = React.useState(false);
      React.useEffect(() => setFailed(false), [job.logoUrl]);
      const showImage = job.logoUrl && !failed;
      return h("span", { className: "cg-company-logo cg-color-" + color + (showImage ? " cg-company-logo-image" : "") },
        showImage ? h("img", {
          src: job.logoUrl,
          alt: "Logo " + job.company,
          loading: "lazy",
          decoding: "async",
          onError: () => setFailed(true),
        }) : job.logo);
    }

    return function CareerGuidancePage() {
      const [route, setRoute] = React.useState(readRoute);
      const [data, setData] = React.useState(null);
      const [profile, setProfile] = React.useState(null);
      const [ranking, setRanking] = React.useState([]);
      const [saved, setSaved] = React.useState([]);
      const [plans, setPlans] = React.useState({});
      const [error, setError] = React.useState("");
      const [initialError, setInitialError] = React.useState("");
      const [message, setMessage] = React.useState("");
      const [busy, setBusy] = React.useState(false);
      const [draftDirty, setDraftDirty] = React.useState(false);
      const [search, setSearch] = React.useState("");
      const [category, setCategory] = React.useState("all");
      const [savedOnly, setSavedOnly] = React.useState(false);
      const [compare, setCompare] = React.useState([]);
      const [dialog, setDialog] = React.useState(null);
      const [jobType, setJobType] = React.useState("all");
      const [jobRole, setJobRole] = React.useState("all");
      const [jobQuery, setJobQuery] = React.useState("");
      const [resultTab, setResultTab] = React.useState("overview");
      const [planErrors, setPlanErrors] = React.useState({});
      const modalRef = React.useRef(null);
      const pageRef = React.useRef(null);
      const planRequests = React.useRef(new Set());

      React.useEffect(() => {
        const controller = new AbortController();
        Promise.all([api("roles", undefined, controller.signal), api("config", undefined, controller.signal), api("profile", undefined, controller.signal), api("recommendations", undefined, controller.signal), api("jobs", undefined, controller.signal)])
          .then(([roles, config, state, scores, jobs]) => { setData({ roles, config, jobs }); setProfile(state.profile); setSaved(state.savedRoleIds); setRanking(scores); })
          .catch(e => { if (e.name !== "AbortError") setInitialError(e.message); });
        return () => controller.abort();
      }, []);
      React.useEffect(() => {
        const onHash = () => { setRoute(readRoute()); setError(""); setMessage(""); };
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
      }, []);
      React.useEffect(() => {
        if (pageRef.current) {
          const container = pageRef.current.closest(".overflow-y-auto");
          if (container) container.scrollTo({ top: 0 });
          pageRef.current.focus({ preventScroll: true });
        }
      }, [route.view, route.roleId]);
      React.useEffect(() => {
        if (!message) return;
        const timeout = window.setTimeout(() => setMessage(""), 5500);
        return () => window.clearTimeout(timeout);
      }, [message]);
      React.useEffect(() => {
        const beforeUnload = event => {
          if (draftDirty || Object.values(plans).some(plan => plan.dirty)) { event.preventDefault(); event.returnValue = ""; }
        };
        const afterPrint = () => document.body.classList.remove("cg-printing");
        window.addEventListener("beforeunload", beforeUnload);
        window.addEventListener("afterprint", afterPrint);
        return () => { window.removeEventListener("beforeunload", beforeUnload); window.removeEventListener("afterprint", afterPrint); afterPrint(); };
      }, [draftDirty, plans]);
      React.useEffect(() => {
        if (!dialog) return;
        const previous = document.activeElement;
        const node = modalRef.current;
        node?.querySelector("button")?.focus();
        const keydown = event => {
          if (event.key === "Escape") setDialog(null);
          if (event.key === "Tab" && node) {
            const nodes = node.querySelectorAll("button:not(:disabled), a[href], input, select, [tabindex='0']");
            const first = nodes[0], last = nodes[nodes.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
          }
        };
        document.addEventListener("keydown", keydown);
        return () => { document.removeEventListener("keydown", keydown); previous?.focus(); };
      }, [dialog]);
      React.useEffect(() => {
        const id = route.roleId;
        if (!data || route.view !== "roadmap" || plans[id] || planRequests.current.has(id) || !data.roles.some(role => role.id === id)) return;
        planRequests.current.add(id);
        setPlanErrors(previous => ({ ...previous, [id]: "" }));
        api("plan?roleId=" + encodeURIComponent(id))
          .then(plan => setPlans(previous => ({ ...previous, [id]: { ...plan, dirty: false } })))
          .catch(e => setPlanErrors(previous => ({ ...previous, [id]: e.message })))
          .finally(() => planRequests.current.delete(id));
      }, [route.view, route.roleId, data, plans]);

      function navigate(view, roleId = "", tab = "overview") {
        const next = "#" + [view, ...(roleId ? [roleId, tab] : [])].map(encodeURIComponent).join("/");
        if (window.location.hash === next) setRoute({ view, roleId, tab });
        else window.location.hash = next;
        setError(""); setMessage("");
      }
      function updateProfile(update) {
        setProfile(previous => ({ ...previous, ...update, completed: false }));
        setDraftDirty(true); setError("");
      }
      async function persistSurvey(complete, destination, nextStep) {
        setBusy(true); setError("");
        try {
          const state = await api("profile", { profile: { ...profile, completed: complete, step: nextStep || profile.step } });
          setProfile(state.profile); setDraftDirty(false);
          if (complete) { setRanking(await api("recommendations")); setResultTab("overview"); }
          if (destination) navigate(destination);
          if (!complete && destination === "overview") setMessage("Đã lưu bản nháp. Bạn có thể tiếp tục bất cứ lúc nào.");
        } catch (e) { setError(e.message); } finally { setBusy(false); }
      }
      function nextStep() {
        if (profile.step === 1 && !profile.interests.length) { setError("Hãy chọn ít nhất một lĩnh vực bạn quan tâm."); return; }
        if (profile.step === 2 && data.config.skills.some(skill => !profile.ratings[skill.id])) { setError("Hãy đánh giá đầy đủ 8 kỹ năng. Mục chưa trả lời sẽ không tự được chấm điểm."); return; }
        if (profile.step === 3 && (!profile.goal || !profile.postgraduate)) { setError("Hãy chọn mục tiêu nghề nghiệp và kế hoạch học cao hơn."); return; }
        persistSurvey(profile.step === 3, profile.step === 3 ? "results" : null, Math.min(3, profile.step + 1));
      }
      async function toggleSaved(roleId) {
        setBusy(true); setError("");
        try { const result = await api("saved-roles", { roleId, saved: !saved.includes(roleId) }); setSaved(result.savedRoleIds); setMessage(saved.includes(roleId) ? "Đã bỏ lưu nghề." : "Đã lưu nghề vào danh sách quan tâm."); }
        catch (e) { setError(e.message); } finally { setBusy(false); }
      }
      async function savePlan(roleId, regenerate = false) {
        setBusy(true); setError("");
        try {
          const current = plans[roleId];
          const completions = regenerate ? {} : Object.fromEntries(current.stages.flatMap(stage => stage.items.map(item => [item.id, item.done])));
          const plan = await api("plan", { roleId, completions, regenerate });
          setPlans(previous => ({ ...previous, [roleId]: { ...plan, dirty: false } }));
          setMessage(regenerate ? "Đã cập nhật lộ trình theo đánh giá. Các mục đã hoàn thành còn phù hợp được giữ lại." : "Đã lưu tiến độ lộ trình.");
        } catch (e) { setError(e.message); } finally { setBusy(false); }
      }
      function togglePlanItem(roleId, itemId) {
        setPlans(previous => {
          const plan = previous[roleId];
          return { ...previous, [roleId]: { ...plan, dirty: true, stages: statuses(plan.stages.map(stage => ({ ...stage, items: stage.items.map(item => item.id === itemId ? { ...item, done: !item.done } : item) }))) } };
        });
      }
      function toggleCompare(id) {
        if (compare.includes(id)) setCompare(compare.filter(value => value !== id));
        else if (compare.length < 2) setCompare([...compare, id]);
        else setError("Bạn có thể so sánh tối đa 2 nghề cùng lúc.");
      }
      if (!data || !profile) return h(Shell, null, h("section", { className: "cg-app cg-loading" }, initialError ? h("div", { role: "alert" }, h("h1", null, "Chưa tải được Hướng nghiệp"), h("p", null, initialError), button("Thử lại", () => window.location.reload(), "primary")) : h("div", { role: "status" }, h("span", { className: "cg-spinner" }), "Đang chuẩn bị không gian hướng nghiệp của bạn…")));

      const { roles, config, jobs } = data;
      const roleById = Object.fromEntries(roles.map(role => [role.id, role]));
      const rankById = Object.fromEntries(ranking.map(result => [result.roleId, result]));
      const topRole = roleById[ranking[0]?.roleId] || roles[0];
      const meta = role => config.roleProfiles[role.id] || { name: role.title, icon: "chart", color: "blue" };
      const scoreFor = role => profile.completed ? rankById[role.id] : null;
      const careerName = role => meta(role).name;
      const scoreBadge = role => {
        const result = scoreFor(role);
        return h("div", { className: "cg-score" + (result ? "" : " cg-score-empty") }, h("strong", null, result ? result.score + "%" : "—"), h("span", null, result ? "Mức độ phù hợp" : "Chưa đánh giá"));
      };
      const empty = (title, text, action) => h("div", { className: "cg-empty cg-card" }, badgeIcon("map"), h("h2", null, title), h("p", null, text), action);
      const heading = (title, subtitle, action, back = "overview") => h("div", { className: "cg-heading" }, h("div", { className: "cg-heading-copy" }, route.view !== "overview" && button(icon("back"), () => navigate(back), "icon", { "aria-label": "Quay lại " + (back === "overview" ? "tổng quan" : "danh sách nghề") }), h("div", null, h("h1", null, title), subtitle && h("p", null, subtitle))), action);
      const tabs = (items, current, onChange) => h("div", { className: "cg-tabs", role: "group", "aria-label": "Chọn nội dung" }, items.map(([id, label]) => button(label, () => onChange(id), "tab", { key: id, "aria-pressed": current === id, className: "cg-tab" + (current === id ? " is-active" : "") })));
      const roleOptions = (value, onChange, all = false, label = "Nghề nghiệp") => h("label", { className: "cg-select-label" }, h("span", { className: "cg-sr-only" }, label), h("select", { value, onChange: event => onChange(event.target.value), "aria-label": label }, all && h("option", { value: "all" }, "Tất cả nghề nghiệp"), roles.map(role => h("option", { key: role.id, value: role.id }, careerName(role)))));
      const courseList = role => h("div", { className: "cg-course-list" }, role.courseMappings.map(course => h("article", { className: "cg-course", key: course.courseCode }, h("div", { className: "cg-row-between" }, h("span", { className: "cg-course-code" }, course.courseCode), h("span", { className: "cg-pill" }, course.relevance)), h("h3", null, course.courseName), h("p", null, course.reason))));
      const gapList = role => {
        const result = scoreFor(role);
        return result ? h("div", { className: "cg-gap-list" }, result.gaps.map(gap => h("div", { className: "cg-gap-row", key: gap.id }, h("div", null, h("strong", null, gap.label), h("p", null, gap.gap ? "Cần nâng thêm " + gap.gap + " mức" : "Đã đạt mức gợi ý")), h("div", { className: "cg-gap-meter" }, h("div", { className: "cg-progress", role: "progressbar", "aria-label": gap.label, "aria-valuenow": gap.current, "aria-valuemin": 0, "aria-valuemax": 5 }, h("span", { style: { width: gap.current / 5 * 100 + "%" } })), h("small", null, "Hiện tại " + gap.current + "/5 · Mục tiêu " + gap.target + "/5")), h("span", { className: "cg-pill " + (gap.gap ? "cg-pill-amber" : "cg-pill-green") }, gap.gap ? "Cần bổ sung" : "Đã đạt")))) : empty("Cùng tìm hiểu năng lực của bạn", "Hoàn thành bài đánh giá để xem kỹ năng đã có và kỹ năng cần bổ sung cho nghề này.", button("Làm bài đánh giá", () => navigate("assessment"), "primary"));
      };

      function overview() {
        const actions = [
          ["clipboard", "blue", "Làm bài đánh giá", "Tìm hiểu sở thích, kỹ năng và mục tiêu của bạn.", profile.completed ? "Đánh giá lại" : profile.interests.length ? "Tiếp tục đánh giá" : "Bắt đầu", () => navigate("assessment")],
          ["chart", "cyan", "Xem kết quả gợi ý", "Khám phá các nghề nghiệp phù hợp và lý do gợi ý.", "Xem kết quả", () => navigate("results")],
          ["map", "blue", "Lộ trình phát triển", "Kết nối kỹ năng với học phần UET và theo dõi tiến độ.", "Khám phá", () => navigate("roadmap", topRole.id)],
          ["briefcase", "orange", "Cơ hội việc làm", "Tìm hiểu vị trí việc làm và thực tập theo định hướng.", "Tìm hiểu cơ hội", () => navigate("jobs")],
        ];
        return h(React.Fragment, null,
          h("section", { className: "cg-hero" }, h("img", { src: "/images/career-banner-uet.png", alt: "Sinh viên UET khám phá những hướng đi nghề nghiệp", className: "cg-hero-art" }), h("div", { className: "cg-hero-copy" }, h("span", { className: "cg-eyebrow" }, "CÙNG UET ĐỊNH HƯỚNG TƯƠNG LAI"), h("h1", null, "Hướng nghiệp"), h("p", null, "Khám phá tiềm năng của bạn.", h("br"), "Tìm hướng đi phù hợp với sở thích, năng lực và mục tiêu."), button(h(React.Fragment, null, profile.completed ? "Xem hướng đi của bạn" : "Khám phá bản thân", icon("arrow")), () => navigate(profile.completed ? "results" : "assessment"), "primary"))),
          h("div", { className: "cg-action-grid" }, actions.map(([symbol, color, title, text, cta, action], i) => h("article", { className: "cg-card cg-action-card", key: title }, badgeIcon(symbol, color), h("h2", null, title), h("p", null, text), button(h(React.Fragment, null, cta, icon("arrow")), action, i === 0 ? "primary" : "secondary")))),
          notice("Kết quả hướng nghiệp mang tính chất tham khảo, giúp bạn khám phá và tự ra quyết định về nghề nghiệp."),
          h("div", { className: "cg-section-heading" }, h("div", null, h("h2", null, "Chủ động khám phá nghề nghiệp"), h("p", null, "6 hướng nghề · Kỹ năng chuyên môn · Học phần UET")), button("Xem tất cả nghề →", () => navigate("explore"), "link")),
          h("div", { className: "cg-featured-grid" }, roles.slice(0, 3).map(role => h("button", { type: "button", key: role.id, className: "cg-card cg-featured", onClick: () => navigate("detail", role.id) }, badgeIcon(meta(role).icon, meta(role).color), h("div", null, h("h3", null, careerName(role)), h("p", null, role.category)), icon("arrow")))));
      }

      function assessment() {
        const names = ["Sở thích", "Kỹ năng", "Mục tiêu"];
        let contents;
        if (profile.step === 1) contents = h(React.Fragment, null, h("h2", null, "Bạn quan tâm đến những lĩnh vực nào?"), h("p", { className: "cg-muted" }, "Có thể chọn nhiều lựa chọn. Hãy chọn những điều khiến bạn muốn tìm hiểu thêm."), h("div", { className: "cg-interest-grid" }, config.interests.map(interest => {
          const checked = profile.interests.includes(interest.id);
          return h("button", { type: "button", className: "cg-interest" + (checked ? " is-selected" : ""), key: interest.id, "aria-pressed": checked, onClick: () => updateProfile({ interests: checked ? profile.interests.filter(value => value !== interest.id) : [...profile.interests, interest.id] }) }, badgeIcon(interest.icon, interest.color), h("span", null, interest.label), checked && h("span", { className: "cg-selected-check" }, icon("check")));
        })));
        else if (profile.step === 2) contents = h(React.Fragment, null, h("h2", null, "Bạn tự tin với các kỹ năng sau ở mức nào?"), h("p", { className: "cg-muted" }, "Đánh giá năng lực hiện tại trên thang 1–5. Không cần chọn mức cao để có một hướng đi phù hợp."), h("div", { className: "cg-skill-list" }, config.skills.map(skill => {
          const current = profile.ratings[skill.id];
          return h("fieldset", { className: "cg-skill-row", key: skill.id }, h("legend", null, skill.label), h("div", { className: "cg-rating" }, [1, 2, 3, 4, 5].map(value => h("label", { key: value, className: "cg-rating-choice" + (current >= value ? " is-filled" : "") }, h("input", { type: "radio", name: "skill-" + skill.id, value, checked: current === value, onChange: () => updateProfile({ ratings: { ...profile.ratings, [skill.id]: value } }), "aria-label": value + " trên 5 — " + LEVELS[value - 1] }), h("span", null, value)))), h("span", { className: "cg-level" + (!current ? " cg-unanswered" : "") }, current ? LEVELS[current - 1] : "Chưa trả lời"));
        })), h("div", { className: "cg-scale" }, LEVELS.map((label, index) => h("span", { key: label }, h("b", null, index + 1), label))));
        else contents = h("div", { className: "cg-goals" }, h("fieldset", null, h("legend", null, "Mục tiêu của bạn trong 3–5 năm tới là gì?"), config.goals.map(goal => h("label", { className: "cg-radio-option", key: goal.id }, h("input", { type: "radio", name: "career-goal", checked: profile.goal === goal.id, onChange: () => updateProfile({ goal: goal.id }) }), h("span", null, goal.label)))), h("fieldset", null, h("legend", null, "Bạn có dự định học lên bậc cao hơn (Thạc sĩ, Tiến sĩ) không?"), h("p", { className: "cg-muted" }, "Thông tin này giúp điều chỉnh các bước trong lộ trình học tập."), config.postgraduate.map(option => h("label", { className: "cg-radio-option", key: option.id }, h("input", { type: "radio", name: "postgraduate", checked: profile.postgraduate === option.id, onChange: () => updateProfile({ postgraduate: option.id }) }), h("span", null, option.label)))));
        return h(React.Fragment, null,
          heading("Bài đánh giá hướng nghiệp", "Hiểu bản thân hơn qua 3 bước ngắn gọn.", button("Lưu và thoát", () => persistSurvey(false, "overview"), "secondary", { disabled: busy })),
          h("ol", { className: "cg-stepper", "aria-label": "Tiến trình đánh giá" }, names.map((name, index) => h("li", { key: name, className: index + 1 === profile.step ? "is-current" : index + 1 < profile.step ? "is-complete" : "", "aria-current": index + 1 === profile.step ? "step" : undefined }, h("span", { className: "cg-step-dot" }, index + 1 < profile.step ? icon("check") : index + 1), h("div", null, h("small", null, "BƯỚC " + (index + 1) + "/3"), h("strong", null, name))))),
          h("section", { className: "cg-card cg-survey" }, h("fieldset", { disabled: busy, className: "cg-survey-body" }, contents), h("div", { className: "cg-form-footer" }, button(h(React.Fragment, null, icon("back"), "Quay lại"), () => profile.step === 1 ? navigate("overview") : persistSurvey(false, null, profile.step - 1), "secondary", { disabled: busy }), h("span", { className: "cg-save-hint" }, busy ? "Đang lưu…" : draftDirty ? "Có thay đổi chưa lưu" : "Bản đánh giá đã được lưu"), button(h(React.Fragment, null, busy ? "Đang lưu…" : profile.step === 3 ? "Hoàn thành" : "Tiếp theo", icon("arrow")), nextStep, "primary", { disabled: busy }))),
          notice("Bạn có thể lưu bản nháp và tiếp tục sau. Mức độ phù hợp là chỉ số tham khảo từ câu trả lời tự đánh giá."));
      }

      function results() {
        if (!profile.completed || !ranking.length) return h(React.Fragment, null, heading("Kết quả hướng nghiệp"), empty("Khám phá hướng đi dành cho bạn", "Hoàn thành bài đánh giá sở thích, kỹ năng và mục tiêu để nhận các gợi ý có giải thích.", button("Tiếp tục bài đánh giá", () => navigate("assessment"), "primary")));
        const top = scoreFor(topRole);
        return h(React.Fragment, null,
          heading("Kết quả hướng nghiệp", "Những hướng đi để bạn cân nhắc và khám phá thêm.", button(h(React.Fragment, null, icon("download"), "In / Lưu PDF"), () => { document.body.classList.add("cg-printing"); window.print(); })),
          tabs([["overview", "Tổng quan"], ["gaps", "Kỹ năng cần bổ sung"], ["courses", "Học phần gợi ý"], ["roadmap", "Lộ trình học tập"]], resultTab, value => value === "roadmap" ? navigate("roadmap", topRole.id) : setResultTab(value)),
          notice("Chỉ số phù hợp tham khảo: sở thích 40%, kỹ năng 40%, mục tiêu nghề nghiệp 20%. Chỉ số này không phải xác suất thành công hay đánh giá chính thức của nhà trường."),
          resultTab === "overview" ? h("section", { className: "cg-card cg-results" }, h("div", { className: "cg-section-heading" }, h("h2", null, "Các nghề nghiệp phù hợp với bạn"), button("Đánh giá lại", () => { updateProfile({ step: 1 }); navigate("assessment"); }, "link")), ranking.map((result, index) => {
            const role = roleById[result.roleId];
            return h("article", { className: "cg-result-row", key: role.id }, h("span", { className: "cg-rank" + (index === 0 ? " cg-rank-first" : "") }, index === 0 ? "🏆" : index + 1), badgeIcon(meta(role).icon, meta(role).color), h("button", { className: "cg-result-copy", type: "button", onClick: () => navigate("detail", role.id) }, h("h3", null, careerName(role)), h("p", null, role.description), h("span", { className: "cg-text-link" }, "Xem lý do phù hợp →")), scoreBadge(role));
          })) : h("section", { className: "cg-card cg-panel" }, h("div", { className: "cg-section-heading" }, h("div", null, h("h2", null, careerName(topRole)), h("p", null, "Gợi ý cho nghề có chỉ số phù hợp cao nhất")), button("Xem chi tiết nghề →", () => navigate("detail", topRole.id), "link")), resultTab === "gaps" ? gapList(topRole) : courseList(topRole)),
          h("div", { className: "cg-score-explanation" }, h("strong", null, "Vì sao " + careerName(topRole) + " đứng đầu?"), h("p", null, top.reasons[0]), h("div", { className: "cg-score-parts" }, h("span", null, "Sở thích: " + top.breakdown.interests + "/40"), h("span", null, "Kỹ năng: " + top.breakdown.skills + "/40"), h("span", null, "Mục tiêu: " + top.breakdown.goals + "/20"))));
      }

      function explore() {
        const filtered = roles.filter(role => (category === "all" || role.category === category) && (!savedOnly || saved.includes(role.id)) && (role.title + " " + role.description + " " + role.requiredSkills.map(skill => skill.name).join(" ")).toLocaleLowerCase("vi").includes(search.toLocaleLowerCase("vi")));
        return h(React.Fragment, null, heading("Khám phá nghề nghiệp", "Tìm hiểu công việc, kỹ năng và các học phần liên quan."),
          h("div", { className: "cg-card cg-filters" }, h("label", { className: "cg-search" }, icon("search"), h("input", { value: search, onChange: event => setSearch(event.target.value), placeholder: "Tìm nghề nghiệp, kỹ năng…", "aria-label": "Tìm nghề nghiệp, kỹ năng" })), h("select", { value: category, onChange: event => setCategory(event.target.value), "aria-label": "Lọc lĩnh vực" }, h("option", { value: "all" }, "Tất cả lĩnh vực"), [...new Set(roles.map(role => role.category))].map(value => h("option", { key: value, value }, value))), button(h(React.Fragment, null, icon("bookmark"), "Đã lưu (" + saved.length + ")"), () => setSavedOnly(!savedOnly), savedOnly ? "primary" : "secondary", { "aria-pressed": savedOnly })),
          h("p", { className: "cg-muted" }, filtered.length + " nghề nghiệp"),
          filtered.length ? h("div", { className: "cg-career-grid" }, filtered.map(role => h("article", { className: "cg-card cg-career-card", key: role.id }, h("div", { className: "cg-row-between" }, badgeIcon(meta(role).icon, meta(role).color), button(icon("bookmark"), () => toggleSaved(role.id), "icon", { disabled: busy, "aria-label": (saved.includes(role.id) ? "Bỏ lưu " : "Lưu ") + careerName(role), "aria-pressed": saved.includes(role.id), className: "cg-btn cg-btn-icon" + (saved.includes(role.id) ? " is-saved" : "") })), h("span", { className: "cg-category" }, role.category), h("h2", null, careerName(role)), h("p", null, role.description), h("div", { className: "cg-tags" }, role.requiredSkills.slice(0, 2).map(skill => h("span", { key: skill.name }, skill.category))), h("div", { className: "cg-career-footer" }, button("Xem chi tiết →", () => navigate("detail", role.id), "secondary"), h("label", { className: "cg-compare-check" }, h("input", { type: "checkbox", checked: compare.includes(role.id), onChange: () => toggleCompare(role.id) }), "So sánh"))))) : empty("Chưa có nghề phù hợp bộ lọc", "Thử đổi từ khóa hoặc chọn lại lĩnh vực.", button("Xóa bộ lọc", () => { setSearch(""); setCategory("all"); setSavedOnly(false); })),
          compare.length > 0 && h("div", { className: "cg-compare-bar" }, h("div", null, icon("compare"), h("strong", null, "So sánh nghề (" + compare.length + "/2)"), h("span", null, compare.map(id => careerName(roleById[id])).join(" · "))), h("div", { className: "cg-inline-actions" }, button("Bỏ chọn", () => setCompare([]), "link"), button("So sánh", () => setDialog({ type: "compare" }), "primary", { disabled: compare.length !== 2 }))));
      }

      function detail(role) {
        const result = scoreFor(role);
        const selectedTab = ["overview", "skills", "courses", "jobs"].includes(route.tab) ? route.tab : "overview";
        return h(React.Fragment, null,
          heading(careerName(role), role.category, button(h(React.Fragment, null, icon("bookmark"), saved.includes(role.id) ? "Đã lưu nghề" : "Lưu nghề này"), () => toggleSaved(role.id), "secondary", { disabled: busy, "aria-pressed": saved.includes(role.id) }), "explore"),
          h("div", { className: "cg-fit-bar cg-card" }, h("span", null, "Mức độ phù hợp với bạn"), h("div", { className: "cg-progress" }, h("span", { style: { width: (result?.score || 0) + "%" } })), h("strong", null, result ? result.score + "%" : "Chưa đánh giá")),
          tabs([["overview", "Tổng quan"], ["skills", "Kỹ năng yêu cầu"], ["courses", "Học phần gợi ý"], ["jobs", "Cơ hội việc làm"]], selectedTab, tab => navigate("detail", role.id, tab)),
          selectedTab === "overview" ? h("section", { className: "cg-card cg-panel cg-detail-grid" }, h("div", null, h("h2", null, "Mô tả công việc"), h("p", { className: "cg-body-copy" }, role.description), h("h2", null, "Vì sao phù hợp với bạn?"), result ? h("ul", { className: "cg-check-list" }, result.reasons.map(reason => h("li", { key: reason }, icon("check"), h("span", null, reason)))) : h("p", { className: "cg-muted" }, "Làm bài đánh giá để nhận giải thích dựa trên sở thích, kỹ năng và mục tiêu của bạn."), h("h2", null, "Những điểm cần phát triển"), result ? h("ul", { className: "cg-improve-list" }, result.gaps.some(gap => gap.gap) ? result.gaps.filter(gap => gap.gap).map(gap => h("li", { key: gap.id }, h("span", null, "!"), gap.label + ": hiện tại " + gap.current + "/5, mức gợi ý " + gap.target + "/5.")) : h("li", null, icon("check"), "Bạn đã đạt các mức kỹ năng tự đánh giá được gợi ý. Hãy tiếp tục tích lũy kinh nghiệm thực tế.")) : button("Làm bài đánh giá", () => navigate("assessment"), "primary"), h("h2", null, "Công việc thường gặp"), h("ul", { className: "cg-bullet-list" }, role.responsibilities.map(text => h("li", { key: text }, text)))), h("aside", { className: "cg-detail-aside" }, h("img", { src: "/images/career-hero.png", alt: "Khám phá định hướng nghề nghiệp tại UET" }), h("blockquote", null, "Mỗi kỹ năng hôm nay là một bước gần hơn đến hướng đi bạn chọn."), h("div", { className: "cg-mini-stats" }, h("span", null, h("strong", null, role.courseMappings.length), "Học phần liên quan"), h("span", null, h("strong", null, role.requiredSkills.length), "Nhóm kỹ năng")), button(h(React.Fragment, null, "Xem lộ trình học tập", icon("arrow")), () => navigate("roadmap", role.id), "primary")))
            : selectedTab === "skills" ? h("section", { className: "cg-card cg-panel" }, h("h2", null, "Khoảng cách kỹ năng của bạn"), gapList(role), h("h2", null, "Kỹ năng chuyên môn của nghề"), h("div", { className: "cg-required-skills" }, role.requiredSkills.map(skill => h("article", { key: skill.name }, h("div", null, h("strong", null, skill.name), h("p", null, skill.category)), h("span", { className: "cg-pill" }, skill.level)))))
            : selectedTab === "courses" ? h("section", { className: "cg-card cg-panel" }, h("h2", null, "Học phần UET gợi ý"), h("p", { className: "cg-muted" }, "Tham khảo từ danh mục môn học hiện có của dự án; đối chiếu chương trình đào tạo áp dụng cho khóa của bạn."), courseList(role)) : renderJobs(role.id),
          h("div", { className: "cg-bottom-actions" }, button("Khám phá nghề khác", () => navigate("explore")), button(h(React.Fragment, null, "Xem lộ trình học tập", icon("arrow")), () => navigate("roadmap", role.id), "primary")));
      }

      function roadmap(role) {
        const plan = plans[role.id];
        const done = plan?.stages.reduce((sum, stage) => sum + stage.completedCount, 0) || 0;
        const total = plan?.stages.reduce((sum, stage) => sum + stage.totalCount, 0) || 0;
        const selectedTab = ["overview", "courses", "skills", "jobs"].includes(route.tab) ? route.tab : "overview";
        const timeline = plan && h("div", { className: "cg-timeline" }, plan.stages.map(stage => {
          const items = stage.items.map(item => h("label", {
            className: "cg-task" + (item.done ? " is-done" : ""), key: item.id,
          },
          h("input", { type: "checkbox", checked: !!item.done, disabled: busy, onChange: () => togglePlanItem(role.id, item.id) }),
          h("span", null, item.label, item.courseCode && h("small", null, item.courseCode)),
          item.reason && h("span", { className: "cg-task-reason" }, item.reason)));
          const stageHeading = h("div", { className: "cg-stage-heading" },
            h("div", null,
              h("h3", null, "Giai đoạn " + stage.stage + ": " + stage.title.replace(/^Giai đoạn \d+:\s*/i, "")),
              h("p", null, stage.duration)),
            h("span", { className: "cg-pill cg-status-pill" }, stage.status === "COMPLETED" ? "Đã hoàn thành" : stage.status === "IN_PROGRESS" ? "Đang học" : "Tiếp theo"));
          return h("section", { className: "cg-timeline-stage cg-status-" + stage.status.toLowerCase(), key: stage.stage },
            h("span", { className: "cg-timeline-node" }, stage.status === "COMPLETED" ? icon("check") : stage.stage),
            h("div", { className: "cg-card cg-stage-card" }, stageHeading, h("div", { className: "cg-stage-items" }, items)));
        }));
        const footer = plan && h("div", { className: "cg-plan-footer cg-card" },
          h("div", null, h("strong", null, plan.dirty ? "Có thay đổi chưa lưu" : plan.saved ? "Tiến độ đã được lưu" : "Lộ trình gợi ý mới"), h("p", null, "Đánh dấu những mục bạn đã thực sự hoàn thành.")),
          h("div", { className: "cg-inline-actions" },
            button("Cập nhật theo đánh giá", () => savePlan(role.id, true), "secondary", { disabled: busy || plan.dirty }),
            button(busy ? "Đang lưu…" : "Lưu tiến độ", () => savePlan(role.id), "primary", { disabled: busy || (plan.saved && !plan.dirty) })));
        let panel;
        if (selectedTab === "courses") panel = h("section", { className: "cg-card cg-panel" }, courseList(role));
        else if (selectedTab === "skills") panel = h("section", { className: "cg-card cg-panel" }, gapList(role));
        else if (selectedTab === "jobs") panel = renderJobs(role.id);
        else if (plan) panel = h(React.Fragment, null, timeline, footer);
        else if (planErrors[role.id]) panel = empty("Chưa tải được lộ trình", planErrors[role.id], button("Thử lại", () => { setPlanErrors(previous => ({ ...previous, [role.id]: "" })); setPlans(previous => ({ ...previous })); }));
        else panel = h("p", { role: "status", className: "cg-card cg-panel" }, "Đang tải lộ trình…");
        return h(React.Fragment, null, heading("Lộ trình phát triển", "Từng bước xây dựng năng lực cho nghề bạn chọn.", roleOptions(role.id, id => navigate("roadmap", id))),
          h("section", { className: "cg-card cg-roadmap-summary" }, badgeIcon(meta(role).icon, meta(role).color), h("div", null, h("h2", null, careerName(role)), h("p", null, done + "/" + total + " mục đã hoàn thành")), h("div", { className: "cg-progress" }, h("span", { style: { width: (total ? done / total * 100 : 0) + "%" } })), h("strong", null, (total ? Math.round(done / total * 100) : 0) + "%")),
          tabs([["overview", "Tổng quan"], ["courses", "Học phần gợi ý"], ["skills", "Kỹ năng cần học"], ["jobs", "Cơ hội thực tập"]], selectedTab, tab => navigate("roadmap", role.id, tab)),
          panel,
          notice("Thời gian từng giai đoạn mang tính gợi ý. Bạn có thể hoàn thành theo nhịp học của mình; tiến độ được lưu riêng cho từng nghề."));
      }

      function renderJobs(forRole) {
        const filtered = jobs.filter(job => (!forRole ? jobRole === "all" || job.roleId === jobRole : job.roleId === forRole) && (jobType === "all" || job.type === jobType) && (job.title + " " + job.company).toLocaleLowerCase("vi").includes(jobQuery.toLocaleLowerCase("vi")));
        return h(React.Fragment, null, notice("Dữ liệu minh họa phục vụ trải nghiệm hướng nghiệp. Các vị trí bên dưới không phải thông báo tuyển dụng đang mở."), tabs([["all", "Tất cả"], ["fulltime", "Việc làm"], ["internship", "Thực tập"]], jobType, setJobType), h("div", { className: "cg-card cg-filters" }, h("label", { className: "cg-search" }, icon("search"), h("input", { value: jobQuery, onChange: event => setJobQuery(event.target.value), placeholder: "Tìm vị trí hoặc doanh nghiệp…", "aria-label": "Tìm vị trí hoặc doanh nghiệp" })), !forRole && roleOptions(jobRole, setJobRole, true, "Lọc cơ hội theo nghề"), h("span", { className: "cg-location-filter" }, icon("location"), "Hà Nội")),
          filtered.length ? h("div", { className: "cg-job-list" }, filtered.map(job => h("article", { className: "cg-card cg-job", key: job.id }, h(CompanyLogo, { job, color: meta(roleById[job.roleId]).color }), h("div", { className: "cg-job-copy" }, h("h3", null, job.title), h("p", null, job.company), h("div", { className: "cg-job-meta" }, h("span", null, icon("location"), job.location), h("span", null, icon("briefcase"), job.type === "internship" ? "Thực tập" : "Toàn thời gian"), h("span", { className: "cg-demo-label" }, "Tin minh họa"))), button("Xem chi tiết", () => setDialog({ type: "job", job }), "secondary")))) : empty("Chưa có cơ hội trong bộ lọc này", "Bạn có thể đổi loại vị trí hoặc chọn nghề khác.", button("Xóa bộ lọc", () => { setJobType("all"); setJobRole("all"); setJobQuery(""); })));
      }

      let content;
      if (route.view === "overview") content = overview();
      else if (route.view === "assessment") content = assessment();
      else if (route.view === "results") content = results();
      else if (route.view === "explore") content = explore();
      else if (route.view === "jobs") content = h(React.Fragment, null, heading("Cơ hội việc làm của bạn", "Tìm hiểu các vị trí liên quan đến định hướng nghề nghiệp."), renderJobs());
      else if (!roleById[route.roleId]) content = empty("Không tìm thấy nghề nghiệp", "Nghề này không có trong danh mục hiện tại.", button("Khám phá nghề nghiệp", () => navigate("explore"), "primary"));
      else content = route.view === "detail" ? detail(roleById[route.roleId]) : roadmap(roleById[route.roleId]);
      return h(Shell, null,
        h("div", { className: "cg-app", ref: pageRef, tabIndex: -1 }, h(Breadcrumb, { pageName: "Hướng nghiệp" }),
          h("nav", { className: "cg-local-nav", "aria-label": "Điều hướng Hướng nghiệp" }, [["overview", "Tổng quan"], ["explore", "Khám phá nghề"], ["assessment", "Bài đánh giá"], ["results", "Kết quả"], ["jobs", "Cơ hội việc làm"]].map(([view, text]) => h("button", { key: view, type: "button", onClick: () => navigate(view), "aria-current": route.view === view ? "page" : undefined }, text))),
          error && h("div", { className: "cg-error", role: "alert" }, icon("info"), h("span", null, error), button(icon("close"), () => setError(""), "icon", { "aria-label": "Đóng thông báo lỗi" })),
          message && h("div", { className: "cg-toast", role: "status" }, icon("check"), message), content,
          dialog && h("div", { className: "cg-overlay", onClick: event => { if (event.target === event.currentTarget) setDialog(null); } }, h("section", { className: "cg-modal", ref: modalRef, role: "dialog", "aria-modal": true, "aria-labelledby": "cg-dialog-title" }, h("div", { className: "cg-section-heading" }, h("h2", { id: "cg-dialog-title" }, dialog.type === "compare" ? "So sánh nghề nghiệp" : dialog.job.title), button(icon("close"), () => setDialog(null), "icon", { "aria-label": "Đóng cửa sổ" })), dialog.type === "compare" ? h("div", { className: "cg-comparison" }, compare.map(id => {
            const role = roleById[id];
            return h("article", { key: id }, badgeIcon(meta(role).icon, meta(role).color), h("h3", null, careerName(role)), scoreBadge(role), h("p", null, role.description), h("h4", null, "Kỹ năng chuyên môn"), h("ul", { className: "cg-bullet-list" }, role.requiredSkills.map(skill => h("li", { key: skill.name }, skill.name))), h("h4", null, "Học phần liên quan"), h("p", null, role.courseMappings.map(course => course.courseCode).join(" · ")), button("Xem nghề này →", () => { setDialog(null); navigate("detail", id); }, "secondary"));
          })) : h("div", { className: "cg-job-detail" }, h("p", null, dialog.job.company + " · " + dialog.job.location + " · " + (dialog.job.type === "internship" ? "Thực tập" : "Toàn thời gian")), notice(dialog.job.description), h("h3", null, "Năng lực nên chuẩn bị"), h("ul", { className: "cg-bullet-list" }, dialog.job.requirements.map(text => h("li", { key: text }, text))), button("Xem lộ trình chuẩn bị →", () => { const id = dialog.job.roleId; setDialog(null); navigate("roadmap", id); }, "primary"))))));
    };
  };
})();

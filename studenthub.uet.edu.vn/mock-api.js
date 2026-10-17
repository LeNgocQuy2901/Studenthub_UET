/**
 * Mock API Adapter and Interceptor for StudentHub UET
 * Provides complete mock data for all sections:
 * - Dashboard (GPA, Credits, News, Term Count, Banners)
 * - Profile / Thông tin cá nhân (Student details, Family, Healthcare, Interests)
 * - Timetable / Thời khóa biểu (Weekly schedule)
 * - Exam Schedule / Lịch thi
 * - Grades & Results / Kết quả học tập (Transcripts, GPA chart)
 * - Academic Program / Chương trình đào tạo
 * - Student Finance / Tài chính sinh viên (Tuition bills)
 * - Assessment / Đánh giá điểm rèn luyện
 */
(function() {
  console.log("%c[StudentHub Mock API] Initializing mock data layer...", "color: #2563eb; font-weight: bold; font-size: 13px;");

  // Mock Data Store
  const MOCK_DATA = {
    // 1. Dashboard summary
    results: {
      gpa: 3.68,
      totalAccumulatedCredits: 115,
      trainingPoint: 92
    },
    countCourseTerm: {
      completed: "36",
      inTerm: "6"
    },
    // News articles
    news: [
      {
        id: 1,
        title: "Thông báo đăng ký học phần Học kỳ 2 năm học 2024-2025",
        publishDate: "2025-01-15",
        category: "Đào tạo",
        categoryColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
        summary: "Phòng Đào tạo thông báo kế hoạch đăng ký học phần cho sinh viên tất cả các khóa trên cổng StudentHub.",
        link: "https://uet.vnu.edu.vn"
      },
      {
        id: 2,
        title: "Lễ bế giảng và trao bằng tốt nghiệp đại học chính quy đợt 1 năm 2025",
        publishDate: "2025-01-10",
        category: "Sự kiện",
        categoryColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
        summary: "Chúc mừng các tân cử nhân, kỹ sư Trường Đại học Công nghệ hoàn thành xuất sắc chương trình đào tạo.",
        link: "https://uet.vnu.edu.vn"
      },
      {
        id: 3,
        title: "Chương trình học bổng doanh nghiệp Toshiba & Mitsubishi đợt 2",
        publishDate: "2025-01-08",
        category: "Học bổng",
        categoryColor: "bg-gradient-to-r from-amber-500 to-orange-500",
        summary: "Nhận hồ sơ xét học bổng hỗ trợ sinh viên có thành tích học tập xuất sắc và tích cực rèn luyện.",
        link: "https://uet.vnu.edu.vn"
      },
      {
        id: 4,
        title: "Cuộc thi Sáng tạo Khởi nghiệp Công nghệ Sinh viên UET 2025",
        publishDate: "2025-01-05",
        category: "Cuộc thi",
        categoryColor: "bg-gradient-to-r from-purple-500 to-indigo-500",
        summary: "Sân chơi trí tuệ và khởi nghiệp công nghệ dành riêng cho sinh viên các trường đại học khối kỹ thuật.",
        link: "https://uet.vnu.edu.vn"
      }
    ],

    // Terms
    terms: [
      { termCode: "242", termName: "Học kỳ 2 năm học 2024-2025" },
      { termCode: "241", termName: "Học kỳ 1 năm học 2024-2025" },
      { termCode: "232", termName: "Học kỳ 2 năm học 2023-2024" },
      { termCode: "231", termName: "Học kỳ 1 năm học 2023-2024" }
    ],

    // 2. Profile Details
    personDetail: {
      studentCode: "21020001",
      accountCode: "21020001",
      fullName: "Nguyễn Văn A",
      name: "Nguyễn Văn A",
      gender: "Nam",
      dateOfBirth: "2003-05-15",
      email: "21020001@vnu.edu.vn",
      personalEmail: "nguyenvana.uet@gmail.com",
      phoneNumber: "0987654321",
      citizenId: "001203001234",
      citizenDate: "2021-06-20",
      citizenPlace: "Cục Cảnh sát QLHC về TTXH",
      className: "QH-2021-I/CQ-C-A-CL",
      course: "K66",
      programName: "Công nghệ thông tin (Định hướng ứng dụng)",
      facultyName: "Khoa Công nghệ Thông tin",
      trainingSystem: "Đại học chính quy",
      schoolYear: "2021-2025",
      status: "Đang học",
      ethnicity: "Kinh",
      religion: "Không",
      nationality: "Việt Nam",
      bloodGroup: "O",
      homeTown: "Thành phố Hà Nội",
      permanentAddress: "Số 144 Xuân Thủy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội",
      currentAddress: "Ký túc xá Ngoại Ngữ, Cầu Giấy, Hà Nội",
      communistParty: 0,
      militaryType: 0
    },

    familyDetail: [
      {
        relationship: "Bố",
        fullName: "Nguyễn Văn B",
        yearOfBirth: "1975",
        job: "Kỹ sư công nghệ",
        phone: "0912345678",
        address: "Hà Nội"
      },
      {
        relationship: "Mẹ",
        fullName: "Trần Thị C",
        yearOfBirth: "1978",
        job: "Giáo viên",
        phone: "0987654321",
        address: "Hà Nội"
      }
    ],

    healthcareDetail: {
      healthcareCode: "DN4010123456789",
      hkOwnerName: "Nguyễn Văn A",
      hkOwnerBirth: "2003-05-15",
      hospitalName: "Bệnh viện E Hà Nội",
      expiryDate: "2025-12-31"
    },

    interests: {
      hobby: "Lập trình Web & AI, Đọc sách công nghệ, Cờ vua, Bóng đá",
      strengths: "Tư duy logic thuật toán, Làm việc nhóm, Thích ứng nhanh",
      activities: "Thành viên ban chuyên môn CLB Tin học UET, Tham gia ICPC VNU"
    },

    // 3. Timetable (Thời khóa biểu theo thứ 2 -> 6)
    timetable: [
      {
        weekday: 2,
        courseCode: "INT3306",
        courseName: "Phát triển ứng dụng Web",
        time: "07:00 - 09:50",
        room: "301-G2",
        lecturer: "TS. Nguyễn Văn B",
        classCode: "INT3306 1",
        courseCredit: 3,
        credits: 3
      },
      {
        weekday: 3,
        courseCode: "INT3110",
        courseName: "Cơ sở dữ liệu nâng cao",
        time: "13:00 - 15:50",
        room: "205-G3",
        lecturer: "PGS.TS. Trần Thị C",
        classCode: "INT3110 2",
        courseCredit: 3,
        credits: 3
      },
      {
        weekday: 4,
        courseCode: "INT3401",
        courseName: "Trí tuệ nhân tạo",
        time: "08:00 - 10:50",
        room: "402-G2",
        lecturer: "TS. Lê Hoàng D",
        classCode: "INT3401 1",
        courseCredit: 3,
        credits: 3
      },
      {
        weekday: 5,
        courseCode: "INT3202",
        courseName: "Mạng máy tính",
        time: "09:00 - 11:50",
        room: "103-G3",
        lecturer: "ThS. Phạm Văn E",
        classCode: "INT3202 3",
        courseCredit: 3,
        credits: 3
      },
      {
        weekday: 6,
        courseCode: "INT3505",
        courseName: "An toàn và bảo mật thông tin",
        time: "14:00 - 16:50",
        room: "304-G2",
        lecturer: "TS. Vũ Mạnh F",
        classCode: "INT3505 1",
        courseCredit: 3,
        credits: 3
      }
    ],

    // 4. Exam Schedule (Lịch thi)
    examSchedule: [
      {
        courseCode: "INT3306",
        courseName: "Phát triển ứng dụng Web",
        examDate: "2025-06-15T08:00:00",
        examShift: "Ca 1 (08:00)",
        examRoom: "301-G2",
        examForm: "Thực hành trên máy",
        studentOrder: "25",
        sbd: "UET21020001",
        note: "Có mặt trước 15 phút"
      },
      {
        courseCode: "INT3401",
        courseName: "Trí tuệ nhân tạo",
        examDate: "2025-06-18T13:30:00",
        examShift: "Ca 2 (13:30)",
        examRoom: "402-G2",
        examForm: "Tự luận",
        studentOrder: "18",
        sbd: "UET21020001",
        note: "Không sử dụng tài liệu"
      },
      {
        courseCode: "INT3110",
        courseName: "Cơ sở dữ liệu nâng cao",
        examDate: "2025-06-22T08:00:00",
        examShift: "Ca 1 (08:00)",
        examRoom: "205-G3",
        examForm: "Tự luận + Trắc nghiệm",
        studentOrder: "32",
        sbd: "UET21020001",
        note: "Có mặt đúng giờ"
      },
      {
        courseCode: "INT3202",
        courseName: "Mạng máy tính",
        examDate: "2025-06-25T15:30:00",
        examShift: "Ca 3 (15:30)",
        examRoom: "103-G3",
        examForm: "Tự luận",
        studentOrder: "12",
        sbd: "UET21020001",
        note: "Đem thẻ sinh viên"
      }
    ],

    // 5. Academic Results / Transcripts (Kết quả học tập)
    kqht: [
      // Kỳ 241
      { termCode: "241", courseCode: "INT3306", courseName: "Phát triển ứng dụng Web", courseCredit: 3, point10: 9.0, point4: 4.0, pointChar: "A+", status: "Đạt" },
      { termCode: "241", courseCode: "INT3401", courseName: "Trí tuệ nhân tạo", courseCredit: 3, point10: 8.6, point4: 3.7, pointChar: "A", status: "Đạt" },
      { termCode: "241", courseCode: "INT3110", courseName: "Cơ sở dữ liệu nâng cao", courseCredit: 3, point10: 8.8, point4: 3.8, pointChar: "A", status: "Đạt" },
      { termCode: "241", courseCode: "INT3202", courseName: "Mạng máy tính", courseCredit: 3, point10: 8.2, point4: 3.5, pointChar: "B+", status: "Đạt" },
      { termCode: "241", courseCode: "INT3505", courseName: "An toàn và bảo mật thông tin", courseCredit: 3, point10: 8.7, point4: 3.7, pointChar: "A", status: "Đạt" },
      // Kỳ 232
      { termCode: "232", courseCode: "INT2204", courseName: "Lập trình hướng đối tượng", courseCredit: 3, point10: 9.2, point4: 4.0, pointChar: "A+", status: "Đạt" },
      { termCode: "232", courseCode: "INT2209", courseName: "Mạng máy tính cơ sở", courseCredit: 3, point10: 8.5, point4: 3.7, pointChar: "A", status: "Đạt" },
      { termCode: "232", courseCode: "INT2211", courseName: "Hệ điều hành", courseCredit: 3, point10: 8.0, point4: 3.5, pointChar: "B+", status: "Đạt" },
      { termCode: "232", courseCode: "MAT1101", courseName: "Xác suất thống kê", courseCredit: 3, point10: 8.6, point4: 3.7, pointChar: "A", status: "Đạt" },
      // Kỳ 231
      { termCode: "231", courseCode: "INT1004", courseName: "Lập trình nâng cao", courseCredit: 3, point10: 9.5, point4: 4.0, pointChar: "A+", status: "Đạt" },
      { termCode: "231", courseCode: "INT1006", courseName: "Cấu trúc dữ liệu và giải thuật", courseCredit: 3, point10: 8.8, point4: 3.8, pointChar: "A", status: "Đạt" },
      { termCode: "231", courseCode: "MAT1093", courseName: "Giải tích 1", courseCredit: 3, point10: 8.0, point4: 3.5, pointChar: "B+", status: "Đạt" },
      { termCode: "231", courseCode: "PHI1006", courseName: "Triết học Mác - Lênin", courseCredit: 3, point10: 8.5, point4: 3.7, pointChar: "A", status: "Đạt" }
    ],

    // 6. Curriculum Program
    program: {
      groupedCourses: {
        group1: {
          groupName: "I. Khối kiến thức chung",
          courses: [
            { courseCode: "PHI1006", courseName: "Triết học Mác - Lênin", credits: 3, status: "Đã hoàn thành" },
            { courseCode: "MAT1093", courseName: "Giải tích 1", credits: 3, status: "Đã hoàn thành" },
            { courseCode: "MAT1094", courseName: "Giải tích 2", credits: 3, status: "Đã hoàn thành" },
            { courseCode: "MAT1101", courseName: "Xác suất thống kê", credits: 3, status: "Đã hoàn thành" }
          ]
        },
        group2: {
          groupName: "II. Khối kiến thức cơ sở ngành",
          courses: [
            { courseCode: "INT1004", courseName: "Lập trình nâng cao", credits: 3, status: "Đã hoàn thành" },
            { courseCode: "INT1006", courseName: "Cấu trúc dữ liệu và giải thuật", credits: 3, status: "Đã hoàn thành" },
            { courseCode: "INT2204", courseName: "Lập trình hướng đối tượng", credits: 3, status: "Đã hoàn thành" },
            { courseCode: "INT2211", courseName: "Hệ điều hành", credits: 3, status: "Đã hoàn thành" }
          ]
        },
        group3: {
          groupName: "III. Khối kiến thức chuyên ngành",
          courses: [
            { courseCode: "INT3306", courseName: "Phát triển ứng dụng Web", credits: 3, status: "Đang học" },
            { courseCode: "INT3110", courseName: "Cơ sở dữ liệu nâng cao", credits: 3, status: "Đang học" },
            { courseCode: "INT3401", courseName: "Trí tuệ nhân tạo", credits: 3, status: "Đang học" },
            { courseCode: "INT3202", courseName: "Mạng máy tính", credits: 3, status: "Đang học" },
            { courseCode: "INT3505", courseName: "An toàn và bảo mật thông tin", credits: 3, status: "Đang học" }
          ]
        }
      }
    },

    // 7. Bills & Finance
    bills: [
      {
        billCode: "HD20242_001",
        billDescription: "Học phí Học kỳ 2 năm học 2024-2025",
        termCode: "242",
        amount: 12500000,
        paidAmount: 12500000,
        debtAmount: 0,
        status: "PAID",
        statusDescription: "Đã thanh toán",
        paymentDate: "2025-02-10 14:30:00",
        receiptCode: "PT2025021001",
        payer: "Nguyễn Văn A"
      },
      {
        billCode: "HD20241_001",
        billDescription: "Học phí Học kỳ 1 năm học 2024-2025",
        termCode: "241",
        amount: 11800000,
        paidAmount: 11800000,
        debtAmount: 0,
        status: "PAID",
        statusDescription: "Đã thanh toán",
        paymentDate: "2024-09-15 09:20:00",
        receiptCode: "PT2024091501",
        payer: "Nguyễn Văn A"
      },
      {
        billCode: "HD20232_001",
        billDescription: "Học phí Học kỳ 2 năm học 2023-2024",
        termCode: "232",
        amount: 10500000,
        paidAmount: 10500000,
        debtAmount: 0,
        status: "PAID",
        statusDescription: "Đã thanh toán",
        paymentDate: "2024-02-20 10:15:00",
        receiptCode: "PT2024022001",
        payer: "Nguyễn Văn A"
      }
    ],

    // 8. Training Points Assessment
    trainingPointsAssessment: {
      criteria: [
        { id: 1, title: "Ý thức học tập và nghiên cứu khoa học", maxScore: 20, selfScore: 19, approvedScore: 19 },
        { id: 2, title: "Ý thức chấp hành nội quy, quy chế nhà trường", maxScore: 25, selfScore: 25, approvedScore: 25 },
        { id: 3, title: "Tham gia các hoạt động chính trị - xã hội, văn hóa, thể thao", maxScore: 20, selfScore: 18, approvedScore: 18 },
        { id: 4, title: "Phẩm chất công dân và quan hệ với cộng đồng", maxScore: 25, selfScore: 20, approvedScore: 20 },
        { id: 5, title: "Ý thức và kết quả tham gia công tác phụ trách lớp, đoàn thể", maxScore: 10, selfScore: 10, approvedScore: 10 }
      ],
      totalScore: 92,
      classification: "Xuất sắc"
    },

    // 9. Location & master data
    provinces: [
      { id: 1, name: "Thành phố Hà Nội", code: "01" },
      { id: 2, name: "Thành phố Hồ Chí Minh", code: "79" },
      { id: 3, name: "Thành phố Đà Nẵng", code: "48" },
      { id: 4, name: "Thành phố Hải Phòng", code: "31" },
      { id: 5, name: "Tỉnh Bắc Ninh", code: "27" },
      { id: 6, name: "Tỉnh Hưng Yên", code: "33" }
    ],
    nations: [
      { id: 1, name: "Kinh", code: "KINH" },
      { id: 2, name: "Tày", code: "TAY" },
      { id: 3, name: "Thái", code: "THAI" },
      { id: 4, name: "Mường", code: "MUONG" }
    ]
  };

  /**
   * Router to match URL and return mock payload
   */
  function routeMockRequest(url, method, data) {
    if (!url) return null;
    const cleanUrl = url.split("?")[0].replace(/^https?:\/\/[^\/]+/, "");

    // Dashboard
    if (cleanUrl.includes("/student/results")) return { data: MOCK_DATA.results };
    if (cleanUrl.includes("/student/count-course-term")) return { data: MOCK_DATA.countCourseTerm };
    if (cleanUrl.includes("/student/news")) return { data: MOCK_DATA.news };

    // Terms
    if (cleanUrl.includes("/student/term/getTerm") || cleanUrl.includes("/student/term")) return MOCK_DATA.terms;

    // Timetable
    if (cleanUrl.includes("/student/tkb")) return { data: MOCK_DATA.timetable };

    // Exam schedule
    if (cleanUrl.includes("/student/exam-schedule")) return { data: MOCK_DATA.examSchedule };

    // Grades / Kết quả học tập
    if (cleanUrl.includes("/student/kqht") || cleanUrl.includes("/student/point")) return { data: MOCK_DATA.kqht };

    // Program
    if (cleanUrl.includes("/student/program")) return { data: MOCK_DATA.program };

    // Bills / Finance
    if (cleanUrl.includes("/student/getAllBills")) return { data: MOCK_DATA.bills };
    if (cleanUrl.includes("/student/getBill/detail")) {
      return { data: MOCK_DATA.bills[0] };
    }

    // Person & Profile
    if (cleanUrl.includes("/student/detail") || cleanUrl.includes("student/person/detail") || cleanUrl.includes("/student/person")) {
      return { data: MOCK_DATA.personDetail };
    }
    if (cleanUrl.includes("student/person/family-detail")) return { data: MOCK_DATA.familyDetail };
    if (cleanUrl.includes("student/person/healthcare_detail")) return { data: MOCK_DATA.healthcareDetail };
    if (cleanUrl.includes("student/interest")) return { data: MOCK_DATA.interests };
    if (cleanUrl.includes("student/avatar")) return { imagePath: "/images/Logo-DH-Cong-Nghe-UET.webp", data: { imagePath: "/images/Logo-DH-Cong-Nghe-UET.webp" } };
    if (cleanUrl.includes("student/person/other-email/status")) return { code: 200, data: true, verified: true };
    if (cleanUrl.includes("student/profile-step")) return { data: { profileStep: 5, status: "succeeded" } };
    if (cleanUrl.includes("student/learner-type")) return { data: { learnerType: "UNDERGRADUATE" } };

    // Training Points
    if (cleanUrl.includes("/student/training-points/assessment")) return { data: MOCK_DATA.trainingPointsAssessment };

    // Location / Master Data
    if (cleanUrl.includes("student/vn/province")) return { content: MOCK_DATA.provinces, data: MOCK_DATA.provinces };
    if (cleanUrl.includes("student/vn/nation")) return { content: MOCK_DATA.nations, data: MOCK_DATA.nations };

    // Banners & alerts
    if (cleanUrl.includes("banner") || cleanUrl.includes("schedule-alert")) {
      return { data: [{ id: 1, title: "StudentHub UET", content: "Chào mừng sinh viên đến với cổng thông tin học tập.", isShow: true, stopAt: "2026-12-31" }] };
    }

    // Default catch-all for any other student endpoint: return empty OK object
    return { data: [], content: [], msgCode: "OK", status: 200, code: 200 };
  }

  // Axios Custom Mock Adapter
  window.__mockAdapter = function(config) {
    const url = config.url || "";
    const method = (config.method || "get").toLowerCase();

    // Forward real /api/ endpoints to Python Backend Server
    if (url.includes("/api/")) {
      const fetchUrl = url.startsWith("http") ? url : url;
      return fetch(fetchUrl, {
        method: method.toUpperCase(),
        headers: Object.assign({ "Content-Type": "application/json" }, config.headers || {}),
        body: (method !== "get" && method !== "head" && config.data) ? (typeof config.data === "string" ? config.data : JSON.stringify(config.data)) : undefined
      }).then(async function(res) {
        const json = await res.json().catch(function() { return {}; });
        return {
          data: json,
          status: res.status,
          statusText: res.statusText,
          headers: {},
          config: config,
          request: {}
        };
      });
    }

    const mockRes = routeMockRequest(url, method, config.data);

    console.log(`%c[Mock API Hook] ${method.toUpperCase()} ${url}`, "color: #059669; font-weight: bold;", mockRes);

    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve({
          data: mockRes !== null ? mockRes : { data: [], status: 200, msgCode: "OK" },
          status: 200,
          statusText: "OK",
          headers: { "content-type": "application/json" },
          config: config,
          request: {}
        });
      }, 50); // slight simulated delay for smooth React state updates
    });
  };

  console.log("%c[StudentHub Mock API] Ready! Mock adapter registered to window.__mockAdapter.", "color: #059669; font-weight: bold;");
})();

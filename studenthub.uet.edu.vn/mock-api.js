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
    if (cleanUrl.includes("student/avatar")) {
      // Return a valid 1x1 transparent PNG Blob so URL.createObjectURL(blob) succeeds without errors
      const u8 = new Uint8Array([137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,6,0,0,0,31,21,196,137,0,0,0,10,73,68,65,84,120,156,99,0,1,0,0,5,0,1,13,10,45,180,0,0,0,0,73,69,78,68,174,66,96,130]);
      return new Blob([u8], { type: "image/png" });
    }
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

  // ---------------------------------------------------------------------------
  // Comprehensive Mock AI Chatbot Knowledge Base
  // ---------------------------------------------------------------------------
  const MOCK_CHAT_KNOWLEDGE = [
    {
      keywords: ["bộ môn", "bo mon", "bộ môn khoa cntt", "các bộ môn", "cac bo mon", "khoa cntt", "chủ nhiệm bộ môn", "hệ thống thông tin", "công nghệ phần mềm", "khoa học máy tính", "kỹ thuật tính toán", "mạng và truyền thông"],
      topic: "Danh sách 5 Bộ môn chuyên môn thuộc Khoa Công nghệ Thông tin - UET",
      ref: "https://www.fit.uet.vnu.edu.vn/gioi-thieu/cac-bo-mon/",
      type: "verified",
      answer: "Chào bạn! Khoa Công nghệ Thông tin (Trường Đại học Công nghệ - ĐHQGHN) gồm 5 Bộ môn chuyên môn nòng cốt:\n\n1. 🏢 **Bộ môn Các Hệ thống Thông tin:**\n   - Chủ nhiệm: PGS. TS. Nguyễn Ngọc Hóa | Phó CN: PGS. TS. Nguyễn Trí Thành.\n   - Địa điểm: P311-313, Nhà E3.\n   - Lĩnh vực: Khai phá dữ liệu, GIS, Tích hợp dịch vụ & An toàn thông tin.\n\n2. 💻 **Bộ môn Công nghệ Phần mềm:**\n   - Chủ nhiệm: TS. Võ Đình Hiếu.\n   - Địa điểm: P321, Nhà E3.\n   - Lĩnh vực: Thiết kế kiến trúc phần mềm, phát triển Web/Mobile, quy trình Agile và kiểm thử chất lượng.\n\n3. 🧠 **Bộ môn Khoa học Máy tính:**\n   - Chủ nhiệm: TS. Trần Quốc Long.\n   - Địa điểm: P315-317, Nhà E3.\n   - Lĩnh vực: Học máy, Trí tuệ nhân tạo, Xử lý ngôn ngữ tự nhiên, Thị giác máy tính.\n\n4. 📐 **Bộ môn Khoa học và Kỹ thuật tính toán:**\n   - Chủ nhiệm: TS. Đặng Thanh Hải.\n   - Địa điểm: P319, Nhà E3.\n   - Lĩnh vực: Tin sinh học (Genomics), Tối ưu hóa, Toán tin và mô phỏng tính toán hiệu năng cao.\n\n5. 🌐 **Bộ môn Mạng và Truyền thông Máy tính:**\n   - Chủ nhiệm: TS. Nguyễn Hoài Sơn.\n   - Địa điểm: P406, Nhà E3.\n   - Lĩnh vực: Mạng máy tính, An ninh mạng, Điện toán đám mây và IoT."
    },
    {
      keywords: ["phòng thí nghiệm", "phong thi nghiem", "lab", "ptn", "blockchain", "iot", "an toàn thông tin", "nghiên cứu khoa học", "nckh", "tri thức", "nhúng", "người máy", "hci"],
      topic: "Hệ thống các Phòng thí nghiệm & PTN Mục tiêu thuộc Khoa CNTT - UET",
      ref: "https://www.fit.uet.vnu.edu.vn/gioi-thieu/cac-bo-mon/",
      type: "verified",
      answer: "Chào bạn! Khoa CNTT - UET hiện sở hữu hệ thống các Phòng thí nghiệm chuyên sâu và PTN Mục tiêu phục vụ nghiên cứu & đồ án:\n\n🔬 **Các Phòng thí nghiệm trọng điểm:**\n1. **PTN An toàn thông tin (NetSec Lab):** P312 Nhà G2 - Trưởng phòng: TS. Vũ Mạnh Hùng. Nghiên cứu an ninh mạng, mật mã, CTF và phòng thủ hệ thống.\n2. **PTN Công nghệ Tri thức (KTLab):** Nghiên cứu Khoa học dữ liệu, AI và Mô hình ngôn ngữ lớn (LLMs).\n3. **PTN Hệ thống Nhúng:** Thiết kế phần cứng, RTOS, vi điều khiển và xe tự hành.\n4. **PTN Tương tác Người – Máy (HCI Lab):** Thị giác máy tính, VR/AR, giao diện người dùng thông minh.\n\n🚀 **Các PTN Mục tiêu đón đầu công nghệ:**\n- PTN Mục tiêu Tối ưu hóa các Hệ thống lớn\n- PTN Mục tiêu Blockchain\n- PTN Mục tiêu Tin Sinh Y Học\n- PTN Mục tiêu Internet of Things (IoT)\n- PTN Mục tiêu Đảm bảo Chất lượng Phần mềm\n- PTN Mục tiêu Trí tuệ Nhân tạo\n\n📌 *Sinh viên có thể đăng ký thực tập hoặc tham gia nghiên cứu tại mục 'Câu lạc bộ & Phòng TN' trên StudentHub.*"
    },
    {
      keywords: ["chuẩn đầu ra", "tot nghiep", "tốt nghiệp", "điều kiện tốt nghiệp", "tín chỉ", "ra trường", "bằng tốt nghiệp", "xét tốt nghiệp"],
      topic: "Quy định Chuẩn đầu ra & Điều kiện Tốt nghiệp UET",
      ref: "Quy chế Đào tạo ĐHQGHN & Sổ tay Sinh viên UET",
      type: "verified",
      answer: "Để đủ điều kiện công nhận tốt nghiệp hệ đại học chính quy tại UET, bạn cần đáp ứng các tiêu chuẩn sau:\n\n1. 📚 **Tín chỉ tích lũy:** Hoàn thành đủ số tín chỉ quy định của khung CTĐT (128 - 135 tín chỉ tùy ngành đào tạo).\n2. 🎯 **Điểm trung bình tích lũy (CPA/GPA):** Đạt từ 2.00 / 4.00 trở lên (không còn học phần F chưa trả nợ).\n3. 🌐 **Chuẩn Ngoại ngữ:** Đạt chứng chỉ VSTEP bậc 3/6 (B1) trở lên, hoặc tương đương (IELTS >= 4.5 - 5.5 theo quy định từng khóa).\n4. 🏃 **Chuẩn Thể chất & Quốc phòng:** Có chứng chỉ hoàn thành Giáo dục Thể chất và GD Quốc phòng - An ninh.\n5. 💻 **Chuẩn Tin học:** Đạt chuẩn kỹ năng sử dụng CNTT theo quy định.\n6. ⚖️ **Kỷ luật:** Tại thời điểm xét không bị truy cứu trách nhiệm hình sự hoặc đình chỉ học tập."
    },
    {
      keywords: ["đăng ký học phần", "dang ky hoc phan", "rút môn", "hủy môn", "đổi lớp", "tin chi"],
      topic: "Quy trình đăng ký và điều chỉnh học phần",
      ref: "Phòng Đào tạo UET (P105-E3) & Cổng dangkyhoc.vnu.edu.vn",
      type: "verified",
      answer: "Quy trình đăng ký học phần tại UET:\n\n1. ⏰ **Đợt đăng ký chính thức:** Sinh viên truy cập cổng `dangkyhoc.vnu.edu.vn` theo đúng khung giờ được phân bổ cho từng khóa.\n2. 🔄 **Đợt đăng ký bổ sung & Đổi lớp:** Mở trước khi bắt đầu học kỳ hoặc trong 2 tuần đầu kỳ học.\n3. ❌ **Rút bớt học phần:** Được thực hiện trong thời hạn thông báo (thường trong 2 - 4 tuần đầu kỳ). Học phần rút sẽ không tính vào điểm GPA nhưng vẫn nộp học phí theo quy chế.\n\n*Lưu ý: Mọi thắc mắc về trùng lịch thi, xin mở thêm lớp liên hệ Phòng Đào tạo (Phòng 105 Nhà E3, email: daotao_dhcn@vnu.edu.vn).*"
    },
    {
      keywords: ["học phí", "hoc phi", "nộp tiền", "thanh toán", "ngân hàng", "miễn giảm"],
      topic: "Quy định Học phí & Kênh thanh toán StudentHub UET",
      ref: "Phòng Kế hoạch - Tài chính UET",
      type: "verified",
      answer: "Về học phí và thanh toán:\n\n1. 💳 **Tra cứu hóa đơn:** Bạn có thể xem chi tiết học phí của từng học kỳ tại mục **'Tài chính sinh viên'** trên menu StudentHub.\n2. 🏦 **Hình thức nộp:** Chuyển khoản ngân hàng (qua số tài khoản của Trường ĐH Công nghệ tại BIDV) hoặc nộp qua cổng thanh toán trực tuyến với cú pháp: `[Mã sinh viên] - [Mã hóa đơn]`.\n3. 🎁 **Miễn giảm học phí & trợ cấp xã hội:** Nộp hồ sơ đầu mỗi năm học tại Phòng Công tác Sinh viên (Phòng 104 Nhà E3)."
    },
    {
      keywords: ["giấy xác nhận", "giay xac nhan", "vay vốn", "nghĩa vụ quân sự", "hoãn nghĩa vụ", "thẻ sinh viên", "thủ tục hành chính", "một cửa"],
      topic: "Thủ tục hành chính sinh viên một cửa",
      ref: "Phòng Công tác Sinh viên (P104-E3) & Cổng StudentHub",
      type: "verified",
      answer: "Để xin các loại giấy tờ hành chính sinh viên:\n\n1. Truy cập mục **'Thủ tục hành chính' -> 'Tạo yêu cầu'** trên thanh điều hướng StudentHub UET.\n2. Chọn loại biểu mẫu cần xin:\n   - Giấy xác nhận đang là sinh viên (làm hồ sơ, vé xe buýt...)\n   - Giấy vay vốn Ngân hàng Chính sách xã hội\n   - Giấy tạm hoãn Nghĩa vụ quân sự\n   - Đề nghị cấp lại Thẻ sinh viên\n3. Điền thông tin và bấm 'Gửi yêu cầu'.\n4. Sau 1-2 ngày làm việc khi hệ thống chuyển trạng thái 'Đã duyệt', bạn đến nhận bản đóng dấu đỏ tại **Bộ phận Một cửa - Phòng Công tác Sinh viên (Phòng 104, Nhà E3)**."
    },
    {
      keywords: ["học bổng", "hoc bong", "khuyến khích", "toshiba", "mitsubishi", "yamada", "viettel", "samsung"],
      topic: "Chính sách Học bổng Khuyến khích & Doanh nghiệp UET",
      ref: "Phòng Công tác Sinh viên & Hội đồng Học bổng UET",
      type: "verified",
      answer: "Trường ĐH Công nghệ có 2 hệ thống học bổng chính:\n\n1. 🌟 **Học bổng Khuyến khích học tập (Ngân sách):**\n   - Xét định kỳ mỗi kỳ dựa trên kết quả học tập (GPA >= 2.50) và Điểm rèn luyện (Loại Khá trở lên).\n   - Không có môn thi bị điểm F trong học kỳ xét.\n   - Phân loại: Khá, Giỏi, Xuất sắc tương ứng với các mức thưởng tài chính.\n\n2. 🏆 **Học bổng Doanh nghiệp & Quốc tế:**\n   - Học bổng danh giá thường niên: Toshiba, Mitsubishi, Yamada, Viettel, POSCO, Samsung, Honda Award...\n   - Tiêu chí: Thành tích học tập xuất sắc, đam mê nghiên cứu khoa học, hoặc sinh viên nghèo vượt khó."
    },
    {
      keywords: ["câu lạc bộ", "clb", "hoạt động", "tinhoc", "icpc", "robotics", "guitar"],
      topic: "Câu lạc bộ & Hoạt động phong trào sinh viên UET",
      ref: "Đoàn Thanh niên - Hội Sinh viên UET",
      type: "verified",
      answer: "UET có môi trường hoạt động ngoại khóa rất sôi nổi:\n\n1. 💻 **CLB Tin học UET:** Nơi rèn luyện thuật toán đỉnh cao, thi đấu ICPC và tham gia dự án thực chiến.\n2. 🤖 **CLB Robotics & AI:** Chế tạo robot, xe tự hành, thi Robocon toàn quốc (xưởng tại Tầng 1 Nhà G3).\n3. 🎸 **CLB Âm nhạc (UET Guitar Club):** Sinh hoạt giao lưu âm nhạc, Acoustic Night hàng tháng.\n4. ⚽ **CLB Thể thao & Đội Tình nguyện UET.**\n\n👉 Bạn có thể xem chi tiết và đăng ký tham gia tại mục **'Câu lạc bộ & Phòng TN'** trên StudentHub!"
    },
    {
      keywords: ["cố vấn", "mentor", "alumni", "cựu sinh viên", "hướng nghiệp", "cv", "phỏng vấn", "thực tập"],
      topic: "Mạng lưới Cố vấn nghề nghiệp & Cựu sinh viên UET",
      ref: "Mạng lưới Cựu sinh viên & Hỗ trợ việc làm UET",
      type: "verified",
      answer: "Chương trình Cố vấn nghề nghiệp kết nối bạn với các cựu sinh viên UET ưu tú:\n\n👨‍💻 **Các Mentor tiêu biểu:**\n- **Anh Trần Quang Huy:** Senior Tech Lead tại FPT Software (Alumni K58) - Chuyên môn: Full-stack Web, Microservices, Cloud.\n- **Chị Lê Minh Anh:** AI Research Lead tại Viettel AI (Alumni K60) - Chuyên môn: NLP, Học máy, LLMs, Du học KAIST.\n- **Anh Phạm Đức Minh:** Cyber Security Consultant tại VNPT (Alumni K59) - Chuyên môn: OSCP, Pentesting, CTF.\n- **Chị Đặng Phương Thảo:** Senior Product Manager tại MoMo (Alumni K61) - Chuyên môn: Product Design, Agile/Scrum.\n\n📅 *Bạn có thể vào mục **'Cố vấn nghề nghiệp'** trên menu để gửi yêu cầu tư vấn 1-on-1 (Review CV, định hướng phỏng vấn và lộ trình nghề nghiệp)!*"
    },
    {
      keywords: ["nghề nghiệp", "việc làm", "lộ trình", "roadmap", "định hướng", "software engineer", "ai engineer", "devops", "cloud", "security", "product manager"],
      topic: "Định hướng nghề nghiệp & Lộ trình học tập sinh viên CNTT",
      ref: "Khung kỹ năng thị trường lao động CNTT 2024-2025",
      type: "verified",
      answer: "StudentHub UET cung cấp tính năng **'Định hướng nghề nghiệp'** giúp bạn xây dựng lộ trình học tập tối ưu:\n\n🎯 **Các hướng nghề nghiệp thị trường:**\n1. **Kỹ sư Phát triển Phần mềm (Full-stack Software Engineer):** Học sâu React/Next.js, Node.js/Java/Python, CSDL và CI/CD.\n2. **Kỹ sư Trí tuệ Nhân tạo (AI / Machine Learning Engineer):** Toán giải tích, Đại số tuyến tính, Python, PyTorch, LLMs và MLOps.\n3. **Kỹ sư An toàn thông tin (Cyber Security Specialist):** Mạng máy tính, Hệ điều hành, Mật mã học, Web Security, CTF.\n4. **Kỹ sư Vận hành & Đám mây (DevOps / Cloud Engineer):** Linux, Docker, Kubernetes, Terraform, AWS/GCP.\n5. **Quản lý Sản phẩm Công nghệ (Tech Product Manager):** Phân tích nghiệp vụ, Agile, UI/UX và dữ liệu người dùng.\n\n👉 Hãy vào trang **'Định hướng nghề nghiệp'** để làm bài tự đánh giá kỹ năng và tạo lộ trình học tập cá nhân hóa!"
    }
  ];

  /**
   * Mock Chatbot Engine - generates intelligent, structured responses
   */
  window.__mockChatbot = function(query) {
    const q = (query || "").trim().toLowerCase();
    if (!q) {
      return {
        status: "error",
        error: "Tin nhắn không được để trống."
      };
    }

    let bestMatch = null;
    let maxScore = 0;

    for (let i = 0; i < MOCK_CHAT_KNOWLEDGE.length; i++) {
      const item = MOCK_CHAT_KNOWLEDGE[i];
      let score = 0;
      for (let j = 0; j < item.keywords.length; j++) {
        const kw = item.keywords[j];
        if (q.includes(kw)) {
          score += kw.length;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    }

    let answer = "";
    let sources = [];

    if (bestMatch && maxScore > 0) {
      answer = bestMatch.answer;
      sources = [{
        title: bestMatch.topic,
        ref: bestMatch.ref,
        type: bestMatch.type
      }];
    } else {
      answer = "Chào bạn! Tôi là Trợ lý sinh viên AI ảo của StudentHub UET.\n\n" +
        "Tôi có thể hỗ trợ bạn giải đáp các vấn đề về:\n" +
        "• 🏫 **Các Bộ môn & Phòng thí nghiệm** Khoa CNTT - UET (vừa cập nhật từ fit.uet.vnu.edu.vn)\n" +
        "• 🎓 **Chuẩn đầu ra & Điều kiện xét tốt nghiệp** (tín chỉ, GPA, ngoại ngữ)\n" +
        "• 📝 **Đăng ký học phần, rút bớt môn, hủy môn**\n" +
        "• 💰 **Học phí & Phương thức thanh toán**\n" +
        "• 📑 **Thủ tục hành chính sinh viên một cửa** (giấy xác nhận, hoãn NVQS...)\n" +
        "• 🎁 **Chính sách học bổng** khuyến khích & doanh nghiệp\n" +
        "• 🚀 **Câu lạc bộ, Phòng TN & Cố vấn nghề nghiệp 1-on-1**\n\n" +
        "📌 *Nếu câu hỏi cần can thiệp hồ sơ cá nhân, bạn vui lòng liên hệ:*\n" +
        "- Phòng Đào tạo (P105-E3 | Email: daotao_dhcn@vnu.edu.vn)\n" +
        "- Phòng Công tác Sinh viên (P104-E3 | Email: ctsv_dhcn@vnu.edu.vn)";
      sources = [{
        title: "Bộ phận Một cửa Trường ĐH Công nghệ - ĐHQGHN",
        ref: "Phòng 104 & 105 Nhà E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội",
        type: "official-contact"
      }];
    }

    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return {
      status: "success",
      conversationId: "conv_" + Date.now(),
      message: {
        sender: "assistant",
        content: answer,
        sources: sources,
        createdAt: nowStr
      }
    };
  };

  // Wrap window.fetch to automatically provide Mock AI fallback for /api/chat/send
  if (typeof window !== "undefined" && window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = async function(resource, init) {
      const urlStr = typeof resource === "string" ? resource : (resource ? resource.url : "");
      if (urlStr && urlStr.includes("/api/chat/send")) {
        try {
          const resp = await originalFetch(resource, init);
          if (resp && resp.ok) {
            return resp;
          }
        } catch (err) {
          console.warn("[Mock API] Python server not reachable, using Mock AI Assistant response...", err);
        }

        // Generate instant mock AI response
        let userQuery = "";
        try {
          if (init && init.body) {
            const parsed = typeof init.body === "string" ? JSON.parse(init.body) : init.body;
            userQuery = parsed.message || "";
          }
        } catch (e) {}

        const mockRes = window.__mockChatbot(userQuery);
        return new Response(JSON.stringify(mockRes), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }

      return originalFetch(resource, init);
    };
  }

  // Axios Custom Mock Adapter
  window.__mockAdapter = function(config) {
    const url = config.url || "";
    const method = (config.method || "get").toLowerCase();

    // Mock chat endpoints if requested via axios
    if (url.includes("/api/chat/send")) {
      let q = "";
      try {
        const body = typeof config.data === "string" ? JSON.parse(config.data) : (config.data || {});
        q = body.message || "";
      } catch (e) {}
      const mockChatRes = window.__mockChatbot(q);
      return Promise.resolve({
        data: mockChatRes,
        status: 200,
        statusText: "OK",
        headers: { "content-type": "application/json" },
        config: config,
        request: {}
      });
    }

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
        const isBlob = typeof Blob !== "undefined" && mockRes instanceof Blob;
        resolve({
          data: mockRes !== null ? mockRes : { data: [], status: 200, msgCode: "OK" },
          status: 200,
          statusText: "OK",
          headers: { "content-type": isBlob ? (mockRes.type || "image/png") : "application/json" },
          config: config,
          request: {}
        });
      }, 50); // slight simulated delay for smooth React state updates
    });
  };

  console.log("%c[StudentHub Mock API] Ready! Mock adapter registered to window.__mockAdapter and window.__mockChatbot.", "color: #059669; font-weight: bold;");
})();


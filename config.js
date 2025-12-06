// Portfolio Configuration File
// Ye file aap easily update kar saktay hain - sirf yahan changes karen

const portfolioConfig = {
    // ============ PERSONAL INFORMATION ============
    personal: {
        firstName: "Muhammad",
        lastName: "Usama",
        title: "Microsoft Excel Expert & Database Specialist",
        bio: "Microsoft Excel expert with 3+ years of hands-on experience in VBA automation, data analysis, and complex reporting systems. Currently expanding skills into full-stack development with PostgreSQL and modern web technologies.",
        email: "usamazhar722@gmail.com",
        phone: "+92 307 667 4438",
        location: "Bahawalpur, Pakistan",
        resumeUrl: "#",

        // Profile Images
        profileImage: "assets/images/dp.jpeg",
        aboutImage: "assets/images/about.jpeg"
    },

    // ============ SOCIAL LINKS ============
    social: {
        github: "https://github.com/Usama722",
        linkedin: "https://www.linkedin.com/in/muhammad-usama-50989b305",
        twitter: "",
        instagram: "",
        facebook: ""
    },

    // ============ SKILLS ============
    skills: [
        {
            name: "Microsoft Excel",
            description: "VBA Macros, Pivot Tables, Advanced Formulas, Data Analysis",
            icon: "fas fa-file-excel",
            color: "green",
            level: 95
        },
        {
            name: "VBA Automation",
            description: "Excel Automation, User Forms, Complex Reporting Systems",
            icon: "fas fa-robot",
            color: "blue",
            level: 90
        },
        {
            name: "PostgreSQL",
            description: "Database Design, SQL Queries, Data Management",
            icon: "fas fa-database",
            color: "purple",
            level: 65
        },
        {
            name: "Web Development",
            description: "HTML, CSS, JavaScript, Responsive Design",
            icon: "fas fa-code",
            color: "orange",
            level: 40
        },
    ],

    // ============ TECHNICAL SKILLS (Progress Bars) ============
    technicalSkills: [
        { name: "Microsoft Excel", level: 95, color: "green" },
        { name: "VBA Programming", level: 90, color: "blue" },
        { name: "PostgreSQL", level: 65, color: "purple" },
        { name: "Data Analysis", level: 85, color: "green" },
        { name: "HTML/CSS", level: 70, color: "orange" },
        { name: "JavaScript", level: 40, color: "blue" }
    ],

    // ============ PROJECTS ============
    projects: [
        {
            id: 1,
            title: "Complete Invoicing & Reporting System",
            description: "VBA-based system handling invoicing, recoveries, invoice aging with automated reports.",
            longDescription: "Built a comprehensive invoicing system in Excel VBA that automated the entire billing process. Features include: automatic invoice generation, recovery tracking, aging reports, client statements, and real-time dashboard. Reduced manual work by 80% and improved accuracy.",
            tags: ["Excel VBA", "Automation", "Reporting", "Invoicing"],
            image: "https://media.istockphoto.com/id/2193049871/photo/businessman-works-statistics-data-dashboard-information-business-technology-and-strategy.webp?a=1&b=1&s=612x612&w=0&k=20&c=qBiU8oloyEWIGgmpjWixX_rlxDQ4O14BJikj6m2PTM0=",
            githubUrl: "",
            liveUrl: "",
            featured: true
        },
        {
            id: 2,
            title: "Credit Management System",
            description: "VBA application for tracking customer credits, limits, and payment histories.",
            longDescription: "Developed a credit management system that tracks customer credit limits, payment histories, and generates risk assessment reports. Includes automated alerts for overdue payments and credit limit breaches.",
            tags: ["Excel VBA", "Credit Management", "Risk Analysis"],
            image: "https://images.unsplash.com/photo-1735825764478-674bb8df9d4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENyZWRpdCUyME1hbmFnZW1lbnQlMjBTeXN0ZW18ZW58MHx8MHx8fDA%3D",
            githubUrl: "",
            liveUrl: "",
            featured: true
        },
        {
            id: 3,
            title: "Sales Purchase + Accounts Management",
            description: "Complete business management system with inventory, sales, purchase and accounting.",
            longDescription: "Built an integrated system for managing sales, purchases, inventory, and accounting. Features include: barcode generation, stock tracking, profit/loss reports, GST calculations, and advanced search functionality.",
            tags: ["Excel VBA", "Inventory", "Accounting", "Business Management"],
            image: "https://media.istockphoto.com/id/2187991365/photo/financial-investment-and-success-market-stock-technology-currency-report-money-business.webp?a=1&b=1&s=612x612&w=0&k=20&c=0oplhGalSnw4hsnSbjg7UtgHS7cnaBcUh9bmQ2Hqzio=",
            githubUrl: "",
            liveUrl: "",
            featured: true
        },
        {
            id: 4,
            title: "Database Integration System (In Progress)",
            description: "Excel frontend with PostgreSQL backend for scalable invoicing and data management.",
            longDescription: "Currently developing a hybrid system where Excel serves as the frontend interface while PostgreSQL handles data storage. This eliminates Excel's row limitations and provides better data integrity, backup, and multi-user access.",
            tags: ["PostgreSQL", "Excel", "Database", "Full-Stack"],
            image: "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RGF0YWJhc2UlMjBJbnRlZ3JhdGlvbiUyMFN5c3RlbXxlbnwwfHwwfHx8MA%3D%3D",
            githubUrl: "",

            liveUrl: "",
            featured: true
        }
    ],

    // ============ EXPERIENCE ============
    experience: [
        {
            company: "Freelance & Contract Work",
            position: "Microsoft Excel & VBA Specialist",
            period: "2018 - Present",
            description: "Developed multiple VBA-based solutions for businesses including invoicing systems, credit management, data cleaning tools, and complete business management systems. Automated manual processes saving hundreds of hours monthly.",
            icon: "fas fa-briefcase"
        }
    ],

    // ============ EDUCATION ============
    education: [
        {
            institution: "Self-Taught Developer",
            degree: "Microsoft Excel & VBA Mastery",
            period: "2018 - Present",
            description: "Mastered advanced Excel functions, VBA programming, Pivot Tables, and complex formula combinations through practical projects.",
            icon: "fas fa-graduation-cap"
        },
        {
            institution: "Online Learning",
            degree: "PostgreSQL & Web Development",
            period: "2023 - Present",
            description: "Currently learning PostgreSQL database management and modern web technologies (HTML, CSS, JavaScript) to expand into full-stack development.",
            icon: "fas fa-certificate"
        }
    ],

    // ============ CONTACT FORM ============
    contact: {
        formspreeId: "https://formspree.io/f/mkgdzeqd",
        successMessage: "Thank you! Your message has been sent successfully.",
        errorMessage: "Oops! Something went wrong. Please try again."
    },

    // ============ THEME COLORS ============
    theme: {
        primaryColor: "#3b82f6",    // Blue
        secondaryColor: "#8b5cf6",  // Purple
        accentColor: "#f59e0b",     // Amber
        backgroundColor: "#f9fafb",
        textColor: "#1f2937"
    },

    // ============ SEO META DATA ============
    seo: {
        title: "Muhammad Usama - Excel VBA Expert & Database Specialist",
        description: "Microsoft Excel VBA expert with 3+ years experience in automation, reporting systems, and business solutions. Currently expanding into PostgreSQL and web development.",
        keywords: "excel vba, microsoft excel expert, database specialist, postgresql, automation, data analysis",
        author: "Muhammad Usama"
    }
};
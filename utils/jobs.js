// =======================================================
// 1. The Job Listings Data
// =======================================================
export const jobs = [
    {
        id: 1,
        title: "Frontend Developer (Next.js)",
        category: "Development", // This must match exactly with the filters below
        description: "We are looking for an experienced Frontend Developer to build high-performance web applications.",
        type: "Full-time",
        duration: "Permanent",
        fullDescription: "As a Frontend Developer at FOX LAB, you will be responsible for translating UI/UX design wireframes into actual code that will produce visual elements of the application. You will bridge the gap between graphical design and technical implementation, taking an active role on both sides.",
        responsibilities: [
            "Develop new user-facing features using Next.js and styled-components.",
            "Build reusable code and libraries for future use.",
            "Ensure the technical feasibility of UI/UX designs.",
            "Optimize application for maximum speed and scalability."
        ],
        skills: [
            "Strong proficiency in JavaScript (ES6+).",
            "Extensive experience with Next.js.",
            "Familiarity with styled-components and modern CSS.",
            "Understanding of SEO principles and web accessibility."
        ],
        workingHours: "10:00 AM - 07:00 PM (IST)",
        location: "Hubballi, Karnataka (On-site)",
        jobType: "Full-time"
    },
    {
        id: 2,
        title: "Senior UI/UX Designer",
        category: "Design",
        description: "Seeking a creative UI/UX Designer to craft intuitive and visually stunning digital experiences.",
        type: "Full-time",
        duration: "Permanent",
        fullDescription: "FOX LAB is searching for a Senior UI/UX Designer who is passionate about solving complex problems through elegant design. You will take ownership of the design process from conceptualization to final hand-off.",
        responsibilities: [
            "Gather and evaluate user requirements in collaboration with product managers and engineers.",
            "Illustrate design ideas using storyboards, process flows, and sitemaps.",
            "Design graphic user interface elements, like menus, tabs, and widgets.",
            "Develop UI mockups and prototypes that clearly illustrate how sites function and look."
        ],
        skills: [
            "Proven UI/UX design experience with a strong portfolio.",
            "Up-to-date knowledge of design software like Figma, Adobe XD, or Sketch.",
            "Strong aesthetic skills with the ability to combine various colors, fonts, and layouts.",
            "Good time-management skills."
        ],
        workingHours: "10:00 AM - 07:00 PM (IST)",
        location: "Hubballi, Karnataka / Hybrid",
        jobType: "Full-time"
    },
    {
        id: 3,
        title: "Digital Marketing Executive",
        category: "Marketing",
        description: "Looking for a data-driven marketer to manage campaigns, SEO, and social media presence.",
        type: "Full-time",
        duration: "Contract",
        fullDescription: "Join our dynamic team to lead FOX LAB's digital marketing efforts. You will be responsible for planning, executing, and optimizing our online marketing strategies to increase brand awareness and generate leads.",
        responsibilities: [
            "Plan and execute all digital marketing, including SEO/SEM, marketing database, email, social media, and display advertising campaigns.",
            "Design, build and maintain our social media presence.",
            "Measure and report performance of all digital marketing campaigns, and assess against goals (ROI and KPIs).",
            "Identify trends and insights, and optimize spend and performance based on the insights."
        ],
        skills: [
            "Proven working experience in digital marketing.",
            "Highly creative with experience in identifying target audiences and devising digital campaigns.",
            "Solid knowledge of website analytics tools (e.g., Google Analytics).",
            "Experience in setting up and optimizing Google Adwords campaigns."
        ],
        workingHours: "Flexible",
        location: "Remote",
        jobType: "Contract"
    },
    {
        id: 4,
        title: "Video Editor & Animator",
        category: "Video Production",
        description: "Creative video editor needed for post-production, motion graphics, and visual storytelling.",
        type: "Full-time",
        duration: "Permanent",
        fullDescription: "We need a talented Video Editor to assemble recorded footage into a finished project that matches the director's vision and is suitable for broadcasting. Ultimately, as a film and video editor, you should be able to bring sight and sound together in order to tell a cohesive story.",
        responsibilities: [
            "Manipulate and edit film pieces in a way that is invisible to the audience.",
            "Take a brief to grasp production team's needs and specifications.",
            "Review shooting script and raw material to create a shot decision list based on scenes' value and contribution to continuity.",
            "Input music, dialogues, graphics and effects."
        ],
        skills: [
            "Solid experience with digital technology and editing software packages (e.g. Premiere Pro, After Effects, Final Cut).",
            "Demonstrable video editing ability with a strong portfolio.",
            "Thorough knowledge of timing, motivation, and continuity.",
            "Creative mind and storytelling skills."
        ],
        workingHours: "10:00 AM - 07:00 PM (IST)",
        location: "Hubballi, Karnataka (On-site)",
        jobType: "Full-time"
    }
];

// =======================================================
// 2. The Categories/Filters Array
// =======================================================
// "View All" must be the first item. The rest should match the `category` strings in the jobs array above.
export const filters = [
    "View All",
    "Development",
    "Design",
    "Marketing",
    "Video Production"
];

// =======================================================
// 3. The Filtering Logic
// =======================================================
// This pure JavaScript function takes the jobs array and the active filter, and returns the correct list.
export const filterJobs = (allJobs, activeFilter) => {
    if (activeFilter === "View All") {
        return allJobs;
    }

    return allJobs.filter((job) => job.category === activeFilter);
};
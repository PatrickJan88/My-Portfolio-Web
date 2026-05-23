const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50 });

doc.pipe(fs.createWriteStream('public/Pofei_Ran_CV.pdf'));

// Fonts
const titleSize = 24;
const sectionSize = 16;
const normalSize = 10;
const smallSize = 9;

// Header
doc.fontSize(titleSize).text('Pofei Ran', { align: 'left' });
doc.moveDown(0.5);

doc.fontSize(normalSize).text('UX/UI Designer & Product Builder | Design Strategy, AI & Vibe Coding');
doc.moveDown(0.2);
doc.text('Location: Uppsala, Sweden    Years of work experience: 10');
doc.moveDown(0.2);
doc.text('Target position: UX/UI, Product Designer, Design Engineer');
doc.moveDown(0.2);
doc.text('Contact information: ranpofei@gmail.com    LinkedIn: linkedin.com/in/pofei-ran-79586395', { link: 'https://linkedin.com/in/pofei-ran-79586395', underline: true });

doc.moveDown(2);

// Education
doc.fontSize(sectionSize).fillColor('#3E57FF').text('Education').fillColor('black');
doc.moveDown(0.5);
doc.fontSize(normalSize).font('Helvetica-Bold').text('Uppsala University, Human Computer Interaction, Master\'s Degree');
doc.font('Helvetica').text('Sep 2025 - Jun 2027');
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Chengdu College of University of Electronic Science and Technology of China, Animation, Bachelor\'s Degree');
doc.font('Helvetica').text('Sep 2007 - Jun 2011');

doc.moveDown(2);

// Career experience
doc.fontSize(sectionSize).fillColor('#3E57FF').text('Career experience').fillColor('black');
doc.moveDown(0.5);

// Gaddr
doc.fontSize(normalSize).font('Helvetica-Bold').text('Gaddr — Assistant Lead Product Designer (Remote) — Stockholm County, Sweden');
doc.font('Helvetica').text('Oct 2025 - Jan 2026 (4 months)');
doc.moveDown(0.2);
const gaddrPoints = [
  "Designed user-centered workflows and content management interfaces for an AI-powered social media management platform (MVP1), delivering scalable desktop and mobile-first experiences for cross-platform administration.",
  "Architected complex administrative dashboards that enabled users to monitor cross-platform engagement data and seamlessly trigger AI-automated content publishing.",
  "Developed comprehensive user flows for multi-platform social linking, identity verification, and automated content collections, translating heavy administrative tasks into intuitive user experiences.",
  "Validated and measured design effectiveness by conducting direct A/B testing with target users, tracking adoption metrics to optimize the AI-driven management workflows.",
  "Expanded the proprietary Design System, creating reusable components and data visualization patterns to ensure UI consistency across the entire SaaS ecosystem."
];
gaddrPoints.forEach(p => {
  doc.fontSize(smallSize).text(`•  ${p}`, { indent: 10, lineGap: 2 });
  doc.moveDown(0.2);
});

doc.moveDown(0.5);

// Essex Lake Group
doc.fontSize(normalSize).font('Helvetica-Bold').text('Essex Lake Group — UI Designer II — Shanghai/Xi\'an/New York');
doc.font('Helvetica').text('Aug 2022 - July 2025 (3 years)');
doc.moveDown(0.2);
const essexPoints = [
  "Partnered continuously with PMs and engineering teams from day one to build AI-driven financial platforms for executive and management-level users, including EARS™ (Executive Action and Response Solutions) and EyeVia™ (a control and analysis platform for mid-level management).",
  "Designed and developed data visualization dashboards and analytical interfaces using Tableau, Power BI, and the company's proprietary financial design system, which enabled real-time insight generation, data analysis, and conversion of insights into actionable tasks. The platform empowered executives to monitor performance, manage workflows anytime and anywhere, and make data-driven decisions confidently.",
  "Delivered customized design solutions for clients such as a North American Top 3 bank (TD Bank) and a leading Canadian financial institution (BMO Group), aligning design outcomes with complex business goals and compliance standards.",
  "Led the corporate website redesign and created over 30 marketing brochures and executive presentation decks, strengthening the company's visual identity and communication strategy.",
  "Collaborated across data science, product, and consulting teams to ensure usability, consistency, and clarity across platforms that support true, data-driven financial solutions.",
  "Collaborated closely with engineering and product management in an Agile environment to ensure flawless, implementation-ready handoffs for dynamic profile themes and complex data grids."
];
essexPoints.forEach(p => {
  doc.fontSize(smallSize).text(`•  ${p}`, { indent: 10, lineGap: 2 });
  doc.moveDown(0.2);
});

doc.moveDown(0.5);

// Beijing Yuanxin Tech
doc.fontSize(normalSize).font('Helvetica-Bold').text('Beijing Yuanxin Technology Co., Ltd. — Mid-level Designer — Beijing, China');
doc.font('Helvetica').text('May 2021 - May 2022 (1 year)');
doc.moveDown(0.2);
const yuanxinPoints = [
  "Created an intuitive and scalable UI/UX for cross-platform solutions, including WeChat mini programs, iOS, and Android. Focused on improving user engagement and accessibility for healthcare professionals in digital learning environments.",
  "Developed user-friendly interfaces that simplify prescription management and order flows.",
  "Created responsive, patient-centered mobile app (Yuanxin Health) UI/UX for remote consultations and medical services.",
  "Designed clear and accessible interfaces for policy browsing, claims, and customer support.",
  "Designed sophisticated dashboards and data visualizations for B2B health and big data platforms in enterprise healthcare analytics tools."
];
yuanxinPoints.forEach(p => {
  doc.fontSize(smallSize).text(`•  ${p}`, { indent: 10, lineGap: 2 });
  doc.moveDown(0.2);
});

doc.moveDown(0.5);

// Play Basis
doc.fontSize(normalSize).font('Helvetica-Bold').text('Play Basis — UI Designer — Bangkok, Thailand');
doc.font('Helvetica').text('Jan 2015 - Mar 2020 (5 years 3 months)');
doc.moveDown(0.2);
const playBasisPoints = [
  "Created responsive, performance-optimized websites and user-friendly iOS/Android interfaces. Emphasized usability, accessibility, and scalable design systems from wireframe to front-end collaboration, ensuring seamless user experiences.",
  "Led several customer solution design projects across various industries and regions, including the power and solar sector in Australia, a charging station app for clients in Poland and Vietnam, and UI/UX design for a website and ERP system for a Chinese company.",
  "Designed the complete UI/UX design process for various web and mobile applications in the e-commerce, services, and education sectors. Conducted research on user interactions and interface habits across five regions to inform design decisions."
];
playBasisPoints.forEach(p => {
  doc.fontSize(smallSize).text(`•  ${p}`, { indent: 10, lineGap: 2 });
  doc.moveDown(0.2);
});

doc.moveDown(2);

// Skills
doc.fontSize(sectionSize).fillColor('#3E57FF').text('Skills').fillColor('black');
doc.moveDown(0.5);

const skills = [
  { title: "Design & Prototyping", str: "Figma, Sketch, Lottie Animation, Adobe Creative Suite (Photoshop, Illustrator, InDesign)" },
  { title: "AI & Frontend Development", str: "Cursor, Claude Code, Google AI Studio, Codex, LLM Prompting, Visual Studio Code, HTML, CSS, JavaScript, React, Tailwind CSS, Vercel, Shadcn UI, Next.js, Vite" },
  { title: "UX Methodologies & Research", str: "Service Design, User Journey Mapping, User Research, Design Systems, Storyboarding, Prototyping, Service Blueprinting, Stakeholder Management, Usability Testing, Accessibility (WCAG 2.1), Agile Development, UX Writing, Human-AI Interaction, Quantitative/Qualitative UX Metrics" },
  { title: "Product Strategy & Data", str: "Tableau, Atlassian Jira, Product Strategy, Data-Driven Design" },
  { title: "Languages", str: "Chinese (Native), English (Professional Working Proficiency), Swedish (Limited Working Proficiency), Thai (Limited Working Proficiency)" }
];

skills.forEach(s => {
  doc.fontSize(normalSize).font('Helvetica-Bold').text(s.title);
  doc.font('Helvetica').fontSize(smallSize).text(`•  ${s.str}`, { indent: 10, lineGap: 2 });
  doc.moveDown(0.5);
});

doc.end();

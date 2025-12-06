// Professional PDF Generator for Portfolio
// Clean, professional design without UTF-8 issues

class PDFGenerator {
    constructor(config) {
        this.config = config;
        this.doc = null;
        this.currentY = 20;
        this.pageWidth = 210;
        this.pageHeight = 297;
        this.margin = 20;
        this.lineHeight = 6;
        this.sectionSpacing = 10;
    }

    async generatePDF() {
        try {
            await this.loadJSPDF();

            const { jsPDF } = window.jspdf;
            this.doc = new jsPDF('p', 'mm', 'a4');

            this.setupDocument();
            this.addHeader();
            this.addContactInfo();
            this.addProfessionalSummary();
            this.addSkillsSection();
            this.addExperienceSection();
            this.addEducationSection();
            this.addProjectsSection();
            this.addFooter();

            this.doc.save(`${this.config.personal.firstName}_${this.config.personal.lastName}_CV.pdf`);

            return true;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    }

    async loadJSPDF() {
        return new Promise((resolve, reject) => {
            if (window.jspdf && window.jspdf.jsPDF) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setupDocument() {
        const personal = this.config.personal;

        this.doc.setProperties({
            title: `${personal.firstName} ${personal.lastName} - Curriculum Vitae`,
            subject: 'Professional CV',
            author: `${personal.firstName} ${personal.lastName}`,
            keywords: 'cv, resume, excel vba, database, web development',
            creator: 'Portfolio CV Generator'
        });

        // Set fonts that support English text properly
        this.doc.setFont("helvetica");
    }

    addHeader() {
        const personal = this.config.personal;

        // Name - Large and bold
        this.doc.setFontSize(24);
        this.doc.setFont("helvetica", "bold");
        this.doc.setTextColor(0, 0, 0);
        this.doc.text(`${personal.firstName.toUpperCase()} ${personal.lastName.toUpperCase()}`,
                     this.pageWidth / 2, this.currentY, { align: 'center' });

        // Title
        this.currentY += 8;
        this.doc.setFontSize(14);
        this.doc.setFont("helvetica", "normal");
        this.doc.setTextColor(100, 100, 100);
        this.doc.text(personal.title.toUpperCase(), this.pageWidth / 2, this.currentY, { align: 'center' });

        this.currentY += 15;

        // Divider line
        this.doc.setDrawColor(200, 200, 200);
        this.doc.setLineWidth(0.5);
        this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);

        this.currentY += 10;
    }

    addContactInfo() {
        const personal = this.config.personal;

        this.doc.setFontSize(10);
        this.doc.setFont("helvetica", "normal");
        this.doc.setTextColor(80, 80, 80);

        // Email
        this.doc.text(`Email: ${personal.email}`, this.margin, this.currentY);

        // Phone
        this.doc.text(`Phone: ${personal.phone}`, this.pageWidth - this.margin, this.currentY, { align: 'right' });

        this.currentY += 5;

        // Location
        this.doc.text(`Location: ${personal.location}`, this.margin, this.currentY);

        // LinkedIn
        if (this.config.social.linkedin) {
            const linkedinShort = this.config.social.linkedin.replace('https://', '').replace('www.', '');
            this.doc.text(`LinkedIn: ${linkedinShort}`, this.pageWidth - this.margin, this.currentY, { align: 'right' });
        }

        this.currentY += 10;

        // Thin divider
        this.doc.setDrawColor(230, 230, 230);
        this.doc.setLineWidth(0.3);
        this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);

        this.currentY += 15;
    }

    addProfessionalSummary() {
        this.addSectionHeader('PROFESSIONAL SUMMARY');

        const personal = this.config.personal;
        this.doc.setFontSize(11);
        this.doc.setFont("helvetica", "normal");
        this.doc.setTextColor(60, 60, 60);

        // Split bio into multiple lines
        const summaryLines = this.doc.splitTextToSize(personal.bio, this.pageWidth - (2 * this.margin));
        this.doc.text(summaryLines, this.margin, this.currentY);

        // Update Y position based on number of lines
        this.currentY += (summaryLines.length * this.lineHeight) + this.sectionSpacing;
    }

    addSkillsSection() {
        this.addSectionHeader('TECHNICAL SKILLS');

        // Start table for skills
        const startX = this.margin;
        let skillY = this.currentY;

        this.doc.setFontSize(10);

        this.config.technicalSkills.forEach((skill, index) => {
            // Check if we need a new page
            if (skillY > this.pageHeight - 30) {
                this.addNewPage();
                skillY = this.currentY;
            }

            // Skill name
            this.doc.setFont("helvetica", "bold");
            this.doc.setTextColor(0, 0, 0);
            this.doc.text(skill.name, startX, skillY);

            // Percentage
            this.doc.setFont("helvetica", "normal");
            this.doc.setTextColor(100, 100, 100);
            this.doc.text(`${skill.level}%`, startX + 50, skillY);

            // Progress bar
            const barWidth = 70;
            const barHeight = 4;
            const barX = startX + 60;
            const barY = skillY - 2;

            // Background bar
            this.doc.setFillColor(230, 230, 230);
            this.doc.rect(barX, barY, barWidth, barHeight, 'F');

            // Progress fill with color based on level
            let fillColor;
            if (skill.level >= 80) fillColor = [34, 197, 94];  // Green
            else if (skill.level >= 60) fillColor = [59, 130, 246]; // Blue
            else if (skill.level >= 40) fillColor = [249, 115, 22]; // Orange
            else fillColor = [239, 68, 68]; // Red

            this.doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
            this.doc.rect(barX, barY, (barWidth * skill.level) / 100, barHeight, 'F');

            skillY += 8;
        });

        this.currentY = skillY + this.sectionSpacing;
    }

    addExperienceSection() {
        this.addSectionHeader('PROFESSIONAL EXPERIENCE');

        this.doc.setFontSize(11);

        this.config.experience.forEach((exp) => {
            // Check page break
            if (this.currentY > this.pageHeight - 40) {
                this.addNewPage();
            }

            // Position (bold)
            this.doc.setFont("helvetica", "bold");
            this.doc.setTextColor(0, 0, 0);
            this.doc.text(exp.position, this.margin, this.currentY);

            // Company and period (normal)
            this.currentY += 5;
            this.doc.setFont("helvetica", "normal");
            this.doc.setTextColor(59, 130, 246); // Blue color for company
            this.doc.text(exp.company, this.margin, this.currentY);

            this.doc.setTextColor(150, 150, 150);
            this.doc.text(exp.period, this.pageWidth - this.margin, this.currentY, { align: 'right' });

            // Description
            this.currentY += 5;
            this.doc.setTextColor(80, 80, 80);
            const descLines = this.doc.splitTextToSize(exp.description, this.pageWidth - (2 * this.margin));
            this.doc.text(descLines, this.margin, this.currentY);

            this.currentY += (descLines.length * this.lineHeight) + 8;
        });

        this.currentY += this.sectionSpacing;
    }

    addEducationSection() {
        this.addSectionHeader('EDUCATION & CERTIFICATIONS');

        this.doc.setFontSize(11);

        this.config.education.forEach((edu) => {
            // Check page break
            if (this.currentY > this.pageHeight - 40) {
                this.addNewPage();
            }

            // Degree (bold)
            this.doc.setFont("helvetica", "bold");
            this.doc.setTextColor(0, 0, 0);
            this.doc.text(edu.degree, this.margin, this.currentY);

            // Institution and period
            this.currentY += 5;
            this.doc.setFont("helvetica", "normal");
            this.doc.setTextColor(34, 197, 94); // Green color for institution
            this.doc.text(edu.institution, this.margin, this.currentY);

            this.doc.setTextColor(150, 150, 150);
            this.doc.text(edu.period, this.pageWidth - this.margin, this.currentY, { align: 'right' });

            // Description
            this.currentY += 5;
            this.doc.setTextColor(80, 80, 80);
            const descLines = this.doc.splitTextToSize(edu.description, this.pageWidth - (2 * this.margin));
            this.doc.text(descLines, this.margin, this.currentY);

            this.currentY += (descLines.length * this.lineHeight) + 8;
        });

        this.currentY += this.sectionSpacing;
    }

    addProjectsSection() {
        this.addSectionHeader('KEY PROJECTS');

        this.doc.setFontSize(11);

        const featuredProjects = this.config.projects.filter(p => p.featured);

        featuredProjects.forEach((project, index) => {
            // Check page break
            if (this.currentY > this.pageHeight - 40) {
                this.addNewPage();
            }

            // Project title (bold)
            this.doc.setFont("helvetica", "bold");
            this.doc.setTextColor(0, 0, 0);
            this.doc.text(`${index + 1}. ${project.title}`, this.margin, this.currentY);

            // Description
            this.currentY += 5;
            this.doc.setFont("helvetica", "normal");
            this.doc.setTextColor(80, 80, 80);
            const descLines = this.doc.splitTextToSize(project.description, this.pageWidth - (2 * this.margin));
            this.doc.text(descLines, this.margin, this.currentY);

            this.currentY += (descLines.length * this.lineHeight) + 4;

            // Tags
            this.doc.setFontSize(9);
            let tagX = this.margin;
            const tagY = this.currentY;

            project.tags.forEach(tag => {
                const tagWidth = this.doc.getStringUnitWidth(tag) * 2.5 + 6;

                // Tag background
                this.doc.setFillColor(59, 130, 246, 0.1); // Light blue background
                this.doc.roundedRect(tagX, tagY - 3, tagWidth, 5, 1, 1, 'F');

                // Tag text
                this.doc.setTextColor(59, 130, 246); // Blue text
                this.doc.text(tag, tagX + 3, tagY);

                tagX += tagWidth + 4;
            });

            this.currentY += 10;

            // Add separator line between projects (except last)
            if (index < featuredProjects.length - 1) {
                this.doc.setDrawColor(230, 230, 230);
                this.doc.setLineWidth(0.2);
                this.doc.line(this.margin + 10, this.currentY - 2, this.pageWidth - this.margin - 10, this.currentY - 2);
                this.currentY += 5;
            }
        });

        this.currentY += this.sectionSpacing;
    }

    addSectionHeader(title) {
        // Check if we need a new page
        if (this.currentY > this.pageHeight - 30) {
            this.addNewPage();
        }

        // Section title with underline
        this.doc.setFontSize(14);
        this.doc.setFont("helvetica", "bold");
        this.doc.setTextColor(0, 0, 0);
        this.doc.text(title, this.margin, this.currentY);

        // Underline
        this.doc.setDrawColor(59, 130, 246); // Blue color
        this.doc.setLineWidth(0.8);
        this.doc.line(this.margin, this.currentY + 1, this.margin + 40, this.currentY + 1);

        this.currentY += 10;
    }

    addNewPage() {
        this.doc.addPage();
        this.currentY = 30;

        // Add header on new page
        const personal = this.config.personal;
        this.doc.setFontSize(10);
        this.doc.setFont("helvetica", "normal");
        this.doc.setTextColor(150, 150, 150);
        this.doc.text(`${personal.firstName} ${personal.lastName} - CV`, this.margin, 15);
        this.doc.text(`Page ${this.doc.internal.getNumberOfPages()}`, this.pageWidth - this.margin, 15, { align: 'right' });

        // Separator line
        this.doc.setDrawColor(220, 220, 220);
        this.doc.setLineWidth(0.3);
        this.doc.line(this.margin, 18, this.pageWidth - this.margin, 18);
    }

    addFooter() {
        const totalPages = this.doc.internal.getNumberOfPages();
        const personal = this.config.personal;
        const currentYear = new Date().getFullYear();

        for (let i = 1; i <= totalPages; i++) {
            this.doc.setPage(i);

            // Page number
            this.doc.setFontSize(9);
            this.doc.setFont("helvetica", "normal");
            this.doc.setTextColor(150, 150, 150);
            this.doc.text(`Page ${i} of ${totalPages}`, this.pageWidth / 2, this.pageHeight - 10, { align: 'center' });

            // Copyright
            this.doc.text(`© ${currentYear} ${personal.firstName} ${personal.lastName}`, this.margin, this.pageHeight - 10);

            // Contact in footer (first page only)
            if (i === 1) {
                this.doc.text(`${personal.email} | ${personal.phone}`, this.pageWidth - this.margin, this.pageHeight - 10, { align: 'right' });
            }
        }
    }
}
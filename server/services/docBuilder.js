import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from "docx";

const ACCENT = "1F4E79"; // deep ink navy, matches the app's brand color

/**
 * Builds a simple, clean, single-column ATS-friendly DOCX buffer.
 * Single column + standard headings + no tables/images = maximum ATS compatibility.
 * @param {object} resume - normalized generated resume object
 * @returns {Promise<Buffer>}
 */
export async function buildResumeDocx(resume) {
  const children = [];

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: resume.fullName, bold: true, size: 36, color: ACCENT }),
      ],
    })
  );

  if (resume.title) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: resume.title, size: 24, italics: true })],
      })
    );
  }

  if (resume.contact) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: resume.contact, size: 20, color: "555555" })],
      })
    );
  }

  if (resume.summary) {
    children.push(sectionHeading("Professional Summary"));
    children.push(new Paragraph({ children: [new TextRun({ text: resume.summary, size: 22 })] }));
  }

  if (resume.skills?.length) {
    children.push(sectionHeading("Skills"));
    children.push(
      new Paragraph({ children: [new TextRun({ text: resume.skills.join("  •  "), size: 22 })] })
    );
  }

  if (resume.experience?.length) {
    children.push(sectionHeading("Experience"));
    for (const job of resume.experience) {
      children.push(
        new Paragraph({
          spacing: { before: 150 },
          children: [
            new TextRun({ text: `${job.role}`, bold: true, size: 23 }),
            new TextRun({ text: job.company ? `  —  ${job.company}` : "", size: 23 }),
          ],
        })
      );
      if (job.dates) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: job.dates, italics: true, size: 20, color: "666666" })],
          })
        );
      }
      for (const bullet of job.bullets || []) {
        children.push(bulletParagraph(bullet));
      }
    }
  }

  if (resume.projects?.length) {
    children.push(sectionHeading("Projects"));
    for (const proj of resume.projects) {
      children.push(
        new Paragraph({
          spacing: { before: 120 },
          children: [new TextRun({ text: proj.name, bold: true, size: 22 })],
        })
      );
      if (proj.description) {
        children.push(
          new Paragraph({ children: [new TextRun({ text: proj.description, size: 21 })] })
        );
      }
    }
  }

  if (resume.education?.length) {
    children.push(sectionHeading("Education"));
    for (const edu of resume.education) {
      children.push(
        new Paragraph({
          spacing: { before: 100 },
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 22 }),
            new TextRun({ text: edu.institution ? `  —  ${edu.institution}` : "", size: 22 }),
          ],
        })
      );
      if (edu.dates) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: edu.dates, italics: true, size: 20, color: "666666" })],
          })
        );
      }
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
    styles: {
      default: { document: { run: { font: "Calibri" } } },
    },
  });

  return Packer.toBuffer(doc);
}

function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 100 },
    border: {
      bottom: { color: ACCENT, space: 4, style: BorderStyle.SINGLE, size: 6 },
    },
    children: [new TextRun({ text, bold: true, color: ACCENT, size: 26 })],
  });
}

function bulletParagraph(text) {
  return new Paragraph({
    bullet: { level: 0 },
    children: [new TextRun({ text, size: 22 })],
  });
}

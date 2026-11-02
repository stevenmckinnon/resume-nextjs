import { DATA } from "@/data/resume";

const GROUPS = [...new Set(DATA.skills.map((skill) => skill.group))];

const bullets = (description: string | string[] | undefined) =>
  Array.isArray(description) ? description : description ? [description] : [];

/**
 * What the page turns into on paper. A dedicated document rather than a print
 * stylesheet fighting the screen layout: nothing in a poster-sized hero, a
 * full-bleed photograph or a contact form belongs on A4, and restyling them away
 * one by one is how print styles rot.
 *
 * Every word comes from resume.tsx, so it cannot disagree with the site. It is
 * `display: none` on screen, so it is not read out twice.
 */
export const PrintCv = () => (
  <article className="print-cv">
    <header>
      <h1>{DATA.name}</h1>
      <p>{DATA.description}</p>
      <p className="print-cv-contact">
        {DATA.contact.email} · {DATA.location} ·{" "}
        {DATA.url.replace("https://", "")}
      </p>
    </header>

    <section>
      <h2>Profile</h2>
      {DATA.summary.split("\n\n").map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>

    <section>
      <h2>Skills</h2>
      <dl>
        {GROUPS.map((group) => (
          <div key={group}>
            <dt>{group}</dt>
            <dd>
              {DATA.skills
                .filter((skill) => skill.group === group)
                .map((skill) => skill.name)
                .join(", ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>

    <section>
      <h2>Experience</h2>
      {DATA.work.map((role) => (
        <div key={`${role.company}-${role.start}`} className="print-cv-role">
          <h3>
            {role.title}, {role.company}
          </h3>
          <p className="print-cv-dates">
            {role.start} to {role.end ?? "present"}
          </p>
          <ul>
            {bullets(role.description).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    <section>
      <h2>Education</h2>
      {DATA.education.map((education) => (
        <div key={education.school} className="print-cv-role">
          <h3>{education.degree}</h3>
          <p className="print-cv-dates">
            {education.school}, {education.start} to {education.end}
          </p>
        </div>
      ))}
    </section>

    <section>
      <h2>Projects</h2>
      <ul>
        {DATA.projects.map((project) => (
          <li key={project.name}>
            <strong>{project.name.replace(/\.$/, "")}.</strong>{" "}
            {project.description}
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h2>Also</h2>
      <ul>
        {DATA.otherWork.map((work) => (
          <li key={work.company}>
            <strong>{work.title}</strong>, {work.company}, since {work.start}
          </li>
        ))}
      </ul>
    </section>
  </article>
);

/** Keeps "Front-End" whole: a break after the hyphen reads as a typo at size. */
export const RoleTitle = ({ title }: { title: string }) =>
  title.split(/(Front-End)/).map((part) =>
    part === "Front-End" ? (
      <span key={part} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );

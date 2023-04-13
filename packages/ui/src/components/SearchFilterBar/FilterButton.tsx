import { colors } from "../../design/colors";

export const FilterButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      style={{
        display: "flex",
        gap: "1rem",
        padding: "0.5rem",
        alignItems: "center",
        backgroundColor: "transparent",
        color: colors.white,
        fontFamily: "Roboto",
        fontSize: "10px",
        fontWeight: 700,
        lineHeight: "12px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      <img src="/filter.png" alt="filter" />
      Filters
    </button>
  );
};

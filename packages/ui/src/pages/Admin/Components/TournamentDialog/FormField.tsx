import { StyledField, StyledInput } from "./FormField.styled";

export const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <StyledField>
      <label htmlFor={name}>{label}</label>
      <StyledInput
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </StyledField>
  );
};

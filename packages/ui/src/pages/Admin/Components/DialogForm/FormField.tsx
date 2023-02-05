import { useMemo } from "react";
import {
  StyledField,
  StyledCheckboxGroup,
  StyledInput,
  StyledOptionContainer,
  StyledSelect,
} from "./FormField.styled";

interface Props {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  value?: any;
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  specialType?: string;
  options?: { name: string; value: string }[];
}

export const SelectFormContent = ({
  name,
  onChange,
  value,
  children,
  specialType,
}: React.PropsWithChildren<Props>) => {
  return (
    <StyledSelect
      name={name}
      onChange={onChange}
      value={value}
      data-sptype={specialType}
    >
      {children}
    </StyledSelect>
  );
};

export const InputFormContent = ({
  name,
  type,
  value,
  onChange,
  specialType,
}: React.PropsWithChildren<Props>) => {
  return (
    <StyledInput
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      data-sptype={specialType}
    />
  );
};

export const MultiSelectFormContent = ({
  name,
  children,
  options,
}: React.PropsWithChildren<Props>) => {
  return (
    <StyledCheckboxGroup>
      {options?.map((option) => (
        <StyledOptionContainer key={option.value}>
          <input
            id={option.value}
            type="checkbox"
            name={name}
            value={option.value}
          />
          <label htmlFor={option.value}>{option.name}</label>
        </StyledOptionContainer>
      ))}
    </StyledCheckboxGroup>
  );
};

export const FormField = (props: React.PropsWithChildren<Props>) => {
  const contentElement = useMemo(() => {
    if (props.type === "select") {
      return <SelectFormContent {...props} />;
    }
    if (props.type === "multiselect") {
      return <MultiSelectFormContent {...props} />;
    }
    if (props.type === "file") {
      return <input {...props} />;
    }

    if (props.type === "multiline") {
      return <textarea {...props} rows={50} cols={50} />;
    }

    return <InputFormContent {...props} />;
  }, [props]);

  return (
    <StyledField>
      <label htmlFor={props.name}>{props.label}</label>
      {contentElement}
    </StyledField>
  );
};

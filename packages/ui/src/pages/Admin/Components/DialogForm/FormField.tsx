import { useMemo } from "react";
import {
  FieldLabel,
  StyledField,
  StyledInput,
  StyledSelect,
} from "./FormField.styled";

export interface FormFieldProps {
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
  options?: { name: string; value: string; key?: string }[];
}

export const SelectFormContent = ({
  name,
  onChange,
  value,
  children,
  specialType,
  options,
}: React.PropsWithChildren<FormFieldProps>) => {
  return (
    <StyledSelect
      name={name}
      onChange={onChange}
      value={value}
      data-sptype={specialType}
    >
      {options
        ? options.map(({ name, value, key }) => (
            <option key={key || value} value={value}>
              {name}
            </option>
          ))
        : children}
    </StyledSelect>
  );
};

export const InputFormContent = ({
  name,
  type,
  value,
  onChange,
  specialType,
}: React.PropsWithChildren<FormFieldProps>) => {
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

export const FormField = (props: React.PropsWithChildren<FormFieldProps>) => {
  const contentElement = useMemo(() => {
    if (props.type === "select") {
      return <SelectFormContent {...props} />;
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
      <FieldLabel htmlFor={props.name}>{props.label}</FieldLabel>
      {contentElement}
    </StyledField>
  );
};

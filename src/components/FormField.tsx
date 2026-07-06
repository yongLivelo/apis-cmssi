import {
  AspectRatio,
  Checkbox,
  FileInput,
  Group,
  Image,
  Input,
  NumberInput,
  Select,
  TextInput,
  type ComboboxData,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import type { UseFormReturnType } from "@mantine/form";
import { useEffect, useState } from "react";

interface FormFieldProps {
  form: UseFormReturnType<any>;
  formField: FormFieldConfig;
}

interface FormFieldConfig {
  id: string;
  label: string;
  type:
  | "text"
  | "number-range"
  | "checkbox"
  | "selection"
  | "date-range"
  | "number"
  | "file"
  | "date"
  | "file-image";
  disabled?: boolean;
  selection?: string[];
}

function FormField({ form, formField }: FormFieldProps) {
  switch (formField.type) {
    case "date":
      return (
        <DatePickerInput
          label={formField.label}
          key={form.key(formField.id)}
          disabled={formField.disabled}
          {...form.getInputProps(formField.id)}
        />
      );
    case "file-image":
      return (
        <FileImageField
          form={form}
          key={form.key(formField.id)}
          formField={formField}
        />
      );

    case "file":
      return (
        <FileInput
          clearable
          label={formField.label}
          key={form.key(formField.id)}
          disabled={formField.disabled}
          {...form.getInputProps(formField.id)}
        />
      );
    case "number":
      return (
        <NumberInput
          label={formField.label}
          key={form.key(formField.id)}
          disabled={formField.disabled}
          {...form.getInputProps(formField.id)}
        />
      );
    case "text":
      return (
        <TextInput
          labelPosition="left"
          label={formField.label}
          key={form.key(formField.id)}
          disabled={formField.disabled}
          {...form.getInputProps(formField.id)}
        />
      );
    case "number-range":
      return <NumberRangeField form={form} formField={formField} />;
    case "selection":
      return (
        <Select
          label={formField.label}
          data={formField.selection as ComboboxData}
          key={form.key(formField.id)}
          disabled={formField.disabled}
          {...form.getInputProps(formField.id)}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          label={formField.label}
          key={form.key(formField.id)}
          disabled={formField.disabled}
          {...form.getInputProps(formField.id)}
        />
      );
    case "date-range":
      return (
        <DatePickerInput
          allowSingleDateInRange
          type="range"
          label={formField.label}
          key={form.key(formField.id)}
          disabled={formField.disabled}
          {...form.getInputProps(formField.id)}
        />
      );
    default:
      return null;
  }
}
function NumberRangeField({ form, formField }: FormFieldProps) {
  const validateRange = (min: number, max: number) => {
    if (min > max) {
      console.log(123);
      form.setFieldError(formField.id, "Start must be less than end");
    } else {
      form.setFieldError(formField.id, null);
    }
  };
  const fieldProps = form.getInputProps(formField.id);
  const minKey = form.key(`${formField.id}.0`);
  const maxKey = form.key(`${formField.id}.1`);
  const minProps = form.getInputProps(`${formField.id}.0`);
  const maxProps = form.getInputProps(`${formField.id}.1`);

  return (
    <Input.Wrapper
      key={form.key(formField.id)}
      label={formField.label}
      error={fieldProps.error || minProps.error || maxProps.error}
    >
      <Group grow>
        <NumberInput
          key={minKey}
          disabled={formField.disabled}
          {...minProps}
          onChange={(val) => {
            minProps.onChange(val);
            const max = form.getValues()[`${formField.id}`][1];
            validateRange(val as number, max);
          }}
        />
        <NumberInput
          key={maxKey}
          disabled={formField.disabled}
          {...maxProps}
          onChange={(val) => {
            maxProps.onChange(val);
            const min = form.getValues()[`${formField.id}`][0];
            validateRange(min, val as number);
          }}
        />
      </Group>
    </Input.Wrapper>
  );
}
function FileImageField({ form, formField }: FormFieldProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const FileImageProps = form.getInputProps(formField.id);

  useEffect(() => {
    const formValue = form.getValues()[formField.id];
    if (formValue instanceof File) {
      setFile(formValue);
    }
  }, [form.getValues()[formField.id]]);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <Input.Wrapper
      key={form.key(formField.id)}
      label={formField.label}
      error={FileImageProps.error || fileError}
    >
      <AspectRatio ratio={1}>
        <Image src={preview} />
      </AspectRatio>
      <FileInput
        clearable
        value={file}
        disabled={formField.disabled}
        onChange={(file) => {
          if (file && file.size > 1024 * 1024) {
            setFileError("Image must be under 5MB");
            setFile(null);
            FileImageProps.onChange(null);
            return;
          }
          setFileError(null);
          setFile(file);
          FileImageProps.onChange(file);
        }}
        accept="image/png,image/jpeg"
      />
    </Input.Wrapper>
  );
}

function createInitialValues(formFields: FormFieldConfig[]) {
  return formFields.reduce<Record<string, any>>((acc, field) => {
    switch (field.type) {
      case "text":
      case "number":
      case "selection":
        acc[field.id] = "";
        break;
      case "number-range":
        acc[field.id] = ["", ""];
        break;
      case "checkbox":
        acc[field.id] = false;
        break;
      case "date":
      case "file":
      case "file-image":
        acc[field.id] = null;
        break;
      case "date-range":
        acc[field.id] = [null, null];
        break;
    }
    return acc;
  }, {});
}
function generateValidations(fields: FormFieldConfig[]) {
  return fields.reduce<Record<string, (value: any) => string | null>>(
    (acc, field) => {
      if (field.disabled) return acc;
      switch (field.type) {
        case "text":
        case "selection":
          acc[field.id] = (v: string) =>
            (v as string).trim().length === 0
              ? `${field.label} is required`
              : null;
          break;
        case "number":
          acc[field.id] = (v: string) =>
            v === "" || v === null ? `${field.label} is required` : null;
          break;
        case "date":
          acc[field.id] = (v: Date | null) =>
            !v ? `${field.label} is required` : null;
          break;
      }
      return acc;
    },
    {} as Record<string, (value: any) => string | null>,
  );
}

export {
  createInitialValues,
  FormField,
  generateValidations,
  type FormFieldConfig,
};

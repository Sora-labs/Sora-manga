import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  placeholder?: string;
  options: any[];
  fieldValue?: string;
  fieldLabel?: string;
  defaultValue?: any;
  onChange: (value: string) => void;
}

const CustomSelect = (props: Props) => {
  const {
    placeholder,
    options,
    fieldLabel,
    fieldValue,
    defaultValue,
    onChange,
  } = props;
  const value = fieldValue ?? "id";
  const label = fieldLabel ?? "name";

  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem value={option[value]}>{option[label]}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;

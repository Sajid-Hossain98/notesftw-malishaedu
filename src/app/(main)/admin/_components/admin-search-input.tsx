import { Input } from "@/components/ui/input";

interface AdminSearchInputFieldProps {
  placeholder: string;
  value: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AdminSearchInputField = ({
  placeholder,
  value,

  onChange,
}: AdminSearchInputFieldProps) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoFocus
      style={{
        borderRadius: "5px",
      }}
      className="dark:bg-[#303030] bg-[#FAFAFA] w-full !text-xs md:!text-base text-center border-none focus-visible:outline dark:outline-[#edf2f4] outline-[#303030] focus-visible:outline-1 dark:caret-[#edf2f4] placeholder-gray-400 py-1 md:my-2 min-h-4 md:min-h-10"
    />
  );
};

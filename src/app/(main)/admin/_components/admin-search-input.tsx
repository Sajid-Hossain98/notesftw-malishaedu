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
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        borderRadius: "5px",
      }}
      className="bg-[#242424] w-1/2 !text-sm md:!text-base text-center border-none focus-visible:outline outline-[#edf2f4] focus-visible:outline-1 caret-[#edf2f4] placeholder-gray-400 py-1 mt-2"
    />
  );
};

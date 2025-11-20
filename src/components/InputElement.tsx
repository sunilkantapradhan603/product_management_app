interface InputProps {
  type: "text" | "textarea";
  name?: string;
  value?: string;
  label?: string;
  msg?: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputElement: React.FC<InputProps> = ({
  type,
  name,
  value,
  label,
  msg,
  placeholder,
  onChange,
}) => {
  return (
    <>
      {label && <label>{label}</label>}

      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 
         focus:outline-none focus:ring-2 focus:ring-blue-500 
         max-h-[200px] overflow-y-auto"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}

      {msg && (
        <span style={{ color: "red", fontSize: "12px", fontWeight: 200 }}>
          {msg}
        </span>
      )}
    </>
  );
};

export default InputElement;

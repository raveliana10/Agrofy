export default function ButtonSubmit(props) {
  const { text, variant } = props;
  const variants = {
    primary:
      "w-full text-white bg-main-green hover:bg-main-green-hover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
    secondary:
      "w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
  };
  return (
    <button type="submit" className={variants[variant]}>
      {text}
    </button>
  );
}

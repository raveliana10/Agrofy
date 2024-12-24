export default function ButtonHref(props) {
  const { text, href = "#", variant, onClick = "" } = props;
  const variants = {
    primary:
      "w-full m-1 text-white bg-main-green border border-main-green hover:bg-main-green-hover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
    secondary:
      "w-full m-1 text-black bg-white border border-main-green hover:bg-main-green-hover hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
  };

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault(); // Prevent default anchor behavior
      onClick(); // Call the onClick function passed as a prop
    }
  };

  return (
    <a href={href} className={variants[variant]} onClick={handleClick}>
      {text}
    </a>
  );
}

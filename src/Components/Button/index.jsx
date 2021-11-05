import "./style.css";

export const Button = ({ children, onClick }) => {
  return (
    <button className="btn-removeAll" onClick={onClick}>
      {children}
    </button>
  );
};

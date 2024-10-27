export default function EditProfile({ Backdrop }) {
  const handleBackdropClick = () => {
    Backdrop();
  };
  return (
    <div>
      <div
        onClick={handleBackdropClick}
        className="w-screen h-screen flex justify-center items-center bg-dark/20 rounded-2xl backdrop-blur-sm"
      ></div>
      <div className="m-auto z-50 w-96 max-h-96 rounded-2xl px-10 py-8 bg-blue-300 text-brightBlue">
        salam
      </div>
    </div>
  );
}

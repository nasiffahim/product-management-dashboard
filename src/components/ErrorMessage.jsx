export default function ErrorMessage({ message }) {
  return (
    <div className="text-center text-red-600 py-6">
      {message}
    </div>
  );
}

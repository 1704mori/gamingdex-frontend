export default function Footer() {
  return (
    <div className="flex p-8 mt-20 border-t border-gray-200 dark:border-gray-500 justify-center items-center max-h-48 h-48">
      <div className="flex justify-center items-center grow">
        {new Date().getFullYear()}
      </div>
    </div>
  );
}

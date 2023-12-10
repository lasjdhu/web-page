const currentYear = () => {
  return new Date().getFullYear();
};

export default function Footer() {
  return (
    <footer className="text-center py-5">
      <p>© {currentYear()} Dmitrii Ivanushkin</p>
    </footer>
  );
}

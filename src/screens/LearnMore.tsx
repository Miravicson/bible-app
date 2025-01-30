import { useNavigate } from 'react-router-dom';

export function LearnMore() {
  const router = useNavigate();

  const goBack = () => {
    router(-1);
  };

  return (
    <div>
      <button
        onClick={goBack}
        className="round-btn hover-active bg-whiteTrans3"
      >
        Go Back
      </button>
      <p className="text-white">
        This is the page where we learn more about how to use this Software
      </p>
    </div>
  );
}

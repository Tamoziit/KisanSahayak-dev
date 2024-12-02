import { Link } from "react-router-dom";

const NewActivity = () => {
  return (
    <div className="contact-page-wrapper flex flex-col items-center justify-center min-h-screen" id="contact-id">
      <h1 className="primary-heading text-center mb-8" id="new-activities-id">NEW ACTIVITIES</h1>
      <h2 className="primary-heading text-center mb-6">Choose your next</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl justify-items-center">
        <button className="primary-button-new w-full">
          <Link to="/upload" className="w-full block text-center">Upload</Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/capture" className="w-full block text-center">Capture</Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/dashboard" className="w-full block text-center">Dashboard</Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/marketplace" className="w-full block text-center">Marketplace</Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/history" className="w-full block text-center">My History</Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/elevated-user/records" className="w-full block text-center">Contribute</Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/profile" className="w-full block text-center">Profile</Link>
        </button>
      </div>
    </div>
  );
};

export default NewActivity;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState("");

  const images = [
    '/pharmacists1.png',
    '/pharmacists2.png',
    '/pharmacists3.png',
    '/pharmacists4.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const [formData, setFormData] = useState({
    patientName: '',
    drugName: '',
    patientWeight: '',
    prescribedDose: '',
    availableTabletStrength: '',
    administeredDose: '',
    frequencyOfUse: '',
    durationOfUse: '',
  });

  const formSteps = Object.keys(formData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const calculateTotalNumberOfTablets = (prescribedDose, frequencyOfUse, durationOfUse, availableTabletStrength) => {
    return (prescribedDose * frequencyOfUse * durationOfUse) / availableTabletStrength;
  };

  const calculateTotalVolume = (prescribedDose, frequencyOfUse, durationOfUse, administeredDose) => {
    return (prescribedDose * frequencyOfUse * durationOfUse * administeredDose) / prescribedDose;
  };

  const handleCalculate = () => {
    const { prescribedDose, frequencyOfUse, durationOfUse, availableTabletStrength, administeredDose } = formData;
    const totalNumberOfTablets = calculateTotalNumberOfTablets(prescribedDose, frequencyOfUse, durationOfUse, availableTabletStrength);
    const totalVolume = calculateTotalVolume(prescribedDose, frequencyOfUse, durationOfUse, administeredDose);

    const result = `Total number of tablets: ${totalNumberOfTablets}\nTotal volume: ${totalVolume}`;
    setResults(result);
    setShowResults(true); // Show results modal
  };

  return (
    <div className="app">
      <ul id="menu">
        <div className="menu-group left">
          <li><a href="#">Log-In</a></li>
          <li><a href="#">Blog-Post</a></li>
          <li><a href="#">Try Flashcards</a></li>
        </div>
        <div className="menu-group center">
          <li><a href="#">Automated Label</a></li>
          <li><a href="#">AI-Generate</a></li>
          <li><a href="#">Help</a></li>
        </div>
        <div className="menu-group right">
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">About Us</a></li>
        </div>
      </ul>

      <div className="slider">
        <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
        {showForm && (
          <div className="form-container">
            <div className="form-group">
              <input
                type="text"
                id={formSteps[currentStep]}
                value={formData[formSteps[currentStep]]}
                onChange={handleInputChange}
                placeholder={formSteps[currentStep].replace(/([A-Z])/g, ' $1').toUpperCase()}
                className="form-input"
              />
            </div>
            <div className="navigation-buttons">
              {currentStep > 0 && <button onClick={handlePrevious} className="nav-button">Previous</button>}
              {currentStep < formSteps.length - 1 ? (
                <button onClick={handleNext} className="nav-button">Next</button>
              ) : (
                <button onClick={handleCalculate} className="submit-button">Submit</button>
              )}
            </div>
          </div>
        )}
      </div>
      {!showForm && <button onClick={() => setShowForm(true)} className="start-button">Start</button>}

      {/* Modal for displaying results */}
      {showResults && (
        <div className="results-modal">
          <div className="results-content">
            <h2>Result Sheet</h2>
            <pre>{results}</pre>
            <button onClick={() => setShowResults(false)} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

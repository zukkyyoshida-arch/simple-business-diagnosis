import React, { useState } from 'react';
import Intro from './components/Intro';
import AttributeForm from './components/AttributeForm';
import QuestionScreen from './components/QuestionScreen';
import FreeTextForm from './components/FreeTextForm';
import ContactForm from './components/ContactForm';
import SummaryScreen from './components/SummaryScreen';
import { sections, attributes as attributeQuestions } from './data/questions';

function App() {
  const [step, setStep] = useState(-1); // -1: Intro, 0: Attributes, 1~25: Questions, 26: FreeText, 27: Contact, 28: Summary
  const [attributes, setAttributes] = useState({});
  const [answers, setAnswers] = useState({});
  const [freeText, setFreeText] = useState("");
  const [contact, setContact] = useState({});

  // Flatten questions for easy indexing
  const flatQuestions = sections.flatMap(section => 
    section.questions.map(q => ({
      ...q,
      sectionId: section.id,
      sectionTitle: section.title,
      sectionDesc: section.description
    }))
  );

  const totalQuestions = flatQuestions.length;

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => Math.max(-1, s - 1));

  const handleAttributeSubmit = (data) => {
    setAttributes(data);
    handleNext();
  };

  const handleAnswerSubmit = (questionId, optionData) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionData
    }));
    handleNext();
  };

  const handleFreeTextSubmit = (text) => {
    setFreeText(text);
    handleNext();
  };

  const handleContactSubmit = async (contactData) => {
    setContact(contactData);
    handleNext(); // SummaryScreenへ遷移（内部でGASへ送信）
  };

  return (
    <div className="app-container">
      {step === -1 && <Intro onStart={handleNext} />}
      
      {step === 0 && (
        <AttributeForm 
          questions={attributeQuestions} 
          initialData={attributes} 
          onSubmit={handleAttributeSubmit} 
        />
      )}

      {step > 0 && step <= totalQuestions && (
        <QuestionScreen 
          question={flatQuestions[step - 1]} 
          currentStep={step}
          totalSteps={totalQuestions}
          onAnswer={handleAnswerSubmit}
          onPrev={handlePrev}
          selectedOption={answers[flatQuestions[step - 1].id]}
        />
      )}

      {step === totalQuestions + 1 && (
        <FreeTextForm 
          initialText={freeText} 
          onSubmit={handleFreeTextSubmit} 
          onPrev={handlePrev} 
        />
      )}

      {step === totalQuestions + 2 && (
        <ContactForm 
          initialData={contact} 
          onSubmit={handleContactSubmit} 
          onPrev={handlePrev} 
        />
      )}

      {step === totalQuestions + 3 && (
        <SummaryScreen 
          attributes={attributes}
          answers={answers}
          freeText={freeText}
          contact={contact}
        />
      )}
    </div>
  );
}

export default App;

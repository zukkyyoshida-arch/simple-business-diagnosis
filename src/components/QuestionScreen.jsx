import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const QuestionScreen = ({ question, currentStep, totalSteps, onAnswer, onPrev, selectedOption }) => {
  const [animationKey, setAnimationKey] = useState(question.id);
  // selectedOption は { options: [{...}, {...}], note: "..." } の形になる想定
  const [localOptions, setLocalOptions] = useState(selectedOption?.options || []);
  const [localNote, setLocalNote] = useState(selectedOption?.note || "");

  useEffect(() => {
    setAnimationKey(question.id);
    setLocalOptions(selectedOption?.options || []);
    setLocalNote(selectedOption?.note || "");
  }, [question.id, selectedOption]);

  const progressPercentage = (currentStep / totalSteps) * 100;
  const isFirstInSection = question.id.endsWith('1');

  const handleSelect = (option) => {
    setLocalOptions(prev => {
      const exists = prev.find(o => o.code === option.code);
      if (exists) {
        return prev.filter(o => o.code !== option.code);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleNext = () => {
    if (localOptions.length > 0) {
      onAnswer(question.id, { options: localOptions, note: localNote });
    }
  };

  return (
    <div key={animationKey} className="glass-panel animate-enter">
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="badge" style={{ marginBottom: 0 }}>{question.sectionTitle}</div>
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {currentStep} / {totalSteps}
        </div>
      </div>

      {isFirstInSection && question.sectionDesc && (
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(14, 165, 233, 0.1)', color: 'var(--secondary)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', marginBottom: '1.5rem', fontWeight: 500 }}>
          💡 {question.sectionDesc}
        </div>
      )}

      <h2>{question.question}</h2>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>※複数選択可</p>

      <div className="mt-4">
        {question.options.map((opt) => {
          const isSelected = localOptions.some(o => o.code === opt.code);
          return (
            <div 
              key={opt.code} 
              className={`option-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(opt)}
            >
              <input 
                type="checkbox" 
                className="option-radio"
                checked={isSelected}
                readOnly
              />
              <div className="option-text">{opt.text}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <label className="input-label" style={{ fontSize: '0.875rem' }}>補足や例外的な状況があればご記入ください（任意）</label>
        <textarea 
          className="input-field" 
          placeholder="例：基本はAですが、Bのケースも稀にあります"
          value={localNote}
          onChange={(e) => setLocalNote(e.target.value)}
          style={{ minHeight: '80px', fontSize: '0.875rem' }}
        />
      </div>

      <div className="flex justify-between items-center mt-8 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
        <button className="btn btn-secondary" onClick={onPrev} style={{ width: 'auto', padding: '0.5rem 1rem' }}>
          <ArrowLeft size={16} /> 戻る
        </button>
        <button className="btn btn-primary" onClick={handleNext} disabled={localOptions.length === 0} style={{ width: 'auto', padding: '0.5rem 1.5rem' }}>
          次へ <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FreeTextForm = ({ initialText, onSubmit, onPrev }) => {
  const [text, setText] = useState(initialText || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <div className="glass-panel animate-enter">
      <div className="badge">任意回答</div>
      <h2>いちばん困っている仕事の場面があれば、一言で教えてください。</h2>
      <p>例: 月末の請求書づくり、FAX注文の入力、シフト表の調整</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea 
          className="input-field" 
          placeholder="ご自由にご記入ください..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-between items-center mt-8">
          <button type="button" className="btn btn-secondary" onClick={onPrev} style={{ width: 'auto' }}>
            <ArrowLeft size={16} /> 戻る
          </button>
          <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
            次へ <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FreeTextForm;

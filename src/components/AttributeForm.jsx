import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const AttributeForm = ({ questions, initialData, onSubmit }) => {
  const [data, setData] = useState(initialData || {});

  const handleChange = (id, value) => {
    setData(prev => ({ ...prev, [id]: value }));
  };

  const isComplete = questions.every(q => data[q.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isComplete) {
      onSubmit(data);
    }
  };

  return (
    <div className="glass-panel animate-enter">
      <div className="badge">属性情報の入力</div>
      <h2>まずは御社のことを少し教えてください</h2>
      <p>このデータは診断精度の向上のための統計情報としてのみ使用されます。</p>

      <form onSubmit={handleSubmit} className="mt-8">
        {questions.map((q) => (
          <div key={q.id} className="input-group">
            <label className="input-label">
              {q.question}
            </label>
            <select
              className="input-field"
              value={data[q.id] || ''}
              onChange={(e) => handleChange(q.id, e.target.value)}
              required
            >
              <option value="" disabled>選択してください</option>
              {q.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="mt-8">
          <button type="submit" className="btn btn-primary" disabled={!isComplete}>
            次へ <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttributeForm;

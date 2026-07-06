import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const ContactForm = ({ initialData, onSubmit, onPrev }) => {
  const [data, setData] = useState({
    companyName: initialData.companyName || "",
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "" // 任意
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const isComplete = data.companyName && data.name && data.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isComplete) {
      onSubmit(data);
    }
  };

  return (
    <div className="glass-panel animate-enter">
      <div className="badge">最後のステップ</div>
      <h2>レポートの送付先をご入力ください</h2>
      <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
        ※レポートはメールでお送りします。
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="input-group">
          <label className="input-label">会社名 <span>必須</span></label>
          <input 
            type="text" 
            name="companyName"
            className="input-field" 
            value={data.companyName}
            onChange={handleChange}
            required
            placeholder="株式会社〇〇"
          />
        </div>

        <div className="input-group">
          <label className="input-label">氏名 <span>必須</span></label>
          <input 
            type="text" 
            name="name"
            className="input-field" 
            value={data.name}
            onChange={handleChange}
            required
            placeholder="山田 太郎"
          />
        </div>

        <div className="input-group">
          <label className="input-label">メールアドレス <span>必須</span></label>
          <input 
            type="email" 
            name="email"
            className="input-field" 
            value={data.email}
            onChange={handleChange}
            required
            placeholder="taro@example.com"
          />
        </div>

        <div className="input-group">
          <label className="input-label">電話番号 <span style={{color: 'var(--text-muted)'}}>任意</span></label>
          <input 
            type="tel" 
            name="phone"
            className="input-field" 
            value={data.phone}
            onChange={handleChange}
            placeholder="03-0000-0000"
          />
        </div>

        <div className="flex justify-between items-center mt-8">
          <button type="button" className="btn btn-secondary" onClick={onPrev} style={{ width: 'auto' }}>
            <ArrowLeft size={16} /> 戻る
          </button>
          <button type="submit" className="btn btn-primary" style={{ width: 'auto' }} disabled={!isComplete}>
            診断結果を見る <CheckCircle size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

import React, { useState, useRef } from 'react';

const WebBrowser: React.FC = () => {
  const [url, setUrl] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigate = (e: React.FormEvent) => {
    e.preventDefault();
    if (iframeRef.current) {
      iframeRef.current.src = url.startsWith('http') ? url : `https://${url}`;
    }
  };

  const goBack = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.history.back();
    }
  };

  const goForward = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.history.forward();
    }
  };

  return (
    <div className="web-browser">
      <form onSubmit={navigate}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Go</button>
        <button type="button" onClick={goBack}>Back</button>
        <button type="button" onClick={goForward}>Forward</button>
      </form>
      <iframe ref={iframeRef} title="Web Browser" src="about:blank" />
    </div>
  );
};

export default WebBrowser;
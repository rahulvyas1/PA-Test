import React, { useState } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import './App.css';
import { Button, message } from 'antd';

function App() {
  const [textRaw, setTextRaw] = useState(null);
  const [isViewing, setisViewing] = useState(false);

  const renderQuestionTable = () => {
    const textData = JSON.parse(textRaw);
    return textData.blocks.map((block, i) => {
      let text = block.text;
      const lineNum = i + 1;
      const textLineNumSubStr = text.slice(0, lineNum.length);

      try {
        if (textLineNumSubStr && parseInt(textLineNumSubStr) == lineNum) {
          console.log('YES');
          console.log(lineNum);
          text = text.slice((lineNum + '').length, text.length).trim();
          console.log(text);
        }
      } catch (e) {
        console.log(e);
      }
      return (
        <tr key={block.key} style={{ textJustify: `inter-word` }}>
          <td
            style={{
              opacity: `0.4`,
              textAlign: `right`,
              paddingRight: `5px`,
              verticalAlign: `top`,
            }}
          >
            {/* {lineNum} */}
            {i == 0 && i + 1}
            {(i + 1) % 5 == 0 ? i + 1 : ''}
          </td>
          <td>{text}</td>
        </tr>
      );
    });
  };
  const renderQuestion = () => {
    const textData = JSON.parse(textRaw);
    return textData.blocks.map((block, i) => {
      let text = block.text;
      const lineNum = i + 1;
      const textLineNumSubStr = text.slice(0, lineNum.length);

      try {
        if (textLineNumSubStr && parseInt(textLineNumSubStr) == lineNum) {
          console.log('YES');
          console.log(lineNum);
          text = text.slice((lineNum + '').length, text.length).trim();
          console.log(text);
        }
      } catch (e) {
        console.log(e);
      }
      return (
        <span key={block.key} style={{ textJustify: `inter-word` }}>
          <span
            style={{
              opacity: `0.4`,
              padding: `0 3px`,
            }}
          >
            [{lineNum}]
          </span>
          <span>{text}</span>
        </span>
      );
    });
  };
  return (
    <div className="App">
      <br />
      {!isViewing && (
        <div
          style={{
            width: `600px`,
            margin: `0 auto`,
            alignItems: `center`,
          }}
        >
          <BraftEditor
            language="en"
            controls={['bold', 'italic', 'underline', 'strike-through']}
            style={{ background: `white` }}
            onChange={(v) => {
              console.log(JSON.parse(v.toRAW()));
              setTextRaw(v.toRAW());
            }}
          />
          <div style={{ textAlign: `right`, marginTop: `10px` }}>
            <Button
              type="primary"
              onClick={() => {
                localStorage.setItem('textRaw', textRaw);
                message.success('Question saved!');
                setisViewing(true);
              }}
              size="large"
            >
              OK
            </Button>
          </div>
        </div>
      )}

      {isViewing && (
        <div
          style={{
            display: `flex`,
            width: `80%`,
            margin: `0 auto`,
            padding: `10px`,
          }}
        >
          <div
            style={{
              background: `white`,
              padding: `10px`,
              flex: 1,
            }}
          >
            <h2>Questions 1-10 are based on the following passage.</h2>
            {renderQuestionTable()}
            <div>
              <br />
              <h4>
                1. What is the most likely reason that Audubon wrote about the
                black bear?
              </h4>
              <div>
                <div>
                  A) He didn't think his readers knew anything about bears
                </div>
                <div>
                  B) He wanted to provide more information about another animal
                  to his readers
                </div>
                <div>
                  C) He wanted to show the commonalities in behavioral patterns
                  of bears and birds
                </div>
                <div>D) He was fascinated by mammals</div>
              </div>
            </div>
          </div>
          <div style={{ background: `white`, padding: `10px`, flex: `1` }}>
            <h2>Questions 1-10 are based on the following passage.</h2>
            {renderQuestion()}
            <div>
              <br />
              <h4>
                1. What is the most likely reason that Audubon wrote about the
                black bear?
              </h4>
              <div>
                <div>
                  A) He didn't think his readers knew anything about bears
                </div>
                <div>
                  B) He wanted to provide more information about another animal
                  to his readers
                </div>
                <div>
                  C) He wanted to show the commonalities in behavioral patterns
                  of bears and birds
                </div>
                <div>D) He was fascinated by mammals</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

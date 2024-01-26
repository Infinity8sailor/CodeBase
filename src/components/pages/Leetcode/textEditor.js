import React, { useState, useEffect } from "react";
import "./textEditor.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeEditor = (props) => {
  const [content, setContent] = useState(props.data.code);
  const [code_lan, setCodelan] = useState(props.data.lan);
  const [code_info, setCode_info] = useState(props.data.info);
  const [edit_on, setedit_on] = useState(props.viewOnly);
  const Lan_list = [
    {
      label: "javascript",
      value: "javascript",
    },
    {
      label: "python",
      value: "python",
    },
    {
      label: "c++",
      value: "cpp",
    },
    {
      label: "html",
      value: "html",
    },
  ];
  const onChange = (lan, code, info) => {
    setContent(code);
    setCodelan(lan);
    setCode_info(info);
    let solution = { lan: lan, code: code, info: info };
    props.onChange(solution);
  };

  const handleKeyDown = (evt) => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setContent(value);
    }
  };

  useEffect(() => {
   
  }, [code_lan, content]);

  return (
    <div className="code-edit-container">
      {edit_on ? (
        <div className="flex flex-col gap-1 mt-1">
          <div className="">
            <select
              className=" bg-slate-300 p-1 rounded-md"
              value={code_lan}
              onChange={(e) => {
                onChange(e.target.value, content, code_info);
              }}
            >
              {Lan_list.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
            <textarea
              className="w-fit min-w-20 bg-slate-300 p-1 rounded-md"
              value={code_info}
              onChange={(evt) => onChange(code_lan, content, evt.target.value)}
              onKeyDown={handleKeyDown}
            />

          <textarea
            showLineNumbers
            className="min-h-64 bg-slate-300 p-1 rounded-md"
            value={content}
            onChange={(evt) => onChange(code_lan, evt.target.value, code_info)}
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
        <></>
      )}
      <SyntaxHighlighter
        language={code_lan}
        style={coldarkDark}
        showLineNumbers="true"
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeEditor;

import React, { useState } from "react";
import { useEffect } from "react";
import "./leetcode.css";
import {
  newLeetcode,
  leetcodeList,
  updateLeetcode,
  deleteLeetcode,
} from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./modal";
import { updateLeetcodeList, updateLeetcodeSearchList } from "../../../actions";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodeEditor from "./textEditor";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";

export function Leetcode(props) {
  const [Leetcode_Problem_id, setLeetcode_Problem_id] = useState("Sr. no");
  const [Leetcode_Problem_name, setLeetcode_Problem_name] = useState(
    "New Leetcode_Problem"
  );
  const [Leetcode_Search, setLeetcode_Search] = useState("#Search");
  // const [Leetcode_Problem_details, setLeetcode_Problem_details] =
  //   useState("None");
  // const [Leetcode_Problem_solns, setLeetcode_Problem_solns] = useState([]);
  // const [Leetcode_Problem_visits, setLeetcode_Problem_visits] = useState([]);
  // const [Leetcode_Problem_futureRef, setLeetcode_Problem_futureRef] = useState(
  //   []
  // );
  const [Leetcode_Problem_Tags, setLeetcode_Problem_Tags] = useState([]);
  const [Leetcode_Problem_level, setLeetcode_Problem_level] = useState("Easy");

  const [problem_info_on, setProblem_info_on] = useState(null);

  const [problem_des_on, setProblem_des_on] = useState([false, null]);
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const [problem_soln_on, setProblem_soln_on] = useState(null);
  const [problem_soln_edit, setProblem_soln_edit] = useState([
    false,
    null,
    null,
  ]);
  const [codestate, setCodestate] = useState({
    lan: "c++",
    code: "Template Code",
    info: "no info here",
  });

  const raw_data = useSelector((state) => state.leetcode_page_problems);
  var list = useSelector((state) => state.leetcode_page_problems_filtered);
  const user_info = useSelector((state) => state.user_info);

  const [Count, setCount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [delModel, setDelModel] = useState(false);
  const [currDel, setCurrDel] = useState(null);
  const dispatch = useDispatch();

  const get_problems_List = async () => {
    if (user_info) {
      setBusy(true);

      var data = await leetcodeList(user_info.auth_token, user_info.user_email);

      console.log("problems List ", data);
      setBusy(false);
      dispatch(updateLeetcodeList(data));
      dispatch(updateLeetcodeSearchList(data));
    }
  };

  const update_search = async () => {
    setBusy(true);

    const data = raw_data;
    var res = [];

    if ((Leetcode_Search == "") | (Leetcode_Search == "#Search")) {
      res = data;
      console.log("woking..", data);
    } else {
      for (let i = 0; i < data.length; i++) {
        let rgx = new RegExp(Leetcode_Search.toLowerCase());
        let j_data = JSON.stringify(data[i]).toLowerCase();
        const isMatch = j_data.match(rgx) || [];
        // console.log("is match ",isMatch.length);
        if (isMatch.length !== 0) {
          res.push(data[i]);
        }
      }
    }

    dispatch(updateLeetcodeSearchList(res));
    list = res;
    console.log("res : ", res.length);
    setBusy(false);
  };
  const setCurrent_Active = (d, i) => {
    if (problem_info_on === i) {
      setProblem_info_on(null);
      setEditorState(EditorState.createEmpty());
    } else {
      setProblem_info_on(i);
      setEditorState(EditorState.createEmpty());
      let dummy = d.problem_description;
      if (dummy[0] === "{") {
        //the json is ok
        console.log("Json Ok", dummy);
        const rawEditorData = JSON.parse(dummy);
        if (rawEditorData !== null) {
          const contentState = convertFromRaw(rawEditorData);
          setEditorState(EditorState.createWithContent(contentState));
        }
      } else {
        //the json is not ok
        let contentState = editorState.getCurrentContent();
        let targetRange = editorState.getSelection();
        let newContentState = Modifier.insertText(
          contentState,
          targetRange,
          dummy
        );
        setEditorState(EditorState.createWithContent(newContentState));
        // console.log("Dummy", newContentState);
      }
      setCurrent_Active_soln(d.solutions[0], 0);
    }
  };
  const setCurrent_Active_soln = (d, i, toggle = false) => {
    setProblem_soln_on(i);
    setCodestate(d);
    setProblem_soln_edit([toggle, problem_info_on, i]);
  };
  const newProblem_submit = async () => {
    setBusy(true);
    await newLeetcode(
      user_info.auth_token,
      Leetcode_Problem_id,
      Leetcode_Problem_name,
      user_info.user_email,
      Leetcode_Problem_level,
      Leetcode_Problem_Tags
    );
    setLeetcode_Problem_id("Sr. no.");
    setLeetcode_Problem_name("New Problem");
    setLeetcode_Problem_level("Easy");
    setLeetcode_Problem_Tags([]);
    get_problems_List();
    setBusy(false);
  };
  const newBlankSolution = async (leetcode, i) => {
    let blank = { lan: "None", code: "No Code Here" };
    let si = list[i].solutions.length;
    list[i].solutions.splice(si, 0, blank);
    setProblem_soln_edit([true, i, si]);
    setCurrent_Active_soln(blank, si, true);
    // setProblem_soln_on(list[i].solutions.length);
  };
  const updateProblem_description = async (leetcode, i) => {
    const raw = convertToRaw(editorState.getCurrentContent());
    const raw_data = JSON.stringify(raw);
    delete leetcode["problem_description"];
    leetcode["problem_description"] = raw_data;
    list[i].problem_description = raw_data;
    setBusy(true);
    await updateLeetcode(leetcode, user_info.auth_token);
    setBusy(false);
    dispatch(updateLeetcodeList(list));
    refresh(); //Since List not updating on time this is added temp
    setProblem_des_on([false, i]);
    console.log("description Updated Success.");
  };
  const updateSolution = async (leetcode, i) => {
    let si = problem_soln_on;
    leetcode.solutions.splice(si, 1, codestate);
    list[i] = leetcode;

    setBusy(true);
    await updateLeetcode(leetcode, user_info.auth_token);
    setBusy(false);
    dispatch(updateLeetcodeList(list));
    refresh(); //Since List not updating on time this is added temp
    setProblem_soln_edit([false, i, si]);
    console.log("description Updated Success.", leetcode);
  };
  const del_Solution = async (leetcode, i) => {
    let si = problem_soln_on;
    leetcode.solutions.splice(si, 1);
    list[i] = leetcode;

    setBusy(true);
    await updateLeetcode(leetcode, user_info.auth_token);
    setBusy(false);
    dispatch(updateLeetcodeList(list));
    refresh(); //Since List not updating on time this is added temp
    setProblem_soln_edit(false);
    console.log("delete soln Updated Success.", leetcode);
  };
  const refresh = () => {
    setCount(Count + 1);
  };

  const leetcode_delete = async () => {
    console.log(currDel, " topic sent for delete Final Operation.");
    setDelModel(false);
    await deleteLeetcode(currDel, user_info.auth_token, user_info.user_email);
    setCurrDel(null);
    get_problems_List();
  };
  const openModal = (task, i) => {
    console.log(task, " wants to get deleted.");
    setDelModel(true);
    setCurrDel(list[i]._id);
  };
  const closeOpenModal = () => {
    console.log("modal closed");
    setDelModel(false);
  };

  useEffect(() => {
    // console.log("UseEffect Triggered..!");
    get_problems_List();
  }, [user_info]);

  useEffect(() => {
    // console.log("UseEffect Triggered..! for new search..");
    update_search();
  }, [Leetcode_Search]);

  const get_date = (date) => {
    var data = new Date(date);
    var options = { weekday: "short", month: "short", day: "numeric" };
    // console.log(data.toLocaleDateString('en-US', options));
    return data.toLocaleDateString("en-US", options);
  };
  const get_date_diff = (date) => {
    var today = Date.now();
    var data = new Date(date);
    // get total seconds between the times
    var delta = Math.abs(today - data) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    // var options = { weekday: "short", month: "short", day: "numeric" };
    // console.log(data.toLocaleDateString('en-US', options));
    return days + " Days ago";
  };

  return (
    <>
      <div className="flex flex-col gap-0 h-full w-full px-1">
        <div class="flex flex-col justify-center items-center gap-2">
          <span class="mt-2 mb-1 font-bold text-2xl text-white">
            Coding Problems
          </span>

          <div className="flex flex-col justify-center bg-slate-500 rounded-lg py-2 gap-2">
            <div className="flex justify-center flex-wrap gap-1">
              <div id="problem-no" className="leetcode-input-style">
                <input
                  title="no."
                  type="text"
                  value={Leetcode_Problem_id}
                  onChange={(e) =>
                    setLeetcode_Problem_id(Number(e.target.value))
                  }
                />
              </div>
              <div id="problem-title" className="leetcode-input-style">
                <input
                  title="Problem"
                  type="text"
                  placeholder="Enter New Problem Name"
                  value={Leetcode_Problem_name}
                  onChange={(e) => setLeetcode_Problem_name(e.target.value)}
                />
              </div>
              <div className="leetcode-input-style">
                <input
                  title="Level"
                  type="text"
                  value={Leetcode_Problem_level}
                  onChange={(e) => setLeetcode_Problem_level(e.target.value)}
                />
              </div>
              <div className="leetcode-input-style">
                <input
                  title="tags"
                  type="text"
                  placeholder="Tags"
                  value={Leetcode_Problem_Tags}
                  onChange={(e) =>
                    setLeetcode_Problem_Tags(e.target.value.split(","))
                  }
                />
              </div>
              <button
                type="button"
                className="bg-white px-2 rounded-md "
                onClick={() => newProblem_submit()}
              >
                Create New
              </button>
            </div>
            <div className="flex justify-center flex-wrap items-center gap-1">
              <div className="leetcode-search">
                <div id="problem-search-box" className="leetcode-input-style">
                  <input
                    placeholder="Search..."
                    title="Search"
                    type="text"
                    value={Leetcode_Search}
                    onChange={(e) => setLeetcode_Search(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="bg-white px-2 rounded-md"
                >
                  Search
                </button>
              </div>
              <button
                type="button"
                className="bg-white px-2 rounded-md"
                onClick={() => get_problems_List()}
              >
                Get Problems
              </button>
              <div className="bg-blue-200 px-2 rounded-md ml-2 max-h-10 ">
                No. of Q : {list ? list.length : 0}
              </div>
              <button
                type="button"
                className={
                  !busy
                    ? "bg-green-400 rounded-lg px-2 ml-2"
                    : "bg-red-700 rounded-lg px-2 ml-2"
                }
              >
                {busy ? "Busy" : "Idel"}
              </button>
            </div>
          </div>
        </div>
        <br />
        <div class="flex-1 overflow-y-scroll overflow-x-hidden">
          <ul class="flex flex-col gap-1 py-1 justify-center items-center">
            {list.length !== 0 ? (
              list.map((d, i) => (
                <li
                  className={`bg-white rounded-md min-h-10 flex flex-col justify-center ${
                    problem_info_on === i ? "max-w-full" : "max-w-[900px]"
                  } w-full items-center p-2`}
                >
                  <div
                    className="flex flex-col lg:flex-row justify-between w-full"
                    onClick={() => setCurrent_Active(d, i)}
                  >
                    <div className="task-name">
                      <label className="form-check-label">
                        <h6 class="mb-0">
                          {d.problem_no + ". " + d.problem_title}
                        </h6>
                      </label>
                    </div>
                    <div className="task-tags">
                      <div className="task-tag">
                        <span class="badge bg-danger">
                          {get_date_diff(d.future_ref)}
                        </span>
                      </div>
                      <div className="task-tag">
                        {d.level == "Easy" ? (
                          <span class="badge bg-success">{d.level}</span>
                        ) : d.level == "Medium" ? (
                          <span class="badge bg-info">{d.level}</span>
                        ) : (
                          <span class="badge bg-danger">{d.level}</span>
                        )}
                      </div>
                      <div className="task-tag">
                        <span class="badge bg-secondary">{d.tags}</span>
                      </div>

                      <div className="task-tag">
                        <span onClick={() => openModal(d, i)}>
                          <i className="material-icons">delete</i>
                        </span>
                      </div>
                    </div>
                  </div>
                  {problem_info_on === i ? (
                    <div
                      className={`
                      ${
                        problem_info_on === i
                          ? "flex flex-col lg:flex-row gap-1 max-w-full"
                          : "flex-none "
                      } `}
                    >
                      <div className={`w-full lg:w-[50%] text-sm`}>
                        {(problem_des_on[1] === problem_info_on) &
                        problem_des_on[0] ? (
                          <div className="w-full overflow-x-scroll">
                            <div className="editor_local">
                              <Editor
                                editorState={editorState}
                                onChange={setEditorState}
                              />
                            </div>
                            <button
                              className="bg-green-300 px-1.5 rounded-md"
                              onClick={() => updateProblem_description(d, i)}
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="w-full overflow-x-scroll">
                            <div className="editor_local">
                              <Editor
                                editorState={editorState}
                                readOnly={true}
                              />
                            </div>
                            <button
                              className="bg-green-300 px-1.5 rounded-md"
                              onClick={() => setProblem_des_on([true, i])}
                            >
                              Update
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="w-full lg:w-[50%]">
                        <div className="problem-solutions-array flex flex-wrap gap-2">
                          <div
                            class="dropdown-toggle btn btn-secondary btn-sm"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {codestate.lan + " | " + codestate.info}
                          </div>
                          <ul class="dropdown-menu">
                            {d.solutions ? (
                              d.solutions.map((s, si) => (
                                <>
                                  <li
                                    className="dropdown-item"
                                    onClick={() =>
                                      setCurrent_Active_soln(s, si)
                                    }
                                  >
                                    {s.lan + " | " + s.info}
                                  </li>
                                </>
                              ))
                            ) : (
                              <a class="dropdown-item">
                                No Solutions Available
                              </a>
                            )}
                          </ul>

                          {problem_soln_edit[0] ? (
                            <button
                              className="bg-green-300 px-1.5 rounded-md"
                              onClick={() => updateSolution(d, i)}
                            >
                              save
                            </button>
                          ) : (
                            <button
                              className="bg-green-300 px-1.5 rounded-md"
                              onClick={() =>
                                setProblem_soln_edit([
                                  true,
                                  problem_info_on,
                                  problem_soln_on,
                                ])
                              }
                            >
                              Update
                            </button>
                          )}
                          <button
                            className="bg-red-400 px-1.5 rounded-md"
                            onClick={() => {
                              del_Solution(d, i);
                            }}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <button
                            className="bg-blue-400 px-1.5 rounded-md"
                            onClick={() => {
                              newBlankSolution(d, i);
                            }}
                          >
                            Add New
                          </button>
                        </div>
                        <div className="problem-solution-selected text-sm lg:text-base">
                          {!problem_soln_edit[0] ? (
                            <SyntaxHighlighter
                              language={codestate.lan}
                              style={coldarkDark}
                              showLineNumbers="true"
                            >
                              {codestate.code}
                            </SyntaxHighlighter>
                          ) : (
                            <div>
                              <CodeEditor
                                data={codestate}
                                onChange={setCodestate}
                                viewOnly={true}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </li>
              ))
            ) : (
              <li className="list-group-item">No Data Found -_-</li>
            )}
          </ul>
        </div>

        <Modal
          show={delModel}
          handleClose={() => closeOpenModal()}
          handleConfirm={() => leetcode_delete()}
        >
          <div style={{ display: "inline" }}>
            <h5>Do you Want To Delete </h5>{" "}
            <h3>
              <b>{currDel}</b>
            </h3>{" "}
            <h5>Problem ?</h5>{" "}
          </div>
        </Modal>
      </div>
    </>
  );
}

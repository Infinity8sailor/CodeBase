// // component To export json data
import axios from "axios";

const site = "https://admin-io-backend.netlify.app/";
// const site = "http://localhost:4000/";

const backend_addresses = {
  login:
    site + ".netlify/functions/server/auth/login",
  search_query:
    site + ".netlify/functions/server/search/query",

  new_task_add:
    site + ".netlify/functions/server/tasks/new",
  task_list:
    site + ".netlify/functions/server/tasks/list",
  task_del:
    site + ".netlify/functions/server/tasks/del",
  task_update:
    site + ".netlify/functions/server/tasks/update",

  new_leetcode_add:
    site + ".netlify/functions/server/leetcode/new",
  leetcode_list:
    site + ".netlify/functions/server/leetcode/list",
  leetcode_del:
    site + ".netlify/functions/server/leetcode/del",
  leetcode_update:
    site + ".netlify/functions/server/leetcode/update",

  users_list:
    site + ".netlify/functions/server/users/list",

  new_project:
    site + ".netlify/functions/server/projects/new",
  projects_list:
    site + ".netlify/functions/server/projects/list",
  project_update:
    site + ".netlify/functions/server/projects/update",
  project_del:
    site + ".netlify/functions/server/projects/del",

  twitter_trends:
    site + ".netlify/functions/server/twitter/trendslist",
};
// const backend_addresses = {
//   login: "http://localhost:4000/.netlify/functions/server/auth/login",
//   search_query: "http://localhost:4000/.netlify/functions/server/search/query",

//   new_task_add: "http://localhost:4000/.netlify/functions/server/tasks/new",
//   task_list: "http://localhost:4000/.netlify/functions/server/tasks/list",
//   task_del: "http://localhost:4000/.netlify/functions/server/tasks/del",
//   task_update: "http://localhost:4000/.netlify/functions/server/tasks/update",

//   users_list: "http://localhost:4000/.netlify/functions/server/users/list",
//   new_project: "http://localhost:4000/.netlify/functions/server/projects/new",
//   projects_list: "http://localhost:4000/.netlify/functions/server/projects/list",
//   project_update: "http://localhost:4000/.netlify/functions/server/projects/update",
//   project_del: "http://localhost:4000/.netlify/functions/server/projects/del",
//   twitter_trends:
//     "http://localhost:4000/.netlify/functions/server/twitter/trendslist",
// };

const newTask = async (
  token,
  task_name,
  task_details,
  user,
  date_expire,
  status,
  towards_project = "General"
) => {
  var data = {
    task_name: task_name,
    email: user,
    task_details: task_details,
    sub_tasks: [],
    date_expire: date_expire,
    status: status,
    towards_project: towards_project,
  };
  // console.log("here for process.:", token, data);
  const res = await axios
    .post(backend_addresses.new_task_add, data, {
      headers: {
        "auth-token": token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log("from data js ",res);
  return res;
};
const newLeetcode = async (
  token,
  problem_no,
  problem_title,
  user,
  level,
  tags,
) => {
  var data = {
    problem_no: problem_no,
    email: user,
    problem_title: problem_title,
    level: level,
    tags: tags,
  };
  // console.log("here for process.:", token, data);
  const res = await axios
    .post(backend_addresses.new_leetcode_add, data, {
      headers: {
        "auth-token": token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log("from data js ",res);
  return res;
};
const newProject = async (
  token,
  project_name,
  project_details,
  user,
  date_expire,
  status,
  milestones,
  assigned_to
) => {
  var data = {
    project_name: project_name,
    email: user,
    project_details: project_details,
    milestones: [],
    date_expire: date_expire,
    status: status,
    assigned_to: assigned_to,
  };
  // console.log("here for process.:", token, data);
  const res = await axios
    .post(backend_addresses.new_project, data, {
      headers: {
        "auth-token": token,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log("from data js ",res);
  return res;
};

const tasksList = async (token, user) => {
  var data = {
    email: user,
  };
  // console.log("Task List .:", token, data);
  const res = await axios
    .post(backend_addresses.task_list, data, {
      headers: {
        "auth-token": token,
      },
    })
    .then((res) => {
      // console.log('new topic sent',res);
      return res ? res : null;
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log("Task List :  ", res.data);
  return res ? res.data : null;
};
const projectsList = async (token, user) => {
  var data = {
    email: user,
  };
  // console.log("Task List .:", token, data);
  const res = await axios
    .post(backend_addresses.projects_list, data, {
      headers: {
        "auth-token": token,
      },
    })
    .then((res) => {
      // console.log('new topic sent',res);
      return res ? res : null;
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log("Task List :  ", res.data);
  return res ? res.data : null;
};

const leetcodeList = async (token, user) => {
  var data = {
    email: user,
  };
  // console.log("Task List .:", token, data);
  const res = await axios
    .post(backend_addresses.leetcode_list, data, {
      headers: {
        "auth-token": token,
      },
    })
    .then((res) => {
      // console.log('new topic sent',res);
      return res ? res : null;
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log("Task List :  ", res.data);
  return res ? res.data : null;
};

const ttrendingList = async (location) => {
  var data = {
    location: location,
  };
  // console.log("Task List .:", token, data);
  const res = await axios
    .post(backend_addresses.twitter_trends, data, {
      headers: {},
    })
    .then((res) => {
      console.log("twitter", res);
      return res ? res : null;
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log("Task List :  ", res.data);
  return res ? res.data[0] : null;
};

const usersList = async (token, user) => {
  var data = {
    email: user,
  };
  // console.log("Task List .:", token, data);
  const res = await axios
    .post(backend_addresses.users_list, data, {
      headers: {
        "auth-token": token,
      },
    })
    .then((res) => {
      // console.log('new topic sent',res);
      return res ? res : null;
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log("Task List :  ", res.data);
  return res ? res.data : null;
};

const Login = async (data) => {
  const res = await axios.post(
    backend_addresses.login,
    // 'https://docs-io-api.netlify.app/.netlify/functions/server/login',
    // "http://localhost:4000/.netlify/functions/server/login",
    { google_id: data[0], name: data[1], email: data[2], img_url: data[3] }
  );
  // .then((res) => {
  //   console.log('Login',res.data);
  //   // return res.data;
  // })
  // .catch(err => {
  //   console.error(err);
  // });
  // const res1 = await res.json();
  console.log(" Data >> Login >> ", res.data.login);
  return res;
  // console.log("cell to be added","t i ",topic,"c i " , cell_index,"source ", source);
};

// const Notebook_data = async (user, topic, token) => {
//   console.log("Data.js >> NoteBook_Data >> ", user);
//   let data;
//   if (user === "Guest") {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ fileName: topic }),
//     };

//     const response = await fetch(
//       backend_addresses.notebook_topic_guest,
//       requestOptions
//     );
//     // console.log("1022", response );
//     data = await response.json();
//   } else {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json", "auth-token": token },
//       body: JSON.stringify({ fileName: topic }),
//     };

//     const response = await fetch(
//       backend_addresses.notebook_topic,
//       requestOptions
//     );
//     // console.log("1022", response );
//     data = await response.json();
//   }
//   console.log(" Data >> Notebook_data", data);
//   // this.setState({ postId: data.id });
//   //
//   return data;
// };

const updateTask = async (Task, token) => {
  const res = await axios
    .post(
      backend_addresses.task_update,
      { updated_info: Task },
      {
        headers: {
          "auth-token": token,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("Update Res :  ", res);
  return res.data;
};
const updateProject = async (Project, token) => {
  const res = await axios
    .post(
      backend_addresses.project_update,
      { updated_info: Project },
      {
        headers: {
          "auth-token": token,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("Update Res :  ", res);
  return res.data;
};
const updateLeetcode = async (Leetcode, token) => {
  const res = await axios
    .post(
      backend_addresses.leetcode_update,
      { updated_info: Leetcode },
      {
        headers: {
          "auth-token": token,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("Update Res :  ", res);
  return res.data;
};

const deleteTask = async (task_id, token, user) => {
  const res = await axios
    .post(
      backend_addresses.task_del,
      { task_id: task_id, user: user },
      {
        headers: {
          "auth-token": token,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("Deletion Res :  ", res);
  return res.data;
};
const deleteProject = async (project_id, token, user) => {
  const res = await axios
    .post(
      backend_addresses.project_del,
      { project_id: project_id, user: user },
      {
        headers: {
          "auth-token": token,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("Deletion Res :  ", res);
  return res.data;
};
const deleteLeetcode = async (leetcode_id, token, user) => {
  const res = await axios
    .post(
      backend_addresses.leetcode_del,
      { leetcode_id: leetcode_id, user: user },
      {
        headers: {
          "auth-token": token,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("Deletion Res :  ", res);
  return res.data;
};

// const insertCell = async (topic, cell_index, cell_type, token) => {
//   const content = {
//     cell_layout: { cell_type: cell_type, code_lan: "", img_format: "" },
//     source: "Add Edit Content Here....!",
//   };
//   topic.cells.splice(cell_index + 1, 0, content);
//   await axios
//     .post(
//       backend_addresses.update_topic,
//       { updated_info: topic },
//       {
//         headers: {
//           "auth-token": token,
//         },
//       }
//     )
//     .then(() => console.log("topic sent"))
//     .catch((err) => {
//       console.error(err);
//     });
//   // console.log("cell to be added","t i ",topic,"c i " , cell_index,"source ", source);
// };
const searchQuery = async (user, query, token) => {
  let res = await axios.post(
    backend_addresses.search_query,
    { user: user, query: query },
    {
      headers: {
        "auth-token": token,
      },
    }
  );
  console.log("search q => ", res.data);
  return res.data;
};

export {
  deleteTask,
  Login,
  updateTask,
  newTask,
  tasksList,
  usersList,
  ttrendingList,
  searchQuery,
  projectsList,
  newProject,
  updateProject,
  deleteProject,
  leetcodeList,
  newLeetcode,
  deleteLeetcode,
  updateLeetcode,
};

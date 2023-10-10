import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAnglesRight,
  faCircleCheck,
  faCalendarDays,
  faNoteSticky,
  faUser,
  faBriefcase,
  faPlus,
  faSliders,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

let taskIdCounter = 1;

class Task {
  constructor(title, description, dueDate, category, subtasks) {
    this.id = taskIdCounter;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.category = category;
    this.subtasks = subtasks || [];
  }
}

function MenuList({ text, icon, color, handleMenuClick }) {
  return (
    <li onClick={() => handleMenuClick(text)}>
      <FontAwesomeIcon icon={icon} style={{ color: color }} /> {text}
    </li>
  );
}

function TaskList({ tasks, handleTaskClick, del }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <div className="newtask">
            <input type="checkbox" onClick={() => del(task)} />
            <span onClick={() => handleTaskClick(task)}>{task.title}</span>
          </div>
          <div className="line"></div>
        </li>
      ))}
    </ul>
  );
}

function SubtaskList({ subtasks }) {
  return (
    <>
      <div className="newsubtask">
        <input type="checkbox" />
        <input type="text" placeholder="subtask" />
      </div>
    </>
  );
}

function App() {
  const [selectedTaskList, setSelectedTaskList] = useState("Today");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("personal");
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [viewTaskVisible, setViewTaskVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const user = auth.currentUser;
  const handleTaskClick = (task) => {
    console.log(task);
    setSelectedTask(task);
    setTask(task.title);
    setDescription(task.description);
    setCategory(task.category);
    setDueDate(task.dueDate);
    setViewTaskVisible(true);
  };

  const handleMenuClick = (text) => {
    setSelectedTaskList(text);
  };

  const toggleViewTask = () => {
    setViewTaskVisible(!viewTaskVisible);
    setSelectedTask(null);
    setTask("");
    setDescription("");
    setCategory("personal");
    setDueDate(new Date().toISOString().slice(0, 10));
  };

  const del = (taskToDelete) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskToDelete.id);
    setTasks(updatedTasks);
    toggleViewTask();
  };

  const save = () => {
    if (
      task === "" ||
      description === "" ||
      dueDate === "" ||
      category === ""
    ) {
      alert("Please fill in all fields");
      return;
    } else if (dueDate < new Date().toISOString().slice(0, 10)) {
      alert("Please enter a valid date");
      return;
    }
    if (selectedTask) {
      const updatedTasks = tasks.map((t) => {
        if (t.id === selectedTask.id) {
          return {
            ...t,
            title: task,
            description: description,
            dueDate: dueDate,
            category: category,
          };
        }
        return t;
      });
      setTasks(updatedTasks);
    } else {
      const newTask = new Task(task, description, dueDate, category, []);
      taskIdCounter++;
      console.log(taskIdCounter);
      setTasks([...tasks, newTask]);
    }
  };

  return (
    <>
      <div className="app">
        <div className="dashboard">
          <div className="menu">
            <div className="header">
              <h3>Menu</h3>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mag" />
              <form onSubmit={(e) => e.preventDefault()} role="search">
                <input
                  id="search"
                  type="search"
                  placeholder="Search..."
                  autoFocus
                  required
                />
                <button type="submit">Go</button>
              </form>
            </div>
            <div className="task">
              <label>Tasks</label>
              <ul>
                <MenuList
                  text="Upcoming"
                  icon={faAnglesRight}
                  color="blue"
                  handleMenuClick={handleMenuClick}
                />
                <MenuList
                  text="Today"
                  icon={faCircleCheck}
                  color="green"
                  handleMenuClick={handleMenuClick}
                />
                <MenuList
                  text="Calendar"
                  icon={faCalendarDays}
                  color="red"
                  handleMenuClick={handleMenuClick}
                />
                <MenuList
                  text="Sticky Wall"
                  icon={faNoteSticky}
                  color="orange"
                  handleMenuClick={handleMenuClick}
                />
              </ul>
            </div>
            <div className="lists">
              <label>Lists</label>
              <ul>
                <MenuList text="Personal" icon={faUser} color="purple" />
                <MenuList text="Work" icon={faBriefcase} color="grey" />
                <li>
                  <FontAwesomeIcon icon={faPlus} /> Add New List
                </li>
              </ul>
            </div>
            <div className="footer">
              <label>
                <FontAwesomeIcon icon={faSliders} />
                Settings
              </label>
            </div>
          </div>
          <div className="details">
            {selectedTaskList === "Today" && (
              <div className="today">
                <h1>Today</h1>
                <button className="sub" onClick={toggleViewTask}>
                  Add New Task
                </button>
                <div className="newtask">
                  <TaskList
                    tasks={tasks}
                    handleTaskClick={handleTaskClick}
                    del={del}
                  />
                </div>
              </div>
            )}
            {selectedTaskList === "Upcoming" && (
              <div className="today">
                <h1>Upcoming</h1>
                <button className="sub" onClick={toggleViewTask}>
                  Add New Task
                </button>
                <div className="newtask">
                  <TaskList
                    tasks={tasks}
                    handleTaskClick={handleTaskClick}
                    del={del}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={`viewtask ${viewTaskVisible ? "visible" : "hidden"}`}>
            <div className="top">
              <h2>Task</h2>
              <button className="close-button" onClick={toggleViewTask}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="taskarea">
              <input
                type="text"
                placeholder="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <form action="">
                <div>
                  <div className="input">
                    <span>List</span>
                    <select
                      name="category"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="personal">Personal</option>
                      <option value="work">Work</option>
                    </select>
                  </div>
                  <div className="input">
                    <span>Date</span>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={dueDate}
                      disabled={selectedTaskList === "Today"}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="subtask">
              <div className="main">
                <h3>Subtask</h3>
                <button className="sub" onClick={<SubtaskList></SubtaskList>}>
                  Add New Subtask
                </button>
              </div>
              <div className="buttons">
                <button id="del" onClick={() => del(selectedTask)}>
                  Delete
                </button>
                <button id="save" onClick={save}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

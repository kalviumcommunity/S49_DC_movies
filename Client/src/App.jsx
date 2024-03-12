import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./Component/landing";
import UpdateUsers from "./UpdateUser";
import Users from "./Users";
import Create from "./create";
import LoginPage from "./Component/login";


function App() {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create" element={<Create />}/>
          <Route path="/update" element={<UpdateUsers />} />
          <Route path="/users" element={<Users users={users} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

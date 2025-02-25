import { Route, Routes } from "react-router-dom";
import Dashboard from "./modules/dashboard";
import Goals from "./modules/goals";
import Progress from "./modules/progress";
import Settings from "./modules/settings";
import Layout from "./shared/components/layouts/strack-layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="goals" element={<Goals />} />
        <Route path="progress" element={<Progress />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;

import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./styles/App.css";
import NavBar from "./components/NavBar";

const Onboard = lazy(() => import("./pages/Onboard")); //kdh930
const Student = lazy(() => import("./pages/Student")); //kdh930
const Driver = lazy(() => import("./pages/Driver")); //kdh930
const AcademyHome = lazy(() => import("./pages/AcademyHome")); //kdh1003
const MainPage = lazy(() => import("./pages/MainPage"));
const ChatPage = lazy(() => import("./pages/Chat"));
const LoginPage = lazy(() => import("./pages/Login"));
const WriteBoardPage = lazy(() => import("./pages/WriteBoard"));
const RegisterPage = lazy(() => import("./pages/Register"));
const BoardPage = lazy(() => import("./pages/Board"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminMain = lazy(() => import("./admin/Main"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ProfileEdit = lazy(() => import("./pages/ProfileEdit"));
const ProfileMap = lazy(() => import("./pages/ProfileMap"));
const RegisterInfo = lazy(() => import("./admin/RegisterInfo"));

function App() {
  return (
    <Router>
      <div className="card dock-demo">
        <div className="card-container">
          <AppContainer />
        </div>
      </div>
    </Router>
  );
}
function AppContainer() {
  const location = useLocation();
  const { pathname } = location;

  // 네비게이션 바를 보여줄 페이지들을 배열로 정의합니다.
  const displayNavbarPages = ["/board", "/writeboard", "/chat", "/profilepage"]; // kdh930

  // 현재 페이지가 displayNavbarPages 배열에 포함되어 있는지 확인합니다.
  const displayNavbar = displayNavbarPages.includes(pathname); // kdh930

  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const loadPages = [
      "/main"
    ];
    if (loadPages.includes(pathname)) {
      setIsLoading(true);
      setIsPageLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsPageLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setIsPageLoading(false);
    }
  }, [pathname]);

  return (
    <div className={`app-container ${displayNavbar ? "" : "full-width"}`}>
      {displayNavbar && <NavBar />}
      <div
        className={`pages-container ${
          displayNavbar ? "page-layout" : "full-width"
        }`}
      >
        <>
          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/image/loading.gif`}
                alt="Loading..."
              />
            </div>
          )}
          {!isPageLoading && (
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Onboard />} /> {/* kdh930 */}
                <Route path="/student" element={<Student />} /> {/* kdh930 */}
                <Route path="/driver" element={<Driver />} /> {/* kdh930 */}
                <Route path="/academyhome" element={<AcademyHome />} />{" "}
                {/* kdh1003 */}
                <Route path="/login" element={<LoginPage />} /> {/* kdh930 */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/writeboard" element={<WriteBoardPage />} />{" "}
                {/* kdh930 */}
                <Route path="/board" element={<BoardPage />} />
                <Route path="/admin" element={<AdminMain />} />
                <Route path="/profilepage" element={<ProfilePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/admin/RegisterInfo" element={<RegisterInfo />} />
              </Routes>
            </Suspense>
          )}
        </>
      </div>
    </div>
  );
}

export default App;

import  { 
  Login,
  TPDashboardPage,
  TPLayout,
  AdminLayout,
  AdminDashboardPage,
  StudentManagementPage,
  SchoolManagement,
  SessionManagement,
  LecturerManagementPage,
  LecturerProfilePage,
  AdminUploadPage,
  TPProfilePage,
  TPSelectSchoolPage,
  TPPostingLetterPage,
  ChangePasswordPage,
  PTLayout,
  PTDashboardPage,
  PTGroupPage,
  LecturerLayout,
  LecturerDashboardPage,
  ScoreStudentsPage,
  AdminLoginPage,
  Supervisor,
  ViewPage,
  FormalLetter,
  LectureView,
  AdmiViewSchool
} from "../pages";



export const routes = [
    {
      path: '/login',
      component: <Login />,
      standalone: true,
    },
    {
      path:"/adminLogin",
      component:<AdminLoginPage />,
      standalone:true,
    },
    {
      path:"/viewpage",
      component:<AdmiViewSchool />,
      standalone:true,
    },

    {
      path:"/supervisor",
      component:<Supervisor />,
      standalone:true,
    },
    {
      path:"/letter",
      component:<FormalLetter />,
      standalone:true,
    },
    {
      path:"/view-schools",
      component:<LectureView />,
      standalone:true,
    },
    {
      path: '/tp',
      component: <TPLayout />,
      standalone: true,
      children: [
        {
          path: '',
          component: <TPDashboardPage />
        },
        {
          path: 'tp-profile',
          component: <TPProfilePage />
        },
        {
          path: 'tp-password',
          component: <ChangePasswordPage />
        },
        {
          path: 'dashboard',
          component: <TPDashboardPage />
        },
        {
          path: 'select-school',
          component: <TPSelectSchoolPage />
        },
        {
          path: 'posting-letter',
          component: <TPPostingLetterPage />
        },
      ]
    },
    {
      path: '/',
      component: <PTLayout />,
      standalone: true,
      children: [
        {
          path: '',
          component: <PTDashboardPage />
        },
        {
          path: 'pt-dashboard',
          component: <PTDashboardPage />
        },
        {
          path: 'pt-profile',
          component: <TPProfilePage />
        },
        {
          path: 'pt-group',
          component: <PTGroupPage />
        },
        {
          path: 'pt-password',
          component: <ChangePasswordPage />
        },
      ]
    },
    {
      path: '/lecturer',
      component: <LecturerLayout />,
      standalone: true,
      children: [
        {
          path: '',
          component: <LecturerDashboardPage />
        },
        {
          path: 'lecturer-dashboard',
          component: <LecturerDashboardPage />
        },
        {
          path: 'lecturer-profile',
          component: <LecturerProfilePage />
        },
        {
          path: 'score-students',
          component: <ScoreStudentsPage/>
        },
        {
          path: 'lecturer-group',
          component: <PTGroupPage />
        },
        {
          path: 'lecturer-password',
          component: <ChangePasswordPage />
        },
      ]
    },

    
    {
      path: '/admin',
      component: <AdminLayout />,
      standalone: true,
      children: [
        {
          path: '',
          component: <AdminDashboardPage />
        },
        {
          path: 'student-management',
          component: <StudentManagementPage />
        },
        {
          path: 'lecturer-management',
          component: <LecturerManagementPage />
        },
        {
          path: 'school-management',
          component: <SchoolManagement />
        },
        {
          path: 'session-management',
          component: <SessionManagement />
        },
        {
          path: 'admin-upload',
          component: <AdminUploadPage />
        },
        {
          path: 'student-management/view',
          component: <ViewPage />
        },
        {
          path: 'lecturer-management/view',
          component: <ViewPage />
        },
      ]
    },
]
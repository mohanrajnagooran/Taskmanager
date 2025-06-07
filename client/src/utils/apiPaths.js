export const BASE_URL = "https://taskmanager-003e.onrender.com";

//utils/api/paths.js
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", //Regster a new user (Admin or member)
        LOGIN: "/api/auth/login",       //Authenticate user & return JWT token
        GET_PROFILE: "/api/auth/profile", //Get Logged-in User Details
    },

    USERS: {
        GET_ALL_USERS: "/api/users",  //Get all users(Admin only)
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //get user by ID
        CREATE_USER: "/api/users", //create a new user (Admin only)
        UPDATE_USER: (userId) => `/api/users/${userId}`, //Update user Details
        DELETE_USER: (userId) => `/api/users/${userId}`, //Delete a user
    },

    TASKS: {
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",  //Get dashboard data
        GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",  //Get user dashboard data
        GET_ALL_TASKS: "/api/tasks",  //Get all tasks (Admi: all, user: only assigned task)
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,  //Get user dashboard data
        CREATE_TASK: "/api/tasks",  //Create new task(Admin only)
        UPDATE_TASK:  (taskId) => `/api/tasks/${taskId}`,  //Update task details
        DELETE_TASK:  (taskId) => `/api/tasks/${taskId}`,  //Create new task(Admin only)

        UPDATE_TASK_STATUS:  (taskId) => `/api/tasks/${taskId}/status`,  //Update task status
        UPDATE_TODO_CHECKLIST:  (taskId) => `/api/tasks/${taskId}/todo`,  //Update todo 
    },

    REPORTS: {
        EXPORT_TASKS: "/api/reports/export/tasks", ///Download all tasks as an excel 
        EXPORT_USERS: "/api/reports/export/users", //download user-task report
    },

    IMAGE: {
        UPLOAD_IMAGE: "api/auth/upload-image",
    },
};
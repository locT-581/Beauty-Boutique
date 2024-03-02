import axios from "axios";

// Sign In
export const signin = async ({ email, password }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/user/signin",
      { email, password },
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//Sign Up
export const signup = async (userData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/user/signup", userData, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//Get user - Check Logged In user
export const loadUser = async () => {
  try {
    const { data } = await axios.get("/api/v1/user/me");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const signout = async () => {
  try {
    const { data } = await axios.get("/api/v1/user/logout");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const topRanking = async () => {
  try {
    const { data } = await axios.get("/api/v1/topranking");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

/**
 * Update User Profile
 * @param {*} userData { displayName, description, avatar }
 * @returns data
 */
export const updateProfile = async (userData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      "/api/v1/update/profile",
      userData,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

/**
 * Update User Profile
 */
export const updateAchievement = async ({
  record,
  wordsTyped,
  testsTaken,
  isInTheRanking,
}) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/update/achievement",
      {
        record,
        wordsTyped,
        testsTaken,
        isInTheRanking,
      },
      config
    );

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const forgotPassword = async ({ email }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/password/forgot",
      { email },
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const resetPassword = async ({ token, password }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      { password },
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const useAPI = {
  signin,
  signup,
  loadUser,
  signout,
  topRanking,
  updateProfile,
  updateAchievement,
  forgotPassword,
  resetPassword,
};

export default useAPI;

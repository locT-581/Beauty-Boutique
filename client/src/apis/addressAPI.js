import axios from "axios";

export const getCities = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/v1/user/location", config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const addressAPI = {
  getCities,
};

export default addressAPI;

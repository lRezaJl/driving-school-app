import axios from "axios";
import { URL } from "../../../utility/config";

export async function POST(req) {
  const { codemeli } = await req.json();

  try {
    const response = await axios.post(`${URL}/api/v1/user/class/`, { codemeli });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error.response?.data || "Internal server error",
      }),
      {
        status: error.response?.status || 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

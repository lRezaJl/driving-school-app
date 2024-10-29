import axios from "axios";
import { URL } from "../../../utility/config";

export async function POST(req) {
  const { name, sen, address, codemeli, telephone, user_type } =
    await req.json();

  try {
    const response = await axios.post(`${URL}/api/v1/admin/create/`, {
      name,
      sen,
      address,
      codemeli,
      telephone,
      user_type,
    });

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

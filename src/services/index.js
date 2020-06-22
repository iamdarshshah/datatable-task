import axios from "axios";

const url = "http://localhost:3000/shipments";

export const fetchData = async () => {
  const { data } = await axios.get(url);
  const modifiedData = data.map((detail) => ({
    id: detail["id"],
    name: detail["name"],
    mode: detail["mode"],
    type: detail["type"],
    destination: detail["destination"],
    origin: detail["origin"],
    total: detail["total"],
    status: detail["status"],
    userId: detail["userId"],
  }));
  return modifiedData;
};

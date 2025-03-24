import axios from "axios";
import { BACKEND_URL } from "../../config";

const getRooms = async (slug: string) => {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return response.data;
};
const RoomId = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const data = await getRooms(slug);
  console.log("room id", data.room.id);
  return <div>RoomId</div>;
};

export default RoomId;

import axios from "axios";
import { BACKEND_URL } from "../../config";

const getRooms = async (slug: string) => {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  console.log("response", response);
  
  return response.data.id;
};
const RoomId = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  console.log("slug from params", slug);

  const roomId = await getRooms(slug);
  console.log("room id", roomId);

  return <div>RoomId</div>;
};

export default RoomId;

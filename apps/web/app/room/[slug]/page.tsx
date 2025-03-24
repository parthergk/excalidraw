import axios from "axios";
import { BACKEND_URL } from "../../config";
import GetChats from "../../../components/GetChats";

const getRooms = async (slug: string) => {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return response.data;
};
const RoomId = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const data = await getRooms(slug);
  return <GetChats id={data.room.id}></GetChats>;
};

export default RoomId;

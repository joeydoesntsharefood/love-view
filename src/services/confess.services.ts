import app from "../configs/axios";

const create = async (body: any) => {
  try {
    const res = await app.post('/', body);

    return res.data;
  } catch (e) {
    return e;
  }
}

const index = async (id: string) => {
  try {
    const res = await app.get(`/${id}`);

    return res.data;
  } catch (e) {
    return e;
  }
}

export default {
  create,
  index,
}
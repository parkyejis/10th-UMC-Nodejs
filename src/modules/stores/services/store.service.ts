import { pool } from "../../../db.config.js";
import { StoreCreateRequest, responseFromStore } from "../dtos/store.dto.js";
import {
  getLocalByName,
  createLocal,
  addStore,
  getStore,
  getLocalById,
} from "../repositories/store.repository.js";

export const createStore = async (data: StoreCreateRequest) => {
  const conn = await pool.getConnection();
  
  try {
    await conn.beginTransaction(); // 트랜잭션 시작

    let local = await getLocalByName(data.localName);
    let localId: number;

    if (local === null) {
      localId = await createLocal(data.localName);
      local = await getLocalById(localId);
    } else {
      localId = local.local_id;
    }

    const storeId = await addStore({
      name: data.name,
      category: data.category,
      startTime: data.startTime,
      endTime: data.endTime,
      localId,
    });

    const store = await getStore(storeId);

    await conn.commit(); // 모두 성공하면 커밋
    return responseFromStore({ store, local });

  } catch (err) {
    await conn.rollback(); // 하나라도 실패하면 롤백
    throw err;
  } finally {
    conn.release();
  }
};
import { prisma } from "../../../db.config.js";
import { responseFromStore } from "../dtos/store.dto.js";
import { getLocalByName, createLocal, addStore, getStore, getLocalById, } from "../repositories/store.repository.js";
export const createStore = async (data) => {
    const result = await prisma.$transaction(async () => {
        let local = await getLocalByName(data.localName);
        let localId;
        if (local === null) {
            localId = await createLocal(data.localName);
            local = await getLocalById(localId);
        }
        else {
            localId = local.localId;
        }
        const storeId = await addStore({
            name: data.name,
            category: data.category,
            startTime: data.startTime,
            endTime: data.endTime,
            localId,
        });
        const store = await getStore(storeId);
        return responseFromStore({ store, local });
    });
    return result;
};
//# sourceMappingURL=store.service.js.map
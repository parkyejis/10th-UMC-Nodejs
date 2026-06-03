import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission, listStoreMissions } from "../services/mission.service.js";
export const handleCreateMission = async (req, res, next) => {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body);
    try {
        const mission = await createMission(bodyToMission(req.body));
        res.status(StatusCodes.OK).json({ result: mission });
    }
    catch (err) {
        if (err.message === "없는 가게입니다.") {
            res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
            return;
        }
        next(err);
    }
};
export const handleListStoreMissions = async (req, res, next) => {
    try {
        const storeId = parseInt(req.params.storeId);
        const cursor = req.query.cursor
            ? parseInt(req.query.cursor)
            : undefined;
        const missions = await listStoreMissions({ storeId, cursor });
        res.status(StatusCodes.OK).json({ result: missions });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=mission.controller.js.map
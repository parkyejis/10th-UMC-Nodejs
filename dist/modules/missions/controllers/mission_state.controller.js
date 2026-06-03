import { StatusCodes } from "http-status-codes";
import { bodyToMissionState } from "../dtos/mission_state.dto.js";
import { challengeMission, listUserMissions, changeMissionState } from "../services/mission_state.service.js";
export const handleChallengeMission = async (req, res, next) => {
    console.log("미션 도전을 요청했습니다!");
    console.log("body:", req.body);
    try {
        const missionState = await challengeMission(bodyToMissionState(req.body));
        res.status(StatusCodes.OK).json({ result: missionState });
    }
    catch (err) {
        if (err.message === "없는 미션입니다.") {
            res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
            return;
        }
        if (err.message === "이미 도전 중인 미션입니다.") {
            res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
            return;
        }
        next(err);
    }
};
export const handleListUserMissions = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId);
        const cursor = req.query.cursor
            ? parseInt(req.query.cursor)
            : undefined;
        const missions = await listUserMissions({ userId, cursor });
        res.status(StatusCodes.OK).json({ result: missions });
    }
    catch (err) {
        next(err);
    }
};
export const handleChangeMissionState = async (req, res, next) => {
    try {
        const missionId = parseInt(req.params.missionId);
        const userId = parseInt(req.body.userId);
        const missionState = await changeMissionState(missionId, userId);
        res.status(StatusCodes.OK).json({ result: missionState });
    }
    catch (err) {
        if (err.message === "없는 미션입니다.") {
            res.status(StatusCodes.NOT_FOUND).json({ error: err.message });
            return;
        }
        if (err.message === "도전 중인 미션이 아닙니다.") {
            res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
            return;
        }
        next(err);
    }
};
//# sourceMappingURL=mission_state.controller.js.map
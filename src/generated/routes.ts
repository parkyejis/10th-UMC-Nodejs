/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../modules/users/controllers/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoreController } from './../modules/stores/controllers/store.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ReviewController } from './../modules/stores/controllers/review.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserReviewController } from './../modules/stores/controllers/review.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MissionStateController } from './../modules/missions/controllers/mission_state.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserMissionController } from './../modules/missions/controllers/mission_state.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MissionController } from './../modules/missions/controllers/mission.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserPreference": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "foodCategoryId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignUpResponse": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "preferCategory": {"dataType":"array","array":{"dataType":"refObject","ref":"UserPreference"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserSignUpResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserSignUpResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignUpRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "gender": {"dataType":"string","required":true},
            "birth": {"dataType":"datetime","required":true},
            "address": {"dataType":"string"},
            "detailAddress": {"dataType":"string"},
            "phoneNumber": {"dataType":"string","required":true},
            "preferences": {"dataType":"array","array":{"dataType":"double"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StoreCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
            "startTime": {"dataType":"string","required":true},
            "endTime": {"dataType":"string","required":true},
            "rating": {"dataType":"double","required":true},
            "localId": {"dataType":"double","required":true},
            "localName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_StoreCreateResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"StoreCreateResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StoreCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
            "startTime": {"dataType":"string","required":true},
            "endTime": {"dataType":"string","required":true},
            "localName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "reviewId": {"dataType":"double","required":true},
            "content": {"dataType":"string","required":true},
            "img": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "countStar": {"dataType":"string","required":true},
            "userId": {"dataType":"double","required":true},
            "storeId": {"dataType":"double","required":true},
            "storeName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ReviewCreateResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"ReviewCreateResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "content": {"dataType":"string","required":true},
            "img": {"dataType":"string"},
            "countStar": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["1"]},{"dataType":"enum","enums":["2"]},{"dataType":"enum","enums":["3"]},{"dataType":"enum","enums":["4"]},{"dataType":"enum","enums":["5"]}],"required":true},
            "userId": {"dataType":"double","required":true},
            "storeName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ReviewItem.Exclude_keyofReviewItem.cursor__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"nickname":{"dataType":"string","required":true},"countStar":{"dataType":"string","required":true},"createdAt":{"dataType":"datetime","required":true},"content":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ReviewItem.cursor_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_ReviewItem.Exclude_keyofReviewItem.cursor__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_ReviewItem.cursor_"},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ReviewListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"ReviewListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_UserReviewItem.Exclude_keyofUserReviewItem.cursor__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"countStar":{"dataType":"string","required":true},"createdAt":{"dataType":"datetime","required":true},"content":{"dataType":"string","required":true},"storeName":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_UserReviewItem.cursor_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_UserReviewItem.Exclude_keyofUserReviewItem.cursor__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserReviewListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_UserReviewItem.cursor_"},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserReviewListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserReviewListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionStateCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "stateId": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "missionId": {"dataType":"double","required":true},
            "missionDetail": {"dataType":"string","required":true},
            "point": {"dataType":"double","required":true},
            "state": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MissionStateCreateResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MissionStateCreateResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionStateCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "missionId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionStateUpdateResponse": {
        "dataType": "refObject",
        "properties": {
            "stateId": {"dataType":"double","required":true},
            "missionId": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "state": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MissionStateUpdateResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MissionStateUpdateResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_UserMissionItem.Exclude_keyofUserMissionItem.cursor__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"storeName":{"dataType":"string","required":true},"missionDetail":{"dataType":"string","required":true},"point":{"dataType":"double","required":true},"state":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_UserMissionItem.cursor_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_UserMissionItem.Exclude_keyofUserMissionItem.cursor__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserMissionListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_UserMissionItem.cursor_"},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserMissionListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserMissionListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionCreateResponse": {
        "dataType": "refObject",
        "properties": {
            "missionId": {"dataType":"double","required":true},
            "detail": {"dataType":"string","required":true},
            "point": {"dataType":"double","required":true},
            "storeId": {"dataType":"double","required":true},
            "storeName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MissionCreateResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MissionCreateResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionCreateRequest": {
        "dataType": "refObject",
        "properties": {
            "detail": {"dataType":"string","required":true},
            "point": {"dataType":"double","required":true},
            "storeName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_MissionItem.Exclude_keyofMissionItem.cursor__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"missionDetail":{"dataType":"string","required":true},"point":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_MissionItem.cursor_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_MissionItem.Exclude_keyofMissionItem.cursor__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"Omit_MissionItem.cursor_"},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MissionListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MissionListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_signUp: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UserSignUpRequest"},
        };
        app.post('/users/signup',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.signUp)),

            async function UserController_signUp(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_signUp, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'signUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStoreController_createStore: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"StoreCreateRequest"},
        };
        app.post('/stores',
            ...(fetchMiddlewares<RequestHandler>(StoreController)),
            ...(fetchMiddlewares<RequestHandler>(StoreController.prototype.createStore)),

            async function StoreController_createStore(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreController_createStore, request, response });

                const controller = new StoreController();

              await templateService.apiHandler({
                methodName: 'createStore',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReviewController_createReview: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"ReviewCreateRequest"},
        };
        app.post('/stores/:storeId/reviews',
            ...(fetchMiddlewares<RequestHandler>(ReviewController)),
            ...(fetchMiddlewares<RequestHandler>(ReviewController.prototype.createReview)),

            async function ReviewController_createReview(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewController_createReview, request, response });

                const controller = new ReviewController();

              await templateService.apiHandler({
                methodName: 'createReview',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReviewController_listStoreReviews: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                cursor: {"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/stores/:storeId/reviews',
            ...(fetchMiddlewares<RequestHandler>(ReviewController)),
            ...(fetchMiddlewares<RequestHandler>(ReviewController.prototype.listStoreReviews)),

            async function ReviewController_listStoreReviews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewController_listStoreReviews, request, response });

                const controller = new ReviewController();

              await templateService.apiHandler({
                methodName: 'listStoreReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserReviewController_listUserReviews: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                cursor: {"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/users/:userId/reviews',
            ...(fetchMiddlewares<RequestHandler>(UserReviewController)),
            ...(fetchMiddlewares<RequestHandler>(UserReviewController.prototype.listUserReviews)),

            async function UserReviewController_listUserReviews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserReviewController_listUserReviews, request, response });

                const controller = new UserReviewController();

              await templateService.apiHandler({
                methodName: 'listUserReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMissionStateController_challengeMission: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"MissionStateCreateRequest"},
        };
        app.post('/missions',
            ...(fetchMiddlewares<RequestHandler>(MissionStateController)),
            ...(fetchMiddlewares<RequestHandler>(MissionStateController.prototype.challengeMission)),

            async function MissionStateController_challengeMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionStateController_challengeMission, request, response });

                const controller = new MissionStateController();

              await templateService.apiHandler({
                methodName: 'challengeMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMissionStateController_changeMissionState: Record<string, TsoaRoute.ParameterSchema> = {
                missionId: {"in":"path","name":"missionId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"double","required":true}}},
        };
        app.patch('/missions/:missionId',
            ...(fetchMiddlewares<RequestHandler>(MissionStateController)),
            ...(fetchMiddlewares<RequestHandler>(MissionStateController.prototype.changeMissionState)),

            async function MissionStateController_changeMissionState(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionStateController_changeMissionState, request, response });

                const controller = new MissionStateController();

              await templateService.apiHandler({
                methodName: 'changeMissionState',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserMissionController_listUserMissions: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                cursor: {"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/users/:userId/mission',
            ...(fetchMiddlewares<RequestHandler>(UserMissionController)),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController.prototype.listUserMissions)),

            async function UserMissionController_listUserMissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_listUserMissions, request, response });

                const controller = new UserMissionController();

              await templateService.apiHandler({
                methodName: 'listUserMissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMissionController_createMission: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"MissionCreateRequest"},
        };
        app.post('/stores/:storeId/mission',
            ...(fetchMiddlewares<RequestHandler>(MissionController)),
            ...(fetchMiddlewares<RequestHandler>(MissionController.prototype.createMission)),

            async function MissionController_createMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_createMission, request, response });

                const controller = new MissionController();

              await templateService.apiHandler({
                methodName: 'createMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMissionController_listStoreMissions: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                cursor: {"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/stores/:storeId/mission',
            ...(fetchMiddlewares<RequestHandler>(MissionController)),
            ...(fetchMiddlewares<RequestHandler>(MissionController.prototype.listStoreMissions)),

            async function MissionController_listStoreMissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_listStoreMissions, request, response });

                const controller = new MissionController();

              await templateService.apiHandler({
                methodName: 'listStoreMissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

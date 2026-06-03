export const bodyToStore = (body) => {
    return {
        name: body.name,
        category: body.category,
        startTime: body.startTime,
        endTime: body.endTime,
        localName: body.localName,
    };
};
export const responseFromStore = ({ store, local, }) => {
    return {
        id: store.store_id,
        name: store.name,
        category: store.category,
        startTime: store.start_time,
        endTime: store.end_time,
        rating: store.rating,
        localId: local.local_id,
        localName: local.local_name,
    };
};
//# sourceMappingURL=store.dto.js.map
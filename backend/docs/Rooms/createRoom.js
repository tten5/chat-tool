module.exports = {
    // operation's method
    post: {
        tags: ["Rooms CRUD operations"], // operation's tag
        description: "Create room", // short desc
        operationId: "createRoom", // unique operation id
        parameters: [], // expected params
        requestBody: {
            // expected request body
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RoomInput", // todo input data model
                    },
                },
            },
        },
        // expected responses
        responses: {
            // response code
            200: {
            description: "Room created successfully", // response desc
            },
            // response code
            500: {
            description: "Server error", // response desc
            },
        },
    },
};
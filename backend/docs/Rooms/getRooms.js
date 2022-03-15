module.exports = {
    // method of operation
    get: {
        tags: ["Rooms CRUD operations"], // operation's tag.
        description: "Get all rooms", // operation's desc.
        operationId: "getRooms", // unique operation id.
        parameters: [], // expected params.
        // expected responses
        responses: {
            // response code
            200: {
                description: "Received all rooms successfully", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Rooms', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "Rooms not found", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error", // error data model
                        },
                    },
                },
            },
        },
    }
};
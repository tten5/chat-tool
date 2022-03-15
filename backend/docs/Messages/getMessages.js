module.exports = {
    // method of operation
    get: {
        tags: ["Messages CRUD operations"], // operation's tag.
        description: "Get all messages", // operation's desc.
        operationId: "getMessages", // unique operation id.
        parameters: [], // expected params.
        // expected responses
        responses: {
            // response code
            200: {
                description: "Received all messages successfully", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Messages', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "Messages not found", // response desc.
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
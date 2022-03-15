module.exports = {
    // method of operation
    post: {
        tags: ["Users CRUD operations"], // operation's tag.
        description: "Login the user", // operation's desc.
        operationId: "login", // unique operation id.
        parameters: [], // expected params.
        requestBody: {
            // expected request body
            content: {
                // content-type
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserInput", // todo input data model
                    },
                },
            },
        },
        // expected responses
        responses: {
            // response code
            200: {
                description: "Received all rooms successfully", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/UserResponse', 
                        },
                    },
                },
            },
            // response code
            404: {
                description: "User not found", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/UserResponse', 
                        },
                    },
                },
            },
            // response code
            500: {
                description: "Server error", // response desc
            },
        },
    }
};
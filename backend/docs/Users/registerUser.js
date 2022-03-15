module.exports = {
    // operation's method
    post: {
        tags: ["Users CRUD operations"], // operation's tag
        description: "Register user", // short desc
        operationId: "registerUser", // unique operation id
        parameters: [], // expected params
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
                description: "Register user successfully", // response desc
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
    },
};
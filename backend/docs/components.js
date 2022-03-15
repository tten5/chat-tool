module.exports = {
    components: {
        schemas: {
            id: {
                type: "string", // data type
                description: "Id", // optional
                example: "abc1234", // example of an id
            },
            // User model
            username: {
                type: 'string',
                example: 'jeremy'
            },
            password: { // this is NOT how to define password
                type: 'string',
                example: '123456'      
            },
            User: {
                type: "object", // data type
                properties: {
                    _id: {
                        $ref: '#/components/schemas/id'
                    },
                    username: {
                        $ref: '#/components/schemas/username'
                    },
                    password: { // this is NOT how to define password
                        $ref: '#/components/schemas/password'
                    },
                },
            },
            UserInput: {
                type: 'object',
                properties: {
                    user: {
                        type: 'object',
                        properties: {
                            username: {
                                $ref: '#/components/schemas/username'
                            },
                            password: { // this is NOT how to define password
                                $ref: '#/components/schemas/password'
                            },
                        }
                    }
                }
            },
            UserResponse: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    username: {
                        $ref: '#/components/schemas/username'
                    }
                }
            },
            // Room model
            roomName: {
                type: 'string',
                example: 'room-1'
            },
            Room: {
                type: "object", // data type
                properties: {
                    _id: {
                        $ref: '#/components/schemas/id'
                    },
                    roomName: {
                        $ref: '#/components/schemas/roomName'
                    },
                },
            },
            RoomInput: {
                type: "object", // data type
                properties: {
                    room: {
                        type: "object",
                        properties: { 
                            roomName: {
                                $ref: '#/components/schemas/roomName'                     
                            },
                        }
                    }
                },
            },
            Rooms: {
                type: "array", // data type
                description: "an array of rooms",
                items: {
                    $ref: '#/components/schemas/Room'
                },
            },
            // Message model
            Message: {
                type: "object", // data type
                properties: {
                    _id: {
                        $ref: '#/components/schemas/id'
                    },
                    roomId: {
                        type: "string",
                        description:  "id of room where the message belongs to"
                    },
                    userId : {
                        type: "string",
                        description:  "id of user that send the message"
                    },
                    sender: {
                        type: "string",
                        description:  "username of user that send the message"
                    },  
                    content: {
                        type: "string", // data type
                        description: "the content of the message", // optional
                        example: "Hi, how are you today?", // example
                    },
                    isShown: {
                        type: "boolean", // data type
                        description: "decide whether the message can be hide/show with click event", // optional
                        example: true, 
                    },
                },
            },
            Messages: {
                type: "array", // data type
                description: "an array of messages",
                items: {
                    $ref: '#/components/schemas/Message'
                },
            },
            // error model
            Error: {
                type: "object", //data type
                properties: {
                message: {
                    type: "string", // data type
                    description: "Error message", // desc
                    example: "Not found", // example of an error message
                },
                internal_code: {
                    type: "string", // data type
                    description: "Error internal code", // desc
                    example: "Invalid parameters", // example of an error internal code
                },
                },
            },
        },
    },
};
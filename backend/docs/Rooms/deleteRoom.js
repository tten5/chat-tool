module.exports = {
    // operation's method.
    delete: {
      tags: ["Rooms CRUD operations"], // operation's tag
      description: "Deleting a room with roomname", // short desc
      operationId: "deleteRoom", // unique operation id
      parameters: [
        // expected parameters
        {
          name: "roomName", // name of param
          in: "path", // location of param
          schema: {
            $ref: "#/components/schemas/roomName", // id model
          },
          required: true, // mandatory
          description: "Deleting a room", // param desc
        },
      ],
      // expected responses
      responses: {
        // response code
        200: {
          description: "Room deleted successfully", // response desc
        },
        // response code
        404: {
          description: "Room not found", // response desc
        },
        // response code
        500: {
          description: "Server error", // response desc
        },
      },
    },
  };
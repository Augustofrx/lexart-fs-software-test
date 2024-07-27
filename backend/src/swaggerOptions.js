const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de smartphones",
      version: "1.0.0",
      description: "API para gestionar smartphones",
    },
    components: {
      schemas: {
        Product: {
          type: "object",
          required: ["model", "brand", "description", "price"],
          properties: {
            id: {
              type: "string",
              description: "El ID auto-generado del producto",
            },
            model: {
              type: "string",
              description: "El modelo del producto",
            },
            brand: {
              type: "string",
              description: "La marca del producto",
            },
            description: {
              type: "string",
              description: "La descripción del producto",
            },
            price: {
              type: "number",
              description: "El precio del producto",
            },
          },
          example: {
            id: "d5fE_asz",
            model: "iPhone 12",
            brand: "Apple",
            description: "Smartphone de Apple con 64GB de almacenamiento",
            price: 799,
          },
        },
        User: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              description: "El email del usuario",
            },
            password: {
              type: "string",
              description: "La contraseña del usuario",
            },
          },
          example: {
            email: "user@example.com",
            password: "password123",
          },
        },
      },
      responses: {
        NotFound: {
          description: "El recurso solicitado no fue encontrado",
        },
        BadRequest: {
          description: "La solicitud es incorrecta",
        },
        ServerError: {
          description: "Error del servidor",
        },
        Unauthorized: {
          description: "No autorizado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Unauthorized",
                  },
                },
              },
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(swaggerOptions);

module.exports = specs;

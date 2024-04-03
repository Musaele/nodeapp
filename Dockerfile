FROM node:12.2.0-alpine

# Set a timestamp as an environment variable
ARG BUILD_DATE
ENV BUILD_DATE=${BUILD_DATE}

WORKDIR /app
COPY . .
RUN npm install

# Expose the port
EXPOSE 8000

# Command to run the application
CMD ["node", "app.js"]

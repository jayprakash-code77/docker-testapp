FROM node

# Set environment variables
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=qwerty

# Create app directory
RUN mkdir -p /testapp

# Set working directory
WORKDIR /testapp

# Copy only the required files
COPY package.json ./
COPY server.js ./
COPY public ./public

# Install dependencies
RUN npm install

# Command to start the server
CMD ["node", "server.js"]

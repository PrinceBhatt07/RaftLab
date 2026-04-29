import http from "http";
import app from "./app";
import { prisma } from "./config/db";
import { env } from "./config/env";
import { seedMenu } from "./scripts/seedMenu";
import { initSocketServer } from "./realtime/socket.server";
import { createAdmin } from "./scripts/createAdmin";

const startServer = async () => {
    try {
        await prisma.$connect();

        await seedMenu();

        await createAdmin();

        const server = http.createServer(app);
        
        initSocketServer(server);

        server.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start", error);
        process.exit(1);
    }
};

startServer();

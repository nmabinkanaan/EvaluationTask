import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions={
    
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'NK2030nk2030',
        database: 'quiz',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        // in production we should make it false otherwise we could lose data
}
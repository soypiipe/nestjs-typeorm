import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/products/entities/brand.entity';

import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: (configService: ConfigType<typeof config>) => {
            const { host, database, user, password, port } = configService.postgres;
            return {
                type: 'postgres',
                host,
                database,
                username: user,
                password,
                port,
                synchronize: false, //this is for development only
                autoLoadEntities: true //this is for development only
            }
        },
        inject: [config.KEY]
    })],
    providers: [
        {
            provide: 'API_KEY',
            useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
        },
        {
            provide: 'PG',
            useFactory: (configService: ConfigType<typeof config>) =>{
                const { host, database, user, password, port } = configService.postgres;
                const client = new Client({
                    host,
                    database,
                    user,
                    password,
                    port
                });
                client.connect();

                return client;
            },
            inject: [config.KEY]
        }

    ],
    exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule { }

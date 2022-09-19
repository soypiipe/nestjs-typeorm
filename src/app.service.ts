import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';


@Injectable()
export class AppService {
    constructor(
        @Inject('PG') private clientPg: Client,
        @Inject('TASKS') private tasks: any[],
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
    ) { }

    getTasks() {
        return new Promise((resolve, reject) => {
            this.clientPg.query('SELECT * FROM task', (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            });
        });
    }

    getHello(): string {
        const apiKey = this.configService.apiKey;
        const name = this.configService.database.name;
        return `Hello World! ${apiKey} ${name}`;
    }
}

import { Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg'
import { DeleteParams, InsertParams, SelectParams, UpdateParams } from './interfaces/queryParams.interface';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PgService {
    private pool: Pool = new Pool()

    async create<T>({ tableName, values, returning }: InsertParams<T>): Promise<QueryResult> {
        const columnNamesString = Object.keys(values[0]).reduce((currentValue, key) => {
            return `${currentValue}\"${key}\", `;
        }, '')

        const request = 'INSERT INTO "' + tableName
            + '" (' + columnNamesString.slice(0, columnNamesString.length - 2) + ') VALUES '
            + values.reduce((currentValue, value, index) =>
                currentValue + '(' + Object.values(value).reduce((curr, item, ind) =>
                    curr + (typeof item === 'number' ? item : `'${item}'`) + (ind === Object.values(value).length - 1 ? '' : ','), '')

                + ')' + (index === values.length - 1 ? ' ' : ', '), '') 
            + (returning ? `Returning "${returning}"` : '')
        try {
            return await this.pool.query(request)
        }
        catch (error) {
            return error
        }
    }

    async find<T>({ query, tableName, where }: SelectParams, limit?: number): Promise<T[]> {
        const request = 'SELECT ' + (query ? query : '*') + ` FROM "${tableName}" ` + (where ? `WHERE ${where}` : '') + (limit ? ` LIMIT ${limit}` : '')
        try {
            const res = await this.pool.query(request)
            return res.rows
        }
        catch (error) {
            return error
        }
    }


    async findOne<T>(params: SelectParams): Promise<T> {
        const res = await this.find<T>(params, 1)
        return res[0]
    }

    async delete({ tableName, where, returning, cascade }: DeleteParams): Promise<QueryResult> {
        const request = `DELETE FROM "${tableName}" ` + (cascade ? 'CASCADE ' : '') + `WHERE ${where}` + (returning ? `Returning "${returning}"` : '')
        try {
            return this.pool.query(request)
        }
        catch (error) {
            console.log(error)
        }
    }

    async update<T>({tableName, updates, where, returning} : UpdateParams<T>): Promise<QueryResult> {
        const sets = Object.keys(updates).reduce((currentValue, key) => {
            if(updates[key] === undefined) return currentValue;
            const newValue = typeof updates[key] === 'number' || typeof updates[key] === 'boolean' ? updates[key] : `'${updates[key]}'`
            return `${currentValue}"${key}" = ${newValue}, `
        }, '')
        
        const request = `UPDATE "${tableName}" SET ${sets.slice(0, sets.length - 2)} WHERE ${where}` + (returning ? `Returning "${returning}"` : '')
        
        try {
            return this.pool.query(request)
        } catch (error) {
            console.log(error)
            return error
        }
    }

    useQuery(request: string): Promise<QueryResult> {
        return this.pool.query(request)
    }


}

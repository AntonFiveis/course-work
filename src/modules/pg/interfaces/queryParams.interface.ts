interface RequestParams {
    tableName: string
}

export interface SelectParams extends RequestParams {
    query?: string
    where?: string
}
export interface InsertParams<T> extends RequestParams {
    values: T[],
    returning?: string
}

export interface DeleteParams extends RequestParams {
    where: string
    returning?: string
    cascade?: boolean
}

export interface UpdateParams<UpdateType> extends RequestParams{
    where: string
    updates: UpdateType
    returning?: string
}
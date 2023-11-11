export interface Pagination {
  total: number;
  per_page: number;
  total_pages: number;
  current_page: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: Pagination;
  // meta: {
  //   total: number;
  //   per_page: number;
  //   total_pages: number;
  //   current_page: number;
  //   prev: number | null;
  //   next: number | null;
  // };
}

export type PaginateOptions = {
  current_page?: number | string;
  per_page?: number | string;
};
export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export const paginator = (
  defaultOptions: PaginateOptions,
): PaginateFunction => {
  return async (model, args: any = { where: undefined }, options) => {
    const current_page =
      Number(options?.current_page || defaultOptions?.current_page) || 1;
    const per_page =
      Number(options?.per_page || defaultOptions?.per_page) || 10;
    const skip = current_page > 0 ? per_page * (current_page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: per_page,
        skip,
      }),
    ]);
    const total_pages = Math.ceil(total / per_page);

    return {
      data,
      meta: {
        total,
        per_page,
        total_pages,
        current_page: current_page,
        // prev: page > 1 ? page - 1 : null,
        // next: page < total_pages ? page + 1 : null,
      },
    };
  };
};

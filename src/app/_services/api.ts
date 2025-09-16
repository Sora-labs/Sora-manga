import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IApiResponse {
  // internal error from server
  statusCode: number;
  code: -1 | 0;
  message: string;
  errors: [] | null;
  fileNameFromServer?: string;
  contentType?: string;
}
const baseAxios = axios.create({
  baseURL: process.env.NEXT_BASE_APP_URL,
})

baseAxios.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

baseAxios.interceptors.response.use(
  (res: AxiosResponse<IApiResponse>): any => {
    const disposition = res.headers['content-disposition'];
    let fileName = '';
    if (res.data && res.data?.constructor?.name === 'Blob') {
      if (disposition) {
        const parts = disposition.split(';');
        if (parts.length > 1) {
          let key = 'filename=';
          const filenamePart = parts[1].trim();
          const filenameIndex = filenamePart.indexOf(key);
          if (filenameIndex !== -1) {
            fileName = filenamePart.substring(filenameIndex + key.length);
          }
        }
      }
      res.data = {
        data: res.data,
        fileNameFromServer: fileName?.replace(/["']/g, ''), // remove ' or " in fileName
        contentType: res.headers['content-type'],
      } as any;
    }
    if ((res.data?.statusCode && res.data?.statusCode !== 200) || !res.data) {
      // fix error: download file not have statusCode
      const { statusCode, message, code } = res.data;
      const error: AxiosError = {
        name: statusCode.toString(),
        status: statusCode,
        message: message,
        isAxiosError: false,
        code: code.toString(),
        toJSON: function (): object {
          return {
            name: this.name,
            message: this.message,
            isAxiosError: this.isAxiosError,
            status: statusCode,
          };
        },
      };
      return Promise.reject(error);
    }
    return Promise.resolve(res.data);
  },
  async (error: any) => {
    // ignore refresh calls
    if (error.config?.url?.includes('/api/auth/refresh')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !error.config?._retry) {
      error.config._retry = true;
      await axios.post(
        `${process.env.NEXT_BASE_APP_URL}/api/auth/refresh`,
        null,
        { withCredentials: true }
      );

      return axios(error.config as any);
    }

    return Promise.reject(error);
    // if (!axios.isCancel(error)) {
    //   const newError = error as AxiosError;
    //   if (newError.response) {
    //     const status = newError?.response?.status;
    //     const originalRequest: any = newError.config;
    //     if (status === 401 && !originalRequest?._retry) {
    //       handleRenewToken(originalRequest);
    //     }
    //   }
    // }
    // return Promise.reject(error);
  },
);

const controller = new AbortController();


const get = (url: string, queryParams?: object, responseType?: 'blob' | 'json'
) => {
  return baseAxios.get(url, {
    params: queryParams,
    responseType: responseType || 'json',
    signal: controller.signal,
  })
}

const post = (url: string, data: object | null, queryParams?: object, responseType?: 'blob' | 'json'
) => {
  return baseAxios.post(url, data, {
    params: queryParams,
    responseType: responseType || 'json',
    signal: controller.signal,
  })
}

const put = (url: string, data: object, queryParams?: object, responseType?: 'blob' | 'json'
) => {
  return baseAxios.put(url, data, {
    params: queryParams,
    responseType: responseType || 'json',
    signal: controller.signal,
  })
}

export default {
  get,
  post,
  put
}
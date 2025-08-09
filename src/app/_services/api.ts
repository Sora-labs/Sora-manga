import axios, { AxiosError, AxiosResponse } from 'axios';
import { LOCAL_STORAGE_KEYS } from '@/constant/localStorageKeys';

interface IApiResponse {
  // internal error from server
  statusCode: number;
  code: -1 | 0;
  message: string;
  errors: [] | null;
  fileNameFromServer?: string;
  contentType?: string;
}
let logsRequestsRetry: string[] = [];
axios.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    if (token && typeof token === 'string' && token.length > 0) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
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
  (error: AxiosError) => {
    if (!axios.isCancel(error)) {
      const newError = error as AxiosError;
      if (newError.response) {
        const status = newError?.response?.status;
        const originalRequest = newError.config;
        if (status === 401 && logsRequestsRetry.length == 0) {
          handleRenewToken(originalRequest);
        } else {
          logsRequestsRetry = [];
        }
      }
    }
    return Promise.reject(error);
  },
);

const handleRenewToken = async (originalRequest: any) => {
  originalRequest._retry = true;
  const refreshToken: string = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN) as string;
  if (!refreshToken) {
    return;
  }
  logsRequestsRetry.push(`/auth/refresh-token`);
  axios
    .post(`/auth/refresh-token`, {
      idRefreshToken: refreshToken,
    })
    .then((response: any) => {
      if (response?.code == 1) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.data.id_token);
        localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, response.data.id_refresh_token);
        logsRequestsRetry = [];
      }
      return axios(originalRequest);
    })

};

const controller = new AbortController();


const get = (url: string, queryParams?: object, responseType?: 'blob' | 'json'
) => {
  return axios.get(url, {
    params: queryParams,
    responseType: responseType || 'json',
    signal: controller.signal,
  })
}

const post = (url: string, data: object, queryParams?: object, responseType?: 'blob' | 'json'
) => {
  return axios.post(url, data, {
    params: queryParams,
    responseType: responseType || 'json',
    signal: controller.signal,
  })
}

const put = (url: string, data: object, queryParams?: object, responseType?: 'blob' | 'json'
) => {
  return axios.put(url, data, {
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
import { Injectable, HttpService } from '@nestjs/common';

import { resolve } from 'path';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

@Injectable()
export class IconsService {
  constructor(private httpService: HttpService) {}

  getByTerm(term: string) {
    return this.httpService.get(
      process.env.ICONFINDER_ENDPOINT + 'search?query=' + term,
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + process.env.ICONFINDER_API_KEY,
        },
      },
    );
  }

  getById(id: string) {
    return this.httpService.get(process.env.ICONFINDER_ENDPOINT + id, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + process.env.ICONFINDER_API_KEY,
      },
    });
  }

  downloadByUrl(url: string) {
    return this.httpService.get(url, {
      headers: {
        // Accept: 'application/json',
        Authorization: 'Bearer ' + process.env.ICONFINDER_API_KEY,
      },
    });
  }

  downloadIcon(icon: any) {
    const { downloadUrl, id, format } = icon;

    const filename = id + '.' + format;
    const path = resolve(__dirname, '..', '..', 'public', filename);
    const writer = createWriteStream(path);

    return this.httpService
      .request({
        method: 'GET',
        url: downloadUrl,
        responseType: 'stream',
        headers: {
          Authorization: 'Bearer ' + process.env.ICONFINDER_API_KEY,
        },
      })
      .toPromise()
      .then((response) => {
        Readable.from(response.data).pipe(writer);

        return new Promise((resolve, reject) => {
          writer.on('finish', () => {
            resolve({ filename });
          });
          writer.on('error', (err) => {
            reject(err.message);
          });
        });
      })
      .catch((err) => {
        return err;
      });
  }
}

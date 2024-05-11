import multer from "multer";
import fs from "fs/promises";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StorageService {
  constructor(
  ) { }

  async getFile(uri: string) {
    const buffer = await fs.readFile(uri);
    return buffer;
  }

  async deleteFile(uri: string) {
    if (await this.existFile(uri)) {
      await fs.unlink(uri);
    }
    throw new Error("File not found");
  }

  async existFile(uri: string) {
    const exist = await fs.access(uri)
      .then(() => true)
      .catch(() => false);
    return exist;
  }
}

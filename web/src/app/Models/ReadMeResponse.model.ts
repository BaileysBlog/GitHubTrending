import { ReadMeFormat } from "./readme.format.model";

export class ReadMeResponse
{
    content: string;
    format: ReadMeFormat;
    download_url: string;
}
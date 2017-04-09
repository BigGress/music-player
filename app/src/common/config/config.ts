import { Headers } from "@angular/http";

// 基础URL
// export const baseUrl = `${location.origin}/music`;
export const baseUrl = `http://music.163.com`;
// ajax Headers
export const headers = new Headers();
headers.set("Content-Type", "application/x-www-form-urlencoded")

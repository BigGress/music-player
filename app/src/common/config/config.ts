import { Headers } from "@angular/http";

// 基础URL
export const baseUrl = `${location.origin}/music`;
// ajax Headers
export const headers = new Headers();
headers.set("Content-Type", "application/x-www-form-urlencoded")
